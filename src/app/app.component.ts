import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Contact } from './entities/contact';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from './services/contact.service';


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

  contactService = inject(ContactService)
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


  openModal() {
    this.isModaleVisible.update(() => true)
  }

  closeModal() {
    this.isModaleVisible.update(() => false)
  }

  runRegisterContact() {
    const { email, firstName, lastName, phone, profilePhoto } = this.addContactForm.value
    const createContact = { email: email!, firstName: firstName!, lastName: lastName!, phone: phone!, profilePhoto: profilePhoto! }
    this.contactService.register(createContact)
    this.addContactForm.reset()
    this.closeModal()
  }
}
