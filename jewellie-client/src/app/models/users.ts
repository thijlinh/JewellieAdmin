export class User{
    _id:string;
    firstName:  String ;
    lastName:  String;
    resgiterDate :String;
    email:  String;
    phone:Number;
    password:  String;
    country: String;
    totalOrder : String;
    constructor(){
        this._id="";
        this. firstName = "";
        this.lastName ="";
        this.resgiterDate ="";
        this. email = "";
        this.phone=0;
        this.password="";
        this.country="";
        this.totalOrder="";
    }
}