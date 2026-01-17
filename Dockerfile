# Stage 1: Build assets (Vite/NPM)
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Final Production Image
# Gamit ang serversideup image na optimized para sa Laravel
FROM serversideup/php:8.3-fpm-nginx AS final

# I-set ang working directory
WORKDIR /var/www/html

# I-copy ang application code
COPY --chown=www-data:www-data . .
COPY --from=build-stage --chown=www-data:www-data /app/public/build ./public/build

# Install Composer dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# I-set ang tamang permissions para sa Laravel
RUN chmod -R 775 storage bootstrap/cache

# Port 80 ang standard para sa NGINX sa container na ito
EXPOSE 8081

# Environment variables optimization
ENV PHP_OPCACHE_ENABLE=1
