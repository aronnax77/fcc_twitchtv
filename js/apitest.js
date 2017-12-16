// Get references to h2, h3, h4, and h5 for testing
var elH2 = document.querySelector('h2');
var elH3 = document.querySelector('h3');
var elH4 = document.querySelector('h4');
var elH5 = document.querySelector('h5');
elH5.textContents = 'I am in an h5 tag';

var userNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                 "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "COSMOS"];
var name = userNames[7];
//var userUrl = "https://api.twitch.tv/helix/users?login=freecodecamp";
//var statusUrl = "https://api.twitch.tv/kraken/streams/freecodecamp";
var userUrl = "https://api.twitch.tv/helix/users?login=" + name;
var statusUrl = "https://api.twitch.tv/kraken/streams/" + name;
var method  = 'GET';

function User(name, logo, status, sText) {
  this.name = name;
  this.logo = logo;
  this.status = status;
  this.sText  = sText;
}

var userFcc = new User();

function getUserInfo() {
  var xhr = new XMLHttpRequest();
  xhr.open(method, userUrl);
  xhr.setRequestHeader("Client-ID", "heuz98elmbc2j7msdcnb17jjl877s2");
  xhr.response = 'text';
  xhr.send();

  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          userData = JSON.parse(xhr.response);
          userFcc.name = userData.data[0].display_name;
          userFcc.logo = userData.data[0].profile_image_url;
          renderUser();
        } else {
          alert('There was a problem with the request.');
        }
      }
    };
}

function populateUser(type) {
  alert('in populate user');
  if(type === 'user') {
    userFcc.name = userData.data[0].display_name;
    userFcc.logo = userData.data[0].profile_image_url;
  }

}

function getStatusInfo() {
  var xhr = new XMLHttpRequest();
  xhr.open(method, statusUrl);
  xhr.setRequestHeader("Client-ID", "heuz98elmbc2j7msdcnb17jjl877s2");
  xhr.response = 'text';
  xhr.send();

  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          statusData = JSON.parse(xhr.response);
          if(statusData.stream === null) {
            userFcc.status = "Offline";
            userFcc.sText  = "Site offline ......";
          } else {
            userFcc.status = "Online";
            userFcc.sText = statusData.stream.channel.status;
          }
          renderStatus();
        } else {
          alert('There was a problem with the request.');
        }
      }
      renderUser();
    };
}

function renderUser() {
  elH2.textContent = userFcc.name;
  elH3.textContent = userFcc.logo;
}

function renderStatus() {
  elH4.textContent = userFcc.status;
  elH5.textContent = userFcc.sText;
}

getUserInfo();
getStatusInfo();
