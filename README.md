# Proyecto de ejemplo - Prueba técnica Woow

Este repositorio contiene una aplicación full‑stack construida con **Node/Express** en el backend y **React + Vite** en
el frontend. El objetivo principal es demostrar una arquitectura limpia, validación de datos con Zod, autenticación/
autorización basada en JWT y un diseño de base de datos escalable.

---

## 🚀 Descripción del proyecto

La aplicación ofrece un sistema básico de gestión de usuarios con roles (ADMIN/USER). Los usuarios pueden registrarse,
iniciar sesión y editar su perfil; los administradores pueden listar, modificar y eliminar otros usuarios.

El monorepo está organizado con `pnpm` y contiene paquetes compartidos (`domain`, `contracts`) utilizados por ambas
capas.

## 🧰 Prerrequisitos

Antes de empezar, asegúrate de tener instalados:

- **Node.js** (recomendado v18 o superior)
- **pnpm** (se usa como gestor de paquetes monorepo)
- **PostgreSQL** (v12+)

Adicionalmente necesitarás `psql` o cualquier cliente SQL para ejecutar los scripts de creación/seed de la base.

## ⚙️ Instalación paso a paso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/prueba-tecnica-woow.git
   cd prueba-tecnica-woow
   ```

2. Instala las dependencias de todo el monorepo:
   ```bash
   pnpm install
   ```

3. Copia el archivo de ejemplo de variables de entorno para el backend (`apps/backend/.env.example`) y ajústalo. Valores
   típicos:
   ```ini
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=secret
   DB_NAME=woow_test
   JWT_SECRET=clave-secreta-de-32-o-mas-caracteres
   JWT_REFRESH_SECRET=otra-clave-secreta
   BCRYPT_SALT_ROUNDS=10
   ```

4. Asegúrate de que PostgreSQL esté corriendo y accesible.

## 🗄️ Crear la base de datos

Desde un cliente `psql`:

```sql
CREATE DATABASE woow_test;
\c woow_test
\i path/to/apps/backend/database/schema.sql
\i path/to/apps/backend/database/seed.sql
```

> También puedes ejecutar los archivos con cualquier otra herramienta como PgAdmin.

Los scripts crean las tablas `roles` y `users`, índices, triggers y poblan dos usuarios de prueba.

## ▶️ Ejecutar el proyecto

### Backend

1. Ve a la carpeta del backend:
   ```bash
   cd apps/backend
   ```
2. Inicia el servidor en modo desarrollo (reinicios automáticos con `ts-node-dev`):
   ```bash
   pnpm run dev
   ```
3. El API quedará disponible en `http://localhost:3000` (o el puerto configurado).

### Frontend

1. Abre otra terminal y ve a la carpeta del frontend:
   ```bash
   cd apps/frontend
   ```
2. Instala las dependencias si no se hizo ya (cuentas con pnpm en la raíz, pero puedes ejecutar `pnpm install` aquí si
   es necesario).
3. Inicia la aplicación de React:
   ```bash
   pnpm run dev
   ```
4. Visita `http://localhost:5173` (o la URL que muestre Vite) para ver la interfaz.

## 📡 Endpoints disponibles

La API REST tiene los siguientes puntos:

| Método | Ruta                 | Descripción                        | Autorización |
|--------|----------------------|------------------------------------|--------------|
| POST   | `/api/auth/login`    | Iniciar sesión                     | pública      |
| POST   | `/api/auth/register` | Registrar usuario                  | pública      |
| PUT    | `/api/auth/password` | Cambiar contraseña                 | autenticado  |
| GET    | `/api/users/`        | Listar usuarios                    | ADMIN        |
| GET    | `/api/users/me`      | Obtener datos del usuario logueado | autenticado  |
| PUT    | `/api/users/me`      | Actualizar datos propios           | autenticado  |
| PUT    | `/api/users/:id`     | Actualizar usuario por ID          | autenticado  |
| DELETE | `/api/users/:id`     | Eliminar usuario (soft delete)     | ADMIN        |

> Nota: la ruta base (`/api`) puede configurarse en el servidor; ajústala según tu `server.ts`.

### Ejemplos de uso con `curl`

```bash
# login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@woow.com","password":"password"}'

# obtener perfil (reemplaza TOKEN por el JWT obtenido)
curl http://localhost:3000/api/users/me \
  -H "Authorization: Bearer TOKEN"

# listar usuarios como admin
curl http://localhost:3000/api/users/ \
  -H "Authorization: Bearer TOKEN_ADMIN"
```

## 👤 Credenciales de prueba

El script de seed crea dos cuentas iniciales:

| Rol   | Email          | Contraseña (plain) |
|-------|----------------|--------------------|
| ADMIN | admin@woow.com | `Password@123`     |
| USER  | user@woow.com  | `Password@123`     |

Puedes usarlas para explorar los permisos y comportamientos de la aplicación.

## 📚 Notas finales

- Para cambiar la contraseña de prueba, usa el endpoint `PUT /api/auth/password` mientras estás autenticado.
- El frontend consume los mismos contratos `packages/contracts` usados en el backend, garantizando consistencia de
  tipos.
- El código está preparado para ampliar funcionalidades (paginación, filtros, más roles, etc.).