import { PartialType } from '@nestjs/mapped-types';
import { CreateUserExpenseDto } from './create-user-expense.dto';

export class UpdateUserExpenseDto extends PartialType(CreateUserExpenseDto) {}
