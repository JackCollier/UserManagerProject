import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User, UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  imports: [CommonModule]
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private usersSub!: Subscription;

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

  deleteUser(id: number): void {
      this.userService.deleteUser(id).subscribe(() => {
      });
  }

  ngOnDestroy(): void {
    this.usersSub.unsubscribe();
  }
}