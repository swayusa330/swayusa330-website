document.addEventListener("DOMContentLoaded", function () {
    // Fetch Bitcoin Price
    async function fetchStockPrice() {
        try {
            let response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
            let data = await response.json();
            let bitcoinPrice = Number(data.bpi.USD.rate.replace(/,/g, "")).toFixed(2);
            document.getElementById('stock-price').innerText = `Bitcoin Price: $${bitcoinPrice}`;
        } catch (error) {
            console.error("⚠️ Error fetching Bitcoin Price:", error);
            document.getElementById('stock-price').innerText = "Error fetching Bitcoin Price";
        }
    }
    fetchStockPrice();
    setInterval(fetchStockPrice, 5000);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) {
        console.error("⚠️ Menu toggle button or nav menu not found.");
        return;
    }

    // Toggle menu when clicking button
    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('nav-active');
    });

    // Close menu when clicking a menu link
    document.querySelectorAll('.nav-menu ul li a').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('nav-active');
        });
    });
});
