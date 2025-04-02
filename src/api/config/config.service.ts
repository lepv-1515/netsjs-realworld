import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: string | undefined };

    constructor() {
        dotenv.config();
        this.envConfig = process.env;
    }

    get(key: string): string {
        const value = this.envConfig[key];
        if (!value) {
            throw new Error(`Config error: ${key} not found`);
        }

        return value;
    }
}
