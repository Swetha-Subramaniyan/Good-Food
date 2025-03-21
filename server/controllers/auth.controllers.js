const { generateToken } = require('../utils/jwt');

const googleCallback = (req, res) => {

  const user = req.user;

  const token = generateToken(user);
 
  console.log(user)

  console.log(token)
  
  res.redirect(`${process.env.CLIENT_URL}/?token=${token}`)

  // const redirectUrl = req.query.redirectUrl ;
  // console.log("Redirect URL", redirectUrl)

  // res.redirect(`${process.env.CLIENT_URL}${redirectUrl}?token=${token}`);

  
};

const failure = (req, res) => {
  res.send('Failed...!');
};

module.exports = { googleCallback, failure };


