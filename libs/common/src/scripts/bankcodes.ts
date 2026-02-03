import { NestFactory } from '@nestjs/core';
import { BankCodeService } from 'apps/events/src/bank-code/bank-code.service';
import { EventsModule } from 'apps/events/src/events.module';
import * as fs from 'fs';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(EventsModule);
  const bankCodeService = appContext.get(BankCodeService);

  const data = fs.readFileSync('./Bank codes.docx', 'utf-8');

  const bankCodes = data.split('\n').map((line) => {
    const [code, name, description] = line.split(',');
    return {
      code: code.trim(),
      name: name.trim(),
      description: description.trim(),
    };
  });

  await bankCodeService.insertBankCodes(bankCodes);

  console.log('Bank codes imported successfully');
  await appContext.close();
}

bootstrap();
/*import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  getHello(): string {
    return 'Hello World!';
  }
}
// import { App } from '@app/shared/models';
// import {
//   Injectable,
//   Logger,
//   OnModuleInit,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { InjectModel } from '@nestjs/sequelize';
// import * as crypto from 'crypto';

// @Injectable()
// export class ServiceService implements OnModuleInit {
//   private readonly logger = new Logger(ServiceService.name);

//   constructor(
//     @InjectModel(App) private appModel: typeof App,
//     private _config: ConfigService,
//   ) {}

//   onModuleInit() {
//     this.CreateOrVerifyAPIGatewayKey();
//   }

//   async CreateOrVerifyAPIGatewayKey() {
//     // Generate appKey using app secret and store securely
//     const appSecret = this._config.get<string>('app.encryption_key');
//     const appKey = this.generateSecureAppKey(appSecret);

//     const app = await this.appModel.findOne({ where: { name: 'API Gateway' } });
//     if (app) {
//       this.logger.log('API Gateway key already exists');
//     } else {
//       this.logger.log('Creating API Gateway key');
//       await this.appModel.create({ name: 'API Gateway', appKey });
//     }
//   }

//   private generateSecureAppKey(appSecret: string): string {
//     // Create a secure app key using HMAC and a random token
//     const randomToken = crypto.randomBytes(32).toString('hex');
//     return crypto
//       .createHmac('sha256', appSecret)
//       .update(randomToken)
//       .digest('hex');
//   }

//   async validateApiKey(apiKey: string): Promise<boolean> {
//     const app = await this.appModel.findOne({ where: { appKey: apiKey } });

//     if (!app) {
//       throw new UnauthorizedException('Invalid API key');
//     }

//     if (!app.active) {
//       throw new UnauthorizedException('API key is inactive');
//     }

//     // log connected app
//     this.logger.log(`Connected app: ${app.name}`);

//     return true; // API key is valid
//   }
// }

}*/
