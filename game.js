// const gameContainer = document.getElementById('gameContainer');

// // Create a player element
// const player = document.createElement('div');
// player.classList.add('player');
// gameContainer.appendChild(player);

// // Initialize player's position
// player.style.top = '0px';
// player.style.left = '0px';

// // Get all the walls in the game
// const walls = document.querySelectorAll('.wall');

// // Function to check for collision between the player's new position and the walls
// function isColliding(newTop, newLeft) {
//     const gameRect = gameContainer.getBoundingClientRect();

//     const playerRect = {
//         top: newTop,
//         left: newLeft,
//         bottom: newTop + player.offsetHeight,
//         right: newLeft + player.offsetWidth
//     };
//     console.log('------------------------------------');
//     console.log('The player info:'
//         , 'The top:', playerRect.top ,
//         'The left:', playerRect.left,
//         'The bottom:', playerRect.bottom,
//         'The right:', playerRect.right
//     );

//     for (let wall of walls) {
//         const wallRect = wall.getBoundingClientRect();

//         // Adjust the wallRect to be relative to the gameContainer
//         const wallRelative = {
//             top: wallRect.top - gameRect.top-2,
//             left: wallRect.left - gameRect.left-2,
//             bottom: wallRect.bottom - gameRect.top -2,
//             right: wallRect.right - gameRect.left-2
//         };
//         console.log('The wall info:'
//             , 'The top:', wallRelative.top,
//             'The left:', wallRelative.left,
//             'The bottom:', wallRelative.bottom,
//             'The right:', wallRelative.right
//         );

//         if (
//             playerRect.right > wallRelative.left &&
//             playerRect.left < wallRelative.right &&
//             playerRect.bottom > wallRelative.top &&
//             playerRect.top < wallRelative.bottom
//         ) {
//             return true; // Collision detected
//         }
//     }

//     return false; // No collision
// }

// // Function to move the player
// function movePlayer(direction) {
//     let top = parseInt(player.style.top) || 0;
//     let left = parseInt(player.style.left) || 0;

//     let newTop = top;
//     let newLeft = left;

//     switch (direction) {
//         case 'ArrowUp':
//             newTop -= 50;
//             break;
//         case 'ArrowDown':
//             newTop += 50;
//             break;
//         case 'ArrowLeft':
//             newLeft -= 50;
//             break;
//         case 'ArrowRight':
//             newLeft += 50;
//             break;
//     }

//     // Only move if no collision is detected with walls
//     if (!isColliding(newTop, newLeft)) {
//         player.style.top = `${newTop}px`;
//         player.style.left = `${newLeft}px`;
//     }
// }

// // Event listener for key presses
// document.addEventListener('keydown', (event) => {
//     movePlayer(event.key);
// });


const gameContainer = document.getElementById('gameContainer');

// Create a player element
const player = document.createElement('div');
player.classList.add('player');
gameContainer.appendChild(player);

// Create a ghost element
const ghost = document.createElement('div');
ghost.classList.add('ghost');
gameContainer.appendChild(ghost);

// Place the ghost
ghost.style.top = `320px`;
ghost.style.left = `280px`;

// Initialize player's position
player.style.top = '160px';
player.style.left = '240px';

// Define the maze layout using a 2D array
const mazeLayout_OLD = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const mazeLayout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

];

// Create maze walls dynamically
function createMaze() {
    for (let row = 0; row < mazeLayout.length; row++) {
        for (let col = 0; col < mazeLayout[row].length; col++) {
            if (mazeLayout[row][col] === 1) {
                const wall = document.createElement('div');
                wall.classList.add('wall');
                wall.style.gridColumnStart = col + 1;
                wall.style.gridRowStart = row + 1;
                gameContainer.appendChild(wall);
            }
        }
    }
}

// Call the function to create the maze
createMaze();

// Get player's current grid position based on their top and left positions
function getPlayerGridPosition() {
    const top = parseInt(player.style.top) || 0;
    const left = parseInt(player.style.left) || 0;

    const gridRow = Math.floor(top / 40);  // Each grid row is 40px tall
    const gridCol = Math.floor(left / 40); // Each grid column is 40px wide

    return { gridRow, gridCol };
}

// Function to check for collision with adjacent walls
function isColliding(newTop, newLeft) {
    const { gridRow, gridCol } = getPlayerGridPosition();

    // Determine the new grid position based on the proposed move
    const newGridRow = Math.floor(newTop / 40);
    const newGridCol = Math.floor(newLeft / 40);

    // Check if the new position is a wall in the maze
    if (mazeLayout[newGridRow][newGridCol] === 1) {
        return true; // Collision detected
    }

    return false; // No collision
}

// Function to move the player
function movePlayer(direction) {
    let top = parseInt(player.style.top) || 0;
    let left = parseInt(player.style.left) || 0;

    let newTop = top;
    let newLeft = left;

    const moveSize = 40; // Match the grid size

    switch (direction) {
        case 'ArrowUp':
            newTop -= moveSize;
            break;
        case 'ArrowDown':
            newTop += moveSize;
            break;
        case 'ArrowLeft':
            newLeft -= moveSize;
            break;
        case 'ArrowRight':
            newLeft += moveSize;
            break;
    }

    // Only move if no collision is detected with adjacent walls
    if (!isColliding(newTop, newLeft)) {
        player.style.top = `${newTop}px`;
        player.style.left = `${newLeft}px`;
    }
}

// Function to move the ghost randomly
function moveGhost() {
    let top = parseInt(ghost.style.top) || 0;
    let left = parseInt(ghost.style.left) || 0;

    const directions = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    const direction = directions[Math.floor(Math.random() * directions.length)];

    let newTop = top;
    let newLeft = left;

    switch (direction) {
        case 'ArrowUp':
            newTop -= 40;
            break;
        case 'ArrowDown':
            newTop += 40;
            break;
        case 'ArrowLeft':
            newLeft -= 40;
            break;
        case 'ArrowRight':
            newLeft += 40;
            break;
    }

    // Only move if no collision is detected with adjacent walls
    if (!isColliding(newTop, newLeft)) {
        ghost.style.top = `${newTop}px`;
        ghost.style.left = `${newLeft}px`;
    }
}

// Make the ghost move every 500ms
setInterval(moveGhost, 500);

// Event listener for key presses
document.addEventListener('keydown', (event) => {
    movePlayer(event.key);
});
