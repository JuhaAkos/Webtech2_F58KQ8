import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ClientDTO, AccountDTO } from 'models';
import { ClientService } from '../services/client.service';

import { AccountService } from '../services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent {
  constructor(   
    private clientService: ClientService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    ) { }

  client?: ClientDTO;  
  newFormOpened = false;

  accountForm = this.formBuilder.group({
    id: this.formBuilder.control(0),
    startingBalance: this.formBuilder.control(0),
  });  

  ngOnInit(): void {
    this.loadClientData();
  }

  loadClientData() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.clientService.getOne(id).subscribe({
      next: (client) => {
        this.client = client;
            }
    });
  }

  openForm(){
    if (this.newFormOpened) {
      this.newFormOpened = false;
    } else {
      this.newFormOpened = true;
    }    
  } 

  createNewAccount(){    

    const account = this.accountForm.value as AccountDTO;

    account.balance = account.startingBalance;
    if (this.client != undefined) {
      account.client = this.client;
    }   

    if (account.balance>=0 && account.startingBalance>=0) {

      this.accountService.create(account).subscribe({
        next: (account) => {
          this.loadClientData(); 
          this.toastrService.success('Számla hozzáadása sikeres');      
        },
        error: (err) => {
          this.toastrService.error('Számla hozzáadása sikertelen');
        }
      }); 

    }  
    else {
      this.toastrService.error('Számlanyitás sikertelen!');
    }
    
  }

  deleteAccount(account: AccountDTO) {
    this.accountService.delete(account.id).subscribe({
      next: () => {
        if (this.client?.accounts) {
        const index = this.client?.accounts.indexOf(account);
        if (index > -1) {
          this.client?.accounts.splice(index, 1);
        }
      }
      },
      error: (err) => {
        console.error(err);
        this.toastrService.error('Hiba az ügyfél törlésekor.', 'Hiba');
      }
    })
  }

  public inputValue?: String;

  addMoney(account: AccountDTO){
    if (this.inputValue!=null && Number(this.inputValue)>=0 || Number(this.inputValue)<0) {
      account.balance+=Number(this.inputValue);

      this.accountService.update(account).subscribe({
        next: (accountt) => {
          this.toastrService.success('Számla pénzösszege módosítva, id:' + account.id , 'Siker');
        },
        error: (err) => { 
          this.toastrService.error('Számla módosítása sikertelen');
        }
      });
    } else {
      this.toastrService.error('Számlamódosítás sikertelen!');
    }   
  }
  
}