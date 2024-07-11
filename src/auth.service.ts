import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUser: User | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<any>('http://localhost:4000/login', { username, password }).pipe(
      map(response => {
        if (response && response.token) {
          // Store user details and token in local storage
          localStorage.setItem('currentUser', JSON.stringify(response));
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  logout(): void {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    // Retrieve user details from local storage
    const currentUserString = localStorage.getItem('currentUser');
    if (currentUserString) {
      return JSON.parse(currentUserString);
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  isStaff(): boolean {
    const currentUser = this.getCurrentUser();
    return currentUser?.role === 'recruiter';
  }
  
}

interface User {
  id: string;
  username: string;
  role: 'recruiter' | 'user';
}