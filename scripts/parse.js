const lodash = require('lodash');
const fs = require('fs');

const data = fs.readFileSync('scripts/input/data.csv').toString().split('\n');

const INCOMING = 'Bij';
const OUTGOING = 'Af';

const CODES = {
	BA: 'terminal',
	GM: 'atm',
	GT: 'online banking',
	IC: 'debt collection',
	OV: 'transfer',
	////////////////////////////
	ST: 'deposit',
	PK: 'recording office',
	PO: 'periodic transfer',
	VZ: 'collective payment',
	FL: 'branch booking',
	GF: 'telephone banking',
	AC: 'acceptgiro',
	DV: 'misc',
};

const clean = (s) => s.replace(/"/g, '');

const total = (transactions) => transactions.reduce((sum, t) => sum + t.amount, 0);

const transactions = data.map(row => {
	const transaction = row.split('","').map(clean);
	const dateString = transaction[0];
	const date = `${dateString.substr(0, 4)}-${dateString.substr(4, 2)}-${dateString.substr(6, 2)}`;
	return {
		date,
		timeStamp: new Date(date).getTime(),
		name: transaction[1],
		toAccount: transaction[3],
		code: transaction[4],
		type: CODES[transaction[4]],
		outgoing: transaction[5] === OUTGOING,
		incoming: transaction[5] === INCOMING,
		amount: transaction[6] ? parseFloat(transaction[6].replace(',', '.')) : 0,
		notes: transaction[8],
	}
});

fs.writeFileSync('src/transactions.json', JSON.stringify(transactions, null, 2));

const outgoingTransactions = transactions.filter(t => t.outgoing && !t.name.includes('Elzoheiry'));
const incomingTransactions = transactions.filter(t => t.incoming);
const totalOut = total(outgoingTransactions);
const totalIn = total(incomingTransactions);
// console.log(totalOut);
// console.log(totalIn);

const fashiontradeTransactions = incomingTransactions.filter(t => t.name.includes('Fashiontrade'));
console.log(fashiontradeTransactions.length);
console.log(total(fashiontradeTransactions));
// console.log(filteredTransactions);


// const input = process.stdin;
// input.setEncoding('utf-8');
// input.on('data', function (data) {
// 	console.log('User Input Data : ' + data);
// 	process.exit();
// });