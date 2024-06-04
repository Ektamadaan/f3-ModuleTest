const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

let cryptoData = [];

// Fetch data using .then
function fetchDataThen() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            cryptoData = data;
            renderTable(cryptoData);
        })
        .catch(error => console.error('Error fetching data with .then:', error));
}

// Fetch data using async/await
async function fetchDataAsync() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        cryptoData = data;
        renderTable(cryptoData);
    } catch (error) {
        console.error('Error fetching data with async/await:', error);
    }
}

// Render the data in a table
function renderTable(data) {
    const tableBody = document.getElementById('crypto-table');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        let text = "green";
        if(item.price_change_percentage_24h<0)
            text = "red";
        
        
        row.innerHTML = `
            <td class = "first"><img src="${item.image}" alt="${item.name}" width="20"></td>
            <td>${item.name}</td>
            <td>${item.symbol.toUpperCase()}</td>
            <td>$${item.current_price}</td>
            <td>$${item.total_volume}</td>
            <td class=`+text+`>${item.price_change_percentage_24h}%</td>
            
            <td>Mkt cap: $${item.market_cap}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Search data based on user input
function searchData() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredData = cryptoData.filter(coin => coin.name.toLowerCase().includes(searchTerm));
    renderTable(filteredData);
}

// Sort data
function sortData(criteria) {
    const sortedData = [...cryptoData]; // Create a copy of the data

    if (criteria === 'market_cap') {
        sortedData.sort((a, b) => b.market_cap - a.market_cap);
    } else if (criteria === 'percentage_change') {
        sortedData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    }

    renderTable(sortedData);
}

// Initialize the data fetch
fetchDataThen(); // Or use fetchDataAsync();
