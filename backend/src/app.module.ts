import { Module } from '@nestjs/common';
import { CustomerModule } from './modules/customer/customer.module';
import { FrequencyModule } from './modules/frequency/frequency.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    CustomerModule,
    FrequencyModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src', 'data', 'assets'),
      serveRoot: '/imgs',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
