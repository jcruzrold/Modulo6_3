let generateSquare = (size, symbol) => {
    let shape = "";

    for(linesIterator = 0; linesIterator < size; linesIterator ++) {
        for(columnsIterator = 0; columnsIterator < size; columnsIterator ++) {
            shape = shape + symbol;
        }
        shape = shape + "\n";
    }

    return shape;
}
let generateSquareWithBorder = (size, symbolBorder, symbolInner) => {
    let shape = "";

    for(linesIterator = 0; linesIterator < size; linesIterator ++) {
        for(columnsIterator = 0; columnsIterator < size; columnsIterator ++) {
            if(columnsIterator === 0 || columnsIterator === (size - 1) || linesIterator === 0 || linesIterator === (size - 1)) {
                shape = shape + symbolBorder;
            }
            else {
                shape = shape + symbolInner;
            }
            
        }
        shape = shape + "\n";
    }

    return shape;
}
let generateSquareDiagonalLeftRight = (size, symbolDiagonal, symbolUp, symbolDown) => {
    let shape = "";

    for(linesIterator = 0; linesIterator < size; linesIterator ++) {
        for(columnsIterator = 0; columnsIterator < size; columnsIterator ++) {
            if(columnsIterator === linesIterator) {
                shape = shape + symbolDiagonal;
            }
            else if(columnsIterator > linesIterator) {
                shape = shape + symbolUp;
            }
            else {
                shape = shape + symbolDown;
            }
            
        }
        shape = shape + "\n";
    }

    return shape;
}
let generateSquareDiagonalRightLeft = (size, symbolDiagonal, symbolUp, symbolDown) => {
    let shape = "";

    for(linesIterator = 0; linesIterator < size; linesIterator ++) {
        for(columnsIterator = 0; columnsIterator < size; columnsIterator ++) {
            if(columnsIterator === (size - linesIterator - 1)) {
                shape = shape + symbolDiagonal;
            }
            else if(columnsIterator < (size - linesIterator - 1)) {
                shape = shape + symbolUp;
            }
            else {
                shape = shape + symbolDown;
            }
            
        }
        shape = shape + "\n";
    }

    return shape;
}
let generateHalfDiamond = (size, symbol) => {
    let shape = "";

    for(linesIterator = 0, noBlanks = 0; linesIterator < (2 * size - 1); linesIterator ++) {
        if(linesIterator < size ) {
            noBlanks = linesIterator + 1;
        }
        else {
            noBlanks --;
        }
        for(columnsIterator = 0; columnsIterator < noBlanks; columnsIterator ++) {
            shape = shape + symbol;
        }
        shape = shape + "\n";
    }

    return shape;
}
let generatePiramid = (size, symbol) => {
    const lineSize = size * 2 - 1;
    const midPoint = Math.floor(lineSize / 2);
    const BLANK = " ";
    let shape = "";

    for(linesIterator = 0; linesIterator < size; linesIterator ++) {
        for(columnsIterator = 0; columnsIterator < lineSize; columnsIterator ++) {
            if(columnsIterator >= midPoint - linesIterator && columnsIterator <= midPoint + linesIterator) {
                shape = shape + symbol;
            }
            else {
                shape = shape + BLANK;
            }
        }
        shape = shape + "\n";
    }

    return shape;
}
let generateDiamond = (size, symbol) => {
    const diamondSize = size * 2 - 1;
    const midPoint = Math.floor(diamondSize / 2);
    const BLANK = " ";
    let noBlanks = 0;
    let shape = "";

    for(linesIterator = 0; linesIterator < diamondSize; linesIterator ++) {
        if(linesIterator <= midPoint) {
            noBlanks = linesIterator * 2 + 1;
        }
        else {
            noBlanks = diamondSize - ((linesIterator - midPoint) * 2);
        }
        for(columnsIterator = 0; columnsIterator < diamondSize; columnsIterator ++) {
            if(columnsIterator >= midPoint - Math.floor((noBlanks - 1) / 2) && columnsIterator <= midPoint + Math.floor((noBlanks - 1) / 2)) {
                shape = shape + symbol;
            }
            else {
                shape = shape + BLANK;
            }
        }
        shape = shape + "\n";
    }

    return shape;
}

let specialControlsContainerLayout = () => {
    let shapeType = parseInt(document.getElementById("shapeType").value);

    if(shapeType === 2) {
        document.getElementById("special-controls-container1").style.display = "";
        document.getElementById("special-controls-container2").style.display = "";
        document.getElementById("special-controls-container3").style.display = "none";
    }
    else if(shapeType >= 3 && shapeType <= 4) {
        document.getElementById("special-controls-container1").style.display = "none";
        document.getElementById("special-controls-container2").style.display = "none";
        document.getElementById("special-controls-container3").style.display = "";
    }
    else {
        document.getElementById("special-controls-container1").style.display = "";
        document.getElementById("special-controls-container2").style.display = "none";
        document.getElementById("special-controls-container3").style.display = "none";
    }
}

let changeInputHandler = () => {
    if(event.target.id === "shapeType") {
        specialControlsContainerLayout();
    }

    let shapeType = parseInt(document.getElementById("shapeType").value);
    let shapeSize = parseInt(document.getElementById("shapeSize").value);
    let shapeSymbol = document.getElementById("shapeSymbol").value;
    let shapeBorderSymbol = document.getElementById("shapeBorderSymbol").value;
    let shapeDiagonalSymbol = document.getElementById("shapeDiagonalSymbol").value;
    let shapeUpSymbol = document.getElementById("shapeUpSymbol").value;
    let shapeDownSymbol = document.getElementById("shapeDownSymbol").value;
    let shape = "";

    switch(shapeType)
    {
        case 1:
            shape = generateSquare(shapeSize, shapeSymbol);
            break;

        case 2:
            shape = generateSquareWithBorder(shapeSize, shapeBorderSymbol, shapeSymbol);
            break;

        case 3:
            shape = generateSquareDiagonalLeftRight(shapeSize, shapeDiagonalSymbol, shapeUpSymbol, shapeDownSymbol);
            break;

        case 4:
            shape = generateSquareDiagonalRightLeft(shapeSize, shapeDiagonalSymbol, shapeUpSymbol, shapeDownSymbol);
            break;

        case 5:
            shape = generateHalfDiamond(shapeSize, shapeSymbol);
            break;

        case 6:
            shape = generatePiramid(shapeSize, shapeSymbol);
            break;

        case 7:
            shape = generateDiamond(shapeSize, shapeSymbol);
            break;

        default:
            break;
    }

    document.getElementById("shapeBlackboard").value = shape;
}

window.onload = () => {
    document.getElementById("shapeType").addEventListener("change", changeInputHandler);
    document.getElementById("shapeSize").addEventListener("change", changeInputHandler);
    document.getElementById("shapeSymbol").addEventListener("change", changeInputHandler);
    document.getElementById("shapeBorderSymbol").addEventListener("change", changeInputHandler);
    document.getElementById("shapeDiagonalSymbol").addEventListener("change", changeInputHandler);
    document.getElementById("shapeUpSymbol").addEventListener("change", changeInputHandler);
    document.getElementById("shapeDownSymbol").addEventListener("change", changeInputHandler);
    specialControlsContainerLayout();
    changeInputHandler();
}