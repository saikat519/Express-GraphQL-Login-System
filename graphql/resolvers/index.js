const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = { 
users: () => {
    return User.findAll()
    .then((users)=>{
        console.log(users)
        return users;
    })
    .catch(err => console.log(err))
},

createUser: async(args,req) => {
   //if(!req.isAuth){
    //  throw new Error('you are not allowed to access this page')
   //}
    try{
        const existingUser = await User.findOne({where: { email: args.userInput.email } });
        if (existingUser) {
          throw new Error('User exists already.');
        }
              
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
             //console.log(args)
            const user = new User({
                name:args.userInput.name,
                email:args.userInput.email,
                password:hashedPassword
            })
            user.save()
            return user;
        }
            catch(err) {
                console.log(err);
                throw err;
            }

    },

    login: async({ email, password }) => {
        const user = await User.findOne({ where:{ email:email } })
        if(!user){
            throw new Error('User not found with this email')
        }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'somesupersecretkey',
      {
        expiresIn: '1h'
      }
    )
    return { userId: user.id, token: token, tokenExpiration: 1 };
    }


   
}

