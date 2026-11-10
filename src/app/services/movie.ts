import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, MovieResponse } from '../models/movie';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MovieService {
private readonly baseUrl = 'https://api.themoviedb.org/3';
private readonly apiToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTVjOGZiYThiZjQwODJkMmZlOTdkMTc3OTUzZjRjMyIsIm5iZiI6MTc5NDE5MDU5My4wNTMsInN1YiI6IjZhZjEyZDAxOTUzNzgxMTg4ZjMwZjdiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.E-vxzFhih1ApUAC4z3oV-RMsFDK7O_SqFRkb4FxBuDk';


  private get headers(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json'
    });
  }

  constructor(private http: HttpClient) {}

  getTopRatedMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/top_rated`, {
      headers: this.headers
    });
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${movieId}`, {
      headers: this.headers
    });
  }
}