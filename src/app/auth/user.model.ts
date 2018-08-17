export class User{

    public nombre:string;
    public uid:string;
    public email:string;


    constructor(obj: DataUser){
        // Pregunta si existe el objeto, si existe y el nombre no esta vacio que tome el valor, si no, valor null
        this.nombre = obj && obj.nombre || null;
        this.uid = obj && obj.uid || null;
        this.email = obj && obj.email || null;
    }
}

interface DataUser{
    uid:string;
    email:string;
    nombre:string;
}