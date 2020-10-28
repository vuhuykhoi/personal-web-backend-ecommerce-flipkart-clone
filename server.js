require("dotenv/config");
require("./config/db");
var express = require("express");

var authRoutes = require("./routes/auth");
var adminRoutes = require("./routes/admin/auth");
var categoryRoutes = require("./routes/category");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/auth/admin", adminRoutes);
app.use("/api/category", categoryRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
