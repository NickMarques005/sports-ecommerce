//---CalcPrices.js---//

const CalcPrices = {

    toStringPrice: (number) => {
        return Number(number).toFixed(2).replace('.', ',');
    },

    calcNewPrice: (initPrice, descount) => {

        if (descount == 0) {
            console.log("PRICE: ", initPrice);
            return CalcPrices.toStringPrice(initPrice);
        }
        else {
            const newPrice = initPrice - (initPrice * (descount / 100));
            return CalcPrices.toStringPrice(newPrice)
        }
    },

    calcCondition: (aux_price, condition) => {
        let price_condition;
        if (typeof aux_price === 'string') {
            price_condition = parseFloat(aux_price.replace(",", "."));
            }
        else{
            price_condition = aux_price;
        }
        const resultCondition = price_condition / condition;
        return CalcPrices.toStringPrice(resultCondition);
    },

    calcTotalPrice: (total_prices, price) => {
        let total = total_prices + price;
        console.log(total);
        return total;
    },

    calcTotalConditionPrice: (total_condition, condition) => {
        console.log("CONDITION: ", condition, " TOTAL CONDITION: ", total_condition);

        let total = total_condition + condition;
        console.log("TOTAL:", total);
        if(total > 10)
        {
            console.log("CONDITION >= 10");
            return 10;
        }
        else
        {
            console.log("CONDITION < 10");
            return total;
        }
    }
}

export default CalcPrices;