import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST', 'localhost'),
    port: configService.get('DATABASE_PORT', 5432),
    username: configService.get('DATABASE_USERNAME', 'katchx_user'),
    password: configService.get('DATABASE_PASSWORD', 'katchx123'),
    database: configService.get('DATABASE_NAME', 'katchx_core'),
    entities: [],
    synchronize: configService.get('NODE_ENV', 'development') === 'development',
    logging: configService.get('NODE_ENV', 'development') === 'development',
    ssl: configService.get('NODE_ENV', 'development') === 'production'
        ? { rejectUnauthorized: false }
        : false,
});
