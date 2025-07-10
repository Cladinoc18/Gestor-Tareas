import axios from 'axios'
import type { Task } from '../types/task'

const API_URL = 'http://localhost:3000/api'

type CreateTaskData = {
    title: string
    description: string
}
type UpdateTaskData = {
    status?: Task["status"]
}

export const getAllTasks = async () => {
    return await axios.get<Task[]>(`${API_URL}/tasks`)
}

export const createTask = async (taskData: CreateTaskData) => {
    return await axios.post<Task>(`${API_URL}/tasks`, taskData)
}

export const updateTask = async (id: number, taskData: UpdateTaskData) => {
    return await axios.put<Task>(`${API_URL}/tasks/${id}`, taskData)
}
export const deleteTask = async (id: number) => {
    return await axios.delete(`${API_URL}/tasks/${id}`)
}

export const getTasksSummary = async () => {
    return await axios.get<string>(`${API_URL}/tasks/summary`)
}

export const getCompleteDesc = async (title: string) => {
    return await axios.post<string>(`${API_URL}/tasks/complete`, { title })
}

export const getPriority = async (id: number) => {
    return await axios.get<string >(`${API_URL}/tasks/${id}/priority`)
}

