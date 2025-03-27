import React, { useState } from "react";
import Weather from "./components/Weather/Weather";
import TaskList from "./components/TaskList/TaskList";
import Navbar from './components/Navbar/Navbar';
import styles from "./App.module.css";

const App = () => {
  const [weatherColor, setWeatherColor] = useState("#DE8800");

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.weather} style={{ backgroundColor: weatherColor }}>
          <Weather setWeatherColor={setWeatherColor} />
        </div>
        <div className={styles.todo}>
          <TaskList />
        </div>
      </div>
    </div>
  );
};

export default App;