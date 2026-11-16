import GameofLife from "./game/engine.ts"



const matrix = [
    [1,1,1,0,1,1,0,1,1,1,0,1,1,1,0],
    [0,1,0,0,1,0,0,1,0,0,0,0,1,0,0],
    [0,1,0,0,1,1,0,1,1,1,0,0,1,0,0],
    [0,1,0,0,1,0,0,0,0,1,0,0,1,0,0],
    [0,1,0,0,1,1,0,1,1,1,0,0,1,0,0],
    [1,1,1,0,1,1,0,1,1,1,0,1,1,1,0],
    [0,1,0,0,1,0,0,1,0,0,0,0,1,0,0],
    [0,1,0,0,1,1,0,1,1,1,0,0,1,0,0],
    [0,1,0,0,1,0,0,0,0,1,0,0,1,0,0],
    [0,1,0,0,1,1,0,1,1,1,0,0,1,0,0],
    [1,1,1,0,1,1,0,1,1,1,0,1,1,1,0],
    [0,1,0,0,1,0,0,1,0,0,0,0,1,0,0],
    [0,1,0,0,1,1,0,1,1,1,0,0,1,0,0],
    [0,1,0,0,1,0,0,0,0,1,0,0,1,0,0],
    [0,1,0,0,1,1,0,1,1,1,0,0,1,0,0],

];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

console.log(GameofLife.prettyPrint(matrix));
let mat = matrix;

while (true){
    console.log(GameofLife.prettyPrint(mat));
    mat = GameofLife.calculateNextBoard(mat)
    await sleep(200)
}
// console.log(GameofLife.prettyPrint(GameofLife.calculateNextBoard(matrix)))
