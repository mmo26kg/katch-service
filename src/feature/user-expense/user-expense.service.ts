import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, Like, FindOptionsWhere } from 'typeorm';
import { UserExpense, ExpenseCategory } from './user-expense.schema';
import {
  CreateUserExpenseDto,
  UpdateUserExpenseDto,
  GetUserExpensesDto,
} from './dto';
import { PaginatedResponse } from '../../common/types/pagination';

@Injectable()
export class UserExpenseService {
  private readonly logger = new Logger(UserExpenseService.name);

  constructor(
    @InjectRepository(UserExpense)
    private readonly userExpenseRepository: Repository<UserExpense>
  ) {}

  async create(
    createUserExpenseDto: CreateUserExpenseDto
  ): Promise<UserExpense> {
    try {
      const userExpense = this.userExpenseRepository.create({
        ...createUserExpenseDto,
        date: new Date(createUserExpenseDto.date),
      });

      const savedExpense = await this.userExpenseRepository.save(userExpense);
      this.logger.log(`Created user expense with id: ${savedExpense.id}`);

      return savedExpense;
    } catch (error) {
      this.logger.error(
        `Failed to create user expense: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      throw error;
    }
  }

  async findAll(
    query: GetUserExpensesDto
  ): Promise<PaginatedResponse<UserExpense>> {
    const {
      page = 1,
      limit = 10,
      userId,
      category,
      startDate,
      endDate,
      description,
    } = query;
    const skip = (page - 1) * limit;

    const whereConditions: FindOptionsWhere<UserExpense> = {};

    if (userId) {
      whereConditions.userId = userId;
    }

    if (category) {
      whereConditions.category = category;
    }

    if (startDate && endDate) {
      whereConditions.date = Between(new Date(startDate), new Date(endDate));
    } else if (startDate) {
      whereConditions.date = Between(new Date(startDate), new Date());
    }

    if (description) {
      whereConditions.description = Like(`%${description}%`);
    }

    const [expenses, total] = await this.userExpenseRepository.findAndCount({
      where: whereConditions,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: expenses,
      meta: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async findOne(id: string): Promise<UserExpense> {
    const expense = await this.userExpenseRepository.findOne({ where: { id } });

    if (!expense) {
      throw new NotFoundException(`User expense with id ${id} not found`);
    }

    return expense;
  }

  async findByUserId(userId: number): Promise<UserExpense[]> {
    return this.userExpenseRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async update(
    id: string,
    updateUserExpenseDto: UpdateUserExpenseDto
  ): Promise<UserExpense> {
    const existingExpense = await this.findOne(id);

    const { date, ...rest } = updateUserExpenseDto;
    Object.assign(existingExpense, rest);
    if (date) {
      existingExpense.date = new Date(date);
    }
    const updatedExpense =
      await this.userExpenseRepository.save(existingExpense);

    this.logger.log(`Updated user expense with id: ${id}`);
    return updatedExpense;
  }

  async remove(id: string): Promise<void> {
    const expense = await this.findOne(id);
    await this.userExpenseRepository.remove(expense);
    this.logger.log(`Removed user expense with id: ${id}`);
  }

  async getTotalExpenseByUser(
    userId: number,
    startDate?: string,
    endDate?: string
  ): Promise<number> {
    const qb = this.userExpenseRepository
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'total')
      .where('expense.userId = :userId', { userId });

    if (startDate && endDate) {
      qb.andWhere('expense.date BETWEEN :start AND :end', {
        start: new Date(startDate),
        end: new Date(endDate),
      });
    }

    const result = await qb.getRawOne<{ total: string | null }>();
    return result?.total ? parseFloat(result.total) : 0;
  }

  async getExpensesByCategory(
    userId: number
  ): Promise<{ category: ExpenseCategory; total: number; count: number }[]> {
    const result = await this.userExpenseRepository
      .createQueryBuilder('expense')
      .select('expense.category', 'category')
      .addSelect('SUM(expense.amount)', 'total')
      .addSelect('COUNT(expense.id)', 'count')
      .where('expense.userId = :userId', { userId })
      .groupBy('expense.category')
      .getRawMany<{
        category: ExpenseCategory;
        total: string;
        count: string;
      }>();

    return result.map((item) => ({
      category: item.category,
      total: parseFloat(item.total),
      count: parseInt(item.count, 10),
    }));
  }
}
