const mongoose =  require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  street: String,
  city: String,
  cep: String,
  number: Number

}, {timestamps :true, static: false});

 const UserModel = mongoose.model('User', userSchema);

 class User{
   static getAll(){
     return new Promise((resolve, reject)=>{
       UserModel.find({}).exec().then((results) => {
         resolve(results);
       }).catch((err) => {
         reject(err);
       });
     });
      }

    static create(user){
      return new Promise((resolve, reject) => {
        UserModel.create(user).then((result) => {
          resolve(result._id);
        }).catch((err) => {
          reject(err);
        });
      });
    }

    static getById(id){
      return new Promise((resolve, reject) => {
        UserModel.findById(id).exec().then((result) => {
          resolve(result);
        }).catch((err) => {
          reject(err);
        });
      });
    }
 }

module.exports = User;
