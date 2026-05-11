import { useEffect, useState } from "react";
import "./App.css";

import { db } from "./firebase";

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const tasksCollection = collection(db, "tasks");

  const getTasks = async () => {
    const data = await getDocs(tasksCollection);

    setTasks(
      data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
    );
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (!task) return;

    await addDoc(tasksCollection, {
      title: task,
    });

    setTask("");
    getTasks();
  };

  const deleteTask = async (id) => {
    const taskDoc = doc(db, "tasks", id);

    await deleteDoc(taskDoc);

    getTasks();
  };

  const updateTask = async (id, oldTitle) => {
    const newTitle = prompt("Edit task", oldTitle);

    if (!newTitle) return;

    const taskDoc = doc(db, "tasks", id);

    await updateDoc(taskDoc, {
      title: newTitle,
    });

    getTasks();
  };

  return (
    <div className="container">
      <h1>Todo App</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <h3>{task.title}</h3>

          <div className="actions">
            <button onClick={() => updateTask(task.id, task.title)}>
              Edit
            </button>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;