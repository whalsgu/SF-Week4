const fs = require("fs");
const path = "./data/extendedUsers.json";

module.exports = function (req, res) {
  // Validate request body
  if (!req.body.userid || !req.body.username || !req.body.userbirthdate || !req.body.userage) {
    console.error('Missing required fields in request body:', req.body);
    return res.status(400).send('Missing required fields');
  }

  const userObj = {
    userid: req.body.userid,
    username: req.body.username,
    userbirthdate: req.body.userbirthdate,
    userage: req.body.userage
  };

  // Read the existing data
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Error reading file');
    }

    let userArray;
    try {
      userArray = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing JSON data:', parseErr);
      return res.status(500).send('Error parsing JSON data');
    }

    // Find the index of the user to update or add new user
    const index = userArray.findIndex(x => x.username === userObj.username);

    if (index === -1) {
      // Add new user
      userArray.push(userObj);
    } else {
      // Update existing user
      userArray[index] = userObj;
    }

    // Write the updated data back to the file
    fs.writeFile(path, JSON.stringify(userArray, null, 2), "utf8", (writeErr) => {
      if (writeErr) {
        console.error('Error writing file:', writeErr);
        return res.status(500).send('Error writing file');
      }

      // Send success response
      res.status(200).send(userArray);
    });
  });
};
