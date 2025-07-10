import db from '../config/database';
import { Request, Response } from 'express';
import { completeDescription, generateTasksSummary, suggestPriority } from '../services/ai.service';

export const getTasks = async (req: Request, res: Response) => {
    try {
        const { rows } = await db.query('SELECT * FROM tasks ORDER BY created_at ASC');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
};

export const createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    if(!title) {
        return res.status(400).json({ error: 'El título es obligatorio' });
    }
    try {
        const query = 'INSERT INTO tasks (title, description) VALUES ($1, $2)';
        const params = [title, description];
        const { rows } = await db.query(query, params);
        res.status(201).json(rows[0]);
        res.status(200).json({message:"Tarea creada con exito"});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (status && !['pendiente', 'en proceso', 'finalizado'].includes(status)) {
        return res.status(400).json({ error: 'error' });
    }

    try {
        const query = `
            UPDATE tasks
            SET 
                title = COALESCE($1, title),
                description = COALESCE($2, description),
                status = COALESCE($3, status)
            WHERE id = $4
            RETURNING *
            `;
        const params = [title, description, status, id];
        const { rows, rowCount } = await db.query(query, params);

        if (rowCount === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.status(200).json(rows[0]);

    }catch(error){
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const { rowCount } = await db.query('DELETE FROM tasks WHERE id = $1', [id]);
        if (rowCount === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};

export const getTasksSummary = async (req: Request, res: Response) => {
    try {
        const result = await db.query("SELECT title, description FROM tasks WHERE status = 'pendiente'");
        console.log("Query result:", result);
        const tasks = result.rows;
        console.log("tasks:", tasks);
        console.log("Es array:", Array.isArray(tasks));
        const summary = await generateTasksSummary(tasks);
        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el resumen de las tareas' });
    }
};

export const getPriority = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const taskResult = await db.query("SELECT title, description FROM tasks WHERE id = $1", [id]);
        if (taskResult.rowCount === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        const task = taskResult.rows[0];
        const priority = await suggestPriority(task.title, task.description);
        res.status(200).json(priority);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la prioridad de la tarea' });
    }
};

export const getCompleteDescription = async (req: Request, res: Response) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'El título es obligatorio' });
    }
    try {
        const description = await completeDescription(title, "");
        res.status(200).json(description);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la prioridad de la tarea' });
    }
}