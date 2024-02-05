var express = require("express");
var router = express.Router();
const CyclicDb = require("@cyclic.sh/dynamodb");
const db = CyclicDb(process.env.CYCLIC_DB);
const Participants = db.collection("participants");

const validateInput = require("../public/javascripts/validateInput");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let item = await Participants.list();
  res.send(item);
});

router.post("/", async function (req, res, next) {
  const error = validateInput(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const { email, firstName, lastName, dob, work, home } = req.body;
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

module.exports = router;
