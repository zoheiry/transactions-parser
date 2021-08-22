const fs = require('fs');
const { clean } = require('./utils');

const INPUT_FILE = 'scripts/input/data.csv';
const OUTPUT_FILE = 'scripts/input/grouped-transaction-names.csv';

const data = fs.readFileSync(INPUT_FILE).toString().split('\n');

// count the occurnces of a transaction name
const nameOccurences = data.reduce((groupedNames, row) => {
    const transaction = row.split('";"');
    const name = clean(transaction[1]);

    return {
        ...groupedNames,
        [name]: groupedNames[name] ? groupedNames[name] + 1 : 1,
    }
}, {});

const namesSortedByOccurence = Object.keys(nameOccurences).sort((a, b) => nameOccurences[a] < nameOccurences[b] ? 1 : -1);
const csvHeader = 'count;name';
const csvRows = namesSortedByOccurence.map(name => `${nameOccurences[name]};${name}`).join('\n');
const output = `${csvHeader}\n${csvRows}`;

fs.writeFileSync(OUTPUT_FILE, output);