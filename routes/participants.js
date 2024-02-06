var express = require("express");
var router = express.Router();
const CyclicDb = require("@cyclic.sh/dynamodb");
const db = CyclicDb(process.env.CYCLIC_DB);
const Participants = db.collection("participants");

const validateInput = require("../public/javascripts/validateInput");

// returns all participants in the database
router.get("/", async (req, res) => {
  try {
    let item = await Participants.list();
    res.status(200).json({ status: "success", data: item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Returning the personal details of all active participants
router.get("/details", async (req, res) => {
  try {
    let activeUsers = await Participants.filter({ active: true });
    res.status(200).json({ status: "success", data: activeUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Returns soft-deleted participants from the database.
router.get("/details/deleted", async (req, res) => {
  try {
    let deletedUsers = await Participants.filter({ active: false });
    res.status(200).json({ status: "success", data: deletedUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Returns active, non-deleted participant's personal details.
router.get("/details/:email", async (req, res) => {
  try {
    let userEmail = req.params.email;
    let participant = await Participants.item(userEmail).get();
    if (participant?.props?.active) {
      res.status(200).json({ status: "success", data: participant });
    } else {
      res.status(404).json({ error: "Participant not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Returns active, non-deleted participant's work details.
router.get("/details/work/:email", async (req, res) => {
  try {
    let userEmail = req.params.email;
    let participant = await Participants.item(userEmail).get();
    if (participant?.props?.active) {
      res.status(200).json({ status: "success", data: participant.props.work });
    } else {
      res.status(404).json({ error: "Participant not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Returns active, non-deleted participant's home details.
router.get("/details/home/:email", async (req, res) => {
  try {
    let userEmail = req.params.email;
    let participant = await Participants.item(userEmail).get();
    if (participant?.props?.active) {
      res.status(200).json({ status: "success", data: participant.props.home });
    } else {
      res.status(404).json({ error: "Participant not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Post a new participant
router.post("/add", async function (req, res, next) {
  const error = validateInput(req.body);
  if (error) {
    return res.status(400).json({ error: error });
  }
  try {
    const { email, firstName, lastName, dob, work, home } = req.body;
    const existingParticipant = await Participants.get(email);
    if (existingParticipant) {
      return res.status(400).json({ error: "Participant already exists" });
    }
    const active = true;
    await Participants.set(email, {
      firstName,
      lastName,
      dob,
      active,
      work,
      home,
    });
    res.status(200).json({
      status: "success",
      data: {
        message: "Participant created.",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Soft-Deletes a participant from the database.
router.delete("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const participant = await Participants.get(email);
    if (!participant) {
      return res.status(404).json({ error: "Participant not found" });
    }
    await Participants.set(email, {
      active: false,
    });
    res.status(200).json({ status: "success", data: "Participant deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Updates a participant's details.
router.put("/:email", async function (req, res, next) {
  const error = validateInput(req.body);
  if (error) {
    return res.status(400).json({ error: error });
  }
  try {
    const email = req.params.email;
    const { firstName, lastName, dob, work, home } = req.body;
    const existingParticipant = await Participants.get(email);
    if (!existingParticipant) {
      return res.status(404).json({ error: "Participant not found" });
    }
    const active = existingParticipant.active;
    await Participants.set(email, {
      firstName,
      lastName,
      dob,
      active,
      work,
      home,
    });
    res.status(200).json({
      status: "success",
      data: {
        message: "Participant updated.",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
