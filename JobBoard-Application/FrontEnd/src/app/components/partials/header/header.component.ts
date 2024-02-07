import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  username: string | null = ''
  role: string | null = ''
  constructor(private router:Router){}
  ngOnInit(): void {
      this.username = localStorage.getItem('username');
      
      window.addEventListener('storage',() => {
        this.username = localStorage.getItem('username')
      })
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

  logout():void{
    localStorage.removeItem('username')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    })
  }
}
