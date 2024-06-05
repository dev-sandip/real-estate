import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import omit from "../utils/omit.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
class AuthController {
  static signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return res.json(errorHandler(404, "User not found!"));
      }
      const isValidPassword = bcryptjs.compareSync(
        password,
        validUser.password
      );
      if (!isValidPassword) {
        return res.json(errorHandler(400, "Invalid credentials!"));
      }
      const omittedUser = omit(validUser._doc, ["password"]);
      const token = jwt.sign(
        {
          id: validUser._id,
        },
        process.env.JWT_SECRET
      );

      res
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Logged In Successfully!", user: omittedUser });
    } catch (error) {
      next(error);
    }
  };
  static signup = async (req, res, next) => {
    try {
      const { username, name, email, password } = req.body;
      const hashedPassword = await bcryptjs.hashSync(password, 10);
      const newUser = new User({
        username,
        name,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      const omittedUser = omit(newUser._doc, ["password"]);
      res.status(201).json({ message: "User registered", user: omittedUser });
    } catch (error) {
      next(error);
    }
  };
}
export default AuthController;
