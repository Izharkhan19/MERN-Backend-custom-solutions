const User = require("../models/user.modal");

// Create Save New record.
exports.create = (req, res) => {
  // For Specific field validate :
  if (!req.body.name) {
    return res.status(400).send({
      message: "",
    });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address1: req.body.address1,
    address1: req.body.address1,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
  });

  user
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

// Filter function
// const applyFilters = (data, filters) => {
//   if (!filters) {
//     return data;
//   }
//   return data.filter((item) => {
//     let isValid = true;
//     for (let key in filters) {
//       if (item[key] !== filters[key]) {
//         isValid = false;
//         break;
//       }
//     }
//     return isValid;
//   });
// };

const applyFilters = (data, filters) => {
  let filteredData = data;

  // Include searching logic
  if (filters.search) {
    const searchValue = filters.search.toLowerCase();
    filteredData = filteredData.filter((item) => {
      // Modify this condition based on your search criteria
      return (
        item.name.toLowerCase().includes(searchValue) ||
        item.email.toLowerCase().includes(searchValue) ||
        item.city.toLowerCase().includes(searchValue)
        // Add more fields as needed for searching
      );
    });
  }

  // Return the filtered data
  return filteredData;
};

// Sort function
const applySort = (data, sortBy, sortOrder) => {
  if (!sortBy) {
    return data;
  }

  data.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (a[sortBy] > b[sortBy]) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  return data;
};

// Pagination function
const applyPagination = (data, page, limit) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  return data.slice(startIndex, endIndex);
};

exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      // console.log("first", req, users);
      const { filters, sortBy, sortOrder, page, limit } = req.query;
      // console.log("Data Attr", filters, sortBy, sortOrder, page, limit);
      let parsedFilters = {};
      if (filters) {
        try {
          parsedFilters = JSON.parse(filters);
        } catch (error) {
          console.error("Invalid JSON format for filters:", error);
          res.status(400).json({ error: "Invalid JSON format for filters" });
          return;
        }
      }

      let filteredData = applyFilters(users, parsedFilters);
      filteredData = applySort(filteredData, sortBy, sortOrder);
      filteredData = applyPagination(
        filteredData,
        parseInt(page),
        parseInt(limit)
      );
      let dinalData = filteredData;
      res.send(dinalData);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "Note not Found" + req.params.userId,
        });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with" + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error retriving user with if" + req.params.userId,
      });
    });
};

exports.update = (req, res) => {
  if (!req.body.name) {
    return res.status(400).send({
      message: "User cant be empty.",
    });
  }
  User.findByIdAndUpdate(
    req.params.userId,
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "Note not found" + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User Not found" + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Error Updation Note with id :" + req.params.userId,
      });
    });
};

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not Found" + req.params.userId,
        });
      }
      res.send({
        message: "User Deleted Successfully",
      });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User Not Found" + res.params.userId,
        });
      }
      return res.status(500).send({
        message: "Could nt delete this user with id :" + req.params.userId,
      });
    });
};
