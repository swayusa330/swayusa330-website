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

    fetchStockPrice(); // Initial fetch
    setInterval(fetchStockPrice, 5000); // Update every 5 seconds

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) {
        console.error("⚠️ Menu toggle button or nav menu not found in the document.");
        return; // Stop script if elements are missing
    }

    // Click event to show/hide menu
    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('nav-active');
    });

    // Close menu when clicking on a menu item
    document.querySelectorAll('.nav-menu ul li a').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('nav-active');
        });
    });
});
