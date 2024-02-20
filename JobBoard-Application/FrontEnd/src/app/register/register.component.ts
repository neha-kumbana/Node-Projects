import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class RegisterComponent implements OnInit{
  username: string = ''
  email: string = ''
  password: string = ''
  role: string = 'Job Seeker'
  bgimage: string = 'assets/images/login-bg.jpg'

  private apiUrl = 'http://localhost:3000/api/v1/auth';

  emailFormControl = new FormControl('',[
    Validators.required,
    Validators.email
  ])

  usernameFormControl = new FormControl('',[
    Validators.required
  ])

  constructor(private http:HttpClient, private router:Router, private toastr:ToastrService){}
  ngOnInit(): void {}
  register(){

    const email = this.emailFormControl.value || ''
    const username = this.usernameFormControl.value || ''
    const password = this.password
    const role = this.role

    if(!email || !password || !username){
      alert('Please fill all the details...')
      return
    }

    const formData = new FormData()
    formData.append('username',username)
    formData.append('email',email)
    formData.append('password',password)
    formData.append('role',role)

    this.http.post(`${this.apiUrl}/register`,formData)
       .subscribe({
        next: (resultData: any) => {
          const token = resultData.token
          localStorage.setItem('token',token)
          const username = resultData.user.username
          localStorage.setItem('username',username)
          this.toastr.success('Successfully registered')
          this.router.navigate(['/login'])
        },
        error: (error: any) => {
          
          if (error.error && error.error.error === 'Email already exists'){
            this.toastr.error('Email or username already registered')
          }else{
            alert("Registration failed...")
          }
        }
       })
  }
}
