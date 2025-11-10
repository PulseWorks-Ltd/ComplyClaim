import { v4 as uuidv4 } from 'uuid';
import { PaymentClaim, CreatePaymentClaimInput, UpdatePaymentClaimInput } from './payment-claim.schema.js';

// In-memory store (replace with database in production)
const paymentClaims = new Map<string, PaymentClaim>();
let claimCounter = 1;

export class PaymentClaimService {
  calculateAmounts(lineItems: PaymentClaim['lineItems'], retentionPercentage: number, previousAmount: number) {
    const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
    const gst = subtotal * 0.15; // NZ GST is 15%
    const total = subtotal + gst;
    const retentionAmount = total * (retentionPercentage / 100);
    const thisClaimAmount = total - retentionAmount - previousAmount;

    return { subtotal, gst, total, retentionAmount, thisClaimAmount };
  }

  async create(data: CreatePaymentClaimInput): Promise<PaymentClaim> {
    const id = uuidv4();
    const now = new Date().toISOString();
    
    const amounts = this.calculateAmounts(
      data.lineItems,
      data.retentionPercentage || 5,
      data.previousAmount || 0
    );

    const claim: PaymentClaim = {
      id,
      claimNumber: claimCounter++,
      contractName: data.contractName,
      contractorName: data.contractorName,
      principalName: data.principalName,
      claimDate: data.claimDate,
      valuationDate: data.valuationDate,
      lineItems: data.lineItems,
      ...amounts,
      retentionPercentage: data.retentionPercentage || 5,
      previousAmount: data.previousAmount || 0,
      status: 'draft',
      notes: data.notes,
      createdAt: now,
      updatedAt: now,
    };

    paymentClaims.set(id, claim);
    return claim;
  }

  async findAll(): Promise<PaymentClaim[]> {
    return Array.from(paymentClaims.values());
  }

  async findById(id: string): Promise<PaymentClaim | null> {
    return paymentClaims.get(id) || null;
  }

  async update(id: string, data: UpdatePaymentClaimInput): Promise<PaymentClaim | null> {
    const claim = paymentClaims.get(id);
    if (!claim) return null;

    const updatedClaim = { ...claim, ...data, updatedAt: new Date().toISOString() };

    if (data.lineItems || data.retentionPercentage !== undefined || data.previousAmount !== undefined) {
      const amounts = this.calculateAmounts(
        data.lineItems || claim.lineItems,
        data.retentionPercentage ?? claim.retentionPercentage,
        data.previousAmount ?? claim.previousAmount
      );
      Object.assign(updatedClaim, amounts);
    }

    paymentClaims.set(id, updatedClaim);
    return updatedClaim;
  }

  async delete(id: string): Promise<boolean> {
    return paymentClaims.delete(id);
  }
}
