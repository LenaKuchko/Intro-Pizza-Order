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
