import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

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

  getUserIdFromToken(): string | null {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    
    // Check if token exists
    if (token) {
      try {
        // Decode the token
        const decodedToken: any = jwtDecode(token);
        
        // Access the userId from the token's payload
        return decodedToken.userId;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      // Token doesn't exist in localStorage
      console.error('Token not found in localStorage');
      return null;
    }
  }
  
}
