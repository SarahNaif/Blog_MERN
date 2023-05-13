import User from "../models/User.js";
import uploadPicture from "../middlewares/uploadPictureMiddleware.js";
import fileRemover from "../utils/fileRemover.js";
import { DOMAIN, WEBSITE_NAME } from "../constants/index.js";
import sendMail from "../utils/emailSender.js";

const registerUser = async (req, res, next) => {
  try {
    const newUser = {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    };
    newUser.email = newUser.email.toLowerCase();
    let user = await User.findOne({ email: newUser.email });

    if (user) {
      throw new Error("User have already registered");
    }

    user = await User.create(newUser);

    return res.status(201).json({
      msg: "successfully registered",
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

const forgetPass = async (req, res, next) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User with this email is not found.",
      });
    }
    user.generatePasswordReset();
    await user.save();
  
    let html = `
    <h1>Hello, ${user.name}</h1>
    <p>Please click the following link to reset your account's password</p>
    <p>if this password reset request is not created by you then you can ignore this email.</p>
    <a href="${DOMAIN}/user/reset-password/${user.resetPasswordToken}">Reset Password Now</a>
`;
    sendMail(
      user.email,
      `${WEBSITE_NAME}`,
      "Reset Password",
      "Please Reset Your Password.",
      html
    );
    return res.status(200).json({
      success: true,
      message: "Pasword reset link is sent to your email.",
    });
  } catch (error) {
    next(error);
  }
};

const resetPass = async (req, res, next) => {
  try {
    let { token } = req.params;
    let user = await User.findOne({
      resetPasswordToken:token ,
      resetPasswordExpiresIn: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Passwod reset token is invalid or has expired.",
      });
    }
    if (user.resetPasswordToken !== token) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.',
      });

    }
    if (moment(user.resetPasswordToken).diff(moment(), 'minutes') < 0) {
      return res.status(401).json({
        success: false,
        message: 'Token is expired.',
      });

    }
    return res.redirect(`${DOMAIN}/user/reset-password/${user.resetPasswordToken}`).status(200)
  } catch (error) {
    next(error)
  }
};

const postResetPass = async (req, res, next) => {
  try {
    let { password} = req.body;
    let {resetPasswordToken} = req.params;
    let user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpiresIn: { $gt: Date.now() },
    });
    if (!user) {
      
      return res.status(401).json({
        success: false,
        message: "Passwod reset token is invalid or has expired. post",
      });
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresIn = undefined;
    await user.save();
    // Send notification about the password reset successful process
    let html = `
        <h1>Hello, ${user.name}</h1>
        <p>Your password is resetted successfully</p>
        <p>if this reset is not done by you then you can contact our team.</p>
    `;
    sendMail(
      user.email,
      `${WEBSITE_NAME}`,
      "Reset Password Successful",
      "Your password is changed.",
      html
    );
    // Send successful response
    return res.status(200).json({
      success: true,
      message:
        "Your password reset request is complete and your password is resetted successfully. Login into your account with new password.",
    });
  } catch (error) {
    next(error)
  }
};






const userProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);

    if (user) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        admin: user.admin,
      });
    } else {
      let error = new Error("User not found");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);

    if (!user) {
      throw new Error("User not found");
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password && req.body.password.length < 6) {
      throw new Error("Password length must be at least 6 character");
    } else if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUserProfile = await user.save();

    res.json({
      msg: "Profile Updated",
      _id: updatedUserProfile._id,
      avatar: updatedUserProfile.avatar,
      name: updatedUserProfile.name,
      email: updatedUserProfile.email,
      verified: updatedUserProfile.verified,
      admin: updatedUserProfile.admin,
      token: await updatedUserProfile.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const updateProfilePicture = async (req, res, next) => {
  try {
    const upload = uploadPicture.single("profilePicture");

    upload(req, res, async function (err) {
      if (err) {
        const error = new Error(
          "An unknown error occured when uploading " + err.message
        );
        next(error);
      } else {
        if (req.file) {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          if (filename) {
            fileRemover(filename);
          }
          updatedUser.avatar = req.file.filename;
          await updatedUser.save();
          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        } else {
          let filename;
          let updatedUser = await User.findById(req.user._id);
          filename = updatedUser.avatar;
          updatedUser.avatar = "";
          await updatedUser.save();
          fileRemover(filename);

          res.json({
            _id: updatedUser._id,
            avatar: updatedUser.avatar,
            name: updatedUser.name,
            email: updatedUser.email,
            verified: updatedUser.verified,
            admin: updatedUser.admin,
            token: await updatedUser.generateJWT(),
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  updateProfilePicture,
  forgetPass,
  resetPass,
  postResetPass
};
