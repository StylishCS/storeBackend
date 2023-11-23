const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function loginController(req, res) {
  //console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("user not found");
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).send("wrong username or password");
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );
    const userWithoutPassword = { ...user };
    delete userWithoutPassword._doc.password;
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
      })
      .json({ user: userWithoutPassword._doc, token: token });
    // return res
    //   .status(200)
    //   .cookie("token", token)
    //   .json({ user: userWithoutPassword._doc, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).send("INTERNAL SERVER ERROR");
  }
}

async function currentUser(req, res) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json("no token provided");
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, decoded) => {
      if (err) throw error;
      const token = jwt.sign(
        { _id: decoded._id, email: decoded.email },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.JWT_EXPIRATION,
        }
      );
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV == "production",
        })
        .json(decoded);
    });
  } catch (error) {
    return res.status(500).send("INTERNAL SERVER ERROR");
  }
}

async function logout(req, res) {
  try {
    res
      .cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json("logged out");
  } catch (error) {
    return res.status(500).send("INTERNAL SERVER ERROR");
  }
}

module.exports = { loginController, currentUser, logout };
