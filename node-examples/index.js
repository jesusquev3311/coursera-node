const rectangule = require('./rectangle')
function solveRectangle(l,b){
    if(l<= 0 || b<=0){
        console.log(`The dimensions of the rectangule should be greater than zero: l = ${l} and b = ${b}`);
    } else {
        console.log(`The perimeter of the rectangule is ${rectangule.perimeter(l,b)}`);
        console.log(`The area of the rectangule is ${rectangule.area(l,b)}`);
    }
}

solveRectangle(4,3);
solveRectangle(2,3);
solveRectangle(2,0);
solveRectangle(-2,0);