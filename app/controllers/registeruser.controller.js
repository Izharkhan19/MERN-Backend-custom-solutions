const sendConfirmationEmail = require("../Common/SendEmail.js");
const RegisterUser = require("../models/registeruser.model.js");

exports.create = async (req, res) => {
  // Validate request

  if (!req.body.userName) {
    return res.status(400).send({
      message: "userName can't be empty",
    });
  }
  if (!req.body.email) {
    return res.status(400).send({
      message: "email can't be empty",
    });
  }
  if (!req.body.password) {
    return res.status(400).send({
      message: "password can't be empty",
    });
  }

  let RegisteredUser = await RegisterUser.find();

  let result = false;
  RegisteredUser.map((itm) => {
    if (itm.email === req.body.email) {
      console.log(itm.email);
      result = true;
    } else {
      console.log(itm.email);
      result = false;
    }
  });

  if (result === false) {
    // Create a User
    const userReg = new RegisterUser({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });

    userReg
      .save()
      .then((data) => {
        // Send Email Confirmation for successfull registration.
        sendConfirmationEmail(
          req.body.email,
          req.body.userName,
          req.body.password,
          "register"
        );
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some thing wrong.",
        });
      });
  } else {
    res.status(409).send({
      message: "This email is already registered.",
    });
  }
};

exports.findAll = (req, res) => {
  RegisterUser.find()
    .then((regUsers) => {
      res.send(regUsers);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.findOne = (req, res) => {
  RegisterUser.findById(req.params.regUserId)
    .then((regUser) => {
      if (!regUser) {
        return res.status(404).send({
          message: "Register User Not found" + req.params.regUserId,
        });
      } else {
        res.send(regUser);
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with" + req.params.regUserId,
        });
      }

      return res.status(500).send({
        message: "Error retriving user with id " + req.params.regUserId,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "Register User cant be empty.",
    });
  }
  RegisterUser.findByIdAndUpdate(
    req.params.regUserId,
    {
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  )
    .then((reguser) => {
      if (!reguser) {
        return res.status(404).send({
          message: "Register User not found" + req.params.regUserId,
        });
      }
      res.send(reguser);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Reguser User Not found" + req.params.regUserId,
        });
      }
      return res.status(500).send({
        message: "Error Updation Reguser user with id :" + req.params.regUserId,
      });
    });
};

exports.delete = (req, res) => {
  RegisterUser.findByIdAndRemove(req.params.regUserId)
    .then((regUser) => {
      if (!regUser) {
        return res.status(404).send({
          message: "User not Found" + req.params.regUserId,
        });
      }
      res.send({
        message: "User Deleted Successfully",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User Not Found" + res.params.regUserId,
        });
      }
      return res.status(500).send({
        message: "Could nt delete this user with id :" + req.params.regUserId,
      });
    });
};
