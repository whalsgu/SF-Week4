const fs = require('fs');

module.exports = function (req, res) {
  const { username, password } = req.body;
  console.log("Received credentials:", { username, password });

  fs.readFile('./data/users.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading users.json:", err);
      return res.status(500).send({ ok: false, message: "Server error" });
    }

    const users = JSON.parse(data);
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      // Assuming extendedUser.json contains more user info
      fs.readFile('./data/extendedUsers.json', 'utf8', (err, extData) => {
        if (err) {
          console.error("Error reading extendedUsers.json:", err);
          return res.status(500).send({ ok: false, message: "Server error" });
        }

        const extendedUsers = JSON.parse(extData);
        const extendedUser = extendedUsers.find(u => u.username === username);

        if (extendedUser) {
          res.send({
            ok: true,
            userid: extendedUser.userid,
            username: extendedUser.username,
            userbirthdate: extendedUser.userbirthdate,
            userage: extendedUser.userage
          });
        } else {
          res.send({
            ok: true,
            userid: null,
            username: user.username,
            userbirthdate: null,
            userage: null
          });
        }
      });
    } else {
      res.send({ ok: false });
    }
  });
};
