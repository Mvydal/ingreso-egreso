import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { EmailValidator } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: []
})
export class LoginComponent implements OnInit, OnDestroy{

    subscription: Subscription;
    cargando:boolean;
    
    constructor(public authSrv: AuthService, private store: Store<AppState>) { }
    
    ngOnInit() {
        this.subscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
    }
    
    // Metodo que se ejecuta cuando el componente deja de existir. Para quitar la subscripcion 
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    login(data){
        this.authSrv.authLogin(data.iptEmail, data.iptPassword);
    }

}
