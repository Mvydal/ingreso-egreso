import { Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styles: []
})
export class RegisterComponent implements OnInit {

    constructor(public authSrv: AuthService, private store: Store<AppState>) { }
    
    cargando: boolean;
    subscription : Subscription;
    
    ngOnInit() {
        this.subscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading);
    }

    // Metodo que se ejecuta cuando el componente deja de existir. Para quitar la subscripcion 
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    onSubmit(data: any){
        this.authSrv.addUser(data.iptName, data.iptEmail, data.iptPassword);
    }
    
}
