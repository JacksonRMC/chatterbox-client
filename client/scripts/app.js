var app = { 
  server: "http://parse.sfm6.hackreactor.com/chatterbox/classes/messages"
};

app.init = function() {
  $( document ).ready(function() {
    $('#main').find('.username', app.handleUsernameClick()).click('click');
  });
}

app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    data: JSON.stringify(message), 
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) { 
  var $chat = $('<div class="message"></div>');
  var $message = $('<div></div>');
  $message.text(message.text);
  $('#chats').append($message);
}

app.renderRoom = function(room) {
  var $roomSelect = $('<div class="roomSelect"></div>');
  var $room = $('<div></div>');
  $('#roomSelect').append($room);
}

app.handleUsernameClick = function(){
}







