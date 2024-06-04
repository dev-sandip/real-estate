class UserController {
  static getUser = async (req, res) => {
    res.json({ message: "User route" });
  };
}
export default UserController;
