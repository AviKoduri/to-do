const typeDefs = `
  type Query {
    hello(name: String): String,
  }
  type Mutation{
   signUp(signUpData: signUpData) : signUpResponse
    signin(email:String,password:String):signinResponse
    verifyOtp(email : String , otp : String) : verifyResponse
    ForgetPassword(email:String) : response
    resetPassword(email:String , password:String) : result
    resendOtp(email:String) : response
  }
  
type result {
  msg:String
}

type verifyResponse {
msg : String,
id : String
}
type response{
  otp:String
  email:String
  msg:String
}
type signinResponse{
    msg:String
   user:User
    token:String
}
input signUpData {
  firstName: String
  lastName: String
  userName: String
  email: String
  isVerified : Boolean
  password : String
  role : RoleType
}
enum RoleType {
  USER
}
type signUpResponse{
  id:String
  msg:String
  otp:String
}
`;
export default typeDefs;