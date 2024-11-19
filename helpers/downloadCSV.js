const Papa = require('papaparse');

const convertToCSV = (data) => {

    const dataList = Object.values(data);

    // collect all keys from data
    let allKeys = [];
    dataList.forEach(entry => {
        Object.keys(entry).forEach(key => {
            if (!allKeys.includes(key)) {
                allKeys.push(key);
            }
        });
    });

    // convert data to CSV format
    const csvData = dataList.map(entry => {
        const row = [];
        allKeys.forEach(key => {
            // if key exists, add it to row
            if (entry.hasOwnProperty(key)) {
                row.push(entry[key]);
            } else {
                // if key doesn't exist, add null
                row.push(null);
            }
        });
        return row;
    });

    csvData.unshift(allKeys);

    // convert to CSV
    return Papa.unparse(csvData, { delimiter: ';' });
};

module.exports = convertToCSV;
