import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserProfileService } from '../services/user-profile.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { response } from 'express';
import bootstrap from '../../../main.server';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
    
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  
  userId: string | null = null;
  userProfile:any;
  username:String |null = null;
  email:String |null = null;
  joinDate?:string;
previewUrl:string | ArrayBuffer | null=null;
selectedFile:File | null=null;

editProfileForm: FormGroup;
errorMessage: string = '';  
successMessage: string = '';


  constructor(private fb:FormBuilder,private userProfileService:UserProfileService,private route:ActivatedRoute){
    this.editProfileForm=this.fb.group({
      username:[''],
      email:[''],
    });
  }
 // isEditing = false;



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

   console.log("hedha"+this.userProfile.username)

   this.editProfileForm.patchValue(
    {
      username: this.userProfile.username,
      email:this.userProfile.email
     
    }
  )
  }
  EditProfile(){
    if(this.editProfileForm.valid)
      //const updatedData = this.editProfileForm.value;
    this.userProfileService.EditProfile(this.userId,this.editProfileForm.value).subscribe(
      response=>{
        this.successMessage = response.message;

        console.log('Profile updated successfully', response);
       // this.closeModal();

      },
      (error)=>{
        console.log('Error updating profile')
        this.errorMessage = error.error.message; 
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


