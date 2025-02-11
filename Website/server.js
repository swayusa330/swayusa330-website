// server.js (Node.js + Express API backend)
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("trading_journal.db", (err) => {
    if (err) console.error(err.message);
    else console.log("Connected to SQLite database.");
});

db.run(`CREATE TABLE IF NOT EXISTS trades (
    id TEXT PRIMARY KEY,
    date TEXT,
    ticker TEXT,
    type TEXT,
    amount REAL,
    notes TEXT
)`);

app.get("/trades", (req, res) => {
    db.all("SELECT * FROM trades", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post("/trades", (req, res) => {
    const { id, date, ticker, type, amount, notes } = req.body;
    db.run(
        `INSERT INTO trades (id, date, ticker, type, amount, notes) VALUES (?, ?, ?, ?, ?, ?)`,
        [id, date, ticker, type, amount, notes],
        (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Trade saved successfully!" });
        }
    );
});

app.delete("/trades/:id", (req, res) => {
    db.run("DELETE FROM trades WHERE id = ?", req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Trade deleted successfully!" });
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));

// Frontend JavaScript for journal.html with Black & White Theme
const API_URL = "http://localhost:3000/trades";

document.addEventListener("DOMContentLoaded", fetchTrades);

async function fetchTrades() {
    try {
        let response = await fetch(API_URL);
        let trades = await response.json();
        calendar.removeAllEvents();
        trades.forEach(trade => {
            calendar.addEvent({
                id: trade.id,
                title: `${trade.ticker} - ${trade.type} ($${trade.amount})`,
                start: trade.date,
                extendedProps: trade,
                classNames: [trade.type === "Win" ? "win-event" : "loss-event"]
            });
        });
    } catch (error) {
        console.error("Error fetching trades:", error);
    }
}

async function saveTrade() {
    let trade = {
        id: Date.now().toString(),
        date: document.getElementById("tradeDate").value,
        ticker: document.getElementById("tradeTicker").value.toUpperCase(),
        type: document.getElementById("tradeType").value,
        amount: parseFloat(document.getElementById("tradeAmount").value),
        notes: document.getElementById("tradeNotes").value,
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trade),
        });
        alert("Trade logged successfully!");
        closeTradeForm();
        calendar.addEvent({
            id: trade.id,
            title: `${trade.ticker} - ${trade.type} ($${trade.amount})`,
            start: trade.date,
            extendedProps: trade,
            classNames: [trade.type === "Win" ? "win-event" : "loss-event"]
        });
    } catch (error) {
        console.error("Error saving trade:", error);
    }
}

async function deleteTrade() {
    let tradeId = document.getElementById("tradeForm").getAttribute("data-event-id");
    if (!tradeId) return alert("No trade selected to delete.");

    try {
        await fetch(`${API_URL}/${tradeId}`, { method: "DELETE" });
        alert("Trade deleted successfully!");
        calendar.getEventById(tradeId).remove();
        closeTradeForm();
    } catch (error) {
        console.error("Error deleting trade:", error);
    }
}

window.closeTradeForm = function () {
    document.getElementById("tradeForm").style.display = "none";
    document.getElementById("tradeForm").removeAttribute("data-event-id");
};
