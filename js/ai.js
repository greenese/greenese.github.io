/**
* This class simulates an AI that has the 
* capability to play Tetris and learn
* from each game it plays
* 
* @author Seth Greene
* @author Alec Allain 
* @version 4/1/19
*/

/*
* Constructor for JavaScript Tetris AI bot
*/
function TetrisBot(heightWeight, linesWeight, spacesWeight) {
    this.heightWeight = heightWeight;
    this.linesWeight = linesWeight;
    this.spacesWeight = spacesWeight;
    this.differenceWeight = heightWeight - spacesWeight;
};

/*
* This method looks at the current state of the gameboard
* and determines the best possible place for the current shape to drop
*
* @param gameBoard is the current game board
* @param currentShape is the new piece generated in the game board
* @param shapesList is the list of all 7 tetris shapes
*/
TetrisBot.prototype.determineBestMove = function(gameBoard, currentShapes, shapesList){
    var bestScore = 0;
    var tempScore = 0
    var shapeCopy = null
    var bestShape = null;
    var gameBoardCopy = null
    var currentShape = currentShapes[shapesList];

    // Creates a copy of the shape and game board respectively
    shapeCopy = currentShape.clone();
    gameBoardCopy = gameBoard.clone();

    // The AI can rotate a shape only a certian number of times
    while (rotate <= 3) {

        shapeCopy.rotate(gameBoard);

        // Shapes get moves right continuously until it hits boundaries and the shape must stay in a valid position 
        while(shapeCopy.moveRight(gameBoard) == true && gameBoard.valid(shapeCopy == true)) {
            
            // Piece gets added to gameboard and shifted around to see best fit
            while(shapeCopy.moveDown(gameBoardCopy) != false) {
                gameBoardCopy.addPiece(shapeCopy);
            }

            // Calculate score
            if (shapesList == shapesList.length - 1) {
                tempScore = gameBoardCopy.lines() * this.linesWeight - gameBoardCopy.bumpinessWeight() * this.differenceWeight + gameBoardCopy.aggregateHeight() * this.heightWeight - gameBoardCopy.holes() * spacesWeight;
            } else {
                tempScore = this.determineBestMove(gameBoardCopy, currentShapes, shapesList + 1);
            
            }

            // Checking the best score to see if it's undetermined or smaller than the value in the placeholder score variable
            if (bestScore = 0 || bestScore < tempScore) {
                bestShape = shapeCopy.clone()
                bestScore = tempScore;
            }
        }
        rotate = rotate + 1;
    }

    // Method gives back the best score generated by shape and the rotation of said piece
    return ({score: bestScore, piece: bestShape});
};

/*
* This method applies the best possible move for the bot
* to move a piece in the game board
*
* @param gameBoard is the current gameboard
* @param currentShape is the new piece genereated in the game board
*/
TetrisBot.prototype.bestMove = function(gameBoard, currentShape) {
    return this.determineBestMove(gameBoard, currentShape, 0).piece;
};
