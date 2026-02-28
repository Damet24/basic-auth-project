## Decisiones tomadas

### Selección de librerías

- **Express**: framework ligero y ampliamente conocido para construir APIs REST. Me permite concentrarme en la lógica sin demasiada configuración.
- **Zod**: usado tanto en backend como en frontend para validación y tipado de datos. Esto evita duplicar esquemas y facilita mantener coherencia en los DTOs.
- **Bcrypt**: para hashear contraseñas con sal y proteger contra ataques de fuerza bruta.
- **jsonwebtoken**: gestión de tokens JWT para autenticación y autorización.
- **PostgreSQL**: base de datos relacional robusta con buen soporte para UUID y triggers que aprovecho para `updated_at`.

La decisión de utilizar estas librerías estuvo guiada por su madurez, comunidad y facilidad de integración con TypeScript.

### Diseño de la base de datos y escalabilidad

- Se crearon tablas `roles` y `users` separadas con índices parciales (`WHERE deleted_at IS NULL`) para optimizaciones de consultas "soft delete".
- Un trigger centralizado (`update_updated_at_column`) se asegura de que `updated_at` se actualice sin repetir lógica en el backend.
- Las tablas y el esquema fueron preparados pensando en una expansión futura (más roles, migraciones, shards, etc.).

### Desafíos enfrentados

1. **Sincronizar esquemas entre backend y frontend**: resolverlo con Zod permitió compartir definiciones.
2. **Gestión de tipos en un monorepo con pnpm**: ajustar `tsconfig` y dependencias para que los paquetes (`domain`, `contracts`) se importaran correctamente.
3. **Autorización basada en roles**: implementar middleware que verifica `UserRole.ADMIN` y se integra con el contexto de solicitudes.
4. **Manejo de contraseñas y timing attacks**: asegurar comparar hashes (using `bcrypt.compare`) y no devolver información específica si falla un login.

### Qué mejoraría con más tiempo

- Añadir registros de auditoría para cambios de usuario y más operaciones críticas.
- Implementar rate limiting y protección contra ataques de fuerza bruta en endpoints de auth.
- Completar el frontend con más tests de integración y manejar expiración/refresh de JWT de forma automática.
- Definir un pipeline de CI/CD para pruebas, linting y despliegues automáticos.

### Escalabilidad futura

- Desacoplar el servicio de autenticación en un microservicio independiente.
- Migrar la base de datos a una infraestructura gestionada (RDS/Azure) y habilitar réplicas de lectura.
- Usar un sistema de caché (Redis) para tokens, sesiones o respuestas de usuarios frecuentes.
- Añadir paginación y filtros a los endpoints de listado de usuarios.

---

**Notas adicionales existentes**

- Se tiene en cuenta las tablas de roles y usuarios para cuando se desee escalar.

- Se implementó un trigger en PostgreSQL para manejar automáticamente el campo updated_at, garantizando consistencia independientemente de la capa que ejecute la actualización y evitando duplicación de lógica en el backend.

- Utilicé Zod para reutilizar los schemas y DTOs en el back y el front.

- Consideraciones sobre timing attack en comparaciones de contraseñas.
