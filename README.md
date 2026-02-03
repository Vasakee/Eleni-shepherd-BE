# Clean NestJS Application

A minimal, clean NestJS application with essential packages and setup.

## Features

- **NestJS 9** - Core framework
- **Swagger/OpenAPI** - API documentation at `/docs`
- **Redis Caching** - Via `@nestjs/cache-manager` with `cache-manager-redis-store`
- **MongoDB** - Via Mongoose
- **Configuration** - Env-based config with `@nestjs/config`
- **Response Interfaces** - Standard response structure (`IAppResponse`)
- **Validation** - Class validator and transformer
- **Filters** - Response filter for consistent API responses

## Project Structure

```
apps/
  app/
    src/
      app.controller.ts    - Main health endpoint
      app.module.ts        - Root module
      app.service.ts       - Core service
      main.ts              - Bootstrap entry
      
libs/
  common/
    src/
      configuration/       - Environment configuration
      database/           - MongoDB/Mongoose setup
      filters/            - Response filter
      interfaces/         - Response interfaces (IAppResponse)
      pipes/              - Validation pipes
      utils/              - Utility functions
      dto/                - Empty (ready for your DTOs)
```

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn
- MongoDB instance
- Redis instance (optional, can use in-memory cache)

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file:

```env
NODE_ENV=development
APP_NAME=MyApp
PORT=3000
DATABASE_URL=mongodb://localhost:27017/mydb
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
CORS_ORIGIN=*
```

### Running the App

**Development:**
```bash
npm run build
npm run start
```
Or to run directly with node:
```bash
node dist/apps/app/main
```

**Production:**
```bash
npm run build
npm run start:prod
```

### API Documentation

Once running, visit: `http://localhost:3000/docs`

### Health Check

```bash
curl http://localhost:3000
# { "status": "ok" }
```

## Available Scripts

- `npm run build` - Build the application
- `npm run start` - Start the app
- `npm run start:dev` - Start in watch mode
- `npm run start:prod` - Run compiled production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm test` - Run tests

## Removed Components

The following have been removed for a clean slate:
- All feature modules (auth, user, wallet, etc.)
- Database models (use your own)
- Feature-specific DTOs
- Mailer, Cloudinary, Paystack integrations
- Event emitter, scheduler, JWT, Passport

## Next Steps

1. **Add your DTOs** in `libs/common/src/dto/`
2. **Create feature modules** in `apps/app/src/`
3. **Define your models** with Mongoose schemas
4. **Configure Redis** in `.env` or use in-memory cache
5. **Add your business logic**

## License

UNLICENSED
