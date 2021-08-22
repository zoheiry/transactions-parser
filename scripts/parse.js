const fs = require('fs');
const { clean } = require('./utils');

const INPUT_FILE = 'scripts/input/data.csv';
const OUTPUT_FILE = 'src/transactions.json';
const LOOKUP_TABLE = 'scripts/input/lookup-table.csv';

const data = fs.readFileSync(INPUT_FILE).toString().split('\n');
const lookupTableRows = fs.readFileSync(LOOKUP_TABLE).toString().split('\n');
const lookupTable = lookupTableRows.map(row => {
	const [_count, name, category] = row.split(';');
	return {
		name,
		category: category || 'unknown',
	}
});

const INCOMING = 'Credit';
const OUTGOING = 'Debit';

const CODES = {
	BA: 'terminal',
	GM: 'atm',
	GT: 'online banking',
	IC: 'debt collection',
	OV: 'transfer',
	ST: 'deposit',
	PK: 'recording office',
	PO: 'periodic transfer',
	VZ: 'collective payment',
	FL: 'branch booking',
	GF: 'telephone banking',
	AC: 'acceptgiro',
	DV: 'misc',
	ID: 'ideal',
};

const getCategory = (name) => {
	const { category } = lookupTable.find(entry => entry.name === name) || {};
	return category || 'unknown';
};

const transactions = data.map(row => {
	const transaction = row.split('";"').map(clean);
	const dateString = transaction[0];
	const name = transaction[1];
	const date = `${dateString.substr(0, 4)}-${dateString.substr(4, 2)}-${dateString.substr(6, 2)}`;
	const incoming = transaction[5] === INCOMING;
	const outgoing = transaction[5] === OUTGOING;
	const amountInCents = transaction[6] ? parseFloat(transaction[6].replace(',', '.')).toFixed(2) * 100 : 0;
	
	return {
		date,
		timeStamp: new Date(date).getTime(),
		name: name,
		toAccount: transaction[3],
		code: transaction[4],
		type: CODES[transaction[4]],
		outgoing,
		incoming,
		amountInCents: incoming ? amountInCents : amountInCents * -1,
		notes: transaction[8],
		category: getCategory(name),
	}
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(transactions, null, 2));