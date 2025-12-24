const mongoose = require('mongoose');

const dbconnect = async () => {
  await mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log(`db is connct this url ${process.env.DB}`);
    })
    .catch(() => {
      console.log(`opps sorry db is notconnect plese try again`);
    });
};

module.exports = dbconnect;
