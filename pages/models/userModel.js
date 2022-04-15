import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'guest'
  },
  emai: {
    type: String
  },
  password: {
    type: String
  },
  image: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'
  }
},
  {
    timestamps: true
  }
);

let Dataset = mongoose.models.users || mongoose.model('users', userSchema);
export default Dataset;