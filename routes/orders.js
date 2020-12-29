const express = require('express');
const router = express.Router()
const Order = require('../models/Order');
const Product = require('../models/Product');
const OrderProduct = require('../models/OrderProduct');
const checkAuth = require("../middleware/auth")
const checkAdmin = require('../middleware/Admin');


//handle incoming GET request /orders
router.get('/', checkAuth, checkAdmin, async (req, res) => {
  try {
    let orders = await Order.findAll({});
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

function getTotal(prices) {
  return prices.reduce((a, b) => a + b, 0);
}
// POST /ADD NEW ORDERS
router.post('/add', checkAuth, async (req, res) => {
  try {
    const productsArray = req.body.data;
    const pricesArray = [];


    for (let i = 0; i < productsArray.length; i++) {
      const product = productsArray[i];
      const { product_id, product_quantity } = product;
      const productDetails = await Product.findOne({
        where: { id: product_id },
      });
      if (!productDetails) {
        return res.status(404).json({ message: `Producto #${product_id} no encontrado, por favor escoje otro` })
      }
      //Gets the total amount for each product
      const totalProductAmount = productDetails.price * product_quantity;
      //and adds it to the array
      pricesArray.push(totalProductAmount);
    }
    pricesArray.forEach((price) => console.log(price));


    //Calculates the total amount including all products
    const total = getTotal(pricesArray);
    const { payment_method } = req.body;

    let descriptionArray = [];
    //Loops through the products array to get order description

    for (let i = 0; i < productsArray.length; i++) {
      const product = productsArray[i];
      const { product_id, product_quantity } = product;
      const productDetails = await Product.findOne({
        where: { id: product_id },
      });
      let formattedDescription = `${product_quantity} x ${productDetails.name}`;
      descriptionArray.push(formattedDescription);
    }

    console.log(descriptionArray);
    const id = req.cookies['id']
    const newOrder = await Order.create({
      total,
      user_id: id,
      payment_method,
      description: descriptionArray.join(' '),
    });
    const orderId = newOrder.id
    
    // Loops the products array to create orderproduct table
    for (let i = 0; i < productsArray.length; i++) {
      let product = productsArray[i];
      const { product_id, product_quantity } = product;
        let newOrderProduct = await OrderProduct.create({
          orderId: orderId,
          productId : product_id,
          product_quantity: product_quantity,
        })
      };
    res.status(200).json({ message: 'Orden creada exitosamente!!', newOrder, orderId
      });
  } catch (err) {
    res.status(500).json({ error: err })
  }
})


//PATCH  /update/id
router.patch('/update/:id', checkAuth, checkAdmin, async (req, res) => {
  try {
    const { status} = req.body;
    const id = req.params.id;
    let orderChange = await Order.update(
      { status },
      { where: { id: id } }
    );

    if (!orderChange[0]) {
      return res.status(404).json({ message: 'Orden no encontrada, por favor vuelve a intentar!' });
    } else
      res.status(200).json({ message: 'La orden ha sido modificada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
})
// DELETE  /delete/id
router.delete('/delete/:orderId',checkAuth, checkAdmin, async (req, res,)=>{
  try {
    const { orderId } = req.params;
    let deletedOrder = await Order.update({status: "Cancelada"},{ where: { id: orderId } });
    console.log(deletedOrder)

    if (!deletedOrder[0]) {
      return res.status(404).json({ message: 'Orden no encontrada, por favor vuelve a intentar!' });
    } else
      res.status(200).json({ message: 'La orden ha sido cancelada' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

module.exports = router;