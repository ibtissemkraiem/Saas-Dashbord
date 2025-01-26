import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../user-profile/services/user-profile.service';
import { response } from 'express';
//import bootstrap from '../../../main.server';
declare var bootstrap: any;
import feather from 'feather-icons';
//import * as feather from 'feather-icons';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit{
  users: any[] = [];
  p: number = 1;
  totalPages: number = 1;
  currentPage: number = 1;
  selectedUser: any = null;

  constructor(private userprofileService: UserProfileService) {}

  ngOnInit(): void {
    this.loadUsers();
    setTimeout(() => {
      feather.replace();
    });

    
  }
  ngAfterViewChecked(): void {
    feather.replace(); // Recharge les icônes après les mises à jour dynamiques
  }

loadUsers():void{
  this.userprofileService.AllUsers(this.currentPage,5).subscribe((data)=>{
    this.users = data.data;
    this.totalPages = data.totalPages;
    console.log(data)
  })
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.loadUsers();
  }
}

prevPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.loadUsers();
  }
}

  sortBy(field: string): void {
    const sortedUsers = this.users.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    });
    this.users = [...sortedUsers]; 
  }
  openDeleteModal(user: any): void {
    this.selectedUser = user;
    console.log(user)
    console.log(JSON.stringify(this.selectedUser, null, 2));
    const modal = new bootstrap.Modal(document.getElementById('deleteModal') as HTMLElement);
    modal.show();
  }


  
  deleteUser(selectedUser: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userprofileService.DeleteUser(selectedUser).subscribe(
        () => {
          alert('Utilisateur supprimé avec succès.');
          this.loadUsers(); 
        },
        (error) => {
          console.error('Erreur lors de la suppression :', error);
          alert('Une erreur est survenue lors de la suppression.');
        }
      );
    }
  }


}
