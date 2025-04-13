# Community Nexus

### 1. ขั้นการติดตั้ง Docker สำหรับฐานข้อมูล

```bash
docker compose up -d
```

### 2. ขั้นการ Migrate ฐานข้อมูล

```bash
pnpm install

cd apps/api

pnpm migration:up
pnpm seed
```

### 3. ขั้นการรันระบบ

```bash
pnpm dev
```

### 4. เข้าถึงระบบ

```bash
API: http://localhost:4000
Web: http://localhost:3000

username: admin
password: password
```

### Application Architecture

    .
    ├── apps
    │   ├── api                       # NestJS app (https://nestjs.com).
    │   └── web                       # Next.js app (https://nextjs.org).
    └── packages
        ├── @repo/api                 # Shared `NestJS` resources.
        ├── @repo/eslint-config       # `eslint` configurations (includes `prettier`)
        ├── @repo/jest-config         # `jest` configurations
        ├── @repo/typescript-config   # `tsconfig.json`s used throughout the monorepo
        └── @repo/ui                  # Shareable stub React component library.

### Libraries

- [NestJS](https://nestjs.com) - Framework
- [NextJS](https://nextjs.org) - Framework
- [TypeORM](https://typeorm.io) - ORM Database
- [TypeScript](https://www.typescriptlang.org) - Programming Language
- [Ant Design](https://ant.design) - UI Library
- [React Query](https://tanstack.com/query/latest/docs/framework/react/react-native) - Data Fetching
- [Lodash](https://lodash.com) - Utility Library
- [Dayjs](https://dayjs.io) - Date Library
- [Argon2](https://argon2.net) - Password Hashing
- [MySQL](https://www.mysql.com) - Relational Database
- [JWT](https://jwt.io) - Authentication

### Unit Testing
# community-nexus
