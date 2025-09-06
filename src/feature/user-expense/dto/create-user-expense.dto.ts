import {
  IsNumber,
  IsString,
  IsEnum,
  IsDateString,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { ExpenseCategory } from '../user-expense.schema';

export class CreateUserExpenseDto {
  @IsNumber()
  @IsPositive()
  userId!: number;

  @IsNumber()
  @IsPositive()
  @Min(0.01)
  amount!: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ExpenseCategory)
  category!: ExpenseCategory;

  @IsDateString()
  date!: string;
}
