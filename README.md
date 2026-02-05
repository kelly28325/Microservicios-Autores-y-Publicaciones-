 # Arquitectura de Microservicios – Gestión de Autores y Publicaciones

## Descripción del Proyecto
Este proyecto implementa una arquitectura de microservicios para la gestión de autores y publicaciones académicas.
Incluye un frontend web, dos microservicios backend y un modelo BPMN que describe el flujo del proceso.

## Arquitectura
- **authors-service**: Gestión de autores (nombre y email)
- **publications-service**: Gestión de publicaciones y estados
- **frontend**: Aplicación web en React
- **bpmn**: Modelo BPMN del proceso de publicación

## Estructura del Repositorio
```
/authors-service
/publications-service
/frontend
/bpmn
docker-compose.yml
README.md
```

## Tecnologías Utilizadas
- Java 17
- Spring Boot
- JPA / Hibernate
- PostgreSQL
- React + Vite
- Material UI
- Docker & Docker Compose

## Ejecución del Proyecto
1. Clonar el repositorio
2. Ubicarse en la raíz del proyecto
3. Ejecutar:
```bash
docker compose up --build
```
4. Acceder a:
- Frontend: http://localhost:5173
- Authors API: http://localhost:8081
- Publications API: http://localhost:8082

## Endpoints Principales
### Authors
- GET /authors
- POST /authors

### Publications
- GET /publications
- POST /publications
- PATCH /publications/{id}/status

## BPMN
El modelo BPMN describe el flujo desde la creación de una publicación, revisión, aprobación y publicación final.

## Notas
Proyecto desarrollado con fines académicos siguiendo principios de arquitectura de microservicios.
