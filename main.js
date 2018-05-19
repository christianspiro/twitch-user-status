var channels = ["freecodecamp","test_channel","ESL_SC2"];

const getChannelInfo = () => {
  channels.forEach(function(channel) {
    let makeURL= (type, name) => {
      return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
    };
    $.getJSON(makeURL("streams", channel), function(data) {
      var game,
          status;
      if (data.stream === null) {
        game = "Offline";
        status = "offline";
      } else if (data.stream === undefined) {
        game = "Account Closed";
        status = "offline";
      } else {
        game = data.stream.game;
        status = "online";
      };
      $.getJSON(makeURL("channels", channel), function(data) {
        let logo = data.logo != null ? data.logo : "https://dummyimage.com/50x50/ecf0e7/5c5457.jpg&text=0x3F",
          name = data.display_name != null ? data.display_name : channel,
          description = status === "online" ? ': ' + data.status : "";
          html = '<div  ' + 
          status + '><div id="icon"><img src="' + 
          logo + '" class="img-thumbnail"></div><div  id="name"><a href="' + 
          data.url + '" target="_blank">' + 
          name + '</a></div><div  id="streaming">'+ 
          game + description + '</div></div>';
        status === "online" ? $(".response").prepend(html) : $(".response").append(html);
      });
    });
  });
};
$(document).ready(() => {
    getChannelInfo();
});


// es6 edit of fcc example as this is allegedly depreicated for the challenges