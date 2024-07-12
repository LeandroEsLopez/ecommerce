const User = require('./userModel');
const bcrypt = require('bcrypt');

const registerUser = async (userData) => {
  const { name, email, password, role } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role
  });

  await newUser.save();
  return newUser;
};

const loginUser = async (userData) => {
  const { email, password } = userData;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Incorrect password');
  }

  // En este ejemplo, no se genera ni devuelve un token JWT
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    message: 'Login successful'
  };
};

module.exports = {
  registerUser,
  loginUser
};
