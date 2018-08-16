export class User{

    public nombre:string;
    public uid:string;
    public email:string;


    constructor(nombre:string, uid:string, email:string){
        this.nombre = nombre;
        this.uid = uid;
        this.email = email;
    }
}