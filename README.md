# Team Availability Tracker

A modern and responsive dashboard for managing team members' availability in real time.

## Features

- View total team members.
- Track Available, Busy, and Away statuses.
- Update team member availability.
- Search team members by name or role.
- Filter team members by status.
- Automatically refresh team data.
- Responsive dashboard design.
- REST API for retrieving and updating team status.
- JSON file-based data storage.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- JSON

## Project Structure

```text
Team_Availability_Tracker/
├── data/
│   └── team.json
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── script.js
├── server.js
├── style.css
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/surajchowdary2005/Team_Availability_Tracker.git
```

### 2. Open the project folder

```bash
cd Team_Availability_Tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the application

```bash
npm start
```

### 5. Open in your browser

Visit `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/team` | Retrieve all team members |
| PATCH | `/api/team/:id/status` | Update a member's availability |

Supported statuses: `Available`, `Busy`, and `Away`.

## Data Storage

Team member information is stored in `data/team.json`. This version uses local JSON file storage rather than a database server.

For persistent production storage, a database such as PostgreSQL can be integrated.

## GitHub Repository

[Team Availability Tracker](https://github.com/surajchowdary2005/Team_Availability_Tracker)

## Live Demo

Add your Render deployment URL here after deployment is successful.

## Author

Suraj Chowdary

## License

This project is created for learning and educational purposes.