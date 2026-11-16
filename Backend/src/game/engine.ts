

class GameOfLife{

    static calculateNextBoard(board:number[][]):number[][]{
        const OOB_FILLER = 0
        let size = board.length;
        let nextBoard = Array.from({ length: size }, () => Array(size).fill(0));
        let dataDump = Array.from({ length: size }, () => Array(size).fill(0));

        // todo: make pretty


        // this is a crime!
        // its 3 am i do not care
        for(let i = 0; i < size; i++){ // row
            for(let j = 0; j < size; j++){ // col
                let count = 0;

                for(let k = 0; k < 3; k++){
                    for(let w = 0; w < 3; w++){
                        let rowDisp = i+((-1)+k)
                        let colDisp = j+((-1)+w)


                        if(this.isInbounds(rowDisp,size) && this.isInbounds(colDisp, size)){
                            if(k==1 && w==1){
                                count += OOB_FILLER
                            }else{
                                count += board[rowDisp][colDisp]
                            }

                        }else{
                            count += OOB_FILLER
                        }
                    }
                }
                dataDump[i][j] = count;
                // rules (n= number of living neighbors)


                if(board[i][j] == 1){
                    // living:
                    // <2:  dies
                    // 2-3: stays alive
                    // 3>:  dies
                    if(count <2){
                        nextBoard[i][j] = 0;
                    }
                    if(count > 1 && count < 4){
                        nextBoard[i][j] = 1;
                    }
                    if(count>3){
                        nextBoard[i][j] = 0;
                    }

                }else{
                    // dead
                    // 3
                    if(count ===3){
                        nextBoard[i][j] = 1;
                    }
                }
            }
        }
        return nextBoard;
    }
    static isInbounds(displacement:number,size:number):boolean{
        return (displacement > 0 && displacement < size)
    }
    static prettyPrint(board:number[][]):string{
        const alive = "██"
        const dead  = "░░"
        const line = "──"

        var stringBuff = ""
        var size = board.length;

        var top = `┌${line.repeat(size)}┐\n`
        var bot = `└${line.repeat(size)}┘`

        stringBuff = top

        for(let i = 0; i < size; i++){
            stringBuff += "│"
            for(let j = 0; j < size; j++){
                if(board[i][j] == 0){
                    stringBuff += dead;
                }else{
                    stringBuff += alive;
                }

            }
            stringBuff += "│\n"
        }
        stringBuff += bot
        // console.log(stringBuff);
        return stringBuff
    }

}

export default GameOfLife;