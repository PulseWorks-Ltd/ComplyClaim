import { v4 as uuidv4 } from 'uuid';
import { HealthSafetyDocument, CreateHealthSafetyDocumentInput, UpdateHealthSafetyDocumentInput } from './health-safety.schema.js';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getS3Client } from '../../config/s3.js';
import { env } from '../../config/env.js';

// In-memory store (replace with database in production)
const documents = new Map<string, HealthSafetyDocument>();

export class HealthSafetyService {
  async create(data: CreateHealthSafetyDocumentInput): Promise<HealthSafetyDocument> {
    const id = uuidv4();
    const now = new Date().toISOString();

    const document: HealthSafetyDocument = {
      id,
      documentName: data.documentName,
      documentType: data.documentType,
      projectName: data.projectName,
      description: data.description,
      uploadedBy: data.uploadedBy,
      status: 'draft',
      expiryDate: data.expiryDate,
      version: data.version || '1.0',
      tags: data.tags,
      notes: data.notes,
      createdAt: now,
      updatedAt: now,
    };

    documents.set(id, document);
    return document;
  }

  async findAll(): Promise<HealthSafetyDocument[]> {
    return Array.from(documents.values());
  }

  async findById(id: string): Promise<HealthSafetyDocument | null> {
    return documents.get(id) || null;
  }

  async findByType(type: HealthSafetyDocument['documentType']): Promise<HealthSafetyDocument[]> {
    return Array.from(documents.values()).filter(d => d.documentType === type);
  }

  async findByProject(projectName: string): Promise<HealthSafetyDocument[]> {
    return Array.from(documents.values()).filter(d => d.projectName === projectName);
  }

  async update(id: string, data: UpdateHealthSafetyDocumentInput): Promise<HealthSafetyDocument | null> {
    const document = documents.get(id);
    if (!document) return null;

    const updatedDocument = {
      ...document,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    documents.set(id, updatedDocument);
    return updatedDocument;
  }

  async delete(id: string): Promise<boolean> {
    return documents.delete(id);
  }

  async generateUploadUrl(documentId: string, fileName: string): Promise<string> {
    const s3Client = getS3Client();
    if (!s3Client) {
      throw new Error('S3 client not configured');
    }

    const key = `health-safety/${documentId}/${fileName}`;
    const command = new PutObjectCommand({
      Bucket: env.S3_BUCKET_NAME,
      Key: key,
    });

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return uploadUrl;
  }

  async generateDownloadUrl(documentId: string, fileName: string): Promise<string> {
    const s3Client = getS3Client();
    if (!s3Client) {
      throw new Error('S3 client not configured');
    }

    const key = `health-safety/${documentId}/${fileName}`;
    const command = new GetObjectCommand({
      Bucket: env.S3_BUCKET_NAME,
      Key: key,
    });

    const downloadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    return downloadUrl;
  }

  async attachFile(documentId: string, fileName: string, fileSize: number): Promise<HealthSafetyDocument | null> {
    const document = documents.get(documentId);
    if (!document) return null;

    const fileUrl = `s3://${env.S3_BUCKET_NAME}/health-safety/${documentId}/${fileName}`;
    
    const updatedDocument = {
      ...document,
      fileUrl,
      fileName,
      fileSize,
      updatedAt: new Date().toISOString(),
    };

    documents.set(documentId, updatedDocument);
    return updatedDocument;
  }
}
