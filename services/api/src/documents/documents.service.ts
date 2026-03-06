import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { S3Service } from './s3.service';
import type { RequestUploadInput } from '@rentwizard/core';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService, private s3: S3Service) {}

  async findAll(filters: { propertyId?: string; type?: string }) {
    const where: any = {};
    if (filters.propertyId) where.propertyId = filters.propertyId;
    if (filters.type) where.type = filters.type;

    return this.prisma.document.findMany({
      where,
      include: {
        property: { select: { name: true } },
        uploadedBy: { select: { firstName: true, lastName: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async requestUpload(input: RequestUploadInput, user: any) {
    const s3Key = `properties/${input.propertyId}/documents/${Date.now()}-${input.name}`;
    const uploadUrl = await this.s3.getPresignedUploadUrl(s3Key, input.mimeType);

    const doc = await this.prisma.document.create({
      data: {
        propertyId: input.propertyId,
        uploadedById: user.id,
        name: input.name,
        type: input.type as any,
        mimeType: input.mimeType,
        size: input.size,
        s3Key,
      },
    });

    return { uploadUrl, documentId: doc.id, s3Key };
  }

  async confirmUpload(id: string) {
    const doc = await this.prisma.document.findUnique({ where: { id } });
    if (!doc) throw new NotFoundException('Dokument nicht gefunden');
    return { confirmed: true, documentId: id };
  }

  async getDownloadUrl(id: string) {
    const doc = await this.prisma.document.findUnique({ where: { id } });
    if (!doc) throw new NotFoundException('Dokument nicht gefunden');
    const downloadUrl = await this.s3.getPresignedDownloadUrl(doc.s3Key);
    return { downloadUrl, document: doc };
  }

  async delete(id: string, user: any) {
    const doc = await this.prisma.document.findUnique({ where: { id } });
    if (!doc) throw new NotFoundException('Dokument nicht gefunden');
    await this.s3.deleteObject(doc.s3Key);
    await this.prisma.document.delete({ where: { id } });
    return { deleted: true };
  }
}
