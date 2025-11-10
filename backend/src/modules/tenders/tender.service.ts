import { v4 as uuidv4 } from 'uuid';
import { Tender, CreateTenderInput, UpdateTenderInput } from './tender.schema.js';

// In-memory store (replace with database in production)
const tenders = new Map<string, Tender>();

export class TenderService {
  async create(data: CreateTenderInput): Promise<Tender> {
    const id = uuidv4();
    const now = new Date().toISOString();

    const tender: Tender = {
      id,
      tenderNumber: data.tenderNumber,
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
      status: 'draft',
      submissionDate: data.submissionDate,
      closingDate: data.closingDate,
      estimatedValue: data.estimatedValue,
      scopeOfWork: data.scopeOfWork,
      requirements: data.requirements,
      notes: data.notes,
      createdAt: now,
      updatedAt: now,
    };

    tenders.set(id, tender);
    return tender;
  }

  async findAll(): Promise<Tender[]> {
    return Array.from(tenders.values());
  }

  async findById(id: string): Promise<Tender | null> {
    return tenders.get(id) || null;
  }

  async findByStatus(status: Tender['status']): Promise<Tender[]> {
    return Array.from(tenders.values()).filter(t => t.status === status);
  }

  async update(id: string, data: UpdateTenderInput): Promise<Tender | null> {
    const tender = tenders.get(id);
    if (!tender) return null;

    const updatedTender = {
      ...tender,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    tenders.set(id, updatedTender);
    return updatedTender;
  }

  async delete(id: string): Promise<boolean> {
    return tenders.delete(id);
  }
}
