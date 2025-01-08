export class Emp{
    #fname;
    #lname;
    #address;
    #email;
    #age;
    constructor(_fname,_lastname,_address,_email,_age){
        this.fnameProp = _fname;
        this.lnameProp = _fname;
        this.addressProp = _fname;
        this.emailProp = _fname;
        this.ageProp = _fname;
    }
    set fnameProp (_fname){
        this.#fname = _fname;
    }
    get fnameProp (){
        return this.#fname;
    }


    set lnameProp (_lname){
        this.#lname = _lname;
    }
    get lnameProp (){
        return this.#lname;
    }


    set addressProp (_address){
        this.#address = _address;
    }
    get addressProp (){
        return this.#address;
    }


    set emailProp (_email){
        this.#email = _email;
    }
    get emailProp (){
        return this.#email;
    }


    set ageProp (_age){
        this.#age = _age;
    }
    get ageProp (){
        return this.#age;
    }

    toJson(x,y) {
        let J = JSON.stringify({
            id: "",
            username: x,
            password: y,
            fname: this.#fname,
            lname: this.#lname,
            address: this.#address,
            email: this.#email,
            age: this.#age
        })
        return J;
    }
}