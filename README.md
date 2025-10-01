# Plataforma E-commerce Full-Stack

¡Bienvenido! Este es el repositorio de una moderna plataforma de e-commerce full-stack. El proyecto está diseñado con una arquitectura de monorepo, separando claramente el backend y el frontend.

## Tecnologías Utilizadas

- **Frontend**: [Next.js](https://nextjs.org/) (un framework de React) con [Tailwind CSS](https://tailwindcss.com/) para los estilos.
- **Backend**: [NestJS](https://nestjs.com/) (un framework de Node.js) para construir una API RESTful robusta.
- **Base de Datos**: [PostgreSQL](https://www.postgresql.org/), una potente base de datos relacional de código abierto.
- **Contenerización**: [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/) para gestionar y ejecutar la base de datos de forma sencilla.
- **ORM**: [TypeORM](https://typeorm.io/) para interactuar con la base de datos desde el backend.

---

## Estructura del Proyecto

Este proyecto es un monorepo, lo que significa que contiene varios sub-proyectos en un solo repositorio.

- `/api`: Contiene todo el código del **backend** (la API de NestJS).
- `/web`: Contiene todo el código del **frontend** (la aplicación de Next.js).

Cada directorio tiene sus propias dependencias y scripts, definidos en su propio archivo `package.json`.

---

## Guía de Instalación y Ejecución

Sigue estos pasos para descargar, configurar y ejecutar el proyecto en tu ordenador.

### 1. Prerrequisitos

Antes de empezar, asegúrate de tener instalado el siguiente software:

- **Git**: Para clonar el repositorio. [Descargar Git](https://git-scm.com/downloads).
- **Node.js y npm**: Para gestionar las dependencias y ejecutar los proyectos. Se recomienda la versión LTS. [Descargar Node.js](https://nodejs.org/).
- **Docker Desktop**: Para ejecutar la base de datos PostgreSQL en un contenedor. Es la forma más fácil de empezar sin instalar PostgreSQL manualmente. [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop).

### 2. Instalación

#### Paso 2.1: Clonar el Repositorio

Abre una terminal (como Git Bash, PowerShell o la Terminal de tu sistema) y clona el repositorio en tu máquina:

```bash
git clone <URL_DEL_REPOSITORIO_DE_GITHUB>
```

Luego, navega al directorio del proyecto que acabas de clonar:

```bash
cd <NOMBRE_DEL_DIRECTORIO_DEL_PROYECTO>
```

#### Paso 2.2: Configurar el Backend (`api`)

1.  Navega al directorio del backend:
    ```bash
    cd api
    ```
2.  Crea tu propio archivo de variables de entorno a partir del ejemplo. Este archivo **no se sube a GitHub** y contiene información sensible.
    -   En Mac/Linux:
        ```bash
        cp .env.example .env
        ```
    -   En Windows (CMD o PowerShell):
        ```bash
        copy .env.example .env
        ```
3.  Instala todas las dependencias del backend:
    ```bash
    npm install
    ```

#### Paso 2.3: Configurar el Frontend (`web`)

1.  Desde la raíz del proyecto, navega al directorio del frontend:
    ```bash
    cd web
    # Si estabas en /api, puedes usar `cd ../web`
    ```
2.  Crea el archivo de variables de entorno para el frontend a partir del ejemplo:
    -   En Mac/Linux:
        ```bash
        cp .env.local.example .env.local
        ```
    -   En Windows (CMD o PowerShell):
        ```bash
        copy .env.local.example .env.local
        ```
3.  Instala todas las dependencias del frontend:
    ```bash
    npm install
    ```

### 3. Ejecución de la Aplicación

Para que la aplicación funcione, necesitas tener tres procesos ejecutándose al mismo tiempo: la base de datos, el backend y el frontend. Se recomienda usar tres ventanas de terminal separadas para esto.

#### Paso 3.1: Iniciar la Base de Datos

1.  Asegúrate de que Docker Desktop esté en ejecución.
2.  En una terminal, desde la **raíz del proyecto**, ejecuta el siguiente comando:
    ```bash
    docker-compose up -d
    ```
    - `up` crea e inicia el contenedor.
    - `-d` (detached) lo ejecuta en segundo plano.
    - La primera vez, Docker descargará la imagen de PostgreSQL, lo que puede tardar unos minutos.

#### Paso 3.2: Iniciar el Servidor del Backend

1.  Abre una **nueva terminal**.
2.  Navega al directorio del backend:
    ```bash
    cd api
    ```
3.  Ejecuta el script para iniciar el servidor en modo de desarrollo (se reiniciará automáticamente si haces cambios en el código):
    ```bash
    npm run start:dev
    ```
    - Deberías ver un mensaje indicando que el servidor NestJS se está ejecutando, normalmente en el puerto 3001.

#### Paso 3.3: Iniciar el Servidor del Frontend

1.  Abre una **tercera terminal**.
2.  Navega al directorio del frontend:
    ```bash
    cd web
    ```
3.  Ejecuta el script para iniciar el servidor de desarrollo de Next.js:
    ```bash
    npm run dev
    ```
    - Deberías ver un mensaje indicando que el servidor está listo, normalmente en `http://localhost:3000`.

### 4. Acceder a la Aplicación

¡Todo listo! Abre tu navegador web y ve a la siguiente dirección:

[http://localhost:3000/register](http://localhost:3000/register)

Deberías ver el formulario de registro que hemos creado. ¡Ya puedes probar a registrar un nuevo usuario!