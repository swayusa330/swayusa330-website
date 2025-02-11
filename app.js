document.addEventListener("DOMContentLoaded", function () {
    // Get the username from localStorage to personalize the journal
    const username = localStorage.getItem("username") || "Trader";
    document.getElementById("usernameDisplay").innerText = username;

    // Load user's trades from localStorage (username-specific)
    let trades = JSON.parse(localStorage.getItem(username + "_trades") || "[]");

    // Load Calendar
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: "dayGridMonth",
        events: trades,
        selectable: true,
        dateClick: function(info) {
            openTradeForm(info.dateStr);
        },
        eventClick: function(info) {
            openTradeForm(info.event.start.toISOString().split('T')[0], info.event);
        },
        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek"
        }
    });
    calendar.render();

    // Function to Open Trade Entry Form (New Trade or Edit)
    window.openTradeForm = function(date, event = null) {
        document.getElementById("tradeDate").value = date;
        document.getElementById("tradeTicker").value = event ? event.extendedProps.ticker : "";
        document.getElementById("tradeType").value = event ? (event.extendedProps.amount > 0 ? "Win" : "Loss") : "Win";
        document.getElementById("tradeAmount").value = event ? event.extendedProps.amount : "";
        document.getElementById("tradeNotes").value = event ? event.extendedProps.notes : "";

        document.getElementById("tradeForm").setAttribute("data-event-id", event ? event.id : "");
        document.getElementById("tradeForm").style.display = "block";
    };

    // Function to Close Trade Entry Form
    window.closeTradeForm = function() {
        document.getElementById("tradeForm").style.display = "none";
    };

    // Function to Save Trade (specific to user)
    window.saveTrade = function() {
        let date = document.getElementById("tradeDate").value;
        let ticker = document.getElementById("tradeTicker").value.toUpperCase();
        let type = document.getElementById("tradeType").value;
        let amount = document.getElementById("tradeAmount").value;
        let notes = document.getElementById("tradeNotes").value;
        let tradeId = document.getElementById("tradeForm").getAttribute("data-event-id");

        if (!ticker || !amount) {
            alert("Please enter a ticker symbol and an amount.");
            return;
        }

        if (tradeId) {
            trades = trades.filter(trade => trade.id !== tradeId);
        }

        let tradeData = {
            id: Date.now().toString(),
            title: `${ticker} - ${type} ($${amount})`,
            start: date,
            extendedProps: { ticker, amount, notes },
            classNames: [type === "Win" ? "win-event" : "loss-event"]
        };

        trades.push(tradeData);
        localStorage.setItem(username + "_trades", JSON.stringify(trades));

        calendar.removeAllEvents();
        trades.forEach(trade => calendar.addEvent(trade));

        alert("Trade saved successfully!");
        closeTradeForm();
    };

    // Function to Delete Trade
    window.deleteTrade = function() {
        let tradeId = document.getElementById("tradeForm").getAttribute("data-event-id");

        if (!tradeId) {
            alert("No trade selected to delete.");
            return;
        }

        trades = trades.filter(trade => trade.id !== tradeId);
        localStorage.setItem(username + "_trades", JSON.stringify(trades));

        let event = calendar.getEventById(tradeId);
        if (event) {
            event.remove();
        } else {
            console.error("Trade not found in calendar:", tradeId);
        }

        calendar.removeAllEvents();
        trades.forEach(trade => calendar.addEvent(trade));

        alert("Trade deleted successfully!");
        closeTradeForm();
    };

    // Function to Fetch Bitcoin Price
    function fetchBitcoinPrice() {
        fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
            .then(response => response.json())
            .then(data => {
                document.getElementById("bitcoin-price").innerText = `Bitcoin Price: $${data.bpi.USD.rate}`;
            })
            .catch(error => console.error("Error fetching Bitcoin price:", error));
    }

    fetchBitcoinPrice();
    setInterval(fetchBitcoinPrice, 60000); // Refresh price every minute

    // Mobile Hamburger Menu Toggle
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        document.querySelector('.nav-menu').classList.toggle('active');
    });
});
