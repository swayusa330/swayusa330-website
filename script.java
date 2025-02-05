document.addEventListener("DOMContentLoaded", function () {
    // Fetch Bitcoin Price
    async function fetchStockPrice() {
        try {
            let response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
            let data = await response.json();
            let bitcoinPrice = Number(data.bpi.USD.rate.replace(/,/g, "")).toFixed(2);
            document.getElementById('stock-price').innerText = `Bitcoin Price: $${bitcoinPrice}`;
        } catch (error) {
            document.getElementById('stock-price').innerText = "Error fetching Bitcoin Price";
        }
    }
    fetchStockPrice();
    setInterval(fetchStockPrice, 5000);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu'); // Corrected selector

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('nav-active'); // Toggle menu

            // Ensure body content is pushed down when menu is open
            if (navMenu.classList.contains('nav-active')) {
                document.body.style.paddingTop = "150px"; // Adjust based on menu height
            } else {
                document.body.style.paddingTop = "70px"; // Default padding
            }
        });

        // Close menu when clicking on a menu item
        document.querySelectorAll('.nav-menu ul li a').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('nav-active');
                document.body.style.paddingTop = "70px"; // Reset padding
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('nav-active');
                document.body.style.paddingTop = "70px"; // Reset padding
            }
        });
    } else {
        console.error("⚠️ Menu toggle button or navigation menu not found in the document.");
    }
});
