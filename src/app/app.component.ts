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
import { ConfirmationService, Message } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Contact } from './entities/contact';
import { imageFileExtention } from './core/utils/imageExtentionValidator';
import { MessagesModule } from 'primeng/messages';


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
    ConfirmDialogModule,
    MessagesModule
  ],
  providers: [ConfirmationService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


  contactService = inject(ContactService)
  confirmationService = inject(ConfirmationService)
  isModaleVisible = signal(false)

  addContactForm = new FormGroup({
    id: new FormControl<number | undefined>(undefined),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    phone: new FormControl("", [
      Validators.required,
      Validators.pattern(Regex.phone),
    ]),
    email: new FormControl("", [Validators.required, Validators.email]),
    profilePhoto: new FormControl("", Validators.required),
  })

  messages: Message[] = [];

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

  get profilePhoto() {
    return this.addContactForm.value.profilePhoto
  }

  onPhotoSelected(event: any): void {
    this.messages = []
    const file = event.target.files[0];
    const error = imageFileExtention(file.name)
    if (error instanceof Error) {
      this.messages = [{ severity: 'error', detail: error.message }];
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = this.readFile;
  }
  private readFile = (event: any): void => {
    const { target } = event
    this.addContactForm.patchValue({ profilePhoto: target.result })
  }

  openDeleteContactPopUp({ event, contactId }: { event: Event, contactId: number }) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Êtes-vous sûr de vouloir supprimer ce contact ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      acceptLabel: "Oui",
      rejectLabel: "Non",
      rejectButtonStyleClass: "p-button-danger p-button-text",
      acceptButtonStyleClass: "p-button-success",
      accept: () => this.runDeleteContactById(contactId)
    });
  }

  openModal() {
    this.isModaleVisible.update(() => true)
  }

  closeModal() {
    this.isModaleVisible.update(() => false)
  }

  closeAndRestAddContactForm() {
    this.addContactForm.reset()
    this.closeModal()
  }

  runRegisterContact() {
    const { email, firstName, lastName, phone, profilePhoto, id } = this.addContactForm.value
    const newContact = {
      email: email!,
      firstName: firstName!,
      lastName: lastName!,
      phone: phone!,
      profilePhoto: profilePhoto!,
      id: id!
    }
    this.contactService.registerOrUpdate(newContact)
    this.addContactForm.reset()
    this.closeModal()
  }

  runDeleteContactById(id: number) {
    if (id)
      this.contactService.deleteById(id)
  }

  openEditModal(contact: Contact) {
    const updateContact = {
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phone: contact.phone,
      profilePhoto: contact.profilePhoto,
      id: contact.id
    }
    this.addContactForm.patchValue(updateContact)
    this.openModal()
  }
}
