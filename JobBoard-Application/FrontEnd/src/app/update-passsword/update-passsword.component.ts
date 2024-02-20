import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-passsword',
  templateUrl: './update-passsword.component.html',
  styleUrl: './update-passsword.component.css'
})
export class UpdatePassswordComponent implements OnInit {

  email: string = ''
  password: string = ''
  bgimage: string = 'assets/images/login-bg.jpg'

  private apiUrl = 'http://localhost:3000/api/v1/auth/'

  emailFormControl = new FormControl('',[
    Validators.required,
    Validators.email
  ])

  constructor(private http:HttpClient, private router:Router, private toastr:ToastrService){}
  ngOnInit(): void {}

  update(){
    if(this.emailFormControl.invalid){
      return
    }

    const email = this.emailFormControl.value || ''; 
    const password = this.password;

    if(!email || !password){
      this.toastr.error('Please provide email and password...')
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    this.http.patch(`${this.apiUrl}/updatePassword`,formData)
      .subscribe({
        next:(resultData:any) => {
          const token = resultData.token
          const username = resultData.user.username
          localStorage.setItem('username',username)
          localStorage.setItem('token',token)
          this.toastr.success('Password has been successfully updated')
          this.router.navigate(['/login'])
        },
        error: (error: any) => {
          console.log(error);
          
          if (error.error && error.error.message === 'Invalid credentials'){
            this.toastr.error('Invalid email')
          }else{
            this.toastr.error("Password updation failed...")
          }
        }
       })
  }
}
