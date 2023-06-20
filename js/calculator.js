const CURRENCY_UNITS = [200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];

let getCurrencyUnitsAvailable = (currencyUnits) => {
    let currencyUnitsAvailable = [];

    for(currencyUnitsIterator = 0; currencyUnitsIterator < currencyUnits.length; currencyUnitsIterator++) {
        if(!isNaN(parseInt(document.getElementById("euro" + currencyUnits[currencyUnitsIterator]).value))) {
            currencyUnitsAvailable.push(parseInt(document.getElementById("euro" + currencyUnits[currencyUnitsIterator]).value));
        }
        else {
            currencyUnitsAvailable.push(parseInt(0));
        }
    }   
    
    return currencyUnitsAvailable;
}

let getOptimumChange = (amountGiven, price, currencyUnits, currencyUnitsAvailable) => {
    let remainingAmount = Number((amountGiven - price).toFixed(2));
    let changeToReturn = new Array(currencyUnits.length).fill(0);

    for(currencyUnitsIterator = 0; 
        currencyUnitsIterator < currencyUnits.length && remainingAmount > 0; 
        currencyUnitsIterator ++) {
        if(Math.trunc(Number((remainingAmount / currencyUnits[currencyUnitsIterator]).toFixed(2))) > 0 
        && currencyUnitsAvailable[currencyUnitsIterator] > 0) {
            if(currencyUnitsAvailable[currencyUnitsIterator] >= Math.trunc(Number((remainingAmount / currencyUnits[currencyUnitsIterator]).toFixed(2)))) {
                changeToReturn[currencyUnitsIterator] += Math.trunc(Number((remainingAmount / currencyUnits[currencyUnitsIterator]).toFixed(2)));
                remainingAmount = Number((remainingAmount - (Math.trunc(Number((remainingAmount / currencyUnits[currencyUnitsIterator]).toFixed(2))) * currencyUnits[currencyUnitsIterator])).toFixed(2));
            }
            else {
                changeToReturn[currencyUnitsIterator] += currencyUnitsAvailable[currencyUnitsIterator];
                remainingAmount = Number((remainingAmount - (currencyUnitsAvailable[currencyUnitsIterator] * currencyUnits[currencyUnitsIterator])).toFixed(2));
            }
        }
    }

    if(remainingAmount > 0) {
        changeToReturn = new Array(currencyUnits.length).fill(0);
    }

    return changeToReturn;
}

let getBlackboardContent = (price, amountGiven, currencyUnits) => {
    let currencyUnitsAvailable;
    let changeToReturn;
    let enoughCash = false;
    let blackboardContent = "";

    if(price > 0 && amountGiven > 0 && amountGiven >= price && (amountGiven - price) <= currencyUnits[0]) {

        currencyUnitsAvailable = getCurrencyUnitsAvailable(currencyUnits);

        changeToReturn = getOptimumChange(amountGiven, price, currencyUnits, currencyUnitsAvailable);

        for(currencyUnitsIterator = 0; currencyUnitsIterator < currencyUnits.length; currencyUnitsIterator++) {
            blackboardContent = blackboardContent + currencyUnits[currencyUnitsIterator] + " \t:" + changeToReturn[currencyUnitsIterator] + "\n";
            if(changeToReturn[currencyUnitsIterator] != 0) {
                enoughCash = true;
            }
        }
        if(enoughCash === false) {
            blackboardContent = "NO HAY SUFICIENTE EFECTIVO EN CAJA PARA REALIZAR LA TRANSACCIÓN";
        }
    }
    else {
        if(price === 0) blackboardContent = blackboardContent + "EL PRECIO INTRODUCIDO ES 0\n";
        if(amountGiven === 0) blackboardContent = blackboardContent + "EL PAGO ES 0\n";
        if(amountGiven < price) blackboardContent = blackboardContent + "EL PAGO ES MENOR QUE EL PRECIO\n";
        if((amountGiven - price) > currencyUnits[0]) blackboardContent = blackboardContent + "NO SE DA CAMBIO PARA MÁS DE " + currencyUnits[0] + " EUROS\n";
    }

    return blackboardContent;
}

let optimumChangeButtonListener = () => {
    let price = parseFloat(document.getElementById("price").value);
    let amountGiven = parseFloat(document.getElementById("amountGiven").value);

    document.getElementById("optimumChangeBlackboard").value = getBlackboardContent(price, amountGiven, CURRENCY_UNITS);
}

window.onload = () => {
    document.getElementById("calculateOptimumChange").addEventListener("click",optimumChangeButtonListener);
}