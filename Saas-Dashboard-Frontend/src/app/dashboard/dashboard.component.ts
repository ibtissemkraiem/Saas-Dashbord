import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../user-profile/services/user-profile.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  TotalUsers: number | null = null;
  constructor(private userProfileService:UserProfileService){

  }
  ngOnInit() {
    this.getTotalUsers();
  }

getTotalUsers(){
  this.userProfileService.TotalUsers().subscribe(
    (data)=>{
      console.log(data)
      this.TotalUsers=data.totalUsers;
    },
    (error)=>{
      console.log(error)
    }
  )
}




  

}
