import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Express } from 'express';
import { Repository } from 'typeorm';
import { Upload } from '../upload.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UploadToAwsProvider } from './upload-to-aws.provider';
import { ConfigService } from '@nestjs/config';
import { UploadFile } from '../interfaces/upload-file.upload';
import { FileTypes } from '../enums/file-types.enum';

@Injectable()
export class UploadsService {
  constructor(
    //Inject the uploadsRepository
    @InjectRepository(Upload)
    private readonly uploadsRepository: Repository<Upload>,

    //Inject uploadToAwsProvider
    private readonly uploadToAwsProvider: UploadToAwsProvider,

    private readonly configService: ConfigService,
  ) {}
  public async uploadFile(file: Express.Multer.File) {
    try {
      //Throw an error for unsupported MIME types
      if (
        !['image/gif', 'image/jpeg', 'image/png', 'image/jpg'].includes(
          file.mimetype,
        )
      ) {
        throw new BadRequestException('Mime type not supported');
      }
      //Upload yhe file to AWS S3
      const name = await this.uploadToAwsProvider.fileUpload(file);
      //Generate a new entry in database
      const uploadFile: UploadFile = {
        name: name,
        path: `https://${this.configService.get('appConfig.awaCloudFrontUrl')}/${name}`,
        type: FileTypes.IMAGE,
        mime: file.mimetype,
        size: file.size,
      };

      const upload = this.uploadsRepository.create(uploadFile);
      return await this.uploadsRepository.save(upload);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
