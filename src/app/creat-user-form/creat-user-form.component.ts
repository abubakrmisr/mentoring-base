import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { User, User_2 } from '../intefaces/users.interface';

@Component({
  selector: 'app-creat-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MatButtonModule],
  templateUrl: './creat-user-form.component.html',
  styleUrls: ['./creat-user-form.component.scss'],
})
export class CreatUserFormComponent {
  public form = new FormGroup({
    id: new FormControl<number>(new Date().getTime(), [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    companyName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  });

  @Output()
  createUser = new EventEmitter<User_2>();

  public submitForm(): void {
    const value = this.form.value;
    this.createUser.emit({
      id: value.id!,
      name: value.name!,
      email: value.email!,
      website: value.website!,
      companyName: value.companyName!,
    });
    this.form.reset();
  }
}