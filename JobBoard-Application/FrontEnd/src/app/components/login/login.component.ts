import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  bgimage: string = "assets/images/login-bg.jpg"
  
  private apiUrl = 'http://localhost:3000/api/v1/auth';

  emailFormControl = new FormControl('',[
    Validators.required,
    Validators.email
  ])

  constructor(private http:HttpClient, private router:Router, private toastr:ToastrService){}
  ngOnInit(): void{}
  login(){
    if (this.emailFormControl.invalid) {
      return; 
    }
    const email = this.emailFormControl.value || ''
    const password = this.password

    if(!email || !password){
      alert('Please provide email and password...')
      return
    }
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    this.http.post(`${this.apiUrl}/login`, formData)
      .subscribe({
        next: (resultData: any) => {
          const token = resultData.token
          const username = resultData.user.username
          const role = resultData.user.role
          const userId = resultData.user.id
          localStorage.setItem('token',token)
          localStorage.setItem('username', username)
          localStorage.setItem('role', role)
          localStorage.setItem('userId', userId)
          if(role == 'Employer'){
            this.router.navigate(['/jobs']).then(() => {
              window.location.reload();
            })
          }else{
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            })
          }
          
        },
        error: (error: any) => {
          console.error('Error:', error);
          this.toastr.error("Login failed. Please check your email and password.");
        }
      });
  }
  
}
