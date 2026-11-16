// @ts-ignore
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

const sleep = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

console.log(GameofLife.prettyPrint(matrix));
// let mat = matrix;
let body = JSON.stringify(matrix)

const response = await fetch("http://localhost:3000", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: body
});

// const jsonString = await response.text();
const resmat = JSON.parse(await response.json());

console.log(resmat);
console.log(Array.isArray(resmat))
console.log(GameofLife.prettyPrint(resmat))



// console.log(GameofLife.prettyPrint(board)



// while (true){
//     console.log(GameofLife.prettyPrint(mat));
//     mat = GameofLife.calculateNextBoard(mat)
//     await sleep(200)
// }
// console.log(GameofLife.prettyPrint(GameofLife.calculateNextBoard(matrix)))
