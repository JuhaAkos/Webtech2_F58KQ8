import { Component, EventEmitter, Output } from '@angular/core';
import { UserDTO } from 'models';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private UserService: UserService,
    private toastrService: ToastrService,
  ) { } 

  @Output() loginsend = new EventEmitter<boolean>();

  users: UserDTO[] = [];

  ngOnInit(): void {

    this.UserService.getAll().subscribe({
      next: (users) => {
        this.users = users;
      }
    });
  } 

  public nameValue?: String;
  public passwordValue?: String;

  public userLoggedIn = false;

  login() {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].loginname===(this.nameValue)) {        
        
        for (let j = 0; j < this.users.length; j++) {
          if (this.users[j].password===(this.passwordValue)) {           
    
            this.userLoggedIn = true;
            this.toastrService.success('Belpés sikeres!');   
            this.loginsend.emit(true);

          }
        }; 

      }
    };
    
    if (this.userLoggedIn == false){
      this.toastrService.error('Belépés sikertelen!');
    }
  }  
  
}
