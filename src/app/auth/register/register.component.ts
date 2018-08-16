import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit {

    constructor(public authSrv: AuthService) { }
    
    ngOnInit() {
    }
    onSubmit(data: any){
        this.authSrv.addUser(data.iptName, data.iptEmail, data.iptPassword);
    }
    
}
