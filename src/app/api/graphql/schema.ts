const typeDefs = `
  type Query {
    hello(name: String): String,
  }
  type Mutation{
   signUp(signUpData: signUpData) : signUpResponse
    signin(email:String,password:String):signinResponse

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