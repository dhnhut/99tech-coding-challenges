# 99Tech Backend problem 5, simple CRUD
## Description

This repo initialized by [Nest](https://github.com/nestjs/nest) framework and using TypeScript.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test
We do NOT have implement test at the moment.
```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Demo
### Create seed data
```bash
npx prisma db seed
```

### API list
Open Swagger [localhost:3000/api](localhost:3000/api) to see all impelement APIs
You can use the UI to test the API by click on `Try it out` button

![localhost:3000/api](/public/ScreenshotSwagger.png)

Or you can test directly via web browser

![localhost:3000/api](/public/ScreenshotChrome.png)

## TODO
There a plenty things to do to improve the code base like create `Decorator` and `DTO` (for strong type) for **filtering**, **ordering** and **pagination**

Unitest

e2eTest