/* eslint-disable @typescript-eslint/no-explicit-any */

import { ConfigService } from '@nestjs/config';

import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY_TOKEN',
  useFactory: async (config: ConfigService) => {
    return v2.config({
      cloud_name: config.get<string>('app.cloudinary.cloudName'),
      api_key: config.get<string>('app.cloudinary.api_key'),
      api_secret: config.get<string>('app.cloudinary.api_secret'),
    });
  },
  inject: [ConfigService],
};
