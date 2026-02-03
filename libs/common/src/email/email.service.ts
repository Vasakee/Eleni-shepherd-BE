import {
  BadGatewayException,
  HttpException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import * as path from 'path';
import * as ejs from 'ejs';
import { MailerService } from '@nestjs-modules/mailer';
import { type, SendMailClient } from 'zeptomail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly sendEmailService = new SendMailClient({
    url: this.configService.get('ZEPTO_URL'),
    token: this.configService.get('ZEPTO_TOKEN'),
  });

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendZeptoMail(dto: {
    email: string;
    token: string;
    firstName?: string;
  }): Promise<{ success: boolean }> {
    console.log('Zeptomail', dto);
    if (!dto.token) {
      throw new BadGatewayException('Unable to send token, Please try again!');
    }
    return this.sendEmailService
      .sendMailWithTemplate({
        template_key: this.configService.get('ZEPTO_TEMPLATE_KEY'),
        template_alias: this.configService.get('ZEPTO_ALIAS'),
        from: {
          address: this.configService.get('ZEPTO_REPLY_EMAIL'),
          name: this.configService.get('ZEPTO_TEAM_NAME'),
        },
        to: [
          {
            email_address: {
              address: dto.email,
              name: dto.email,
            },
          },
        ],
        // cc: [
        //   {
        //     email_address: {
        //       address: 'ardelmbiplang@duck.com',
        //       name: 'Jotham Baso',
        //     },
        //   },
        // ],
        // bcc: [
        //   {
        //     email_address: {
        //       address: 'jothamardel@gmail.com',
        //       name: 'Jo Ardel',
        //     },
        //   },
        // ],
        merge_info: {
          name: dto?.firstName || dto?.email,
          OTP: dto.token,
          team: this.configService.get('ZEPTO_TEAM_NAME'),
          product_name: this.configService.get('ZEPTO_TEAM_NAME'),
        },
        reply_to: [
          {
            address: this.configService.get('ZEPTO_REPLY_EMAIL'),
            name: 'no-reply',
          },
        ],
        client_reference: '',
        mime_headers: {
          'X-Test': 'test',
        },
      })
      .then((resp) => {
        console.log('success', resp);
        return {
          success: true,
        };
      })
      .catch((error) => {
        console.log('error', error);
        return {
          success: false,
        };
      });
  }
  async sendZeptoWelcomeMail(dto): Promise<{ success: boolean }> {
    console.log('DTO: ', dto);
    return this.sendEmailService
      .sendMailWithTemplate({
        template_key: this.configService.get('ZEPTO_TEMPLATE_KEY_WELCOME'),
        template_alias: this.configService.get('ZEPTO_ALIAS_WELCOME'),
        from: {
          address: this.configService.get('ZEPTO_REPLY_EMAIL'),
          name: this.configService.get('ZEPTO_TEAM_NAME'),
        },
        to: [
          {
            email_address: {
              address: dto.email,
              name: `${dto.firstName} ${dto.lastName}`,
            },
          },
        ],
        // cc: [
        //   {
        //     email_address: {
        //       address: 'ardelmbiplang@duck.com',
        //       name: 'Jotham Baso',
        //     },
        //   },
        // ],
        // bcc: [
        //   {
        //     email_address: {
        //       address: 'jothamardel@gmail.com',
        //       name: 'Jo Ardel',
        //     },
        //   },
        // ],
        merge_info: {
          name: dto.firstName,
          team: this.configService.get('ZEPTO_TEAM_NAME'),
          password: dto.password,
          produt_name: this.configService.get('ZEPTO_TEAM_NAME'),
          username: dto.userName,
        },
        reply_to: [
          {
            address: this.configService.get('ZEPTO_REPLY_EMAIL'),
            name: 'no-reply',
          },
        ],
        client_reference: '',
        mime_headers: {
          'X-Test': 'test',
        },
      })
      .then((resp) => {
        console.log('success', resp);
        return {
          success: true,
        };
      })
      .catch((error) => {
        console.log('error', error);
        return {
          success: false,
        };
      });
  }

  private async sendEmail({
    to,
    subject,
    template,
    context,
  }: {
    to: string;
    subject: string;
    template: string;
    context: Record<string, any>;
  }): Promise<void> {
    try {
      const emailTemplatePath = path.resolve(
        __dirname,
        '../../../libs/common/src/email/templates',
        `${template}.ejs`,
      );
      const htmlContent = await ejs.renderFile(emailTemplatePath, context, {
        async: true,
      });
      // console.log(htmlContent);
      await this.mailerService.sendMail({
        to,
        subject,
        html: htmlContent,
      });

      this.logger.log(`Email sent to ${to} with subject: ${subject}`);
      return;
    } catch (error) {
      this.logger.error(
        `Error sending email to ${to} with subject: ${subject}`,
        error.stack,
      );
      throw new HttpException('Error sending email', 500);
    }
  }

  async sendOtp(email: string, otp: string): Promise<void> {
    try {
      const subject = 'Email Verification';
      const template = 'send-otp'; // Assuming you have an EJS template named 'otp.ejs'
      const context = { otp }; // Pass the OTP to the template context
      await this.sendEmail({ to: email, subject, template, context });
    } catch (error) {
      console.log(error);
      throw new HttpException('Error sending email', 500);
    }
  }
}
