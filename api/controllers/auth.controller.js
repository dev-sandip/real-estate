import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import omit from "../utils/omit.js";
class AuthController {
  static login = async (req, res) => {
    const data = await User.find();
    const omittedData = data.map((user) => omit(user._doc, ["password"]));
    res.status(200).json({ message: "Login successful", data: omittedData });
  };
  static register = async (req, res) => {
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
      res.status(500).json(error.message);
    }
  };
}
export default AuthController;
