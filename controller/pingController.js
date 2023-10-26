const { exec } = require("child_process");

const ping = (req, res) => {
  const host = req.params.host;
  exec(`ping -c 4 ${host}`, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send(`Error: ${error}`);
      return;
    }
    res.send(stdout);
  });
};

module.exports = {
  ping,
};
