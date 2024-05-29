import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) { 
  //PartialType extends the CreateUserInput type
  @Field()
  _id: string;
}