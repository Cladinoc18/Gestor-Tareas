import { useState, useEffect } from 'react'
import type { Task } from './types/task'
import { createTask, deleteTask, getAllTasks, getPriority, getTasksSummary, updateTask } from './services/api';

import './App.css'
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await getAllTasks();
        setTasks(response.data);
        console.log('Tareas cargadas:', response.data);
      } catch (error) {
        console.error('Error al obtener las tareas:', error);
      }
    };

    loadTasks();

  }, []);

  const handleCreateTask = async (title: string, description: string) => {
    try {
      const response = await createTask({ title, description });
      setTasks([response.data, ...tasks]);
      console.log('Tarea creada:', response.data);
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleUpdateTask = async (taskId: number, status: Task["status"]) => {
    try {
      const response = await updateTask(taskId, { status });
      setTasks(tasks.map(task => (task.id === taskId ? response.data : task)));
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  const handleGenerateSumamry = async () => {
    setSummaryLoading(true);
    try {
      const response = await getTasksSummary();
      setSummary(response.data);
    } catch (error) {
      console.error('Error al obtener el resumen de tareas:', error);
    } finally {
      setSummaryLoading(false);
    }
  }
  
  const handleSuggestPriority = async (taskId: number) => {
    try {
      const response = await getPriority(taskId);
      console.log('Prioridad sugerida:', response.data);
      const priority = response.data as Task["priority"];
      setTasks(currentTasks => currentTasks.map(task => task.id === taskId ? { ...task, priority } : task));
    } catch (error) {
      console.error('Error al sugerir la prioridad de la tarea:', error);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>GESTOR DE TAREAS</h1>
      </header>
      <main>
        <TaskForm onTaskCreated={handleCreateTask} />
        
        {tasks.length > 0 && (
          <div className="summary-section">
            <button onClick={handleGenerateSumamry} disabled={summaryLoading}>
              {summaryLoading ? "Pensando..." : "Generar Resumen (IA)"}
            </button>
            {summary && <p>{summary}</p>}
          </div>
        )}
        
        <TaskList
          tasks={tasks}
          onTaskUpdated={handleUpdateTask}
          onTaskDeleted={handleDeleteTask}
          onSuggestPriority={handleSuggestPriority}
        />
      </main>
    </div>
  );
}
export default App
