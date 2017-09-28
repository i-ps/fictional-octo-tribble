const exec = require('child_process').exec;

function init(io) {
  io.on("connection", function(socket) {
    socket.on("message", function(bcm, status) {

      let command = "gpio -g mode " + bcm + " out \n";
      command += "gpio -g read " + bcm;

      // pobiera aktualny status na pinie
      dir = exec(command, function(err, stdout, stderr) {
        command = "gpio -g write " + bcm + " " + (stdout.replace("\n", "") * -1) + 1 ;
        status = (stdout.replace("\n", "") * -1) + 1;
        // Zmienia status na pinie na przeciwny
        exec("gpio -g write " + bcm + " " + status, function(err, stdout, stderr){
          if (err) {
            io.emit("message", {
              status: -1, // status ujemny ustawiony jako błąd
              message: err,
              bcm: "bcm-" + bcm
            });
          }
        });
        // wysyłka tego co się zadziało
        io.emit("message", {
          status: status,
          message: command,
          bcm: "bcm-" + bcm
        });
      });
      dir.on('exit', function (code) {
        // console.log("Exit " + code);
        io.clear;
      });

    });
  });
}

module.exports = init;
