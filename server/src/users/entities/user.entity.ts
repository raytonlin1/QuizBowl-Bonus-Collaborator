import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractEntity } from '../../common/database/abstract.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@Schema({ versionKey: false }) // Schema that mongoDB understands, and entity that our app understands
@ObjectType()
export class User extends AbstractEntity {
  @Prop()
  @Field() // Exposes this field to be queryable
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);