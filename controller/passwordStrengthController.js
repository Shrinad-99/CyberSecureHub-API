const zxcvbn = require("zxcvbn");

const check = (req, res) => {
  const { password } = req.body;

  // Use zxcvbn to assess password strength
  const result = zxcvbn(password);

  const strength = result.score; // A score from 0 to 4 (0 being weak, 4 being strong)
  const crackTime =
    result.crack_times_display.offline_slow_hashing_1e4_per_second; // Time to crack in various formats

  res.json({
    strength,
    crackTime,
  });
};

module.exports = {
  check,
};
