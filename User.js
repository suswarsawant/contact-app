const Contact = require("./Contact.js");
const NotFound = require("./error/NotFound.js");
const UnathorizedError = require("./error/UnauthorizedError.js");
const ValidationError = require("./error/ValidationError.js");

class User{
    static allUsers=[];
    static ID=0;
    constructor(fullName,isAdmin,gender,age){
        this.ID=User.ID++;
        this.fullName=fullName;
        this.isAdmin=isAdmin;
        this.gender=gender;
        this.age=age;
        this.contacts=[];
    }

    createUser(fullName,gender,age){
       try{
        if(!this.isAdmin){
            throw new UnathorizedError("Only admin can create new user!");
        }
        if(typeof fullName!='string'){
            throw new ValidationError("Please enter valid name");
        }
        if(typeof gender!='string'){
            throw new ValidationError("Please enter valid gender");
        }
        if(typeof age!='number'){
            throw new ValidationError("Please enter valid age");
        }

        let userObj=new User(fullName,false,gender,age);
        User.allUsers.push(userObj);
        return userObj;
       }
       catch(e){console.log(e);}
    }

    static createAdmin(fullName,gender,age){
        try{
            if(typeof fullName!='string'){
                throw new ValidationError("Please enter valid name");
            }
            if(typeof gender!='string'){
                throw new ValidationError("Please enter valid gender");
            }
            if(typeof age!='number'){
                throw new ValidationError("Please enter valid age");
            }
            return new User(fullName,true,gender,age);
        }
        catch(e){console.log(e);}
    }

    getAllUsers(){
        try{
            if(!this.isAdmin){
                throw new UnathorizedError("Only admin can get all users!");
            }
            return User.allUsers;
        }
        catch(e){console.log(e);}
    }

    static findUser(ID){
        try{
            if(typeof ID!='number'){
                throw new ValidationError("ID should be a number");
            }
    
            for(let index=0;index<User.allUsers.length;index++){
                if(User.allUsers[index].ID==ID){
                    return index;
                }
            }
            throw new NotFound("User not found");
        }
        catch(e){
            console.log(e);
        }
    }

    getUserByID(ID){
        try{
            if(!this.isAdmin){
                throw new UnathorizedError("Only admin can get user by ID!");
            }
            if(typeof ID!='number'){
                throw new ValidationError("ID should be a number");
            }
            let indexOfUser=User.findUser(ID);
            return User.allUsers[indexOfUser];
        }
        catch(e){
            console.log(e);
        }
    }

    updateUser(ID, parameter, updatedValue){
        try{
            if(!this.isAdmin){
                throw new UnathorizedError("Only admin can update new user!");
            }
            if(typeof ID!='number'){
                throw new ValidationError("ID should be a number");
            }
    
            let indexOfUser=User.findUser(ID);
            switch(parameter){
                case "fullName" : if(typeof updatedValue!='string'){throw new ValidationError("full name should be a string");}
                                  User.allUsers[indexOfUser].fullName=updatedValue;
                                    return User.allUsers[indexOfUser];
                case "gender" : if(typeof updatedValue!='string'){throw new ValidationError("gender should be a string");}
                                User.allUsers[indexOfUser].gender=updatedValue;
                                  return User.allUsers[indexOfUser];
                case "age" : if(typeof updatedValue!='number'){throw new ValidationError("age should be a number");}
                             User.allUsers[indexOfUser].age=updatedValue;
                               return User.allUsers[indexOfUser];
                default : throw new ValidationError("Invalid Parameter!");                     
            }
        }
        catch(e){
            console.log(e);
        }
    }

    deleteUser(ID){
       try{
        if(!this.isAdmin){
            throw new UnathorizedError("Only admin can delete user!");
        }
        if(typeof ID!='number'){
            throw new ValidationError("ID should be a number");
        }

        let indexOfUser=User.findUser(ID);
        this.User.allUsers.splice(indexOfUser,1);
        return User.allUsers;
       }
       catch(e){
        console.log(e);
       }
    }
    // contact methods
    createContact(contactName,country){
        try{
            if(this.isAdmin){
                throw new UnathorizedError("Only user can create new contact!");
            }
            if(typeof contactName!='string'){
                throw new ValidationError("Please enter valid contact name");
            }
            if(typeof country!='string'){
                throw new ValidationError("Please enter valid country name");
            }
            let contactObj=new Contact(contactName,country);
            this.contacts.push(contactObj);
            return contactObj;
        }
        catch(e){
            console.log(e);
        }
    }

    getAllContacts(){
        try{
            if(this.isAdmin){
                throw new UnathorizedError("Only user can get all contacts!");
            }
            return this.contacts;
        }
        catch(e){
            console.log(e);
        }
    }

    findContact(contactID){
        try{
            for(let index=0;index<this.contacts.length;index++){
                if(this.contacts[index].ID==contactID){
                    return index;
                }
            }
           throw new NotFound("Contact not found");
        }
        catch(e){
            throw e;
        }
    }

    getContactByID(contactID){
        try{
            if(this.isAdmin){
                throw new UnathorizedError("Only user can get contact by ID!");
            }
            if(typeof contactID!='number'){
                throw new ValidationError("Contact ID should be a number");
            }
            let indexOfContact=this.findContact(contactID);
            return this.contacts[indexOfContact];
        }
        catch(e){
            console.log(e);
        }
    }

    updateContact(contactID, parameter, updatedValue){
        try{
            if(this.isAdmin){
                throw new UnathorizedError("Only user can update contact!");
            }
            if(typeof contactID!='number'){
                throw new ValidationError("Contact ID should be a number");
            }
    
            let indexOfContact=this.findContact(contactID);
            return this.contacts[indexOfContact].updateContact(parameter,updatedValue);
        }
        catch(e){
            throw e;
        }
    }

    deleteContact(contactID){
       try{
        if(this.isAdmin){
            throw new UnathorizedError("Only user can delete contact!");
        }
        if(typeof contactID!='number'){
            throw new ValidationError("Contact ID should be a number");
        }
        let indexOfContact=this.findContact(contactID);
        this.contacts.splice(indexOfContact,1);
        return User.contacts;
       }
       catch(e){
        console.log(e);
       }
    }

    //contact info methods
    createContactInfo(contactID,city,areaName){
        try{
            if(this.isAdmin){
                throw new UnathorizedError("Only user can update contact!");
            }
            if(typeof contactID!='number'){
                throw new ValidationError("Contact ID should be a number");
            }
            if(typeof city!='string'){
                throw new ValidationError("city should be a string");
            }
            if(typeof areaName!='string'){
                throw new ValidationError("area name should be a string");
            }
            let indexOfContact=this.findContact(contactID);
            return this.contacts[indexOfContact].createContactInfo(city,areaName);  
        }
        catch(e){
            console.log(e);
        }
    }

    getContactInfo(contactID){
        try{
            if(this.isAdmin){
                throw new UnathorizedError("Only user can get contact information");
            }
            if(typeof contactID!='number'){
                throw new ValidationError("Contact ID should be a number");
            }
            let indexOfContact=this.findContact(contactID);
            return this.contacts[indexOfContact].getContactInfo();
        }
        catch(e){
            console.log(e);
        }
    }

    getContactInfoByID(contactID,contactInfoID){
        try{
            if(this.isAdmin){
                throw new UnathorizedError("Only user can get contact by ID!");
            }
            if(typeof contactID!='number'){
                throw new ValidationError("Contact ID should be a number");
            }
            if(typeof contactInfoID!='number'){
                throw new ValidationError("Contact  info ID should be a number");
            }
            let indexOfContact=this.findContact(contactID);
            return this.contacts[indexOfContact].getContactInfoByID(contactInfoID);
        }
        catch(e){
            console.log(e);
        }
    }

    updateContactInfo(contactID,contactInfoID,parameter,newValue){
        try{
            if(this.isAdmin){
                throw new UnathorizedError("Admin cannot update contacts");
            }
            if(typeof contactID!='number'){
                throw new ValidationError("Contact ID should be a number");
            }
            if(typeof contactInfoID!='number'){
                throw new ValidationError("ContactInfo ID should be a number");
            }
            let indexOfContact=this.findContact(contactID);

            return this.contacts[indexOfContact].updateContactInfo(contactInfoID,parameter,newValue)
        }
        catch(e){
            console.log("Entered catch block");
            console.log(e);
    
        }
    }

    deleteContactInfo(contactID,contactInfoID){
        try{
            if(this.isAdmin){
                throw new UnathorizedError("Admin cannot update contacts");
            }
            if(typeof contactID!='number'){
                throw new ValidationError("Contact ID should be a number");
            }
            if(typeof contactInfoID!='number'){
                throw new ValidationError("ContactInfo ID should be a number");
            }
            let indexOfContact=this.findContact(contactID)
            return this.contacts[indexOfContact].deleteContactInfo(contactInfoID)
        }
        catch(e){
            console.log(e);
        }
    }

   
}


console.log("----------------------------------");
let admin=User.createAdmin("admin","Male",22);

//console.log(adminObj)
let user1=admin.createUser("Dhruv","Male",20);
user1.createContact("Nikul","India");
user1.createContact("Jigna","India");
console.log(user1);
admin.updateUser(9,"fullName","aaaa");


//user1.updateContact(0,"country","Australia");

// console.log(user1);
// user1.deleteContact(0);
// console.log(user1);

// user1.createContactInfo(0,"Navi Mumbai","Ulwe");
// user1.createContactInfo(1,"Navi Mumbai","Kharkopar");
// user1.createContactInfo(1,"Navi Mumbai","Bamandongri");
// user1.updateContactInfo(0,0,"city","Banglore");
//console.log(user1);
// console.log(user1);
// console.log(user1);
// //console.log(user1.deleteContactInfo(1,0));
// console.log(user1.contacts[1].getContactInfo());
// console.log(user1.deleteContactInfo(1,1));
// //console.log(user1.contacts[0].getContactInfo());
// console.log(user1.contacts[1].getContactInfo());

// user1.createContactInfo(0,"Navi Mumbai","Ulwe");
// user1.createContactInfo(1,"Navi Mumbai","Kharkopar");
// user1.updateContactInfo(3,1,"city","Banglore");

// console.log(admin.getUserByID(1));
// console.log(user1.getContactByID(1));
// console.log(user1.getContactInfoByID(1));





//admin-getUserByID(ID)--return User object
//user- getContactByID(ID)
//user - getContactInfoByID(ID)

module.exports = User