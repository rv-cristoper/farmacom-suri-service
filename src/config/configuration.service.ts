import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) { }
  get MONGO_URI() {
    return this.configService.get<string>('MONGO_URI');
  }
}
