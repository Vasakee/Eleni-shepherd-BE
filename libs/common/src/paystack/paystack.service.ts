import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaystackService {
  private readonly logger = new Logger(PaystackService.name);
  private readonly paystackBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.paystackBaseUrl = 'https://api.paystack.co';
  }

  async initializeTransaction<T>(
    email: string,
    amount: number,
    metadata?: Record<string, any>,
    redirect_url?: string,
  ): Promise<T> {
    this.logger.log('Initializing Paystack Transaction');
    const url = `${this.paystackBaseUrl}/transaction/initialize`;
    const payload = {
      email,
      amount: amount * 100, // Paystack expects amount in kobo
      currency: 'NGN',
      callback_url: redirect_url,
      metadata,
    };

    try {
      const response = await lastValueFrom(
        this.httpService.post<T>(url, payload, {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>(
              'app.paystack.secretKey',
            )}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        'Error initializing transaction',
        error.response?.data || error.message,
      );
      throw new HttpException(
        error.response?.data || 'Failed to initialize transaction',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async verifyTransaction(reference: string): Promise<any> {
    const url = `${this.paystackBaseUrl}/transaction/verify/${reference}`;
    this.logger.log(`Verifying transaction: ${reference}`);

    try {
      const response = await lastValueFrom(
        this.httpService.get(url, {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>(
              'app.paystack.secretKey',
            )}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        `Error verifying transaction: ${reference}`,
        error.response?.data || error.message,
      );
      throw new HttpException(
        error.response?.data || 'Failed to verify transaction',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createRecipient(arr = []): Promise<any> {
    const url = `${this.paystackBaseUrl}/transferrecipient/bulk`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          url,
          { batch: arr },
          {
            headers: {
              Authorization: `Bearer ${this.configService.get<string>(
                'app.paystack.secretKey',
              )}`,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        `Error creating recipient`,
        error.response?.data || error.message,
      );
      throw new HttpException(
        error.response?.data || 'Failed to create recipient',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async transferBulk(arr = []) {
    const url = `${this.paystackBaseUrl}/transfer/bulk`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          url,
          { currency: 'NGN', source: 'balance', transfers: arr },
          {
            headers: {
              Authorization: `Bearer ${this.configService.get<string>(
                'app.paystack.secretKey',
              )}`,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        `Error with bulk transfer`,
        error.response?.data || error.message,
      );
      throw new HttpException(
        error.response?.data || 'Failed to transfer',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async disableOTP() {
    const url = `${this.paystackBaseUrl}/transfer/disable_otp`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(
          url,
          {},
          {
            headers: {
              Authorization: `Bearer ${this.configService.get<string>(
                'app.paystack.secretKey',
              )}`,
            },
          },
        ),
      );
      return response.data;
    } catch (error) {
      this.logger.error(
        `Error with disabling otp`,
        error.response?.data || error.message,
      );
      throw new HttpException(
        error.response?.data || 'Failed to disable otp',
        error.response?.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
