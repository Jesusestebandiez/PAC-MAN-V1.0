Window.addEvenlistener('keydown', checkArrow);

function checkArrow(event){
    const keyValue = event.keyCode;
    const left = 37;
    const up = 38;
    const right = 39;
    const down = 40;


if (keyValue === left)window.appState.player.direction = 'left';
if (keyValue === right) window.appState.player.direction = 'right';
if (keyValue === up)window.appState.player.direction = 'top';
if (keyValue === down)window.appState.player.direction = 'bottom';
}

function checkCollision (x, y, direction){
 let board = window.appState.board;
 let value = null;

 if (direction === 'right') value = board[y][x + 1];
 if (direction === 'left') value = board[y][x - 1];
 if (direction === 'bottom') value = board[y + 1][x];
 if (direction === 'top') value = board[y - 1][x];
 return value;
}
function checkTunnel(x, y, dir){
    let xMax = window.appState.board[0].length -1;
    if (x === 0 && dir === 'left') window.appState.player.x = xMax;
    if (x === xMax && dir === 'right') window.appState.player.x = 0;
}

function Player(player) {
    let direction = player.direction;
    let x = player.x;
    let y = player.y;
    let styles = {};

    let collisionVal = checkCollision(x, y, direction);
    if (collisionVal !== 1){
        
    if (direction === 'right' && x < 27) x += 1;
    if (direction === 'left' && x > 0) x -= 1;
    if (direction === 'bottom' && y < 30) y += 1;
    if (direction === 'top' && y > 0) y -= 1;

    window.appState.player.x = x;
    window.appState.player.y = y;

    if (collisionVal === 2) {
      window.appState.player.score += 1;
      window.appState.board[y][x] = 0;

        }
    }

    var xPercent = x * 100 / 28;
    var yPercent = y * 100 / 31;

    styles = {
        left: xPercent + '%',
        top: yPercent + '%',
        transition: 'all 200ms linear' };
   
    checkTunnel (x, y, direction);
    if (x <= 0 || x >=27 ) styles.display = 'none';

    return(
        React.createElement("div", {className:"player", style: styles}));
}

function Square(square) {
    let classVal = 'square';
    const squares = square.map((item, i) => {
      if (item === 0) classVal = 'square';
      if (item === 1) classVal = 'square wall';
      if (item === 2) classVal = 'square dot';
  
      return React.createElement("div", { key: i, className: classVal });
    });
    return squares;
  }

  function Score(player){
      return(
        React.createElement("div", null,
        React.createElement("span", null, player.name),
        React.createElement("span", null, "\xA0\xA0", player.score, " pts.")));
  }

  function Board(state){
    const board = state.board;
    const rows = board.map((item, i) => {
      return React.createElement("div", { key: i, className: "row" }, Square(item));
    });
    return(
      React.createElement("div", { className: "board" },
      Player(state.player),
      rows));
  }
  
  function app(state){
    return(React.createElement("div", { className: "game" },
    React.createElement("div", null,
    Score(state.player),
    Board(state))));
  }

  // -----------------------------------------------------------------------------
// app State
// -----------------------------------------------------------------------------

// 0 path
// 1 wall
// 2 dot
// 3 pellet

let emptyBoard =
[[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
[1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
[1, 2, 1, 0, 0, 1, 2, 1, 0, 0, 0, 1, 2, 1, 1, 2, 1, 0, 0, 0, 1, 2, 1, 0, 0, 1, 2, 1],
[1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
[1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
[1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
[1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
[1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
[0, 0, 0, 0, 0, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 1, 2, 1, 1, 2, 1, 1, 1, 0, 0, 1, 1, 1, 2, 1, 1, 2, 1, 0, 0, 0, 0, 0],
[1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1],
[0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0],
[1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1],
[0, 0, 0, 0, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 1, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 1, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0, 0, 0, 0, 0],
[1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1],
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
[1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
[1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1],
[1, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1],
[1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1],
[1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 2, 1, 1, 1],
[1, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 1],
[1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
[1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
[1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

let appState ={
  player: {
    name: 'playerName:',
    score: 0,
    direction: 'right',
    x: 1,
    y: 1 } };

 window.appState = appState;

 const rootEl = document.getElementById('app');
 const renderTime = 200;

 function renderNow() {
  ReactDOM.render(App(appState), rootEl);
}

setInterval(renderNow, renderTime);

renderNow()

export default checkArrow;
