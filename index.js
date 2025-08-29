const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const supermarketItems = [
    // Fruit category
    {
      name: "Apple",
      category: "Fruit",
      quantity: 10,
      price: 0.5
    },
    {
      name: "Banana",
      category: "Fruit",
      quantity: 15,
      price: 0.3
    },
    {
      name: "Orange",
      category: "Fruit",
      quantity: 12,
      price: 0.6
    },
    // Dairy category
    {
      name: "Milk",
      category: "Dairy",
      quantity: 5,
      price: 1.2
    },
    {
      name: "Cheddar Cheese",
      category: "Dairy",
      quantity: 4,
      price: 3.8
    },
    {
      name: "Yogurt",
      category: "Dairy",
      quantity: 8,
      price: 0.9
    },
    // Confectionary category
    {
      name: "Bread",
      category: "Confectionary",
      quantity: 3,
      price: 2.5
    },
    {
      name: "Croissant",
      category: "Confectionary",
      quantity: 7,
      price: 1.5
    },
    {
      name: "Bagel",
      category: "Confectionary",
      quantity: 6,
      price: 1.0
    },
    // Vegetable category
    {
      name: "Broccoli",
      category: "Vegetable",
      quantity: 7,
      price: 1.3
    },
    {
      name: "Carrot",
      category: "Vegetable",
      quantity: 9,
      price: 0.8
    },
    {
      name: "Spinach",
      category: "Vegetable",
      quantity: 5,
      price: 1.5
    }
  ];

// Names array
const names = [
  'åAnna', 'Anna', 'Brittany', 'Cinderella', 'Diana', 'Eva', 'Fiona', 'Gunda',
  'Hege', 'Inga', 'Johanna', 'Kitty', 'Linda', 'Ophelia', 'Petunia', 'Amanda',
  'Raquel', 'Cindy', 'Doris', 'Eve', 'Evita', 'Ståle', 'Sunniva', 'Tove',
  'Unni', 'Violet', 'Liza', 'Elizabeth', 'Ellen', 'Wenche', 'Vicky'
];

// Static data arrays
const customers = [
  { name: "Jack", age: 30, city: "London" },
  { name: "Mary", age: 24, city: "Paris" },
  { name: "Dan", age: 18, city: "Prague" },
  { name: "Olav", age: 32, city: "Moscow" },
  { name: "Billie", age: 43, city: "Barcelona" },
];

const products = [
  { name: "iPhone", price: 2049 },
  { name: "Samsung", price: 1699 },
  { name: "Huawei", price: 1499 },
  { name: "Oppo", price: 1199 },
  { name: "LG", price: 1299 },
];

const suppliers = [
  { name: "Bane", age: 35, city: "Tokyo" },
  { name: "Joker", age: 44, city: "Seoul" },
  { name: "Penguin", age: 28, city: "KL" },
  { name: "Dent", age: 38, city: "Singapore" },
  { name: "Fish", age: 40, city: "Jakarta" },
];
const app = express();
app.use(express.static(path.join(__dirname, 'public'))); // Serve frontend
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Server is up');
});

// Endpoint to handle query
app.get('/suggest', (req, res) => {
  console.log("suggest endpoint called")
  const query = req.query.query || '';
  let hint = '';

  if (query !== '') {
    const qLower = query.toLowerCase();
    const len = qLower.length;

    const suggestions = names.filter(name =>
      name.toLowerCase().startsWith(qLower)
    );

    hint = suggestions.join(', ');
  }

  res.send(hint === '' ? 'no suggestion' : hint);
});

app.get('/data', (req, res) => {
  const type = req.query.type;
  const limit = parseInt(req.query.limit) || 1;

  let dataset = [];

  if (type === 'customers') {
    dataset = customers.slice(0, limit);
  } else if (type === 'products') {
    dataset = products.slice(0, limit);
  } else if (type === 'suppliers') {
    dataset = suppliers.slice(0, limit);
  }

  return res.json({
    type: type,
    records: dataset,
  });
});

app.get('/categories', (req, res) => {
    const categories = [...new Set(supermarketItems.map(item => item.category))];
    if (categories && categories.length > 0) {
        return res.json(categories);
    } else {
        return res.status(404).send('Categories not found');
    }
});

app.get('/items', (req, res) => {
    let selCategory = 0;
    if (req.query.category) {
        selCategory = req.query.category;    
        const items = supermarketItems.filter(g => g.category.toLowerCase() == selCategory.toLowerCase());
        if (items && items.length>0) {
            return res.json(items);
        } else {
            return res.status(404).send('Items not found');
        }
    }
    res.json(supermarketItems);
});
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});