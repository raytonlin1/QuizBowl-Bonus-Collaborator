import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class AbstractDocument {
    // MongoDB schema for documents in the database, with the mongoose ORM.
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}