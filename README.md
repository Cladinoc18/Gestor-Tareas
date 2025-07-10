# Sistema de Gestión de Tareas con IA
Este es un proyecto full-stack que implementa un sistema de gestión de tareas colaborativo. Incluye una API RESTful en el backend y una interfaz de usuario reactiva en el frontend, con funcionalidades inteligentes impulsadas por la API de Google Gemini.

## Características
Gestión de Tareas (CRUD): Crear, leer, actualizar y eliminar tareas.

Filtrado por Estado: Visualiza las tareas según su estado: pendiente, en progreso o completada.

IA - Resumen Inteligente: Genera un resumen ejecutivo de todas las tareas pendientes.

IA - Sugerencia de Prioridad: Analiza una tarea existente y sugiere un nivel de prioridad (alta, media, baja) basado en su contenido.

IA - Autocompletado de Descripción: Genera una descripción detallada para una nueva tarea a partir de un simple título.

Interfaz Responsiva: Interfaz de usuario funcional y agradable para interactuar con el sistema.


## Setup y Puesta en Marcha

Sigue estos pasos para levantar el proyecto en tu entorno local.

Prerrequisitos
- Node.js: Versión 18.x o superior.

- npm (o un gestor de paquetes alternativo como Yarn o pnpm).

- Una instancia de PostgreSQL en ejecución.

- (Opcional) pgAdmin 4 para gestionar la base de datos.

# 1. Configuración del Backend

Primero, configura la API que servirá los datos.

### 1. Clona el repositorio y navega a la carpeta del backend
```
cd back
```
### 2. Instala las dependencias
```
npm install
```
### 3. Crea el archivo de variables de entorno

Crea un archivo .env (en la raiz de la carperta back) y añade las siguientes variables:


```
# Puerto para el servidor de la API
PORT=3000
# URL de conexión a tu base de datos PostgreSQL
DATABASE_URL="postgresql://user:password@host:port/database_name"
# Tu clave de API de Google Gemini
GEMINI_API_KEY="AQUI_PEGA_TU_CLAVE_SECRETA"
```

Configura la base de datos: Conéctate a tu instancia de PostgreSQL y ejecuta el siguiente script SQL para crear la tabla de tareas.
```
CREATE TYPE task_status AS ENUM ('pendiente', 'en progreso', 'completada');

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status task_status DEFAULT 'pendiente',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

# 2. Configuración del Frontend
Ahora, configura la interfaz de usuario.



### 1. Desde la raíz del proyecto, navega a la carpeta del frontend
```
cd ../front
```

### 2. Instala las dependencias
```
npm install
```
# 3. Ejecución de la Aplicación
Debes tener dos terminales abiertas para correr el backend y el frontend simultáneamente.

Terminal 1 (Backend):

```
# Navega a la carpeta del backend
cd back

# Inicia el servidor
npm run dev
```
La API estará disponible en http://localhost:3000

Terminal 2 (Frontend):

```

# Navega a la carpeta del frontend
cd front

# Inicia la aplicación de React
npm run dev
```
La aplicación web estará disponible en http://localhost:5173 (o el puerto que indique Vite).

Eso es todo.
