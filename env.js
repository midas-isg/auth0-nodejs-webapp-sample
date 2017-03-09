var env = {
  AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
  AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL || 'http://localhost:3000/callback',
  MIDAS_ACCOUNTS_URL: process.env.MIDAS_ACCOUNTS_URL || 'https://betaweb.rods.pitt.edu/hub-alpha',
  TITLE: process.env.TITLE || 'Node.js'
};


module.exports = env;
