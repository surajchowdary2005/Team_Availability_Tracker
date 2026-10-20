
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const dataFolder = path.join(__dirname, "data");
const dataFile = path.join(dataFolder, "team.json");

if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder, { recursive: true });
}

if (!fs.existsSync(dataFile)) {
  fs.writeFileSync(dataFile, "[]");
}

app.use(express.json());
app.use(express.static(__dirname));

function readTeam() {
  return JSON.parse(fs.readFileSync(dataFile, "utf8"));
}

function saveTeam(team) {
  fs.writeFileSync(dataFile, JSON.stringify(team, null, 2));
}

// Get all team members
app.get("/api/team", (req, res) => {
  res.json(readTeam());
});

// Update a member's status
app.patch("/api/team/:id/status", (req, res) => {
  const allowedStatuses = ["Available", "Busy", "Away"];
  const { status } = req.body;
  const team = readTeam();

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status. Use Available, Busy, or Away."
    });
  }

  const member = team.find(
    person => person.id === Number(req.params.id)
  );

  if (!member) {
    return res.status(404).json({
      message: "Team member not found."
    });
  }

  member.status = status;
  saveTeam(team);

  res.json({
    message: "Status updated successfully!",
    member
  });
});

app.listen(PORT, () => {
  console.log(`Team Availability Tracker running at http://localhost:${PORT}`);
});
