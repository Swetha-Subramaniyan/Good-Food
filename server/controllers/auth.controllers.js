const { generateToken } = require('../utils/jwt');

const googleCallback = (req, res) => {

  const user = req.user;
  const role = req.user.role;

  const token = generateToken(user);
 
  console.log(user)

  console.log(token)

  res.redirect(`${process.env.CLIENT_URL}/?token=${token}&role=${role}`)

};

const failure = (req, res) => {
  res.send('Failed...!');
};

module.exports = { googleCallback, failure };


