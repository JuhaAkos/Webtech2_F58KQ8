import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {ClientDTO } from 'models';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent {
  clients: ClientDTO[] = [];
  selectedClients: ClientDTO[] = [];

  constructor(
    private ClientService: ClientService,
    private toastrService: ToastrService,
    private router: Router) { }
   
  ngOnInit(): void {
    this.loadData();
  } 

  loadData(){
    this.selectedClients = [];
    this.ClientService.getAll().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.selectedClients.push(...this.clients);
      }
    });
  }

  deleteClient(client: ClientDTO) {
    console.log(client.id);
    this.ClientService.delete(client.id).subscribe({
      next: () => {
        const index = this.clients.indexOf(client);
        if (index > -1) {
          this.clients.splice(index, 1);
        }
        this.loadData();
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba az ügyfél törlésekor.', 'Hiba');
      }
    })
  }

  navigateToAccount(id : number) {
    this.router.navigate(['/account', id]);
  }

  navigateToForm(id : number) {
    this.router.navigate(['/client-list/form', id]);
  }

  public selectedValue?: String;
  public inputValue?: String;

  search() {

    if (this.selectedValue == "id" && this.inputValue != undefined && String(this.inputValue).length != 0) {

      this.selectedClients = [];

      for (let i = 0; i < this.clients.length; i++) {
        if (this.clients[i].id == Number(this.inputValue)) {
          this.selectedClients.push(this.clients[i]);
        }
      };    

    } else if  (this.selectedValue == "phone" && this.inputValue != undefined && String(this.inputValue).length != 0) {

        this.selectedClients = [];
  
        for (let i = 0; i < this.clients.length; i++) {
          if (this.clients[i].phonenumber == this.inputValue) {
            this.selectedClients.push(this.clients[i]);
          }
        };  

    } else if (this.selectedValue == "name" && this.inputValue != undefined && String(this.inputValue).length != 0) {

      this.selectedClients = [];

      for (let i = 0; i < this.clients.length; i++) {
        if (String(this.clients[i].lastname + this.clients[i].firstname).includes(String(this.inputValue))) {
          this.selectedClients.push(this.clients[i]);
        }
      };


    }
    if (this.selectedValue == undefined || this.inputValue == undefined || this.inputValue.length == 0) {
      //if options are missing reload all
      
      this.selectedClients = [];
      this.selectedClients.push(...this.clients);

    }
  } 
 
}
