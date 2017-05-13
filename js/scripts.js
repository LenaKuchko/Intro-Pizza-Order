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
  debugger;
  return  this.orderPrice+=this.orderItems[this.orderItems.length-1].finalPrice;
};

function initMap() {
  //  debugger;

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: -34.397, lng: 150.644},
    mapTypeId: 'terrain'
  });
  marker = new google.maps.Marker({
    position: zoo,
    map: map
  });
}


$(function () {
  var customer = new Order();

  $("#form-cust-info").submit(function (event) {
    event.preventDefault();
    var name = $("input#cust-name").val();
    var address = $("input#cust-name").val();
    customer = new Order(name);
    $(".basic-pizza").show();
    $(".toppings").show();
    $("#form-cust-info").hide();
  });

  $("#form-order").submit(function (event) {
    event.preventDefault();

    var dough = $("#dough").val();
    var size = $("#size").val();
    var pizza = new Pizza(dough, size);

    if ($("input:checkbox[name=topping]:checked").length<=0) {
      console.log($("input:checkbox[name=topping]:checked").length);
      pizza.calculatePizzaPrice();
    } else {
      $("input:checkbox[name=topping]:checked").each(function(){
        var toppingName = ($($(this).siblings()[0]).text());
        var toppingPrice = parseInt($(this).val());
        pizza.addTopping(toppingName, toppingPrice);
        pizza.calculatePizzaPrice();
      });
    }

    customer.addOrderItem(pizza);
    customer.calculateOrderPrice();
    
    console.log(customer);

    $("ul#review-orders").append("<li><span class='displayOrderItems'>" + pizza.size + "</span></li>");
    // $("ul#review-orders").append("<li><span class='displayOrderItems'><a href='#display-order-info' data-toggle='popover' title='Popover Header'" +
    //  "data-content='Some content inside the popover'>" + pizza.size + "</span></li></a>");

    // $('[data-toggle="popover"]').popover();

    $(".displayOrderItems").last().click(function() {
      $("#display-order-info").text("Your order is: " + pizza.size + " " + pizza.dough + " pizza. Ingridients: " + pizza.displayPizza());
      $("#display-order-info").append("<p>Total cost is: " + customer.orderPrice + "</p>");
    });
  });

});
