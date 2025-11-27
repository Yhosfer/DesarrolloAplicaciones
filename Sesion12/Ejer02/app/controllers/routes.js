const express = require('express');
const bodyParser = require('body-parser');
const Product = require('../models/product');
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Crear producto (POST)
router.route('/products').post(async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json({ message: 'Producto registrado con éxito' });
    } catch (error) {
        res.status(500).send('Error en el servicio');
    }
});

// Listar productos (GET)
router.route('/products').get(async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send('Error en el servicio');
    }
});

// Actualizar producto (PUT)
router.route('/products/:id').put(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Producto no encontrado');
        product.name = req.body.name || product.name;
        product.amount = req.body.amount || product.amount;
        product.description = req.body.description || product.description;
        await product.save();
        res.json({ message: 'Producto actualizado con éxito' });
    } catch (error) {
        res.status(500).send('Error al actualizar producto');
    }
});
// Eliminar producto (DELETE)
const mongoose = require('mongoose');

router.route('/products/:id').delete(async (req, res) => {
    try {
        // Convierte el id a ObjectId por si acaso
        const id = new mongoose.Types.ObjectId(req.params.id);
        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) return res.status(404).send('Producto no encontrado');
        res.json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error(error); // Para ver el error en consola
        res.status(500).send('Error al eliminar producto');
    }
});
module.exports = router;
