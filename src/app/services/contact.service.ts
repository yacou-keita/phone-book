import { Injectable, signal } from "@angular/core";
import { Contact } from "../entities/contact";
import { contactList } from "../core/data/contactlist.data";

@Injectable({ providedIn: "root" })
export class ContactService {
    private _contactList = signal<Contact[]>(contactList)

    get contactList() { return this._contactList() }

    register(contact: Contact) {
        if (contact.id) {
            const newContactList = this._contactList().map((contactFound: Contact) => {
                if (contactFound.id === contact.id) {
                    contactFound.id = contact.id
                    contactFound.firstName = contact.firstName
                    contactFound.lastName = contact.lastName
                    contactFound.phone = contact.phone
                    contactFound.profilePhoto = contact.profilePhoto
                    return contactFound
                }
                return contactFound
            })
            this._contactList.set(newContactList)
            return
        }
        contact.id = this._contactList.length + 1
        this._contactList.update(() => [...this._contactList(), contact])
    }

    deleteById(id: number) {
        const newContactList = this._contactList().filter((contact: Contact) => contact.id !== id)
        this._contactList.update(() => newContactList)
    }
}