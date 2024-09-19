import mercury from "@mercury-js/core";
export const User = mercury.createModel("User", {
  firstName: {
    type: "string",
    require: true,
    unique:true
  },
  lastName: {
    type: "string",
    required: true,
    unique:true
  },
  userName: {
    type: "string",
    required: true,
    unique: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  password: {
    type: "string",
    bcrypt: true,
  },
  role: {
    type: "enum",
    enumType: "string",
    enum: ["USER"],
  },
  status: {
    type: "enum",
    enumType: "string",
    enum: ["ACTIVE", "IN_ACTIVE"],
    default: "IN_ACTIVE",
  },
  otpExpiry: {
    type: "date",
    required: false
  },
  otp:{
    type:"string",
    require:true
  },
  
});