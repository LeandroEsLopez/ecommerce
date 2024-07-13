# Dockerfile para Render
FROM docker/compose:1.29.2

# Copiar el archivo docker-compose.yml y otros archivos necesarios
COPY docker-compose.yml .
COPY ./user-service ./user-service
COPY ./product-service ./product-service
COPY ./order-service ./order-service
COPY ./nginx ./nginx

# Define la ubicación del archivo docker-compose.yml
ENV COMPOSE_FILE=docker-compose.yml

# Ejecuta Docker Compose
CMD ["docker-compose", "up"]
