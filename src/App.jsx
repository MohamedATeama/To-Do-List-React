import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleAddTask = () => {
    const text = newTaskText.trim();
    if (!text) return;

    const newTask = {
      id: Date.now(),
      text,
      done: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setNewTaskText('');
  };

  const handleToggleDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesFilter =
      filterStatus === 'all'
        ? true
        : filterStatus === 'done'
        ? task.done
        : !task.done;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="app">
      <h1 className="title">To Do List</h1>

      <div className="controls">
        <div className="add-task">
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleAddTask}>Add</button>
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className="filter-buttons">
            <button
              className={filterStatus === 'all' ? 'active' : ''}
              onClick={() => setFilterStatus('all')}
            >
              All
            </button>
            <button
              className={filterStatus === 'done' ? 'active' : ''}
              onClick={() => setFilterStatus('done')}
            >
              Done
            </button>
            <button
              className={filterStatus === 'not_done' ? 'active' : ''}
              onClick={() => setFilterStatus('not_done')}
            >
              Not Done
            </button>
          </div>
        </div>
      </div>

      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <li className="empty">No tasks to show.</li>
        ) : (
          filteredTasks.map((task) => (
            <li key={task.id} className={`task ${task.done ? 'done' : ''}`}>
              <div className="task-main">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => handleToggleDone(task.id)}
                />
                <span>{task.text}</span>
              </div>
              <button
                className="delete"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;
