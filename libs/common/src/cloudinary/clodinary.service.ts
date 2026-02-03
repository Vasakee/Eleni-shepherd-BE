/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { Multer } from 'multer';

@Injectable()
export class CloudinaryService {
  constructor() {
    // Ensure Cloudinary is configured
    v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(
    file: Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      // Validate file type
      if (
        !file.mimetype.match(/^(image\/(png|jpeg|jpg|gif)|video\/(mpmpeg))/)
      ) {
        throw new BadRequestException(
          'Invalid file type. Only images and videos are allowed.',
        );
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        throw new BadRequestException(
          'File size too large. Maximum size is 5MB.',
        );
      }

      return new Promise((resolve, reject) => {
        const upload = v2.uploader.upload_stream(
          {
            folder: 'feeds', // Changed folder name to match the feature
            resource_type: 'auto', // Automatically detect resource type
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4'], // Specify allowed formats
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              return reject(
                new HttpException('Upload failed: ' + error.message, 400),
              );
            }
            console.log('Cloudinary upload success:', result);
            resolve(result);
          },
        );

        // Handle upload stream errors
        upload.on('error', (error) => {
          console.error('Upload stream error:', error);
          reject(new HttpException('Upload stream failed', 400));
        });

        toStream(file.buffer).pipe(upload);
      });
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  }

  async uploadMultipleFiles(
    files: Array<Multer.File>,
  ): Promise<Array<UploadApiResponse | UploadApiErrorResponse>> {
    try {
      const uploadPromises = files.map((file) => this.uploadImage(file));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Multiple files upload error:', error);
      throw error;
    }
  }

  async deleteFile(
    publicId: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      return new Promise((resolve, reject) => {
        v2.uploader.destroy(publicId, (error, result) => {
          if (error) {
            console.error('Delete file error:', error);
            return reject(
              new HttpException('Delete failed: ' + error.message, 400),
            );
          }
          console.log('Delete success:', result);
          resolve(result);
        });
      });
    } catch (error) {
      console.error('Delete error:', error);
      throw error;
    }
  }

  async deleteMultipleFiles(
    publicIds: string[],
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      return new Promise((resolve, reject) => {
        v2.api.delete_resources(publicIds, (error, result) => {
          if (error) {
            console.error('Delete multiple files error:', error);
            return reject(
              new HttpException('Delete failed: ' + error.message, 400),
            );
          }
          console.log('Delete multiple success:', result);
          resolve(result);
        });
      });
    } catch (error) {
      console.error('Delete multiple error:', error);
      throw error;
    }
  }
}
