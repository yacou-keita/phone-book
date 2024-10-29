import { Injectable, signal } from "@angular/core";
import { Contact } from "../entities/contact";
import { contactList } from "../core/data/contactlist.data";

@Injectable({ providedIn: "root" })
export class ContactService {
    private _contactList = signal<Contact[]>(contactList)

    get contactList() { return this._contactList() }

    register(contact: Contact) {
        contact.id = this._contactList.length + 1
        this._contactList.update(() => [...this._contactList(), contact])
    }

    deleteById(id: number) {
        const newContactList = this._contactList().filter((contact: Contact) => contact.id !== id)
        this._contactList.update(() => newContactList)
    }
}