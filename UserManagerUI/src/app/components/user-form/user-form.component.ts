import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  imports: [ReactiveFormsModule, CommonModule]
})
export class UserFormComponent {
  userForm: FormGroup;
  isEditing = false;
  editingUserId: number | null = null;

  @Input() set selectedUser(user: User | null) {
    if (user) {
      this.isEditing = true;
      this.editingUserId = user.id;
      this.userForm.patchValue(user); 
    } else {
      this.isEditing = false;
      this.editingUserId = null;
      this.userForm.reset();
    }
  }

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const user: User = {
        id: this.editingUserId || 0,
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        role: this.userForm.value.role
      };

      if (this.isEditing) {
        this.userService.updateUser(user).subscribe(() => {
          this.cancelEdit();
        });
      } else {
        this.userService.addUser(user).subscribe(() => {
          this.userForm.reset();
        });
      }
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingUserId = null;
    this.userForm.reset();
  }
}
