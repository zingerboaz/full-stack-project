const Encrypt = require ("../utils/encryptUtil")
var split = "_!_";
var ttl = 1000 *  60 * 60;

function UserToken (isNew, token, full_name, _id, roleNumber, email) {
    if(isNew) {
        this.full_name = full_name;
        this._id = _id;
        this.roleNumber = roleNumber;
        this.email = email;
        this.expirationTime = Date.now() + ttl;
        this.token = Encrypt.getEncrypt(
            full_name + split+
            _id + split+
            roleNumber + split+
            this.expirationTime + split+
            email);
    } else {
        
        this.token = token;
        console.log(token);
        var tokenStr = Encrypt.getDecrypt(token).split(split);
        this.full_name =  tokenStr[0];
        this._id = tokenStr[1];
        this.roleNumber = tokenStr[2];
        this.expirationTime = tokenStr[3];
        this.email = tokenStr[4];
    }

    this.isNotExpired = function () {
        if(this.expirationTime && parseInt(this.expirationTime) > Date.now()){
            return true;
        }
        return false;
    }
    
}

module.exports = UserToken;