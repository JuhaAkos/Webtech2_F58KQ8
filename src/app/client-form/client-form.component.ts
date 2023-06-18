import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

import { ClientDTO } from 'models';
import { ClientService } from '../services/client.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private clientService: ClientService,
    private toastrService: ToastrService,
    ) { }


  existingclient?: ClientDTO;
  clients: ClientDTO[] = [];

  isNewClient = true;

  clientForm = this.formBuilder.group({
    id: 0,
    lastname: this.formBuilder.control(''),
    firstname: this.formBuilder.control(''),
    phonenumber: this.formBuilder.control(''),
    accounts: null
  });  

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
  
    if (id) {
      this.isNewClient = false;

      const id = this.activatedRoute.snapshot.params['id'];
      this.clientService.getOne(id).subscribe({
        //this.form.controls['dept'].setValue(selected.id);
        next: (existingclient) => {this.clientForm.controls['id'].setValue(existingclient.id);
        this.clientForm.controls['id'].setValue(existingclient.id);
        this.clientForm.controls['lastname'].setValue(existingclient.lastname);
        this.clientForm.controls['firstname'].setValue(existingclient.firstname);
        this.clientForm.controls['phonenumber'].setValue(existingclient.phonenumber);
        this.existingclient = existingclient;        
      }
    });   
    } else {
      this.clientService.getAll().subscribe({
        next: (clients) => {
          this.clients = clients;
        }
        //,error: (err) => {this.toastrService.error('A termék hozzáadása nem sikerült.', 'Hiba');}
      });
      
    }
  }

  saveClient() {    
    const client = this.clientForm.value as ClientDTO;
    if (client.firstname.length>0 && client.lastname.length>0  && client.phonenumber.length>0 ) {    

      if (this.isNewClient) {
          this.clientService.create(client).subscribe({
            next: (client) => {
              this.toastrService.success('Ügyfél hozzáadva, id:' + client.id , 'Siker');
            },
            error: (err) => { 
              this.toastrService.error('Ügyfél hozzáadása sikertelen');
            }
          });


      } else if(this.existingclient != undefined) {
          client.accounts=this.existingclient.accounts;
          this.clientService.update(client).subscribe({
            next: (client) => {
              this.toastrService.success('Ügyfél módosítva, id:' + client.id , 'Siker');
            },
            error: (err) => { 
              this.toastrService.error('Ügyfél módosítása sikertelen');
            }
          });
      
      }   

    } else {
      this.toastrService.error('Ügyfélkezelés sikertelen!');
    }
  }
  
}
