class ContactInfo{
    static ID=0
    constructor(phoneNumber,email){
        this.ID=ContactInfo.ID++
        this.phoneNumber=phoneNumber;
        this.email=email;
    }
    updateContactInfo(parameter, newValue) {
        switch (parameter) {
            case "phoneNumber":
                this.phoneNumber = newValue
                return this;
            case "email":
                this.email = newValue
                return this;
            default:
                return "Invalid Parameter"
        }
    }
    
}
module.exports=ContactInfo

