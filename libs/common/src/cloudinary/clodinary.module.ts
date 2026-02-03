import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './provider/cloudinary.provider';
import { CloudinaryService } from './clodinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
