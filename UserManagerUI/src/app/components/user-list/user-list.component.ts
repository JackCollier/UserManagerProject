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
  isLoading = false;
  error = "";
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
    this.error = "";
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: () => {
        this.error = "Error fetching user data"
        this.isLoading = false;
      }
    });
  }

  editUser(user: User): void {
    this.userSelected.emit(user);
  }

  deleteUser(id: number): void {
    this.error = ""
      this.userService.deleteUser(id).subscribe({
        error: () => 
          this.error = "Error deleting user data"
      });
  }

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
  }
}