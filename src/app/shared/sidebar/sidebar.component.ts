import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styles: []
})
export class SidebarComponent implements OnInit {

    constructor(public authSrv: AuthService) { }
    
    ngOnInit() {
    }

    logout(){
        this.authSrv.authLogout();
    }
    
}
