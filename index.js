const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// import {alert} from popup;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));


//////////////////////////////

const dishes =[
        {
          name : "dosa",
          dishName : "Masala Dosa",
          category: "special",
          description: "traditional south Indian Staple",
          price : 50,
          quantity : 1,
          status: "+ Add"
        },
        {
          name : "samosa",
          dishName : "Samosa",
          category: "dish",
          price: 10,
          quantity : 1,
          status: "+ Add"
        },
        {
          name : "rajmachawal",
          dishName : "Rajma Chawal",
          category: "dish",
          price: 40,
          quantity : 1,
          status: "+ Add"
        },
        {
          name : "coldcoffee",
          dishName : "Cold Coffee",
          category: "dish",
          price: 50,
          quantity : 1,
          status: "+ Add"
        },
        {
          name : "patties",
          dishName : "Patties",
          category: "dish",
          price: 20,
          quantity : 1,
          status: "+ Add"
        },
        {
          name : "paneerPatties",
          dishName : "Paneer Patties",
          category: "dish",
          price: 20,
          quantity : 1,
          status: "+ Add"
        },
        {
          name : "samosaPepsi",
          dishName : "Samosa + Pepsi",
          category: "combo",
          price: 40,
          quantity : 1,
          status: "+ Add"
        },
        {
          name : "choleLassi",
          dishName : "Chole Bhature + Lassi",
          category: "combo",
          price: 70,
          quantity : 1,
          status: "+ Add"
        },
        {
          name : "rajmaCoke",
          dishName : "Rajma Chawal + Coke",
          category: "combo",
          price: 60,
          quantity : 1,
          status: "+ Add"
        }
       ];   

const cartList = [];



/////////////////////////////



app.get("/", function(req, res){
  res.render("home", {dishes: dishes});
});



app.get("/cart", function(req, res){
  if(cartList.length == 0){
    res.render("cart", {list: "EMPTY"});
  }
  else
    res.render("cart", {list : cartList});
});

app.post("/addToCart/:route", function(req, res){
  var route = req.params.route;
  var dishName = req.body.dishName;
  // console.log("clicked: ", dishName);
  dishes.forEach(function(element){
    if(dishName == element.name){
      cartList.forEach(function(dish){
        if(dishName == dish.name){
          dish.quantity += 1;
        }
      });
      if(element.quantity==1){
        cartList.push(element);
        element.status = "added";
      }
    }
  });

  // console.log("CATTTTTTT: ", cartList);
  switch(route){
    case "top-picks":
      res.redirect("/top-picks");
      break;
    case "tdspl":
      res.redirect("/#tdsplSection");
      break;
    case "combo":
      res.redirect("/#comboSection");
      break;
  }
});

app.post("/edit-quantity/:route", function(req, res){
  // console.log("SAJJE KHABBE: "+ req.params.route);
  var route = req.params.route;
  var add = req.body.add;
  var remove = req.body.delete;
  // console.log("Add: "+ add + " remove: "+ remove);
  if(add!= undefined){
    cartList.forEach(function(element){
      if(element.name == add){
        element.quantity += 1;
      }
    });
  }

  else if(remove!=undefined){
    cartList.forEach(function(element){
      if(element.name == remove){
        if(element.quantity == 1){
          var index = cartList.indexOf(element);
          if(index>-1)
            cartList.splice(index, 1);
          element.status="+ Add";
        }
        else
          element.quantity -= 1;
      }
    });
  }
  // if(route=="home"){
  //   res.redirect("/#comboSection");
  // }
  // else if(route=="cart")
  //   res.redirect("/cart");
  switch(route){
    case "home": 
          res.redirect("/#comboSection");
          break;
    case "tdspl":
          res.redirect("/#tdsplSection");
          break;
    case "cart":
          res.redirect("/cart");
          break;
    case "top-picks":
          res.redirect("/top-picks");
          break;
  }
   
});


app.get("/top-picks", function(req, res){

  res.render("topPicks", {dishes: dishes});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function(){
  console.log("App Started on port " + PORT);
});