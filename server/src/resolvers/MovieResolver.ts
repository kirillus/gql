import {Mutation, Query, Resolver, Arg, Int, Field, InputType} from "type-graphql";
import {Movie} from "../entity/Movie";

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int)
  minutes: number;
}

@InputType()
class MovieUpdateInput {
  @Field(() => String, { nullable: true})
  title?: string;

  @Field(() => Int, {nullable: true})
  minutes?: number
}


@Resolver()
export class MovieResolver {

  /***
   * Create new movie with title and duration
   * @param options
   */
  @Mutation(() => Movie)
  async createMovie(
    @Arg('options', () => MovieInput) options: MovieInput
    /*
    @Arg('title', () => String) title: string,
    @Arg('minutes', () => Int) minutes: number
    */
  ) {
    // add to database
    //await Movie.insert({title, minutes});
    const movie = await Movie.create(options).save();
    return movie;
  }


  @Mutation(() => Boolean)
  async updateMovie(
    @Arg('id', () => Int) id: number,
    @Arg('input', () => MovieUpdateInput) options: MovieUpdateInput
  ) {
    // update movie's title or length
    await Movie.update({ id }, options);

    return true;
  }

  @Mutation(() => Boolean)
  async deleteMovie(
    @Arg('id', () => Int) id: number
  ) {

    await Movie.delete({id})

    return true;
  }

  @Query(() => [Movie])
  movies() {
    return Movie.find();
  }


}