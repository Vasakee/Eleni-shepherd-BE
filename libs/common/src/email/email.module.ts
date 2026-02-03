import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { join } from 'path';
import { SendMailClient } from 'zeptomail';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: 'smtp.zoho.com', // Zoho SMTP server
            port: 465, // Zoho SMTP port
            secure: true, // Use SSL
            auth: {
              user: configService.get('app.email.user'), // Your Zoho email address
              pass: configService.get('app.email.pass'), // Your Zoho email password or app-specific password
            },
          },
          defaults: {
            from: `"HNWPRO" <${configService.get('app.email.from')}>`,
          },
          template: {
            dir: join(__dirname, '../../../libs/common/src/email/templates'),
            adapter: new EjsAdapter({
              inlineCssEnabled: false,
            }),
            options: {
              strict: true,
            },
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [
    EmailService,
    ConfigService,
    {
      provide: 'SendMailClient',
      useValue: SendMailClient,
    },
  ],
  exports: [EmailService],
})
export class EmailModule {}
