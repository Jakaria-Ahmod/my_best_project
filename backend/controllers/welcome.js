const welcome = (req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
};

module.exports = welcome;
