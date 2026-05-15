const express = require('express');
const productsData = require('./products.json');
const cors = require('cors');
const {config} = require('dotenv');
const app = express();
app.use(express.json());
app.use(cors());

config();
const port = process.env.PORT || 4000;
const products = productsData.products;

app.get('/',(req , resp)=>{
    resp.send("Hello; this is my first api creation")
})

app.get('/products',(req , resp)=>{
    resp.json({products:products})
})


app.post('/products', (req , resp)=>{
    try {
        const {name, price, category} = req.body;

        // Validation
        if (!name || !price) {
            return resp.status(400).json({message: "Name and price are required"});
        }
        if (price < 0) {
            return resp.status(400).json({message: "Price cannot be negative"});
        }

        const newProduct = {id: products.length + 1, name, price, category: category || "Uncategorized"};
        products.push(newProduct);
        resp.status(201).json({product: newProduct});
    } catch (error) {
        resp.status(500).json({message: "Error adding product", error: error.message});
    }
});

app.put('/products/:id', (req , resp)=>{
    try {
        const productId = Number(req.params.id);
        
        const product = products.find((product)=> product.id === productId);

        if (!product){
            return resp.status(404).json({message: "Product not found"});
        }

        // Validation
        if (req.body.price && req.body.price < 0) {
            return resp.status(400).json({message: "Price cannot be negative"});
        }

        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.category = req.body.category || product.category;

        resp.json({product: product});
    } catch (error) {
        resp.status(500).json({message: "Error updating product", error: error.message});
    }
})

app.delete('/products/:id', (req, resp)=>{
    try {
        const productId = Number(req.params.id);
        const productIndex = products.findIndex((product)=> product.id === productId);

        if (productIndex === -1){
            return resp.status(404).json({message: "Product not found"});
        }

        const deletedProduct = products.splice(productIndex, 1);
        resp.json({message: "Product deleted successfully", product: deletedProduct[0]});
    } catch (error) {
        resp.status(500).json({message: "Error deleting product", error: error.message});
    }
})


app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})
