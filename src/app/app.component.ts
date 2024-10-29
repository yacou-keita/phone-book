import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Contact } from './entities/contact';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonModule, 
    TableModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
  protected contactList: Contact[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', phone: '1234567890', email: 'john.doe@example.com', profilePhoto: 'images/profile.jpg' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane.smith@example.com', profilePhoto: 'images/profile.jpg' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane.smith@example.com', profilePhoto: 'images/profile.jpg' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane.smith@example.com', profilePhoto: 'images/profile.jpg' },
  ];
}
