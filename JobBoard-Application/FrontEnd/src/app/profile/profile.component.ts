import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  role: string | null = ''
  userId!: string
  user : any
  profile: File | null = null;
  updateUser: any = {}
  constructor(private route:ActivatedRoute, private router:Router, private userService:UserService, private toastr:ToastrService){}

  ngOnInit(): void {
       this.role = localStorage.getItem('role')
       this.route.paramMap.subscribe(params => {
        this.userId = params.get('id')!;
        if (this.userId) {
          this.getUserDetails();
        } else {
          console.log('No user ID found in parameters.');
        }
      });
  }

  getUserDetails(){
    this.userService.getUser(this.userId).subscribe({
      next:(response: any) => {
        this.user = response.user
        this.updateUser = { ...this.user };
      }, error:(error: any) => {
        console.log('An error occured: ', error);
        
      }
    })
  }
  // update(userId: string): void{
  //   const updateUser = {
  //     username: this.updateUser.username,
  //     companyName: this.updateUser.companyName,
  //     location: this.updateUser.location,
  //     industry: this.updateUser.industry,
  //     website: this.updateUser.website,
  //     education: this.updateUser.education,
  //     experience: this.updateUser.experience,
  //     contactDetails: this.updateUser.contactDetails,
  //     skills: this.updateUser.skills,
  //     profile: this.updateUser.profile
  //   };
  //   console.log("Profile",this.updateUser.profile);
  //   this.userService.updateUser(userId, updateUser).subscribe({
  //     next: (response :any) => {
  //       console.log("data sent:", updateUser);
  //       console.log("Response: ", response);
  //       this.toastr.success('Profile updated')
  //       this.router.navigate([''])
  //     },error: (error: any) => {
  //         console.log('An error occured', error);
  //         this.toastr.error("Could not update the profile")
  //     },
  //   })
  // }

  update(userId: string): void {
    const formData = new FormData();
    formData.append('companyName', this.updateUser.companyName);
    formData.append('industry', this.updateUser.industry);
    formData.append('location', this.updateUser.location);
    formData.append('website', this.updateUser.website);
    formData.append('profile', this.updateUser.profile);
    formData.append('education', this.updateUser.education);
    formData.append('experience', this.updateUser.experience);
    formData.append('skills', this.updateUser.skills);
    formData.append('contactDetails', this.updateUser.contactDetails);
    formData.append('profile', this.profile!); 
  
    this.userService.updateUser(userId, formData).subscribe({
      next: (response: any) => {
        console.log("data sent:", formData);
        console.log("Response: ", response);
        this.toastr.success('Profile updated')
        this.router.navigate([''])
      }, error: (error: any) => {
        console.log('An error occurred', error);
        this.toastr.error("Could not update the profile")
      },
    });
  }
  

  handleFileInput(event: any): void {
    const file:File = event.target.files[0];
    this.profile = file
  }
}
