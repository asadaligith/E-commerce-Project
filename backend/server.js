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


app.post('/add-product', (req , resp)=>{
    const {name, price} = req.body;

    const newProduct = {id: products.length + 1, name, price};
    products.push(newProduct);
    resp.status(201).json({product: newProduct});
});

app.put('/products/:id', (req , resp)=>{
    const productId = Number(req.params.id);
    
    console.log(req.body.id);
    console.log(req.body.name);
    console.log(req.body.price);

    const product = products.find((product)=> product.id === productId);

    if (!product){
        return resp.status(404).json({message: "Product not found"});
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;

    resp.json({product: product});
})

app.delete('/products/:id', (req, resp)=>{
    const productId = Number(req.params.id);
    const product = products.find((product)=> product.id === productId);

    if (!product){
        return resp.status(404).json({message: "Product not found"});
    }

    products = products.filter((product)=> product.id !== productId);
    resp.json({message: "Product deleted successfully"});

})


app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})
