document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const homeButton = document.querySelector('.home-button'); // Home button for PC

    function updateMenuVisibility() {
        if (window.innerWidth <= 768) {
            menuToggle.style.display = "block"; // Show hamburger on mobile
            if (homeButton) homeButton.style.display = "none"; // Hide Home button on mobile
        } else {
            menuToggle.style.display = "none"; // Hide hamburger on PC
            if (homeButton) homeButton.style.display = "block"; // Show Home button on PC
            navMenu.classList.remove('nav-active'); // Close menu if switching to PC
        }
    }

    // Run function on load and resize
    updateMenuVisibility();
    window.addEventListener("resize", updateMenuVisibility);

    if (menuToggle && navMenu) {
        // Toggle menu on button click
        menuToggle.addEventListener('click', function (event) {
            event.stopPropagation();
            navMenu.classList.toggle('nav-active');
            menuToggle.classList.toggle('active');

            // Change icon from ☰ to ✖ when menu is active
            menuToggle.innerHTML = navMenu.classList.contains('nav-active') ? "✖" : "☰";
        });

        // Close menu when clicking a menu link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function () {
                navMenu.classList.remove('nav-active');
                menuToggle.classList.remove('active');
                menuToggle.innerHTML = "☰"; // Reset to burger icon
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove('nav-active');
                menuToggle.classList.remove('active');
                menuToggle.innerHTML = "☰"; // Reset to burger icon
            }
        });
    }
});
