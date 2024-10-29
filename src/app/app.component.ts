import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from './services/contact.service';
import { Regex } from './core/constants/regex.constant';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Contact } from './entities/contact';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    RouterOutlet,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    TooltipModule,
    ConfirmDialogModule
  ],
  providers: [ConfirmationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  contactService = inject(ContactService)
  isModaleVisible = signal(false)

  addContactForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern(Regex.phone),
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    profilePhoto: new FormControl(""),
  })

  get firstName() {
    return this.addContactForm.get("firstName")
  }

  get isEmptyFirstName() {
    return this.firstName?.invalid && (this.firstName?.dirty || this.firstName?.touched)
  }

  get lastName() {
    return this.addContactForm.get("lastName")
  }

  get isEmptyLastName() {
    return this.lastName?.invalid && (this.lastName?.dirty || this.lastName?.touched)
  }

  get phone() {
    return this.addContactForm.get("phone")
  }

  get isEmptyPhone() {
    return this.phone?.invalid && (this.phone?.dirty || this.phone?.touched)
  }

  get isInvalidPhoneFormat() {
    return this.phone?.hasError("pattern")
  }

  get email() {
    return this.addContactForm.get("email")
  }

  get isEmptyEmail() {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched)
  }
  get isInvalidEmailFormat() {
    return this.email?.hasError("email")
  }



  openModal() {
    this.isModaleVisible.update(() => true)
  }

  closeModal() {
    this.isModaleVisible.update(() => false)
  }

  runRegisterContact() {
    const { email, firstName, lastName, phone, profilePhoto } = this.addContactForm.value
    const newContact = { email: email!, firstName: firstName!, lastName: lastName!, phone: phone!, profilePhoto: profilePhoto! }
    this.contactService.register(newContact)
    this.addContactForm.reset()
    this.closeModal()
  }

  runDeleteContactById(id: number) {
    if (id)
      this.contactService.deleteById(id)
  }

  openEditModal(contact: Contact) {
    const updateContact = { email: contact.email, firstName: contact.firstName, lastName: contact.lastName, phone: contact.phone, profilePhoto: contact.profilePhoto }
    this.addContactForm.patchValue(updateContact)
    this.openModal()
  }
}
