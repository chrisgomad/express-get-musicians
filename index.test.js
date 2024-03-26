// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    
    it("has an endpoint", async () => {
        // Sends request to `/musicians` endpoint
        const response = await request(app).get("/musicians");
        expect(response.statusCode).toBe(200);
    })

    it("has an id endpoint", async () => {
        // Sends request to `/musicians/:id` endpoint
        const response = await request(app).get("/musicians/:id");
        expect(response.statusCode).toBe(200);
    })
})