import { useState } from "react";

function App() {
  const [task, setTask] = useState(" ");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, task]);
      setTask("");
    }
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };
  return (
    <div style={{}}>
      <h1>To Do List</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tambahkan tugas"
        style={{ width: "100%", padding: "0.5rem" }}
      />
      <button onClick={addTask} style={{ marginTop: "1rem" }}>
        Tambah
      </button>

      <ul>
        {tasks.map((item, index) => (
          <li key={index} style={{ marginTop: "1rem" }}>
            {item}
            <button
              onClick={() => removeTask(index)}
              style={{ marginLeft: "1rem" }}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
