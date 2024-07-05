import { IsArray } from 'class-validator';

export class PageDto<TEntity> {
  @IsArray()
  readonly result: TEntity[];

  readonly meta: {
    itemCount: number;
  };

  constructor(result: TEntity[], totalItems: number) {
    this.result = result;
    this.meta = {
      itemCount: totalItems,
    };
  };
}