import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  }
});

userSchema.statics.findByLogin = async function(login) {
  let user = await this.findOne({
    username: login
  });
  if (!user) {
    user = await this.findOne({ email: login });
  }
  return user;
};

userSchema.pre("remove", function(next) {
  console.log(this); // for example { _id: 5d7d353f9a472a2d38cc1045, username: 'rwieruch', __v: 0 }
  // через this.model, например this это объект User можно получить доступ к другим объектам, например Message 
  const messages = this.model("Message").find({user: this._id}).then(data => console.log(data));

  this.model("Message").deleteMany({ user: this._id }, next);
});

const User = mongoose.model("User", userSchema);

export default User;
