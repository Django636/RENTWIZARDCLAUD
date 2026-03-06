import { Controller, Get, Post, Delete, Param, Body, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { DocumentsService } from './documents.service';
import { requestUploadSchema } from '@rentwizard/core';

@ApiTags('Documents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('documents')
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Get()
  @ApiOperation({ summary: 'Dokumente auflisten' })
  findAll(@Query('propertyId') propertyId?: string, @Query('type') type?: string) {
    return this.documentsService.findAll({ propertyId, type });
  }

  @Post('upload')
  @Roles('OWNER', 'MANAGER')
  @ApiOperation({ summary: 'Upload-URL anfordern' })
  @UsePipes(new ZodValidationPipe(requestUploadSchema))
  requestUpload(@Body() body: any, @CurrentUser() user: any) {
    return this.documentsService.requestUpload(body, user);
  }

  @Post(':id/confirm')
  @ApiOperation({ summary: 'Upload bestätigen' })
  confirmUpload(@Param('id') id: string) {
    return this.documentsService.confirmUpload(id);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'Download-URL generieren' })
  getDownloadUrl(@Param('id') id: string) {
    return this.documentsService.getDownloadUrl(id);
  }

  @Delete(':id')
  @Roles('OWNER', 'MANAGER')
  @ApiOperation({ summary: 'Dokument löschen' })
  delete(@Param('id') id: string, @CurrentUser() user: any) {
    return this.documentsService.delete(id, user);
  }
}
