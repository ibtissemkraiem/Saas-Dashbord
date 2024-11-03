import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserProfileService } from '../services/user-profile.service';
import { FormsModule } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,
    RouterModule,
    FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  
  userId:string | null= null;
  userProfile:any;
  username:String |null = null;
  email:String |null = null;
  joinDate?:string;
previewUrl:string | ArrayBuffer | null=null;
selectedFile:File | null=null;

  constructor(private userProfileService:UserProfileService,private route:ActivatedRoute){}
  isEditing = false;

toggleEdit() {
  this.isEditing = !this.isEditing;
}

triggerFileInput() {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  fileInput.click();
}
backendUrl: string = 'http://localhost:3000/';
  
  ngOnInit() {
    
    this.route.paramMap.subscribe(
      params=>{
        this.userId=params.get('id')
        if(this.userId){
          this.loadUserProfile(this.userId)
        }
      }
    )
  }
  loadUserProfile(userId: string) {

   this.userProfileService.getUserById(userId).subscribe(
    (data)=>{
      console.log(data)
      this.userProfile=data;
    this.username=data.username;
    this.email=data.email;
    console.log(this.username);
    this.joinDate= new Date(data.createdAt).toLocaleDateString();
    console.log(this.joinDate);
    if (this.userProfile.profileImage) {
      this.userProfile.profileImage = this.backendUrl + this.userProfile.profileImage.replace(/\\/g, '/');
    }
    this.userProfile.profileImage=data.profileImage;

console.log(this.userProfile.profileImage)
    },
    (error)=>{
      console.log('Erreur lors de la récupération');
    }

   )
  }

onFileSelected(event:Event){
  const input =event.target as HTMLInputElement;
  if(input.files && input.files[0]){
    this.selectedFile = input.files[0];
    const reader = new FileReader()
    reader.onload=()=>(this.previewUrl=reader.result);
    reader.readAsDataURL(this.selectedFile);
  }
}

uploadImage() {
  if (this.selectedFile) {
    this.userProfileService.uploadProfileImage(this.selectedFile).subscribe(
      (response: any) => {
        console.log('Image uploaded successfully', response);

        
        if (response.user && response.user.profileImage) {
        
          this.userProfile.profileImage = this.backendUrl + this.userProfile.profileImage.replace(/\\/g, '/');


         
          this.previewUrl = `http://localhost:3000/${this.userProfile.profileImage.replace(/\\/g, '/')}`;
        } else {
          console.error('Profile image path not found in response');
        }
      },
      (error) => console.error('Upload failed', error)
    );
  }
}

}


