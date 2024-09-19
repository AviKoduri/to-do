const typeDefs = `
  type Query {
    hello(name: String): String,
  }
  type Mutation{
  login(userName:String,password:String):String
    
  }

`;
export default typeDefs;