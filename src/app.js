const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;
app.use(express.json());
app.use(express.urlencoded())
//TODO: Create a GET /musicians route to return all musicians 
app.get("/musicians", async (req, res) => {
    const musicians = await Musician.findAll({});
    // Send musicians as converted to a JSON string .
    res.json(musicians);
})

//TODO: Create a GET /musicians route to return a specific musician
app.get("/musicians/:id", async (req, res) => {
      const musician = await Musician.findByPk(req.params.id);
      res.json(musician);
  })

// create a route to add a musician

app.post("/musicians", async (req, res) => {
    try {
        const musician = await Musician.create(req.body);
        if (!musician) {
          throw new Error("No musician created");
        }
        res.send(musician);
      } catch (error) {
        // needed for catching and handling async errors
        next(error);
      }
    });

// create a route to update a musician

app.put("/musicians/:id", async (req, res, next) => {
    try {
      const musician = await Musician.findByPk(req.params.id);
      if (!musician) {
        throw new Error('user not found');
      }
      const updatedMusician = await musician.update(req.body)
      res.json(updatedMusician);
    } catch (error) {
      next(error)
    }
  })

app.delete("/musicians/:id", async (req, res, next) => {
    try {
        const musician = await Musician.findByPk(req.params.id);
        if (!musician) {
          throw new Error('user not found');
        }
        const deletedMusician = await musician.destroy()
        res.json(deletedMusician);
      } catch (error) {
        next(error)
      }
    })

module.exports = app;