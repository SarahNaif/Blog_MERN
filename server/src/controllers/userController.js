import User from "../models/User.js"


const registerUser = async (req, res, next) => {
    try {
      const newUser = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    };
      newUser.email = newUser.email.toLowerCase();
      // check whether the user exists or not
      let user = await User.findOne({ email:newUser.email });
  
      if (user) {
        throw new Error("User have already registered");
      }
  
      // creating a new user
      user = await User.create(newUser);
  
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });

    } catch (error) {
      next(error);
    }
  };


const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      let user = await User.findOne({ email });
  
      if (!user) {
        throw new Error("Email not found");
      }
  
      if (await user.comparePassword(password)) {
        return res.status(201).json({
          msg: "successfully logged in ",
          _id: user._id,
          avatar: user.avatar,
          name: user.name,
          email: user.email,
          verified: user.verified,
          admin: user.admin,
          token: await user.generateJWT(),
        });
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      next(error);
    }
  };




  export {registerUser ,
    loginUser,
  };