import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaystackService } from './paystack.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [HttpModule],
  providers: [PaystackService, ConfigService],
  exports: [PaystackService],
})
export class PaystackModule {}
