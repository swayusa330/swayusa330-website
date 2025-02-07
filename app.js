document.addEventListener("DOMContentLoaded", function () {
    // ===== Fetch Bitcoin Price =====
    async function fetchStockPrice() {
        try {
            let response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
            let data = await response.json();
            let bitcoinPrice = Number(data.bpi.USD.rate.replace(/,/g, "")).toFixed(2);
            const stockPriceElement = document.getElementById('stock-price');
            if (stockPriceElement) {
                stockPriceElement.innerText = `Bitcoin Price: $${bitcoinPrice}`;
            }
        } catch (error) {
            console.error("⚠️ Error fetching Bitcoin Price:", error);
            const stockPriceElement = document.getElementById('stock-price');
            if (stockPriceElement) {
                stockPriceElement.innerText = "Error fetching Bitcoin Price";
            }
        }
    }
    fetchStockPrice();
    setInterval(fetchStockPrice, 5000); // Refresh price every 5 seconds

    // ===== Mobile Menu Toggle =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) {
        console.error("⚠️ Menu toggle button or nav menu not found.");
        return;
    }

    // Toggle menu when clicking the menu button
    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('nav-active');
        menuToggle.classList.toggle('active'); // Optional: Add class for button animation
    });

    // Close menu when clicking a menu link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('nav-active');
            menuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside (for better user experience)
    document.addEventListener('click', function (event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('nav-active');
            menuToggle.classList.remove('active');
        }
    });
});
