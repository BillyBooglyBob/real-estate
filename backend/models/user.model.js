import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

// Create schema for the user data
// To control what data is stored in the database
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.statics.signup = async function (username, email, password) {
  // validate input fields
  if (!username || !email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(`Your password is not strong enough.
        Please make sure it meets the following criteria:
        At least 8 characters in length
        At least 1 lowercase letter
        At least 1 uppercase letter
        At least 1 number
        At least 1 symbol`);
  }

  // Check if username already in use
  const usernameExists = await this.findOne({ username });
  if (usernameExists) {
    throw Error("Username already in use.");
  }

  // Check if email already in use
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error("Email already in use.");
  }

  // Hash the password with the secret key
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Create new user
  const newUser = await this.create({
    username,
    email,
    password: hashedPassword,
  });

  return newUser;
};

userSchema.statics.signin = async function (email, password) {
  // Check password is valid
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  // Find the user's record from the database by email
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Wrong credentials");
  }

  // Check password matches
  const match = bcryptjs.compareSync(password, user.password);

  if (!match) {
    throw Error("Wrong credentials");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

export default User;
