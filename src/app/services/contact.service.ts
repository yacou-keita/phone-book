import { Injectable, signal } from "@angular/core";
import { Contact } from "../entities/contact";
import { contactList } from "../core/data/contactlist.data";

@Injectable({ providedIn: "root" })
export class ContactService {
    private _contactList = signal<Contact[]>(contactList)

    get contactList() { return this._contactList() }

    register(contact: Contact) {
        this._contactList.update(() => [...this._contactList(), contact])
    }
}