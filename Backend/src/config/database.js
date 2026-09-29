const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Force Node.js to use Google's DNS

const mongoose = require('mongoose');

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Database");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

module.exports = connectToDB;