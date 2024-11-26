/* Exporta o provider definido em database.providers.ts para que ele fique acessível no restante na aplicação */

import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}