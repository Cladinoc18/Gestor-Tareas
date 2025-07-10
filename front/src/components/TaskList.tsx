import { useState } from "react";
import type { Task } from "../types/task";

interface TaskFormProps {
    tasks: Task[];
    onTaskUpdated: (taskId: number, status: Task["status"]) => void;
    onTaskDeleted: (taskId: number) => void;
    onSuggestPriority: (taskId: number) => void;
}

export const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted, onSuggestPriority }: TaskFormProps) => {
    const [loadingTasks, setLoadingTasks] = useState<Set<number>>(new Set());

    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <p>No hay tareas</p>
                <p>¡Crea tu primera tarea para comenzar!</p>
            </div>
        );
    }
    
    const handleSuggestPriority = async (taskId: number) => {
        setLoadingTasks(prev => new Set(prev).add(taskId));
        try {
            await onSuggestPriority(taskId);
        } finally {
            setLoadingTasks(prev => {
                const newSet = new Set(prev);
                newSet.delete(taskId);
                return newSet;
            });
        }
    };
    
    return (
        <div className="task-list">
            {tasks.map((task) => (
                <div 
                    key={task.id} 
                    className={`task-card priority-${task.priority || 'medium'}`}
                    data-status={task.status}
                >
                    <h3>{task.title}</h3>
                    {task.description && <p>{task.description}</p>}
                    <div className="task-actions">
                        <select
                            value={task.status}
                            onChange={(e) => onTaskUpdated(task.id, e.target.value as Task["status"])}
                        >
                            <option value="pendiente">Pendiente</option>
                            <option value="en proceso">En progreso</option>
                            <option value="finalizado">Completada</option>
                        </select>
                        <button 
                            onClick={() => handleSuggestPriority(task.id)}
                            disabled={loadingTasks.has(task.id)}
                        >
                            {loadingTasks.has(task.id) ? "Pensando..." : "Sugerir Prioridad (AI)"}
                        </button>
                        <button onClick={() => onTaskDeleted(task.id)}>
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};