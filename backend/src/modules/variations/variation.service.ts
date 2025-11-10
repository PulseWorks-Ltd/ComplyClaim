import { v4 as uuidv4 } from 'uuid';
import { Variation, CreateVariationInput, UpdateVariationInput } from './variation.schema.js';

// In-memory store (replace with database in production)
const variations = new Map<string, Variation>();

export class VariationService {
  async create(data: CreateVariationInput): Promise<Variation> {
    const id = uuidv4();
    const now = new Date().toISOString();

    const variation: Variation = {
      id,
      variationNumber: data.variationNumber,
      projectName: data.projectName,
      description: data.description,
      type: data.type,
      date: data.date,
      requestedBy: data.requestedBy,
      status: 'pending',
      estimatedCost: data.estimatedCost,
      labourHours: data.labourHours,
      materials: data.materials,
      notes: data.notes,
      createdAt: now,
      updatedAt: now,
    };

    variations.set(id, variation);
    return variation;
  }

  async findAll(): Promise<Variation[]> {
    return Array.from(variations.values());
  }

  async findById(id: string): Promise<Variation | null> {
    return variations.get(id) || null;
  }

  async findByType(type: 'variation' | 'daywork'): Promise<Variation[]> {
    return Array.from(variations.values()).filter(v => v.type === type);
  }

  async update(id: string, data: UpdateVariationInput): Promise<Variation | null> {
    const variation = variations.get(id);
    if (!variation) return null;

    const updatedVariation = {
      ...variation,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    variations.set(id, updatedVariation);
    return updatedVariation;
  }

  async delete(id: string): Promise<boolean> {
    return variations.delete(id);
  }
}
