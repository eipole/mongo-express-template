const express = require("express")
const router = express.Router()
const Kassid = require("../models/kassid")

// Getting all
router.get("/", async (req, res) => {
  try {
    const kassid = await Kassid.find()
    res.json(kassid)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
// Getting One
router.get("/:id", getCats, (req, res) => {
  res.json(res.cats)
})
//Creating one. Kassid = kassids on db
router.post("/", async (req, res) => {
  const kass = new Kassid({
    name: req.body.name
  })
  try {
    const newKassid = await kass.save()
    res.status(201).json(newKassid)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})
// Updating One
router.patch("/:id", getCats, async (req, res) => {
  if (req.body.name != null) {
    res.cats.name = req.body.name
  }
  // if (req.body.<someBoolean>  != null) {
  //   res.cats.<someBoolean>  = req.body.<someBoolean>
  // }
  try {
    const updatedCats = await res.cats.save()
    res.json(updatedCats)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Deleting One
router.delete("/:id", getCats, async (req, res) => {
  try {
    await res.cats.remove()
    res.json({ message: "Deleted kass/cat" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getCats(req, res, next) {
  let cats
  try {
    cats = await Kassid.findById(req.params.id)
    if (cats == null) {
      return res.status(404).json({ message: "Cannot find subscriber" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.cats = cats
  next()
}
module.exports = router
