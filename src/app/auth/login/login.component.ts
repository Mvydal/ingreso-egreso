import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EmailValidator } from '../../../../node_modules/@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit {

    constructor(public authSrv: AuthService) { }
    
    ngOnInit() {
    }

    login(data){
        this.authSrv.authLogin(data.iptEmail, data.iptPassword);
    }

}
