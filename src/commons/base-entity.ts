import { Types } from 'mongoose';

export abstract class BaseEntity {
  readonly _id?: Types.ObjectId;
  readonly createdAt?: Date = new Date();
  readonly updatedAt?: Date;
}
