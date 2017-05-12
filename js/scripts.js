function Order(customerName) {
  this.customerName = customerName;
  this.orderItems = [];
  this.orderPrice = 0;
};

function Pizza(dough, size) {
  this.size = size;
  this.dough = dough;
  this.basicPrice = 5;
  this.toppings = [];
  this.finalPrice;
};

function Topping(name, price) {
  this.name = name;
  this.price = price;
};

Pizza.prototype.addTopping = function (name, price) {
  var topping = new Topping(name, price);
  this.toppings.push(topping);
};

Pizza.prototype.calculatePizzaPrice = function () {
  this.finalPrice = this.basicPrice;
  for (var i = 0; i < this.toppings.length; i++) {
    this.finalPrice+=this.toppings[i].price;
  }
  if (this.size === "medium") {
    this.finalPrice+=1;
  } else if (this.size === "large") {
    this.finalPrice+=3;
  } else if (this.size === "family") {
    this.finalPrice+=5;
  } else {
    this.finalPrice+=0;
  }

  if (this.dough === "thin") {
    this.finalPrice+=2;
  } else if (this.dough === "original") {
    this.finalPrice+=4;
  } else if (this.dough === "gluten-free") {
    this.finalPrice+=5;
  }
  return this.finalPrice;
};

Pizza.prototype.displayPizza = function () {
  var display = "";
  for (var i = 0; i < this.toppings.length; i++) {
    display+=(this.toppings[i].name + ", ");
  }
  return display;
};

Order.prototype.addOrderItem = function (orderItem) {
  debugger;
  this.orderItems.push(orderItem);
};

Order.prototype.calculateOrderPrice = function () {
     for (var i = 0; i < this.orderItems.length; i++) {
       this.orderPrice+=this.orderItems[i].finalPrice;
     }
  return this.orderPrice;
};

Pizzeria.prototype.addOrder = function (order) {
  this.orders.push(order);
};

$(function () {
  var customer = new Order();

  $("#form-cust-info").submit(function (event) {
    event.preventDefault();
    var name = $("input#cust-name").val();
    var address = $("input#cust-name").val();
    customer = new Order(name);

  });

  $("#form-order").submit(function (event) {
    event.preventDefault();
    console.log(customer);
    var dough = $("#dough").val();
    var size = $("#size").val();
    var pizza = new Pizza(dough, size);

    $("input:checkbox[name=topping]:checked").each(function(){
      var toppingName = ($($(this).siblings()[0]).text());
      var toppingPrice = parseInt($(this).val());
      pizza.addTopping(toppingName, toppingPrice);
      pizza.calculatePizzaPrice();
      customer.addOrderItem(pizza);
      customer.calculateOrderPrice();
    });


    $("ul#review-orders").append("<li><span class='displayOrderItems'>" + pizza.size + "</span></li>");

    $(".displayOrderItems").last().click(function() {
      $("#display-order-info").text("Your order is: " + pizza.size + " " + pizza.dough + " pizza. Ingridients: " + pizza.displayPizza());
    });
  });

});
