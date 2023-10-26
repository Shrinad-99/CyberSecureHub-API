const util = require("util");
const { exec } = require("child_process");

const execAsync = util.promisify(exec);

const scan = async (req, res) => {
  const host = req.params.host;
  try {
    const { stdout, stderr } = await execAsync(`nmap ${host}`);
    res.send(stdout);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

module.exports = {
  scan,
};
