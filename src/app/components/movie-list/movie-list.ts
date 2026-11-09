import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../services/movie';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
    templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  @Output() selectMovie = new EventEmitter<number>();

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loading = true;
    this.movieService.getTopRatedMovies().subscribe({
      next: (response) => {
        this.movies = response.results;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar las películas en Cinema UVEG. Revisa tu Token de API.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSelectMovie(id: number): void {
    this.selectMovie.emit(id);
  }
}