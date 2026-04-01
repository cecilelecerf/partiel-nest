import { Module } from '@nestjs/common';
import { ExercicesService } from './exercices.service';
import { ExercicesController } from './exercices.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ExercicesController],
  providers: [ExercicesService],
})
export class ExercicesModule {}
