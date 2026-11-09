import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './components/movie-list/movie-list';
import { MovieDetailComponent } from './components/movie-detail/movie-detail';
import { MovieService } from './services/movie';
import { Movie } from './models/movie';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MovieListComponent, MovieDetailComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  selectedMovie: Movie | null = null;
  loadingDetail: boolean = false;

  constructor(private movieService: MovieService) {}

  onMovieSelected(movieId: number): void {
    this.loadingDetail = true;
    this.movieService.getMovieDetails(movieId).subscribe({
      next: (movie) => {
        this.selectedMovie = movie;
        this.loadingDetail = false;
      },
      error: (err) => {
        console.error('Error al obtener el detalle en Cinema UVEG:', err);
        this.loadingDetail = false;
      }
    });
  }

  onClearSelection(): void {
    this.selectedMovie = null;
  }
}