import { useEffect, useRef, useState } from "react";

function App() {
  const [task, setTask] = useState(" ");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Ambil data dari LocalStorage saat pertama kali load
  // useEffect(() => {
  //   const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  //   if (savedTasks) {
  //     setTasks(savedTasks);
  //   }
  // }, []);

  // Simpan ke localstorage setiap kali tasks berubah
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = { text: task, completed: false };
      setTasks([...tasks, newTask]);
      setTask("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "500px", margin: "auto" }}>
      <h1>To Do List</h1>
      <input
        ref={inputRef}
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

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((item, index) => (
          <li
            key={index}
            style={{ marginTop: "1rem", display: "flex", alignItems: "center" }}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTask(index)}
            />
            <span
              style={{
                marginLeft: "0.5rem",
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              {item.text}
            </span>
            <button
              onClick={() => deleteTask(index)}
              style={{ marginLeft: "auto" }}
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
