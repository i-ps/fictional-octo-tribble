const express = require("express");
const app = express();
const server = require("http").Server(app);
const hbs = require("express-handlebars");
const gpio = require("./gpio");
const execSync = require('child_process').execSync;
const io = require("socket.io")(server);

app.engine("handlebars", hbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use( express.static("public") );

app.get("/", function(req, res) {
  // wczytanie dostępnych pinów
  let enabled = [12, 16, 18, 20, 25];
  // Początkowe ustawienia
  var pins = [];
  for (var i = 0; i < enabled.length; i++) {
    let element = {};
    let command = "gpio -g mode " + enabled[i] + " out \n";
    command += "gpio -g read " + enabled[i];
    code = execSync(command);
    status = ((code.toString().replace("\n", "") * -1) + 1);

    element.bcm = "bcm-" + enabled[i];
    element.status = status;
    element.title = "GPIO BCM ID: " + enabled[i];
    pins.push(element);
  }

  console.log(pins);

  res.render("home", {
      title: "Sterowanie przełączników",
      styles: [
        "bootstrap.min.css",
        "font-awesome.min.css",
        "custom.css",
        "main.css"
      ],
      scripts: [
        "jquery.js",
        "handlebars.js",
        "socket.io.js",
        "gpio.js",
        "bootstrap.min.js",
        "main.js"
      ],
      pins: pins,
    }
  );

});

server.listen(8080, function() {
  console.log("Serwer został uruchomiony pod adresem http://192.168.8.121:8080");
});

gpio(io);
