const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Person = require('./models/person');

passport.use(new LocalStrategy(async (USERNAME ,password ,done)=>{
    //authentication 
    try{
      console.log('Recienved credits:', USERNAME ,password);
      const user = await Person.findOne({username: USERNAME});
      if(!user)
        return done(null ,false ,{message: 'Incorrect username.'});
  
      const isPasswordMatch = user.password === password ? true : false;
      if(isPasswordMatch){
        return done(null ,user)
      }else{
        return done(null ,false ,{message: 'Incorrect Password.'});
      }
    }catch(err){
      return done(err);
    }
  }))

  module.exports = passport;