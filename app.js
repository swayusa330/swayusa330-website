document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ DOM Loaded - JavaScript is running!");

    // ===== Fetch Bitcoin Price =====
    async function fetchStockPrice() {
        try {
            let response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
            let data = await response.json();
            let bitcoinPrice = Number(data.bpi.USD.rate.replace(/,/g, "")).toFixed(2);
            
            const stockPriceElement = document.getElementById('stock-price');
            if (stockPriceElement) {
                stockPriceElement.innerText = `Bitcoin Price: $${bitcoinPrice}`;
                console.log("✅ Bitcoin price updated:", bitcoinPrice);
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
        console.error("⚠️ Menu toggle button or nav menu not found. Check your HTML structure.");
        return;
    }

    // Toggle menu when clicking the menu button
    menuToggle.addEventListener('click', function () {
        navMenu.classList.toggle('nav-active');
        menuToggle.classList.toggle('active');

        // Change button text/icon when toggled
        if (navMenu.classList.contains('nav-active')) {
            menuToggle.innerHTML = "✖"; // Close icon
        } else {
            menuToggle.innerHTML = "☰"; // Burger icon
        }

        console.log("🍔 Menu button clicked. Menu active:", navMenu.classList.contains('nav-active'));
    });

    // Close menu when clicking a menu link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('nav-active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = "☰"; // Reset to burger icon

            console.log("🔗 Menu link clicked. Menu closed.");
        });
    });

    // Close menu when clicking outside the menu
    document.addEventListener('click', function (event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            navMenu.classList.remove('nav-active');
            menuToggle.classList.remove('active');
            menuToggle.innerHTML = "☰"; // Reset to burger icon

            console.log("🖱️ Clicked outside menu. Menu closed.");
        }
    });
});
