import { IsInt, IsOptional, Matches, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { UnprocessableEntityException } from '@nestjs/common';

import { PaginationOrder } from '../enums/pagination-order.enum';
import { PaginateOptions } from '../interfaces/paginate-options';
import { FilterRule } from '../enums/filter-rule.enum';

export class PageOptionsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  @Type(() => String)
  @Matches(/^[a-zA-Z0-9_,.]+:[a-zA-Z]+$/i)
  @IsOptional()
  readonly sort?: string;

  @Transform(({ value }) => decodeURIComponent(value))
  @IsOptional()
  readonly where?: string;

  get options() {
    const opt: PaginateOptions = {
      page: this.page!,
      limit: this.take!,
    }
    if (this.sort) {
      const [property, direction] = this.sort.split(':');
      const directionValues = Object.values(PaginationOrder).map(it => (it.toUpperCase()));
      if (!directionValues.includes(direction.toUpperCase())) {
        throw new UnprocessableEntityException({
          message: 'Validation error',
          data: [
            {
              property: 'sort',
              errors: [
                `sort direction must be one of the following values: ${directionValues.join(
                  ', ',
                )}`,
              ],
            },
          ],
        });
      }
      opt['sort'] = {
        [property]: direction.toUpperCase() === PaginationOrder.Asc ? 1 : -1
      }
    }
    return opt
  }

  get query() {
    if (!this.where) return undefined;
    const [first, ...rest] = this.where.split(';').filter((cond) => cond.length);
    const converter = (param: string) => {
      const [property, rule, value] = param.split(':');
      const ruleValues = Object.values(FilterRule).map((filterRule) => {
        return filterRule.toString();
      });
      if (!ruleValues.includes(rule)) {
        throw new UnprocessableEntityException({
          message: 'Validation error',
          data: [
            {
              property: 'where',
              errors: [
                `where must be one of the following values: ${ruleValues.join(
                  ', ',
                )}`,
              ],
            },
          ],
        });
      }

      const filter = {
        property,
        rule: rule as FilterRule,
        value: value,
      };
      const strings = filter.value.split(',');
      const ruleMappings: Record<
        FilterRule,
        () => Record<string, Record<string, string>>
      > = {
        [FilterRule.ILIKE]: () => {
          return {
            [property]: { $regex: filter.value },
          };
        },
        [FilterRule.BETWEEN]: () => {
          return {
            [property]: {
              $gte: `${strings[0]}T00:00:00.000Z`,
              $lt: `${strings[1]}T23:59:59.000Z`,
            },
          };
        },
      };
      return ruleMappings[filter.rule]()
    };

    return rest.length
      ? [first, ...rest].reduce((prev, curr) => {
        return {
          ...prev,
          ...converter(curr),
        };
      }, converter(first))
      : converter(first)
  }

  constructor(
    page: number = 1,
    take: number = 10,
    sort?: string,
    where?: string,
  ) {
    this.page = page;
    this.take = take;
    this.sort = sort;
    this.where = where;
  }
}
