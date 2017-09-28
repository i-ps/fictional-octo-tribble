var socket = io.connect("http://192.168.8.121:8080");

const button = $("button");

button.click(function() {
  let bcm = this.name.split("-")[1];
  let status = this.value;

  socket.emit("message", bcm, status);
  console.log(bcm);

  socket.on("message", function(data) {
    console.log(data);
    if(data.status === 0) {
      var text = "<i class=\"fa fa-lightbulb-o\" aria-hidden=\"true\"></i>";
      $("#" + data.bcm).html(text).attr('class', 'btn btn-secondary').val(0);
    } else {
      $("#" + data.bcm).html(text).attr('class', 'btn btn-success btn-lg active').val(1);
    }

  });

});


/*
(function() {
  var socket = io.connect("http://192.168.8.121:8080"),
    joined = false;

  var joinForm = $("#join-form"),
    nick = $("#nick"),
    chatForm = $("#chat-form"),
    chatWindow = $("#chat-window"),
    chatMessage = $("#message"),
    chatStatusTpl = Handlebars.compile($("#chat-status-template").html()),
    chatMessageTpl = Handlebars.compile($("#chat-message-template").html());

    joinForm.on("submit", function(e) {
        e.preventDefault();
        var nickName = $.trim( nick.val() );
        if(nickName === "") {
            nick.addClass("invalid");
        } else {
            nick.removeClass("invalid");
            socket.emit("join", nickName);
            joinForm.hide();
            chatForm.show();
            joined = true;
        }

    });

    chatForm.on("submit", function(e) {
        e.preventDefault();
        var message = $.trim( chatMessage.val() );
        if(message !== "") {
            socket.emit("message", message);
            chatMessage.val("");
        }
    });

    socket.on("status", function(data) {
        if(!joined) return;
        var html = chatStatusTpl({
            status: data.status,
            time: formatDate(data.time)
        });
        chatWindow.append(html);
        scrollToBottom();

    });

    socket.on("message", function(data) {
        if(!joined) return;
        var html = chatMessageTpl({
            time: formatDate(data.time),
            nick: data.nick,
            message: data.message
        });
        chatWindow.append(html);
        scrollToBottom();
    });

    function scrollToBottom() {
        chatWindow.scrollTop( chatWindow.prop("scrollHeight") );
    }

    function formatDate(time) {
        var date = new Date(time),
            hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        return (hours < 10 ? "0" + hours : hours) + ":" +
            (minutes < 10 ? "0" + minutes : minutes) + ":" +
            (seconds < 10 ? "0" + seconds : seconds);
    }
})();
*/
