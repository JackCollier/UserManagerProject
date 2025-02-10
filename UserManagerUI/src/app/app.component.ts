import { Component } from '@angular/core';;
import { UserListComponent } from "./components/user-list/user-list.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [UserListComponent]
})
export class AppComponent {
  title = 'UserManagerUI';
}
