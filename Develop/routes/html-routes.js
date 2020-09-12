const path = require("path");
const express = require("express");

module.exports = function(app) {
    // route to he index.html page
    app.get("/", (req,res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    // route to the stats.html page
    app.get("/stats", (req,res) => {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });
    // route to the exercise.html page
    app.get("/exercise?", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });
}