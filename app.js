const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Data Storage
let items = []; // Each item: { id, text, priority }

let idCounter = 1;

// Home route
app.get("/", (req, res) => {
    const filter = req.query.priority || "All";
    const filteredItems = filter === "All" ? items : items.filter(i => i.priority === filter);
    res.render("list", { items: filteredItems, filter });
});

// Add todo
app.post("/add", (req, res) => {
    const { ele1, priority } = req.body;
    if (ele1.trim()) {
        items.push({ id: idCounter++, text: ele1, priority });
    }
    res.redirect("/");
});

// Delete todo
app.post("/delete", (req, res) => {
    const id = parseInt(req.body.id);
    items = items.filter(item => item.id !== id);
    res.redirect("/");
});

// Edit todo
app.post("/edit", (req, res) => {
    const { id, newText } = req.body;
    const item = items.find(i => i.id == id);
    if (item && newText.trim()) {
        item.text = newText;
    }
    res.redirect("/");
});

app.listen(8000, () => console.log("Server started on port 8000"));
