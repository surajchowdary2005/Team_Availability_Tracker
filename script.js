
const teamGrid = document.getElementById("teamGrid");
const totalCount = document.getElementById("totalCount");
const availableCount = document.getElementById("availableCount");
const busyCount = document.getElementById("busyCount");
const awayCount = document.getElementById("awayCount");
const lastUpdated = document.getElementById("lastUpdated");
const message = document.getElementById("message");
const refreshBtn = document.getElementById("refreshBtn");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

let teamMembers = [];

async function loadTeam() {
  try {
    message.textContent = "Loading team members...";

    const response = await fetch("/api/team");

    if (!response.ok) {
      throw new Error("API request failed: " + response.status);
    }

    teamMembers = await response.json();

    console.log("Team members loaded:", teamMembers);

    totalCount.textContent = teamMembers.length;
    availableCount.textContent =
      teamMembers.filter(member => member.status === "Available").length;
    busyCount.textContent =
      teamMembers.filter(member => member.status === "Busy").length;
    awayCount.textContent =
      teamMembers.filter(member => member.status === "Away").length;

    renderTeam();

    lastUpdated.textContent =
      "Last updated: " + new Date().toLocaleTimeString();

    message.textContent = "";
  } catch (error) {
    console.error("Team loading error:", error);
    message.textContent = "Could not load team data. Check browser console.";
  }
}

function renderTeam() {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const selectedStatus = statusFilter.value;

  const filteredTeam = teamMembers.filter(member => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm) ||
      member.role.toLowerCase().includes(searchTerm);

    const matchesStatus =
      selectedStatus === "All" || member.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  teamGrid.innerHTML = "";

  if (filteredTeam.length === 0) {
    teamGrid.textContent = "No team members found.";
    return;
  }

  filteredTeam.forEach(member => {
    const card = document.createElement("article");
    card.className = "member-card";

    const top = document.createElement("div");
    top.className = "member-top";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = member.name
      .split(" ")
      .map(word => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const info = document.createElement("div");
    info.className = "member-info";

    const name = document.createElement("h3");
    name.textContent = member.name;

    const role = document.createElement("p");
    role.textContent = member.role;

    info.append(name, role);
    top.append(avatar, info);

    const statusRow = document.createElement("div");
    statusRow.className = "status-row";

    const badge = document.createElement("span");
    badge.className = "badge " + member.status.toLowerCase();
    badge.textContent = member.status;

    const select = document.createElement("select");
    select.className = "status-select";
    select.setAttribute("aria-label", "Change status for " + member.name);

    ["Available", "Busy", "Away"].forEach(status => {
      const option = document.createElement("option");
      option.value = status;
      option.textContent = status;
      option.selected = member.status === status;
      select.appendChild(option);
    });

    select.addEventListener("change", () => {
      updateStatus(member.id, select.value);
    });

    statusRow.append(badge, select);
    card.append(top, statusRow);
    teamGrid.appendChild(card);
  });
}

async function updateStatus(memberId, status) {
  try {
    message.textContent = "Saving status...";

    const response = await fetch(`/api/team/${memberId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Status update failed");
    }

    message.textContent = "Status updated successfully!";
    await loadTeam();
    message.textContent = result.member.name + "'s status updated!";
  } catch (error) {
    console.error("Status update error:", error);
    message.textContent = "Status update failed: " + error.message;
  }
}

searchInput.addEventListener("input", renderTeam);
statusFilter.addEventListener("change", renderTeam);
refreshBtn.addEventListener("click", loadTeam);

loadTeam();
setInterval(loadTeam, 5000);
