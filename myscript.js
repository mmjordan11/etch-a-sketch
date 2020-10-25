newGrid();

function drawGrid(dimension) {
  const container = document.querySelector('#grid');
  container.style['grid-template'] =
      `repeat(${dimension}, 1fr) / repeat(${dimension}, 1fr)`;

  for(let i=0;i<Math.pow(dimension,2);i++) {
    const cell = document.createElement('div');
    cell.classList.toggle('cell');
    container.appendChild(cell);
  }
}

function startSketch() {
  const container = document.querySelector('#grid');
  const cellEdit = document.querySelectorAll('.cell');
  let isDown = false;
  container.addEventListener('dblclick', function(){
    isDown = !isDown;
  });
  container.addEventListener('mousedown', function(){
    isDown = true;
  });
  container.addEventListener('mouseup', function(){
    isDown = false;
  });
  cellEdit.forEach(element => element.addEventListener('mouseover', function(e) {
      if(isDown) {
        changeBgColor(e.target);
      }
  }));
}

function changeBgColor(target,) {
  let currentRGB;
  if (!target.style.backgroundColor) {
    currentRGB = [229.5,229.5,229.5];
  }
  else {
    currentRGB = target.style.backgroundColor
        .split(/\D+/)
        .filter(item => item != '')
        .map(item => Number(item));
    if (currentRGB.every(item => item==0)) {console.log('saturated');}
    else {
      do {
        rgbIndex = Math.floor(Math.random()*3);
      } while (currentRGB[rgbIndex]==0);
      currentRGB[rgbIndex] -= 50;
    }
  }
    target.style.backgroundColor = `rgb(${currentRGB[0]},${currentRGB[1]},${currentRGB[2]})`;
}

const resetbtn = document.querySelector('#new-grid');
const grid = document.querySelector('#grid');

resetbtn.addEventListener('click', function() {
  reset = newGrid();
  if(reset != false) {applyAnimation();}
});

grid.addEventListener('animationend', (e) => {
  grid.classList.remove('apply-shake');
});

function applyAnimation() {
  const grid = document.querySelector('#toy-body');
  grid.classList.add('apply-shake');
}

function newGrid() {
  const container = document.querySelector('#grid');
  if (!document.querySelector('.cell')) {
    drawGrid(16);
    startSketch();
  }
  else {
    let dimension = getDimension();
    if (dimension) {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      drawGrid(dimension);
      startSketch();
    }
    else {return false;}
  }
}

function getDimension() {
  let dimensionInput;
  const validInput = function() {
    return (dimensionInput>0 && dimensionInput<=100 && dimensionInput%1===0)
  }
  while (!validInput()) {
    dimensionInput = Number(
      prompt('How many squares would you like per side of the grid?', 16)
    );
    if (validInput()) {return dimensionInput;}
    else {
      let ignore = confirm('Error: Please enter an integer between 1 and 100.');
      if (!ignore) break;
    }
  }
}
