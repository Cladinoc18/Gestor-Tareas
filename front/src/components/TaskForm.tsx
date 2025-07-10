import { useState } from "react";
import { getCompleteDesc } from "../services/api";

interface TaskFormProps {
    onTaskCreated: (title: string, description: string) => void;
}

export const TaskForm = ({ onTaskCreated }: TaskFormProps) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        await onTaskCreated(title, description);
        setTitle("");
        setDescription("");
        window.location.reload();
    }

    const handleAutocomplete = async () => {
        if(!title.trim()) return;
        setLoading(true);
        try{
            const response = await getCompleteDesc(title);
            setDescription(response.data);
        }catch(error){
            console.error('Error al obtener la descripción de la tarea:', error);
        }finally{
            setLoading(false);
        }
        
    }
    return (
        <div className="task-form">
            <h3>Añadir nueva tarea</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Título de la tarea"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <div className="button-group">
                    <button type="button" onClick={handleAutocomplete} disabled={loading}>
                        {loading ? "Pensando..." : "Obtener descripción (IA)"}
                    </button>
                </div>
                <textarea
                    placeholder="Descripción de la tarea (opcional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <div className="button-group">
                    <button type="submit" disabled={loading}>Crear tarea</button>
                </div>
            </form>
        </div>
    )
}
