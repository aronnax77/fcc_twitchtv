

var section = document.querySelector('section');

var userNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                 "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "COSMOS"];

function User(name, logo, status, sText) {
  this.name = name;
  this.logo = logo;
  this.status = status;
  this.sText  = sText;
}

function renderStreamer(userName) {
  // create elements for streamer
  var article    = document.createElement('article');
  var imgLogo    = document.createElement('img');
  var nameSpan   = document.createElement('span');
  var statusSpan = document.createElement('span');
  var statusDiv  = document.createElement('div');
  nameSpan.className = "site_name";
  statusSpan.className = "site_status";
  statusDiv.className = "status";
  article.appendChild(imgLogo);
  article.appendChild(nameSpan);
  article.appendChild(statusSpan);
  article.appendChild(statusDiv);

  article.addEventListener('click', openWindow);
  article.url = "https://www.twitch.tv/" + userName.toLowerCase();

  function openWindow(evt) {
    window.open(this.url, "_blank");
  }

  // initialize variables
  var user = new User();

  var userUrl = "https://api.twitch.tv/helix/users?login=" + name;
  var statusUrl = "https://api.twitch.tv/kraken/streams/" + name;
  var method  = 'GET';
  //var userData, statusData;


  function getUserInfo(url, type) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Client-ID", "heuz98elmbc2j7msdcnb17jjl877s2");
    xhr.response = 'text';
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            userData = JSON.parse(xhr.response);
              if(type === 'user') {
              user.name = userData.data[0].display_name;
              user.logo = userData.data[0].profile_image_url;
              renderUser();
              } else if (type === 'stream') {
                if(userData.stream === null) {
                  user.status = "Offline";
                  user.sText  = "Site offline ......";
                } else {
                  user.status = "Online";
                  user.sText = userData.stream.channel.status;
                }
                renderStatus();
              } else {
                alert('type not recognised');
              }
          } else {
            alert('There was a problem with the request.');
          }
        }
      };
  }



  // function to make ajax call re users
  /*function getUserInfo() {
    var xhr = new XMLHttpRequest();
    xhr.open(method, userUrl);
    xhr.setRequestHeader("Client-ID", "heuz98elmbc2j7msdcnb17jjl877s2");
    xhr.response = 'text';
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            userData = JSON.parse(xhr.response);
            user.name = userData.data[0].display_name;
            user.logo = userData.data[0].profile_image_url;
            renderUser();
          } else {
            alert('There was a problem with the request.');
          }
        }
      };
  }

  // function to make ajax call re streams
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
              user.status = "Offline";
              user.sText  = "Site offline ......";
            } else {
              user.status = "Online";
              user.sText = statusData.stream.channel.status;
            }
            renderStatus();
          } else {
            alert('There was a problem with the request.');
          }
        }
      };
  }*/

  function renderUser() {
    imgLogo.src = user.logo;
    nameSpan.textContent = user.name;
  }

  function renderStatus() {
    if(user.status === 'Offline') {
      statusSpan.textContent = 'Site offline ....';
      statusDiv.style.backgroundColor = "#ff0000";
    } else {
      statusSpan.textContent = user.sText;
      statusDiv.style.backgroundColor = "#00ff00";
    }
  }

  getUserInfo(userUrl, 'user');
  getUserInfo(statusUrl, 'stream');
  //getStatusInfo();
  section.appendChild(article);
}

for(var i = 0; i < userNames.length; i++) {
  var name = userNames[i];
  renderStreamer(name);
}
//var name = userNames[3];
//renderStreamer(name);
