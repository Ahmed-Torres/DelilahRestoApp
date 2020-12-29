const Product = require('../models/Product');
const express = require('express');
const router = express.Router()
const checkAuth = require('../middleware/auth')
const checkAdmin = require('../middleware/Admin')


//Get ALL PRODUCTS
router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json({ message: products });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})
//POST PRODUCTS ADMIN
router.post("/add", checkAuth, checkAdmin, async (req, res) => {
    try {
        let { name, price } = req.body;
        let newProduct = await Product.create({
            name,
            price,
        });
        res.status(200).json({ message: 'Nuevo producto creado', product: newProduct });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// 
router.post('/find',checkAuth, async (req, res) => {
    try {
        const name  = req.body.name;
        const product = await Product.findOne({
            where: { name: name }
        });
        if (!product) {
            res.status(404).json({ message: 'Producto no encontrado' });
        } else res.status(200).json({ product });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})
router.post('/modify', checkAdmin, async (req, res) => {
    try {
      const name = req.body.name;
       const price = req.body.price;

      const modify = await Product.update(
        { name, price },
        { where: {name:name}}
      );
  
      res.status(200).json({ message: "Precio cambiado exitosamente"});
    } catch (err) {
      res.status(500).json({ error: err });
    }
  })

  router.delete('/delete',checkAdmin, async (req, res) => {
    try {
      const name = req.body.name;
  
      const deletedProduct = await Product.destroy({ where: { name: name} });
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado' });

      } else res.status(200).json({ message: 'Producto borrado' });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
  

module.exports = router;