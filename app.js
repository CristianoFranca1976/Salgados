require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');


app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const items = [
  {
    name: "Coxinha",
    image: "coxinha.jpg",
    descricao: "Massa fresca com frango desfiado, servido frito ou congelado.",
  },
  {
    name: "Bolinha-de-Queijo",
    image: "bolinha-de-queijo.jpg",
    descricao:
      "Massa fresca com recheio de queijo, servido frito ou congelado.",
  },
  {
    name: "Maravilha",
    image: "maravilha.jpg",
    descricao:
      "Massa fresca com presunto e queijo, servido frito ou congelado.",
  },
  {
    name: "Kibe",
    image: "kibe.jpg",
    descricao:
      "Massa fresca com recheio de queijo, servido frito ou congelado.",
  },
  {
    name: "Croquete",
    image: "croquete.jpg",
    descricao: "Massa fresca com recheio de carne, servido frito ou congelado.",
  },
  {
    name: "Empada",
    image: "empada.jpg",
    descricao: "Massa fresca com recheio, servido frito ou congelado.",
  },
  {
    name: "Esfira",
    image: "esfira.jpg",
    descricao: "Massa fresca com frango desfiado, servido frito ou congelado.",
  },
  {
    name: "Risole",
    image: "risole.jpg",
    descricao: "Massa fresca com recheio de carne, servido frito ou congelado.",
  },
  {
    name: "Pao-de-queijo",
    image: "pao-de-queijo.jpg",
    descricao: "Massa de povilio azedo e doce, servido frito ou congelado.",
  },
];

const basket = [];

app.get("/", (req, res) => {
  res.status(200).render("home", { title: "Paty Salgado home page", items: items, basket: basket, favicon: 'homeFavicon.png'});
});

app.get("/inputs", (req, res) => {
  const itemName = req.query.itemName;
  const item = items.find((i) => i.name === itemName);

  if (item) {
    res.status(200).render("inputs", {
      title: "inputs",
      itemName: item.name,
      itemImage: item.image,
      itemDescricao: item.descricao,
      errorMessage: "",
      favicon: 'inputFavicon.png'
    });
  } else {
    res.status(404).render("404", { title: "Page Not Found" });
  }
});
app.post("/add-to-basket", (req, res) => {
  const {
    itemName,
    itemImage,
    itemDescricao,
    tipo,
    tamanho,
    quantidade,
    entrega,
    total
  } = req.body;

  if (tipo && tamanho && quantidade && entrega) {
    const item = {
      name: itemName,
      image: itemImage,
      descricao: itemDescricao,
      tipo: tipo,
      tamanho: tamanho,
      quantidade: quantidade,
      entrega: entrega,
      total: total
    };
    basket.push(item);
    res.redirect("/basket");
  } else {
    const item = items.find((i) => i.name === itemName);
    res.status(200).render("inputs", {
      title: "inputs",
      itemName: item.name,
      itemImage: item.image,
      itemDescricao: item.descricao,
      errorMessage: "Por favor, preencha todos os dados",
    });
  }
});

app.delete("/delete-item/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < basket.length) {
    basket.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

app.post('/emailForm', (req, res) => { 
  console.log(req.body.basket.length);
  res.status(200).redirect('/');
});

app.get("/basket", (req, res) => {
  res.status(200).render("basket", { title: "Basket", basket: basket, favicon: 'basketFavicon.png' });
});

app.use((req, res, next) => {
  res.status(404).render("404", { title: "Page Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { title: "Internal Server Error" });
});

const port = 3087;

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`The server is running port: http://localhost:${port}`);
});


