import { Schema, model } from "mongoose";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { randomBytes } from "crypto";

const UserSchema = new Schema(
    {
        avatar: { type: String, default: "" },
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        verified: { type: Boolean, default: false },
        verificationCode: { type: String, required: false },
        resetPasswordToken: {type: String, required: false },
        resetPasswordExpiresIn: {type: Date,required: false },
        admin: { type: Boolean, default: false },
      },
      { timestamps: true }
);

// pre sava middleware : to hash user password before saving it to db 
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await hash(this.password,parseInt(process.env.SALT_ROUNDS));
      return next();
    }
    return next();
  });

UserSchema.methods.generateJWT = async function () {
  // payload as user id 
    return await sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };

  UserSchema.methods.generatePasswordReset = function () {
    this.resetPasswordExpiresIn = Date.now() + 36000000; // password will expire in 1 hour
    this.resetPasswordToken = randomBytes(20).toString("hex");
  };

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await compare(enteredPassword, this.password);
  };


const User = model("User", UserSchema);
export default User;