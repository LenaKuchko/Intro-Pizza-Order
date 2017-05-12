
function Pizzeria(name, address) {
  this.name = name;
  this.orders = [];
}

function Order(customerName, price) {
  this.customerName = customerName;
  this.price = price;
  this.orderItems = [];
}

function Pizza(size, dough) {
  this.size = size;
  this.dough = dough;
  this.basePrice = 5;
  this.toppings = [];
}
function Topping(name, price) {
  this.name = name;
  this.price = price;
}

Pizza.prototype.addTopping = function (name, price) {
  var topping = new Topping(name, price);
  this.toppings.push(topping);
};

Pizza.prototype.calculatePrice = function () {
  var pizzaPrice = this.basePrice;
  for (var i = 0; i < this.toppings.length; i++) {
    pizzaPrice+=this.toppings[i].price;
    console.log(this.toppings[i]);
    console.log(pizzaPrice);
  }
  if (this.size === "medium") {
    pizzaPrice+=1;
  } else if (this.size === "large") {
    pizzaPrice+=3;
  } else if (this.size === "family") {
    pizzaPrice+=5;
  } else {
    pizzaPrice+=0;
  }
  
  if (this.dough === "thin") {
    pizzaPrice+=2;
  } else if (this.dough === "original") {
    pizzaPrice+=4;
  } else if (this.dough === "gluten-free") {
    pizzaPrice+=5;
  }
  return pizzaPrice;
};

var pizza = new Pizza (15, 2);

pizza.addTopping("cheese", 2);
pizza.addTopping("qwe", 4);
pizza.addTopping("rty", 6);
pizza.calculatePrice();
