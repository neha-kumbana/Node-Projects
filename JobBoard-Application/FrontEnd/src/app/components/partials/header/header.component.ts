import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { ToastrService } from 'ngx-toastr';

interface QueryParams {
  skills?: string; 
  location?: string;
  title?: string;
  company?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {

  userId : string | null = ''
  username: string | null = ''
  role: string | null = ''

  private token = localStorage.getItem('token')

  skills: string = ''
  location: string = ''
  title: string = ''
  company: string = ''

  showLocationBar: boolean = false;
  showCompanyBar: boolean = false;
  showSkillsBar: boolean = false;
  placeholderText: string = "Search title, skills, location or company";

  queryParams : QueryParams = {}
  user: any;
  profileUrl: any;

  constructor(private router:Router, private route:ActivatedRoute, private authService:AuthService, private userService:UserService, private toastr:ToastrService){}
  ngOnInit(): void {
      this.role = localStorage.getItem('role')
      this.username = localStorage.getItem('username');
      this.userId = localStorage.getItem('userId');
      window.addEventListener('storage',() => {
        this.username = localStorage.getItem('username')
      })
      if(this.userId){
        this.getUserProfile()
      }
      
  }

  showSkillsLocationCompany(){
    this.placeholderText = "Search title"
    this.showLocationBar = true
    this.showCompanyBar = true
    this.showSkillsBar = true
  }

  search(){
    this.queryParams = {}; 

    if (this.skills.trim()) {
      this.queryParams.skills = this.skills.trim();
    }
    if (this.location.trim()) {
      this.queryParams.location = this.location.trim();
    }
    if (this.company.trim()) {
      this.queryParams.company = this.company.trim();
    }
    if (this.title.trim()) {
      this.queryParams.title = this.title.trim();
    }

    console.log('QueryParams', this.queryParams);
    
    this.router.navigate(['/searchJobs'], { queryParams: this.queryParams });
  }

  home():void{
    this.role = localStorage.getItem('role')
    if(this.role == 'Employer'){
      this.router.navigate(['/jobs'])
    }
    else{
      this.router.navigate(['/'])
    }
  }

  getUser(){
    const token = localStorage.getItem('token')
    if(token){
      const userId = this.authService.getUserIdFromToken()!
      this.userService.getUser(userId).subscribe({
        next:(response: any) => {
            this.router.navigate(['/profile', userId])
            console.log("userid: ", userId);
            console.log("Response: ", response);
            this.user = response.user        
          
        },error: (error: any) => {
          console.log("An error occured fetching user details", error);
          
        }
      })
    }else{
      this.toastr.error('Login to view your profile')
    }
    
    
  }

  getUserProfile(){
    this.userService.getUser(this.userId!).subscribe({
      next: (response: any) => {
        this.user = response.user;
        this.profileUrl = `http://localhost:3000/${response.user.profile}`; 
      },
      error: (error: any) => {
        console.log('An error occurred: ', error);
      }
    });
  }

  logout():void{
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    })
  }
}
