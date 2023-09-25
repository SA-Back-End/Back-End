import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse , ApiNotAcceptableResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('certificates')
@ApiTags('Certificates')
export class CertificatesController {
  constructor(private readonly certificatesService: CertificatesService) {}

  @Public()
  @Post('create')
  @ApiCreatedResponse({ description: 'Certificado criado com sucesso', type: CreateCertificateDto, status: 201 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiNotAcceptableResponse({ description: 'Nome do certificado ou senha muito pequenos', status: 406 })
  @ApiConflictResponse({ description: 'Certificado já existente', status: 409 })
  @ApiOperation({
    summary: 'Cria um certificado',
    description: 'Cria um certificado na plataforma',
  })
  async create(@Body() createCertificateDto: CreateCertificateDto) {
    return await this.certificatesService.create(createCertificateDto);
  }

  @Public()
  @Get('/findAll/:page')
  @ApiOkResponse({ description: 'Informações encontradas', type: CreateCertificateDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiParam({ name: 'page', schema: { default: 1 } })
  @ApiOperation({
    summary: 'Lista todos os certificados',
    description: 'Lista todos os certificados por páginas',
  })
  async findAll(@Param('page') page: number) {
    return this.certificatesService.findAll(page);
  }
  
  @Public()
  @ApiOkResponse({ description: 'Informações encontradas', type: CreateCertificateDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @Get('/findOne/:id_certificate')
  @ApiOperation({
    summary: 'Lista um certificado específico',
    description: 'Lista um certificado específico com base no id',
  })
  async findOne(@Param('id_certificate') id_certificate: number) {
    return this.certificatesService.findOne(id_certificate);
  }

  @Public()
  @ApiOkResponse({ description: 'Informações editadas com sucesso', type: CreateCertificateDto, status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Certificado não existente', status: 404 })
  @Patch('/update/:id_certificate')
  @ApiOperation({
    summary: 'Atualiza um certificado',
    description: 'Atualiza um certificado com base no id',
  })
  async update(@Param('id_certificate') id_certificate: number, @Body() updateCertificateDto: UpdateCertificateDto) {
    return this.certificatesService.update(id_certificate, updateCertificateDto);
  }

  @Public()
  @Delete('/delete/:id_certificate')
  @ApiOkResponse({ description: 'Certificado deletado com sucesso', status: 200 })
  @ApiBadRequestResponse({ description: 'Requisição inválida', status: 400 })
  @ApiUnauthorizedResponse({ description: 'Acesso não autorizado', status: 401 })
  @ApiNotFoundResponse({ description: 'Certificado não existente', status: 404 })
  @ApiOperation({
    summary: 'Deleta um certificado',
    description: 'Deleta um certificado com base no id',
  })
  async remove(@Param('id_certificate') id_certificate: number) {
    return this.certificatesService.remove(id_certificate);
  }
}