import { Component } from '@angular/core';;
import { UserListComponent } from "./components/user-list/user-list.component";
import { HttpClientModule } from '@angular/common/http';
import { UserFormComponent } from "./components/user-form/user-form.component";
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [UserListComponent, UserFormComponent]
})
export class AppComponent {
  title = 'UserManagerUI';
  editingUser: User | null = null;

  onUserSelected(user: User): void {
    this.editingUser = user;
  }
}
