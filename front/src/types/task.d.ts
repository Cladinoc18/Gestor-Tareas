export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'pendiente' | 'en proceso' | 'finalizado';
    created_at: string;
    priority?: 'alta' | 'media' | 'baja';
}