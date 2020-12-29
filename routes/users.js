const express = require('express');
const router = express.Router()
const User = require('../models/User');
const JWT = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const checkAuth = require('../middleware/auth')
const checkAdmin = require ('../middleware/Admin')
//GET /users

router.get('/',checkAdmin,  async (req, res) => {
  try {
    const user = await User.findAll();
    console.log('Conseguir usuarios')
    res.status(200).json({ user });

  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//POST users/login
router.post('/login', async (req, res) => {
  const email = req.body.email
  try {

    const user = await User.findOne({
      where: {
        email: email
      }
    });
    if (user.lenght > 1) {
      res.status(401).json({ message: ' No autorizado ' });

    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) { res.status(401).json({ message: ' No autorizado ' }) }
        else {
          let token = JWT.sign({
            email: email,
          }, process.env.SECRET, { expiresIn: '1h' })
          res.cookie("token", token, { httpOnly: true });
          res.cookie("id", user.id ,{httpOnly: true} )
          res.status(200).json({ message: user, token })
        }
      })
    }
  } catch (err) {
    res.status(400).json({ error: "El usuario o la contraseña son incorrectos" });
  }
});

// POST user/register

router.post('/register' ,async (req, res) => {
  const data = req.body;
  let {
    username,
    firstname,
    lastname,
    email,
    phone,
    address,
    password
  } = data;

  try {
    const usernameAlreadyRegistered = await User.findAll({
      where: { username },
    });
    const emailAlreadyRegistered = await User.findAll({ where: { email } });
     
    if (usernameAlreadyRegistered.length) {
      res
        .status(409)
        .json({ message: `Nombre de usuario en uso, por favor elija otro` });
    } else if (emailAlreadyRegistered.length) {
      res.status(409).json({
        message: `El email está vinculado con una cuenta`,
      });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          const newUser = await User.create({
            username,
            firstname,
            lastname,
            email,
            phone,
            address,
            password: hash
          });
          res.status(200).json({ message: '¡Usuario creado con éxito!' });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "faltan campos o se produjo un error" });
  }
});
//POST DELETE

router.delete('/delete', async (req, res) => {
  try{
  const data = req.body.email;
    const removedUser = await User.destroy({ where: { email: data} });
    if (!removedUser) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.status(200).json({ message: 'Usuario eliminado!' });
    }}catch(err){
    res.status(500).json({ message: "Error al eliminar" });
  }
});
module.exports = router;