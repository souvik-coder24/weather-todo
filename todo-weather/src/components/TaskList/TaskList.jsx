import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, updateTask } from "../../redux/taskSlice";
import { FaTrash, FaEdit } from "react-icons/fa";
import styles from "./TaskList.module.css";

const TaskList = () => {
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("low");

  const tasks = useSelector((state) => state.tasks.tasks || []);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const handleAddTask = () => {
    if (!user) {
      alert("Please login to save tasks.");
      return;
    }

    if (taskText.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      priority,
    };

    dispatch(addTask(newTask));
    setTaskText("");
  };

  const handleUpdateTask = (id, text) => {
    if (!user) {
      alert("Please login to update tasks.");
      return;
    }

    const newText = prompt("Edit your task:", text);
    if (newText) {
      dispatch(updateTask({ id, text: newText }));
    }
  };

  const handleRemoveTask = (id) => {
    if (!user) {
      alert("Please login to delete tasks.");
      return;
    }
    dispatch(removeTask(id));
  };

  return (
    <div className={styles.container}>
      <h2>Add a new task</h2>
      <div className={styles.inputContainer}>
        <textarea
          placeholder="Enter your task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className={styles.taskInput}
          rows={3}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={styles.prioritySelect}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <button className={styles.addButton} onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <div className={styles.taskList}>
        {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <div key={task.id} className={styles.task}>
              <span>{task.text} ({task.priority})</span>
              {user && (
                <div className={styles.buttonsContainer}>
                  <button
                    className={styles.updateButton}
                    onClick={() => handleUpdateTask(task.id, task.text)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleRemoveTask(task.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;