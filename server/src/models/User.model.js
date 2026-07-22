import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    name:{
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    }
  }, 
  {
    timestamps: true
  }
);

userSchema.pre("save", async function () {
  if(!this.isModified("password")){
    return;
  }

  this.password = await bcrypt.hash(this.password, Number(process.env.SALT) || 10);
});

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = new mongoose.model("User", userSchema);

export default User;