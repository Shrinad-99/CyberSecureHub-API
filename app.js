const express = require('express')
const {exec} = require('child_process')
const util = require('util');
const zxcvbn = require('zxcvbn');
const app = express()
const port = 3000

const execAsync = util.promisify(exec);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/ping/:host', (req, res) => {
    const host = req.params.host;
  
    // Use the `ping` command to ping the host
    exec(`ping -c 4 ${host}`, (error, stdout, stderr) => {
      if (error) {
        res.status(500).send(`Error: ${error}`);
        return;
      }
      res.send(stdout);
    });
  });

  app.get('/api/nmap/:host', async (req, res) => {
    const host = req.params.host;
  
    try {
      // Use the `nmap` command to scan the host
      const { stdout, stderr } = await execAsync(`nmap ${host}`);
      res.send(stdout);
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });
  
  app.get('/api/nslookup/:host', async (req, res) => {
    const host = req.params.host;
  
    try {
      // Use the `nslookup` command to resolve the host
      const { stdout, stderr } = await execAsync(`c ${host}`);
      res.send(stdout);
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });
  
  app.get('/api/whois/:domain', async (req, res) => {
    const domain = req.params.domain;
  
    try {
      // Use the `whois` command to get information about the domain
      const { stdout, stderr } = await execAsync(`whois ${domain}`);
      res.send(stdout);
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });
  
  app.get('/api/whatweb/:url', async (req, res) => {
    const url = req.params.url;
  
    try {
      // Use the `whatweb` command to gather information about the URL
      const { stdout, stderr } = await execAsync(`whatweb ${url}`);
      res.send(stdout);
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });

  app.post('/api/password-strength', (req, res) => {
    const { password } = req.body;
  
    // Use zxcvbn to assess password strength
    const result = zxcvbn(password);
  
    const strength = result.score; // A score from 0 to 4 (0 being weak, 4 being strong)
    const crackTime = result.crack_times_display.offline_slow_hashing_1e4_per_second; // Time to crack in various formats
  
    res.json({
      strength,
      crackTime,
    });
  });

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})