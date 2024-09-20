import mercury from "@mercury-js/core";
import { User } from "./models";
import { GraphQLError } from "graphql";
import { RedisClient } from "../graphql/services/redis";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const getTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "shashanksonwane305@gmail.com",
      pass: "jfhucooflemoxuya",
    },
  });
};
export default {
  Query: {
    hello: (root: any, { name }: { name: string }, ctx: any) => {
      return `Hello ${name || "World"}`;
    },
  },
  Mutation: {
    signUp: async (
      root: any,
      { signUpData }: { signUpData: any },
      ctx: any
    ) => {
      try {
        const userSchema = mercury.db.User;
        const existingUser = await userSchema.mongoModel.findOne({
          email: signUpData.email,
        });
        console.log(existingUser,"existing User");
        
        if (existingUser) throw new GraphQLError("User Already Exists");
        const newUser = await userSchema.mongoModel.create({
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          userName: signUpData.userName,
          email: signUpData.email,
          password : signUpData.password,
          role : signUpData.role
        });
        console.log(newUser,"new Usser");
        
        const otp = generateVerificationCode();
        console.log(otp);

        await RedisClient.set(signUpData.email, otp);
        sendVerificationEmail(signUpData.email, otp + "");
        return {
          id: newUser.id,
          msg: "User Registered Successfully",
          otp: otp,
        };
      } catch (error: any) {
        throw new GraphQLError(error);
      }
    },
    signin: async (
      root: any,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        const UserSchema = mercury.db.User;
        const user = await UserSchema.mongoModel.findOne({
          email,
        });
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.SECRET_TOKEN_KEY!,
          { expiresIn: "30d" }
        );
        if (!user) {
          throw new Error("Invalid  username and/or email");
        }
        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        return {
          msg: "User successfully logged in",
          user: user,
          token: token,
        };
      } catch (error: any) {
        throw new GraphQLError(error);
      }
    },
  },
};

async function sendVerificationEmail(email:string, otp:string) {
  const transporter = getTransporter();
  const mailOptions = {
    from: "shashanksonwane305@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Click the following link to verify your email: ${otp}`,
  };

  
  const info = await transporter.sendMail(mailOptions)
}
function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000); 
}