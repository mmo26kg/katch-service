import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserExpenseController } from './user-expense.controller';
import { UserExpenseService } from './user-expense.service';
import { UserExpense } from './user-expense.schema';

@Module({
  imports: [TypeOrmModule.forFeature([UserExpense])],
  controllers: [UserExpenseController],
  providers: [UserExpenseService],
  exports: [UserExpenseService],
})
export class UserExpenseModule {}
