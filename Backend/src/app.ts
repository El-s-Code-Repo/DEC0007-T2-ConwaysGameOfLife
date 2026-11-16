import express from "express"
import GameOfLife from "./game/engine.ts"
import cors from "cors"

let app = express()


app.use(cors());
app.use(express.json());

app.get("/testarray",function (req,res) {
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
    res.status(200).json(JSON.stringify(matrix))
})

app.post("/",function (req,res) {
    // console.log(GameOfLife.prettyPrint(req.body))
    let nextBoard = GameOfLife.calculateNextBoard(req.body)
    // console.log(GameOfLife.prettyPrint(nextBoard))
    res.status(201).json(JSON.stringify(nextBoard))
})

app.listen(3000, function (){
    console.log("waiting for people...")

})