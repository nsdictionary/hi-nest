import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entitiy';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async getAll(): Promise<Movie[]> {
    return await this.movieRepository.find();
  }

  async getOne(id: number): Promise<Movie> {
    const movie: Movie = await this.movieRepository.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  async deleteOne(id: number): Promise<boolean> {
    const result = await this.movieRepository.delete({ id });
    return result.affected > 0;
  }

  async create(movieData: CreateMovieDto): Promise<void> {
    await this.movieRepository.save(movieData);
  }

  async update(id: number, updateData: UpdateMovieDto): Promise<boolean> {
    const result = await this.movieRepository.update(id, updateData);
    return result.affected > 0;
  }
}
