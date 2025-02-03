// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".chart-container").classList.toggle("dark-chart");
}

// Bitcoin Price Data
let bitcoinPrices = [];
let timeLabels = [];

async function fetchStockPrice() {
    try {
        let response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
        let data = await response.json();
        let price = parseFloat(data.bpi.USD.rate.replace(",", ""));
        document.getElementById('stock-price').innerText = "Bitcoin Price: $" + price.toFixed(2);

        // Update Chart Data
        let now = new Date().toLocaleTimeString();
        if (bitcoinPrices.length > 10) {
            bitcoinPrices.shift();
            timeLabels.shift();
        }
        bitcoinPrices.push(price);
        timeLabels.push(now);
        updateChart();
    } catch (error) {
        document.getElementById('stock-price').innerText = "Bitcoin Price: Unavailable";
        console.error("Error fetching Bitcoin price:", error);
    }
}

// Call fetch function & update every 10 seconds
fetchStockPrice();
setInterval(fetchStockPrice, 10000);

// Create Bitcoin Chart
let ctx = document.getElementById('bitcoinChart').getContext('2d');
let bitcoinChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timeLabels,
        datasets: [{
            label: 'Bitcoin Price (USD)',
            data: bitcoinPrices,
            borderColor: '#33ff33',
            backgroundColor: 'rgba(51, 255, 51, 0.2)',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: { display: true },
            y: { beginAtZero: false }
        }
    }
});

// Function to Update Chart
function updateChart() {
    bitcoinChart.data.labels = timeLabels;
    bitcoinChart.data.datasets[0].data = bitcoinPrices;
    bitcoinChart.update();
}
