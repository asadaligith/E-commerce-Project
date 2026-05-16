const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());

// CORS configuration for production
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4000', 'https://e-commerce-project-gv8t.vercel.app', 'https://e-commerce-project-seven-mu.vercel.app'],
    credentials: true
}));

// Path to products.json (one directory up from api/)
const productsFilePath = path.join(__dirname, '..', 'products.json');

console.log('Products file path:', productsFilePath);
console.log('File exists:', fs.existsSync(productsFilePath));

// Read products from file
const readProducts = () => {
    try {
        if (!fs.existsSync(productsFilePath)) {
            console.warn('products.json not found, creating default...');
            const defaultProducts = { products: [] };
            fs.writeFileSync(productsFilePath, JSON.stringify(defaultProducts, null, 2), 'utf8');
            return [];
        }
        const data = fs.readFileSync(productsFilePath, 'utf8');
        const parsed = JSON.parse(data);
        return parsed.products || [];
    } catch (error) {
        console.error('Error reading products.json:', error.message);
        return [];
    }
};

// Write products to file
const writeProducts = (products) => {
    try {
        fs.writeFileSync(productsFilePath, JSON.stringify({products}, null, 2), 'utf8');
        console.log('Products saved successfully');
    } catch (error) {
        console.error('Error writing products.json:', error.message);
    }
};

// Initialize products from file
let products = readProducts();

app.get('/', (req, resp) => {
    resp.send("Hello; this is my first api creation")
})

app.get('/products', (req, resp) => {
    // Always read fresh data from file
    products = readProducts();
    resp.json({products: products})
})

app.post('/products', (req, resp) => {
    try {
        const {name, price, category} = req.body;

        // Validation
        if (!name || !price) {
            return resp.status(400).json({message: "Name and price are required"});
        }
        if (price < 0) {
            return resp.status(400).json({message: "Price cannot be negative"});
        }

        // Read fresh data
        products = readProducts();
        const newProduct = {id: Math.max(...products.map(p => p.id), 0) + 1, name, price, category: category || "Uncategorized"};
        products.push(newProduct);
        
        // Persist to file
        writeProducts(products);
        
        resp.status(201).json({product: newProduct});
    } catch (error) {
        resp.status(500).json({message: "Error adding product", error: error.message});
    }
});

app.put('/products/:id', (req, resp) => {
    try {
        const productId = Number(req.params.id);
        
        // Read fresh data
        products = readProducts();
        const product = products.find((product) => product.id === productId);

        if (!product) {
            return resp.status(404).json({message: "Product not found"});
        }

        // Validation
        if (req.body.price && req.body.price < 0) {
            return resp.status(400).json({message: "Price cannot be negative"});
        }

        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.category = req.body.category || product.category;

        // Persist to file
        writeProducts(products);
        
        resp.json({product: product});
    } catch (error) {
        resp.status(500).json({message: "Error updating product", error: error.message});
    }
})

app.delete('/products/:id', (req, resp) => {
    try {
        const productId = Number(req.params.id);
        
        // Read fresh data
        products = readProducts();
        const productIndex = products.findIndex((product) => product.id === productId);

        if (productIndex === -1) {
            return resp.status(404).json({message: "Product not found"});
        }

        const deletedProduct = products.splice(productIndex, 1);
        
        // Persist to file
        writeProducts(products);
        
        resp.json({message: "Product deleted successfully", product: deletedProduct[0]});
    } catch (error) {
        resp.status(500).json({message: "Error deleting product", error: error.message});
    }
})

module.exports = app;
