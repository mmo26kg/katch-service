import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UserExpenseService } from './user-expense.service';
import {
  CreateUserExpenseDto,
  UpdateUserExpenseDto,
  GetUserExpensesDto,
} from './dto';

@Controller('user-expenses')
export class UserExpenseController {
  constructor(private readonly userExpenseService: UserExpenseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body(ValidationPipe) createUserExpenseDto: CreateUserExpenseDto) {
    return this.userExpenseService.create(createUserExpenseDto);
  }

  @Get()
  findAll(@Query(ValidationPipe) query: GetUserExpensesDto) {
    return this.userExpenseService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userExpenseService.findOne(id);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.userExpenseService.findByUserId(userId);
  }

  @Get('user/:userId/total')
  async getTotalExpense(
    @Param('userId', ParseIntPipe) userId: number,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    const total = await this.userExpenseService.getTotalExpenseByUser(
      userId,
      startDate,
      endDate
    );
    return { userId, total, startDate, endDate };
  }

  @Get('user/:userId/categories')
  getExpensesByCategory(@Param('userId', ParseIntPipe) userId: number) {
    return this.userExpenseService.getExpensesByCategory(userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateUserExpenseDto: UpdateUserExpenseDto
  ) {
    return this.userExpenseService.update(id, updateUserExpenseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userExpenseService.remove(id);
  }
}
