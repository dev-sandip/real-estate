import User from "../models/user.model.js";
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
      const newUser = new User({ username, name, email, password });
      await newUser.save();
      const omittedUser = omit(newUser._doc, ["password"]);
      res.status(201).json({ message: "User registered", user: omittedUser });
    } catch (error) {
      console.log(error);
    }
  };
}
export default AuthController;
