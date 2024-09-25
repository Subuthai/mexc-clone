function addCommasToNumber(number) {
    try{
        const parts = number.toString().split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return parts.join('.');
    }catch (e) {
        return number
    }
}
function randomizeDecimalPlaces(number) {
   try{
       const stringNumber = number.toString();
       const decimalIndex = stringNumber.indexOf('.');

       if (decimalIndex !== -1) {
           const decimalPart = stringNumber.slice(decimalIndex + 1);
           let randomDecimalPart = '';
           for (let i = 0; i < decimalPart.length; i++) {
               if (i < decimalPart.length - 4) {
                   randomDecimalPart += decimalPart[i];
               } else {
                   randomDecimalPart += Math.floor(Math.random() * 10);
               }
           }
           return parseFloat(stringNumber.slice(0, decimalIndex + 1) + randomDecimalPart)
       }else{
           if(number > 1000){
               number+=0.003
           }
       }
       if(number ===0){
           number+=0.1242241
       }
       return number+0.0001;
   }catch (e) {
   return number;
   }
}
function randomDecimals(numberString) {
    try{
        let sign = "";
        if (numberString[0] === '+' || numberString[0] === '-') {
            sign = numberString[0];
            numberString = numberString.substring(1);
        }

        let number = parseFloat(numberString);
        let integerPart = Math.floor(number);
        let decimalPart = number - integerPart;
        let randomDecimal = Math.random();
        let result = integerPart + randomDecimal;

        if (sign !== "") {
            result = sign + result.toFixed(2);
        } else {
            result = result.toFixed(2);
        }

        return result;
    }catch (e) {
        return numberString;
    }

}

export { addCommasToNumber,randomizeDecimalPlaces,randomDecimals };