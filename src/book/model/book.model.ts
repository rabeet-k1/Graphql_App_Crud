import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
@ObjectType() // This will treat the below class as a object
export class Book extends Document {
  @Field(() => ID) // Field decorator is for Gql
  declare readonly _id: Types.ObjectId;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop()
  @Field({ nullable: true })
  description?: string;

  @Prop({ required: true })
  @Field()
  author: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
