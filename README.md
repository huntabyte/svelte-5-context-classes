# Ai Dev Team

The goal is for each page to listen to a Redis (pubsub) store for that page.
On receiving application events on the channel, the page should update in real-time.
The Redis store is currently server side.

Currently `ioredis-mock` is used to substitute a real Redis database with an in-memory mock solution, ideal for testing.

ioredis has [experimental support for browser usage](https://www.npmjs.com/package/ioredis-mock#browser-usage-experimental)

```js
import Redis from 'https://unpkg.com/ioredis-mock';

const redis = new Redis();
redis.set('foo', 'bar');
console.log(await redis.get('foo'));
```

However, the redis messages should ideally be shared via SSE (Server Side Events) or Websockets.

The API includes support for both a polling solution (GET request every 5 secs) and SSEs via ReadableStream.

See `/projects` folder with examples of client page implementations using both of these approaches.

SvelteKit now supports SSE natively, as demonstrated in [ReadableStream for SSE](https://github.com/sveltejs/kit/issues/5344#issuecomment-1266398131) and [Full example](https://github.com/sveltejs/kit/issues/5344#issuecomment-2191106238)

This pattern is already encapsulated by [sveltekit-sse](https://github.com/razshare/sveltekit-sse) library which makes using SSE much easier!

## Design

Currently the project includes a simple Toast component. This component should be used to display (relevant) incoming messages (SSEs) on each page, which trigger updates to the underlying data model. In the future these events should also be subscribed to by a database "agent" which updates a database (f.ex using Drizzle ORM)

## Pages

- /account
- /dashboard
- /projects
- /projects/:id
- /projects/:id/teams
- /projects/:id/teams/:id
- /members
- /members/:id

## Architecture

When the basic communication infra is working, we need to setup basic CRUD messages to be communicated.

### Domain model and CRUD messages

An account belongs to an Organization.

### Organization

- Projects
- Members

Events:

- Create Project
- Delete Project
- Update Project

- Create Member
- Delete Member
- Update Member

#### Project

Each project can have

- Project Teams
- Project Backlog

Events:

- Create Team
- Delete Team
- Update Team

#### Team

Each team can have members from the organization assigned. Project backlog items can be assigned to a given team (backlog).
The items can then each be assigned to member(s)? to be worked on.

- Team Members
- Team Backlog

#### Member

Each member can work on tasks

#### Backlog

- Epic that can have features
- Feature that can have tasks
- Task where work is performed by the member (via AI agent using LLM)

## Project infra

This project is a PNPM project, so use:

- `pnpm run dev` to run dev server
- `pnpm add` to install dependencies

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
