import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../user.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../../shared/ui.actions';
import { SetUserAction } from '../auth.actions';
import { Subscription } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class AuthService {


    private userSubscription:Subscription = new Subscription();
    constructor(private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore, private store: Store<AppState>) { }


    // Metodo a la escucha que te dice que usuario es el que esta activo. Nos podemos subscribir
    initAuthListerner(){
        this.afAuth.authState.subscribe(
            (fbUser: firebase.User) => {
                if(fbUser){
                    this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
                        .subscribe( (usuarioObj: any) => {
                            
                            const newUser = new User(usuarioObj);
                            console.log(newUser);
                            this.store.dispatch(new SetUserAction(newUser));
                        });
                }else {
                    this.userSubscription.unsubscribe();
                }
            }
        )
    }    
    isAuth(){
        //Esto devuelve el objeto entero. Necesitamos hacer un pipe y un map para obtener un boolean y pasarlo al guard
        // this.afAuth.authState
        // Si es distinto de null genera true y si no un false. Este es la respuesta para el guard. Este metodo devuelve un observable
        return this.afAuth.authState.pipe(map( fbUser => {
                if( fbUser == null){
                    this.router.navigate(['/login']);
                }
                return fbUser != null
            }
        ));
    }

    addUser( nombre:string, email:string, password:string ){

        //Dispatch de la accion de carga de la pantalla. IMPLEMENTAR EN APP
        this.store.dispatch( new ActivarLoadingAction() );


        // En el caso de usar angularFire y firebase hay que añadir AngularFireAuth para crear un usuario y usar el metodo
        // createUserWithEmailAndPassword pasandole el mail y password. Esto devuelve una promesa
        this.afAuth.auth.createUserWithEmailAndPassword(email, password)
            .then( resp=> {
                // console.log(resp);
                const user : User = {
                    nombre: nombre,
                    uid: resp.user.uid,
                    email: resp.user.email
                };
                //Necesitamos enviar este objeto a firebase. Cuidado con las comitas. Hay que enviar un doc
                //Si se pone otro nombre de /usuario, se pondria otro nombre en la bbdd de firebase 
                this.afDB.doc(`${ user.uid}/usuario`).set( user)
                    .then( () => {
                        this.router.navigate(['/']);
                        this.store.dispatch( new DesactivarLoadingAction());
                    });
            })
            .catch( error => {
                // console.error(error);
                this.store.dispatch( new DesactivarLoadingAction());
                Swal('Error add', error.message, 'error');
            });
    }

    authLogin(email:string, password:string){
        
        this.store.dispatch( new ActivarLoadingAction() );

        this.afAuth.auth.signInWithEmailAndPassword(email, password)
            .then( resp=> {
                // console.log(resp);
                this.store.dispatch( new DesactivarLoadingAction() );
                this.router.navigate(['/']);
            })
            .catch( error => {
                // console.error(error);
                this.store.dispatch( new DesactivarLoadingAction() );
                Swal('Error login', error.message, 'error');
            })
    }

    authLogout(){
        this.router.navigate(['/login']);
        this.afAuth.auth.signOut();
    }
}
