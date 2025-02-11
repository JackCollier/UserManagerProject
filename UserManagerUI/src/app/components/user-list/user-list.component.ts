import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  imports: [CommonModule]
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private usersSub!: Subscription;

  @Output() userSelected = new EventEmitter<User>(); 

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUsers();
    this.usersSub = this.userService.getUsersUpdatedListener().subscribe(() => {
      this.fetchUsers();
    });
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  editUser(user: User): void {
    this.userSelected.emit(user); 
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe();
  }

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
  }
}