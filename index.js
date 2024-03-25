//npm install prompt-sync - установливаю модуль prompt-sync с помощью npm в терминале vs code
const prompt = require('prompt-sync')(); //импортирую и использую модуль

const transactions_import = require('./transactions.json');

//В каждую транзакцию добавляю метод string()
for(const each_transaction of transactions_import){
    each_transaction.string = function string() { //[extra]
        return JSON.stringify(this);
    }
}

class TransactionAnalyzer{
    /**
     * @param {} transactions - Список всех транзакций (массив объектов)
     */
    transactions;

    constructor(transactions_import){
        this.transactions = transactions_import; 
    }
    /**
    * Метод для добавления новой транзакции с помощью ввода
    */
    addTransaction(){
        /**
         * Шаблон транзакции
         */
        const transaction = {
            /**
             * @param {string} transaction_id - Уникальный идентификатор транзакции
             */
            transaction_id: "1",
            /**
             * @param {string} transaction_date - Дата транзакции в формате "YYYY-MM-DD"
             */
            transaction_date: "2019-01-01",
            /**
             * @param{number} transaction_amount - Сумма транзакции
             */
            transaction_amount: 100.00,
            /**
             * @param {string} transaction_type - Тип транзакции, например, "debit" или "credit"
             */
            transaction_type: "debit",
            /**
             * @param {string} transaction_description - Описание транзакции
             */
            transaction_description: "Payment for groceries",
            /**
             * @param {string} merchant_name - Название магазина или торговой точки, где была совершена транзакция
             */
            merchant_name: "SuperMart",
            /**
             * @param {string} card_type - Тип используемой карты, например, "Visa" или "MasterCard"
             */
            card_type: "Visa",
            /**
             * @param {function(): string} string - Метод, возвращающий строковое представление объекта транзакции в формате JSON
             */
            string() { //[extra]
                return JSON.stringify(this)
            },
        }
        
        transaction.transaction_id = ((Number(this.transactions[this.transactions.length -1].transaction_id)) + 1).toString();
        transaction.transaction_date = prompt("transaction date: ");
        transaction.transaction_amount = Number(prompt("transaction amount: "));
        transaction.transaction_type = prompt("transaction type: ");
        transaction.transaction_description = prompt("transaction description: ");
        transaction.merchant_name = prompt("merchant name: ");
        transaction.card_type = prompt("card type: ");

        transactions.push(transaction);
    }
    /**
    * Возращает список всех транзакций
    */
    getAllTransaction(){
        return this.transactions;
    }
    /**
    * Возвращает массив всевозможных типов транзакций (например, ['debit', 'credit']).
    * @param {} set_types - массив всевозможных типов транзакций
    */
    getUniqueTransactionType(){
        const set_types = new Set();
        for(const each_transaction of this.transactions){
            set_types.add(each_transaction.transaction_type);
        }
    return set_types;
    }

    calculateTotalAmount(){
        let total_amount = 0;
        for(const each_transaction of this.transactions){
            total_amount += each_transaction.transaction_amount;
        }
        return total_amount;
    }

    calculateTotalAmountByDate(year, month, day){
        let date_split = [];
        let total_amount = 0;
        for(const each_transaction of this.transactions){
            date_split = each_transaction.transaction_date.split("-");
            if((year === date_split[0] || (year === undefined)) && (month === date_split[1] || (month === undefined)) 
            && (day === date_split[2] || (day === undefined))){
                total_amount += each_transaction.transaction_amount;
            }
        }
        return total_amount;
    }

    getTransactionByType(type){
        let transactions_by_types = [];
        for(const each_transaction of this.transactions){
            if(each_transaction.transaction_type === type){
                transactions_by_types.push(each_transaction);
            }
        }
        return transactions_by_types;
    }

    getTransactionsInDateRange(startDate, endDate){
        let transactions_in_date_range = [];
        for(const each_transaction of this.transactions){
            if((each_transaction.transaction_date >= startDate) && (each_transaction.transaction_date <= endDate )){  //сравниваю строки дат символ за символом, начиная с левого края
                transactions_in_date_range.push(each_transaction);
            }
        }
        return transactions_in_date_range;
    }

    getTransactionsByMerchant(merchantName){
        let transactions_by_merch = [];
        for(const each_transaction of this.transactions){
            if(each_transaction.merchant_name === merchantName){
                transactions_by_merch.push(each_transaction);
            }
        }
        return transactions_by_merch;
    }
    
    calculateAverageTransactionAmount(){
        let amount = transactions.length;
        let total_amount = 0;
        for(const each_transaction of this.transactions){
            total_amount += each_transaction.amount;
        }
        let average_amount = total_amount/amount;
        return average_amount;
    }

    getTransactionsByAmountRange(minAmount, maxAmount){
        let transactions_by_amount_range = [];
        for(const each_transaction of this.transactions){
            if((each_transaction.transaction_amount >= minAmount)&&(each_transaction.transaction_amount <= maxAmount)){
                transactions_by_amount_range.push(each_transaction);
            }
        }
        return transactions_by_amount_range;
    }

    calculateTotalDebitAmount(){
        let total_amount = 0;
        for(const each_transaction of this.transactions){
            if(each_transaction.transaction_type = 'debit'){
                total_amount += each_transaction.transaction_amount;
            }
        }
        return total_amount;
    }

    findMostTransactionsMonth(){
        const set_months = new Set(); // Записываю множество всех возможных месяцев(учитывая год)
        for(const each_transaction of this.transactions) {
            let date_split = each_transaction.transaction_date.split("-");
            set_months.add(date_split[0] + "-" + date_split[1]);
        }


        let map_months_with_amount = new Map(); // Записываю в map кол-во транзакций соответствующую каждому месяцу
        for(let month of set_months){
                const all_transactions_by_month = this.transactions.filter(transaction => {
                    let date_split = transaction.transaction_date.split("-");
                    if((date_split[0]+"-"+date_split[1]) === month){
                        return true;
                    }
                    else{
                        return false;
                    }
                })
                let total_amount_per_month = 0; // Вычисляю кол-во транзакций за месяц
                all_transactions_by_month.forEach(() => total_amount_per_month++);
                map_months_with_amount.set(month , total_amount_per_month);
                console.log(map_months_with_amount);
        }


        let max_month;
        let max_value = -Infinity; // Нахожу месяц, в котором было больше всего транзакций
        for (let [month, value] of map_months_with_amount) {

            if (value > max_value) {
                max_month = month;
                max_value = value;
            }
        }
        return max_month;
    }

    findMostDebitTransactionMonth(){
        const set_months = new Set(); // Записываю множество всех возможных месяцев(учитывая год)
        for(const each_transaction of this.transactions) {
            let date_split = each_transaction.transaction_date.split("-");
            set_months.add(date_split[0] + "-" + date_split[1]);
        }


        let map_months_with_amount = new Map(); // Записываю в map кол-во транзакций соответствующую каждому месяцу
        for(let month of set_months){
                const all_transactions_by_month = this.transactions.filter(transaction => {
                    let date_split = transaction.transaction_date.split("-");
                    if((date_split[0]+"-"+date_split[1]) === month && transaction.transaction_type === 'debit'){
                        return true;
                    }
                    else{
                        return false;
                    }
                })
                let total_amount_per_month = 0; // Вычисляю кол-во транзакций за месяц
                all_transactions_by_month.forEach(() => total_amount_per_month++);
                map_months_with_amount.set(month , total_amount_per_month);
                console.log(map_months_with_amount);
        }


        let max_month;
        let max_value = -Infinity; // Нахожу месяц, в котором было больше всего транзакций
        for (let [month, value] of map_months_with_amount) {

            if (value > max_value) {
                max_month = month;
                max_value = value;
            }
        }
        return max_month;
    }

    mostTransactionTypes(){
        let debit_amount = 0;
        let credit_amount = 0;
        for(const each_transaction of this.transactions){
            if(each_transaction.transaction_type === 'debit'){
                debit_amount++;
            }
            if(each_transaction.transaction_type === 'credit'){
                credit_amount++;
            }
        }
        if(debit_amount < credit_amount){
            return 'credit';
        }
        else if(credit_amount < debit_amount){
            return 'debit';
        }
        else{
            return 'equal';
        }
    }

    getTransactionsBeforeDate(date){
        let transactions_before_date = [];
        for(const each_transaction of this.transactions){
            if(each_transaction.transaction_date <= date){
                transactions_before_date.push(each_transaction);
            }
        }
        return transactions_before_date;
    }

    findTransactionById(id){
        for(const each_transaction of this.transactions){
            if(each_transaction.transaction_id === id){
                return each_transaction;
            }
        }
    }

    mapTransactionDescriptions(){
        let transactions_descriptions = [];
        for(const each_transaction of this.transactions){
            transactions_descriptions.push(each_transaction.transaction_description);
        }
        return transactions_descriptions;
    }

};



//////////////////////////////////////////// Ниже код для проверки

const transactionAnalyzer_1 = new TransactionAnalyzer(transactions_import);

//transactionAnalyzer_1.addTransaction();
//console.log(transactionAnalyzer_1.transactions[transactions.length-1]);
//console.log(transactionAnalyzer_1.transactions[transactions.length-1].string());

//console.log(transactionAnalyzer_1.getAllTransaction());
//console.log(transactionAnalyzer_1.getUniqueTransactionType());
//console.log(transactionAnalyzer_1.calculateTotalAmount());
//console.log(transactionAnalyzer_1.calculateTotalAmountByDate(year, month, day));

//console.log(transactionAnalyzer_1.getTransactionByType(type));
//console.log(transactionAnalyzer_1.getTransactionsInDateRange(startDate, endDate));
//console.log(transactionAnalyzer_1.getTransactionsByMerchant(merchantName));
//console.log(transactionAnalyzer_1.calculateAverageTransactionAmount());

//console.log(transactionAnalyzer_1.getTransactionsByAmountRange(minAmount, maxAmount));
//console.log(transactionAnalyzer_1.calculateTotalDebitAmount());
//console.log(transactionAnalyzer_1.findMostTransactionsMonth());
//console.log(transactionAnalyzer_1.findMostDebitTransactionMonth());

//console.log(transactionAnalyzer_1.mostTransactionTypes());
//console.log(transactionAnalyzer_1.getTransactionsBeforeDate(date));
//console.log(transactionAnalyzer_1.findTransactionById(id));
//console.log(transactionAnalyzer_1.mapTransactionDescriptions());