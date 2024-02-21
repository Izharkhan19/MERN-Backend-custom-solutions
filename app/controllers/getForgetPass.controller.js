const sendConfirmationEmail = require("../Common/SendEmail");
const registeruserModel = require("../models/registeruser.model");

const getUserForgetPass = async (req, res) => {
  // Get all registered user
  // Find user by Email ID
  // Send email for password
  const { email } = req.body;
  try {
    let user = await registeruserModel.find();

    if (!user.length) {
      return res.status(404).json({ message: "No user's found...!" });
    }
    const regUser = user.filter((mail) => {
      return mail.email === email;
    });
    if (!regUser.length) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "No register user found...!" });
    }
    // const { userName, email, password } = regUser[0];
    sendConfirmationEmail(
      regUser[0].email,
      regUser[0].userName,
      regUser[0].password,
      ""
    );
    // res.status(200).json(regUser[0]);
    res.status(200).json({
      statusCode: 200,
      message: "Registered user details sent successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong.", error });
  }
};

module.exports = getUserForgetPass;
