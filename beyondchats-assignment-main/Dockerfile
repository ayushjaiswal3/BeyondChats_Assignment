FROM php:8.2-cli

# System dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libsqlite3-dev \
    sqlite3 \
    curl

# PHP extensions
RUN docker-php-ext-install pdo pdo_sqlite

# Set working directory
WORKDIR /app

# Copy backend only
COPY backend/ .

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Create SQLite DB
RUN mkdir -p database \
 && touch database/database.sqlite \
 && chmod -R 777 database storage bootstrap/cache

# Generate app key
RUN php artisan key:generate || true

# Expose Render port
EXPOSE 10000

# Start Laravel
CMD php artisan serve --host=0.0.0.0 --port=10000
