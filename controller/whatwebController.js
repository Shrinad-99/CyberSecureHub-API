const util = require("util");
const { exec } = require("child_process");

const execAsync = util.promisify(exec);

const info = async (req, res) => {
  const url = req.params.url;
  try {
    const { stdout, stderr } = await execAsync(`whatweb ${url}`);
    res.send(stdout);
  } catch (error) {
    res.status(500).send(`Error: ${error.message}`);
  }
};

module.exports = {
  info,
};
