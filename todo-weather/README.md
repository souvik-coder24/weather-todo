# Weather & Todo App

A feature-rich Weather & Todo app that allows users to check real-time weather updates for any location with dynamic animations and manage their tasks efficiently with authentication and priority settings. Built with **React, Redux, and Local Storage** for persistent data.

## Features

### Weather Module
- Search for any city's weather.
- Displays temperature, humidity, wind speed, and weather type.
- Dynamic animations based on weather conditions.

### Todo Module
- **User Authentication (Login/Register)** using Redux and Local Storage.
- **Secure Todo Management** - Only logged-in users can add, update, or delete tasks.
- **Priority-based tasks** (High, Medium, Low) to organize efficiently.
- **Local Storage Persistence** - Tasks are stored for logged-in users.
- **Tasks Hidden on Logout** - When a user logs out, tasks are hidden but reappear upon login.

## Tech Stack 
- **Frontend:** React, Redux Toolkit
- **State Management:** Redux
- **Storage:** Local Storage (for user authentication & task persistence)
- **Styling:** CSS Modules

## Installation & Usage 

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/weather-todo-app.git
   cd weather-todo-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the application:
   ```sh
   npm start
   ```

4. Open **http://localhost:3000** in your browser.

## Screenshots 

![Weather Module](./screenshots/weather.png)
*Weather feature with dynamic animations.*

![Todo Module](./screenshots/todo.png)
*Secure Todo list with priority-based tasks.*

## Folder Structure 
```
weather-todo-app/
│-- src/
│   │-- components/
│   │   │-- Weather/
│   │   │-- Todo/
│   │-- redux/
│   │   │-- authSlice.js
│   │   │-- taskSlice.js
│   │-- App.js
│   │-- index.js
│-- public/
│-- package.json
```

## Contributing 
Feel free to contribute! Fork the repo and create a pull request with your improvements.

**Enjoy using the Weather & Todo App!**
