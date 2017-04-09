var app = { 
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  newRooms: {},
};

app.init = function() {
  app.fetch();



};

app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      app.renderMessage(data);
      // $('#chatbox').append(message.text);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.get( app.server, function(data) {

    for ( var i = 0; i < data.results.length; i ++ ) {
      if ( Object.keys(app.newRooms).includes(data.results[i].roomname) ) {
        app.newRooms[data.results[i].roomname].push(data.results[i]);

      } else {
        app.newRooms[data.results[i].roomname] = []; 
      }
    }
  
    for ( var key in app.newRooms ) {
      app.renderRoom(key);
      for (var i = 0; i < app.newRooms[key].length; i++) {
        console.log(app.newRooms);
        app.renderMessage(app.newRooms[key][i]);
      }
    }
  });
};

var sanitizeObj = {
  '&': '&#38',
  '<': '&#60',
  '>': '&#62',
  '\"': '&#34',
  '\'': '&#39',
  '`': '&#x60',
  '!': '&#33',
  '@': '&#64',
  '$': '&#36',
  '%': '&#37',
  '(': '&#40',
  ')': '&#41',
  '=': '&#61',
  '+': '&#43',
  '{': '&#123',
  '}': '&#125',
  '[': '&#91',
  ']': '&#93',
  '^': '&#94'
};

app.sanitize = function(inputString) {
  $splitStr = inputString.split('');
  $splitStr.map(function(char) {
    if (sanitizeObj.char !== undefined) {
      $splitStr[char] = sanitizeObj[char];
    }
  });
  return $splitStr.join('');
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) { 
  var messageText = app.sanitize(message.text);
  var messageUser = app.sanitize(message.username);
  var $userMessage = $('<li class="messageBoard"><h2>' + messageUser + '<p class="time">' + message.updatedAt + '</p></h2><p>' + messageText + '</p></li>');
  $('#chatbox').append($userMessage);
};

app.renderRoom = function(room) {
  var $room = $('<div class=' + room + '></div>');
  var $rooomButton = $('<a href=#' + room + '>' + room + '</a>');
  $('#tables').append($room);
  $('.dropdown-content').append($rooomButton);
};

app.handleUsernameClick = function() { 
};

app.handleSubmit = function() {
  //needs to call the send function and post message to the server 
  //  
};

app.handleRoomswitch = function() {
  $('.dropbtn').on('click', function() {
    var clickedRoom = $(this).text('room');
    app.fetch();
    for ( var key in app.newRooms ) {
      if ( key === clickedRoom ) {
        app.newRooms[key].forEach((x) => app.renderMessage(x));
      }
    }
  });
};


$( document ).ready(function() {
  app.init();
  // $('#main').find('.username', app.handleUsernameClick()).click('click');
  // $('#send .submit').click('.submit', app.handleSubmit());
});





