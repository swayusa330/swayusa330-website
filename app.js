document.addEventListener("DOMContentLoaded", function () {
    // Get the username from localStorage to personalize the journal
    const username = localStorage.getItem("username") || "Trader";
    document.getElementById("usernameDisplay").innerText = username;

    // Load user's trades from localStorage (username-specific)
    let trades = JSON.parse(localStorage.getItem(username + "_trades") || "[]");

    // Load Calendar
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: trades,
        selectable: true, // Allow date selection
        dateClick: function(info) {
            openTradeForm(info.dateStr);
        },
        eventClick: function(info) {
            showTradeDetails(info.event);
        },
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        }
    });
    calendar.render();

    // Function to Open Trade Entry Form
    window.openTradeForm = function(date) {
        document.getElementById("selectedDate").value = date;
        document.getElementById("tradePopup").style.display = "block";
    };

    // Function to Close Trade Entry Form
    window.closeTradeForm = function() {
        document.getElementById("tradePopup").style.display = "none";
    };

    // Function to Save Trade (specific to user)
    window.saveTrade = function() {
        let date = document.getElementById("selectedDate").value;
        let ticker = document.getElementById("tradeTicker").value.toUpperCase();
        let type = document.getElementById("tradeType").value;
        let amount = document.getElementById("tradeAmount").value;
        let notes = document.getElementById("tradeNotes").value;

        if (!ticker || !amount) {
            alert("Please enter a ticker symbol and an amount.");
            return;
        }

        let tradeData = {
            id: Date.now(),
            title: `${ticker} - ${type} ($${amount})`,
            start: date,
            extendedProps: { ticker: ticker, amount: amount, notes: notes },
            classNames: [type === "Win" ? "win-event" : "loss-event"],
        };

        trades.push(tradeData);
        localStorage.setItem(username + "_trades", JSON.stringify(trades)); // Save to user-specific key
        calendar.addEvent(tradeData);

        alert("Trade logged successfully!");
        closeTradeForm();
    };

    // Function to Show Trade Details with Delete Option
    function showTradeDetails(event) {
        const tradeDetails = `
            <div id="tradeDetailsModal">
                <h3>Trade Details</h3>
                <p><strong>Ticker:</strong> ${event.extendedProps.ticker}</p>
                <p><strong>Type:</strong> ${event.title}</p>
                <p><strong>Amount:</strong> $${event.extendedProps.amount}</p>
                <p><strong>Notes:</strong> ${event.extendedProps.notes || "None"}</p>
                <button id="deleteTradeBtn">Delete Trade</button>
                <button id="closeModalBtn">Close</button>
            </div>
        `;

        // Append modal to the body
        document.body.insertAdjacentHTML('beforeend', tradeDetails);

        // Close modal on clicking close button
        document.getElementById('closeModalBtn').addEventListener('click', function () {
            document.getElementById('tradeDetailsModal').remove();
        });

        // Attach delete functionality to the delete button
        document.getElementById('deleteTradeBtn').addEventListener('click', function () {
            if (confirm(`Are you sure you want to delete this trade?`)) {
                deleteTrade(event.id);
                document.getElementById('tradeDetailsModal').remove();  // Close the modal after deletion
            }
        });
    }

    // Function to Delete Trade (specific to user)
    function deleteTrade(tradeId) {
        trades = trades.filter((trade) => trade.id !== tradeId);
        localStorage.setItem(username + "_trades", JSON.stringify(trades)); // Save to user-specific key
        calendar.getEventById(tradeId)?.remove();
        alert("Trade deleted successfully!");
    }

    // Handle Login and Signup
    function login() {
        let username = document.getElementById("loginUsername").value;
        let password = document.getElementById("loginPassword").value;

        const storedUsername = localStorage.getItem("username");
        const storedPassword = localStorage.getItem(storedUsername + "_password");

        if (username === storedUsername && password === storedPassword) {
            alert("Logging in...");
            window.location.href = "journal.html"; // Redirect to journal page
        } else {
            alert("Incorrect username or password.");
        }
    }

    function signup() {
        let username = document.getElementById("signupUsername").value;
        let email = document.getElementById("signupEmail").value;
        let password = document.getElementById("signupPassword").value;

        if (username && email && password) {
            alert("Account Created! Redirecting...");
            localStorage.setItem("username", username); // Store username for personalization
            localStorage.setItem(username + "_password", password); // Store the password
            localStorage.setItem(username + "_trades", JSON.stringify([])); // Initialize an empty trades array for the user
            window.location.href = "journal.html"; // Redirect to journal page
        } else {
            alert("Please fill out all fields.");
        }
    }

    // Expose login/signup functions globally
    window.login = login;
    window.signup = signup;
});
