import { ModelType } from "@typegoose/typegoose/lib/types";
import { FilterQuery, UpdateQuery } from "mongoose";

export class ExpectResultModel {
  static async findOneAndUpdateOrFail<T>(
    this: ModelType<T>,
    query: FilterQuery<T>,
    update: UpdateQuery<T>
  ): Promise<T> {
    const updatedDocument = await this.findOneAndUpdate(
      query,
      { $set: update },
      { returnOriginal: false }
    ).exec();
    if (updatedDocument == null) throw Error(`${this.modelName} is not found`);
    return updatedDocument;
  }

  static async findOneOrFail<T>(this: ModelType<T>, query: FilterQuery<T>) {
    const document = await this.findOne(query).exec();
    if (document == null) throw new Error(`${this.modelName} is not found`);
    return document;
  }

  static async getByIdOrFail<T>(this: ModelType<T>, id: string) {
    const document = await this.findOne({ _id: id }).exec();
    if (document == null) throw new Error(`${this.modelName} is not found`);
    return document;
  }
}
