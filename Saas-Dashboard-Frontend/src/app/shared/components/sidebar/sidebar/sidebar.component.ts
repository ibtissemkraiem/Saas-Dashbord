import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [CommonModule,
    RouterModule],
  styleUrls: ['./sidebar.component.scss'],
  standalone: true
  
})
export class SidebarComponent implements OnInit{
  userId:string | null=null;
  constructor(private authService:AuthService){

  }

  ngOnInit(): void {
    this.userId= this.authService.getCurrentUserId();
    console.log(this.userId);
    
  }
  isCollapsed: boolean = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
