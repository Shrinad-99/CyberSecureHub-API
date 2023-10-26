const util = require("util");
const { exec } = require("child_process");

const execAsync = util.promisify(exec);

const lookup = async (req, res) => {
  const domain = req.params.domain;
  try {
    const { stdout, stderr } = await execAsync(`whois ${domain}`);
    res.send(stdout);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

module.exports = {
  lookup,
};
