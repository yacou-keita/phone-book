import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Contact } from './entities/contact';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    RouterOutlet,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  isModaleVisible = signal(true)

  addContactForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    phone: new FormControl("", [
      Validators.required,
      Validators.minLength(9),

    ]),
    email: new FormControl("", Validators.required),
    profilePhoto: new FormControl("", Validators.required),
  })

  protected contactList: Contact[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', phone: '1234567890', email: 'john.doe@example.com', profilePhoto: 'images/profile.jpg' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane.smith@example.com', profilePhoto: 'images/profile.jpg' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane.smith@example.com', profilePhoto: 'images/profile.jpg' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane.smith@example.com', profilePhoto: 'images/profile.jpg' },
  ];

  openModal() {
    this.isModaleVisible.update(() => true)
  }

  closeModal() {
    this.isModaleVisible.update(() => false)
  }

  runRegisterContact() {
    console.info("save", this.addContactForm.value)
    this.addContactForm.reset()
    this.closeModal()
  }
}
