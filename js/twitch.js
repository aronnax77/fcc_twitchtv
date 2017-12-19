/* Design of a Widipedia Viewer, an exercise for freecodecamp.

      Author: Richard Myatt
      Date: 19 December 2017

*/

var section = document.querySelector('section');

var userNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
                 "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "COSMOS"];

// User object
function User(name, logo, status, sText) {
  this.name = name;
  this.logo = logo;
  this.status = status;
  this.sText  = sText;
}

// function to render streamers
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

  // initialize variables
  var user = new User();

  var userUrl = "https://api.twitch.tv/helix/users?login=" + name;
  var statusUrl = "https://api.twitch.tv/kraken/streams/" + name;
  var method  = 'GET';

  // function to open new window when user click on streamer
  function openWindow(evt) {
    window.open(this.url, "_blank");
  }

  // function to make appropriate call and get streamer information
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

  // helper function to render part of streamer information
  function renderUser() {
    imgLogo.src = user.logo;
    nameSpan.textContent = user.name;
  }

  // helper function to render part of streamer information
  function renderStatus() {
    if(user.status === 'Offline') {
      statusSpan.textContent = 'Site offline ....';
      statusDiv.style.backgroundColor = "#ff0000";
      article.className = 'offline';
    } else {
      statusSpan.textContent = user.sText;
      statusDiv.style.backgroundColor = "#00ff00";
      article.className = 'online';
    }
  }

  getUserInfo(userUrl, 'user');
  getUserInfo(statusUrl, 'stream');
  section.appendChild(article);
}





function showChange() {
  var onlineEls   = document.querySelectorAll('.online');
  var offlineEls  = document.querySelectorAll('.offline');
  if(selection.selectedIndex === 0) {
    showOnline(true);
    showOffline(true);
  } else if(selection.selectedIndex === 1) {
    showOnline(true);
    showOffline(false);
  } else {
    showOnline(false);
    showOffline(true);
  }

  function showOnline(choice) {
    var i;
    if(choice === false) {
      for(i = 0; i < onlineEls.length; i++) {
        onlineEls[i].style.display = 'none';
      }
    } else {
      for(i = 0; i < onlineEls.length; i++) {
        onlineEls[i].style.display = 'block';
      }
    }
  }

  function showOffline(choice) {
    var i;
    if(choice === false) {
      for(i = 0; i < offlineEls.length; i++) {
        offlineEls[i].style.display = 'none';
      }
    } else {
      for(i = 0; i < offlineEls.length; i++) {
        offlineEls[i].style.display = 'block';
      }
    }
  }
}


// the main routines
for(var i = 0; i < userNames.length; i++) {
  var name = userNames[i];
  renderStreamer(name);
}

var selection = document.querySelector('select');
selection.options[0].selected = true;
selection.addEventListener('change', showChange);
