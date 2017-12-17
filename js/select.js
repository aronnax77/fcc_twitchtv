var selection = document.querySelector('select');
var section   = document.querySelector('section');
var para;

selection.addEventListener('change', showChange);

for(var i = 1; i < 3; i++) {
  para = document.createElement('p');
  para.textContent = 'Para ' + i;
  para.style.color = 'yellow';
  para.style.backgroundColor = 'green';
  para.className = 'green';
  section.appendChild(para);
}

for(i = 3; i < 9; i++) {
  para = document.createElement('p');
  para.textContent = 'Para ' + i;
  para.style.color = 'yellow';
  para.style.backgroundColor = 'red';
  para.className = 'red';
  section.appendChild(para);
}

para = document.createElement('p');
para.textContent = 'Para ' + 9;
para.style.color = 'yellow';
para.style.backgroundColor = 'green';
para.className = 'green';
section.appendChild(para);

var greenEls = document.querySelectorAll('.green');
var redEls   = document.querySelectorAll('.red');

function showChange() {
  if(selection.selectedIndex === 0) {
    showGreen(true);
    showRed(true);
  } else if(selection.selectedIndex === 1) {
    showGreen(false);
    showRed(true);
  } else {
    showGreen(true);
    showRed(false);
  }
}

function showGreen(choice) {
  if(choice === false) {
    for(i = 0; i < greenEls.length; i++) {
      greenEls[i].style.display = 'none';
    }
  } else {
    for(i = 0; i < greenEls.length; i++) {
      greenEls[i].style.display = 'block';
    }
  }
}

function showRed(choice) {
  if(choice === false) {
    for(i = 0; i < redEls.length; i++) {
      redEls[i].style.display = 'none';
    }
  } else {
    for(i = 0; i < redEls.length; i++) {
      redEls[i].style.display = 'block';
    }
  }
}
