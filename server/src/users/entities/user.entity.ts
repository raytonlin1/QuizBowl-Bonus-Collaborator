import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  // Stores the fields and their types that are in the User object
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
