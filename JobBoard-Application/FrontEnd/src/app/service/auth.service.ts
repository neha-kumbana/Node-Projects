import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  getUserRole(): string{
    return localStorage.getItem('role') ?? ''
  }

  getToken(): string{
    return localStorage.getItem('token') ?? ''
  }
}
