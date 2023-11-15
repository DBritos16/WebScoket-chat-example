import { Schema, Model } from 'mongoose'


const UserSchema = new Schema({
    username: String,
    password: String,
    online: Boolean
}, {
    timestamps: true,
    versionKey: false
});



export const userService = {
    
    register(userData){
        return userModel.create(userData);
    },

    login(userData){
        return userModel.findOne({username: userData.username});
    }

}   

export const userModel = Model('User', UserSchema);