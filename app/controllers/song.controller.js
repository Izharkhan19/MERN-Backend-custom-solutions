const Song = require("../models/song.modal");

// Create Save New record.
exports.create = (req, res) => {
  // For Specific field validate :
  if (!req.body.filelink) {
    return res.status(400).send({
      message: "Must Required" + req.body.filelink,
    });
  }

  const song = new Song({
    yourName: req.body.yourName,
    fileTitle: req.body.fileTitle,
    filelink: req.body.filelink,
  });

  song
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
  Song.find()
    .then((songs) => {
      res.send(songs);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// // Find a single user with a userId
// exports.findOne = (req, res) => {
//   User.findById(req.params.userId)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({
//           message: "Note not Found" + req.params.userId,
//         });
//       } else {
//         res.send(user);
//       }
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "Note not found with" + req.params.userId,
//         });
//       }
//       return res.status(500).send({
//         message: "Error retriving user with if" + req.params.userId,
//       });
//     });
// };

// exports.update = (req, res) => {
//   if (!req.body.name) {
//     return res.status(400).send({
//       message: "User cant be empty.",
//     });
//   }
//   User.findByIdAndUpdate(
//     req.params.userId,
//     {
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       address1: req.body.address1,
//       address2: req.body.address2,
//       city: req.body.city,
//       state: req.body.state,
//       zip: req.body.zip,
//     },
//     { new: true }
//   )
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({
//           message: "Note not found" + req.params.userId,
//         });
//       }
//       res.send(user);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "User Not found" + req.params.userId,
//         });
//       }
//       return res.status(500).send({
//         message: "Error Updation Note with id :" + req.params.userId,
//       });
//     });
// };

exports.delete = (req, res) => {
  Song.findByIdAndRemove(req.params.songId)
    .then((song) => {
      if (!song) {
        return res.status(404).send({
          message: "Song not Found" + req.params.songId,
        });
      }
      res.send({
        message: "Song Deleted Successfully",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Song Not Found" + res.params.songId,
        });
      }
      return res.status(500).send({
        message: "Could nt delete this Song with id :" + req.params.songId,
      });
    });
};
