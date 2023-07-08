import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

// Nextjs doesn't work like a nodejs server that is always running.
// Nextjs server only runs when it is called upon (probably by the user)
// Because of this reason we can't define just the model("User", UserSchema) like in pure nodejs
// Here, we fist check if it exists when called upon (models.User) then if does we make sure we are using the existing one rather than creating a new one
// If it doesn't exist, we then create a new one i.e. model("User", UserSchema).


const User = models.User || model("User", UserSchema);

export default User;


