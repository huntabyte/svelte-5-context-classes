# Ai Dev Team

The goal is for each page to listen to a Redis (pubsub) store for that page.
On receiving application events on the channel, the page should update in real-time.
The Redis store is currently server side.

## Redis pubsub

The project uses Redis pubsub (see `src/lib/server/redis`) using `RedisMock` as in-memory Redis.

Currently `ioredis-mock` is used to substitute a real Redis database with an in-memory mock solution, ideal for testing.

`ioredis-mock` has [experimental support for browser usage](https://www.npmjs.com/package/ioredis-mock#browser-usage-experimental)

As in this example:

```js
import Redis from 'https://unpkg.com/ioredis-mock';

const redis = new Redis();
redis.set('foo', 'bar');
console.log(await redis.get('foo'));
```

However, the redis messages should ideally be shared via SSE (Server Side Events) or Websockets.
To communicate the messages of the `RedisStore` (in `redis-rune-store.svelte.ts`) to the client, we need an API with real-time events to act as the bridge.

## API

The API includes support for both a polling solution (GET request every 5 secs) and SSEs via ReadableStream.

- `routes/api/messages/+server.ts` - simple GET endpoint that can be used for polling. Subscribes to store and sends messages received back as response
- `routes/api/sse/+server.ts` - subscribes to store and sends received messages back as a `ReadableStream` (SSE)

See `routes/projects` folder with examples of client page implementations using both of these approaches.

- `routes/projects/page-sse.svelte` project client page that sets up an `EventSource` to listen to the SSE from the server and handle and display incoming project events
- `routes/projects/page.svelte` project client page that uses polling to call the GET endpoint every 5 secs to retrieve new project events (messages) to display

SvelteKit now supports SSE natively, as demonstrated in [ReadableStream for SSE](https://github.com/sveltejs/kit/issues/5344#issuecomment-1266398131) and [Full example](https://github.com/sveltejs/kit/issues/5344#issuecomment-2191106238)

This pattern is already encapsulated by [sveltekit-sse](https://github.com/razshare/sveltekit-sse) library which makes using SSE much easier!

## Flow pattern

The basic flow can be described as follows:

1. A Redis pubsub channel with application CRUD events for projects
2. A store subscribes to the pubsub channel and updates messages in the store.
3. An API subscribes to the store and publishes messages as SSE.
4. A Client pages listens to the SSE and updates the page.

```mermaid
graph LR
    A[Redis PubSub Channel] <-- subscribes --- B[Store]
    B <-- subscribes --- C[API]
    C -- publishes SSE --> D[Client Page]

    style A fill:#ff9999,stroke:#333,stroke-width:2px
    style B fill:#99ff99,stroke:#333,stroke-width:2px
    style C fill:#9999ff,stroke:#333,stroke-width:2px
    style D fill:#ffff99,stroke:#333,stroke-width:2px

    B -->|Updates| B
    D -->|Updates| D
```

## TODO

1. Make the polling page work.
2. Replace polling page solution with SSE page
3. Integrate `sveltekit-sse` library in API
4. Cleanup
5. Integrate on other pages
6. Make it possible to navigate between the pages based on the underlying model.

When a new Project event is received, update an underlying Projects model.
When a new project is added to the organization, an item should be displayed on the Projects page with info on the project and when clicking on this item, it should open the Project page for that project based on the id (slug) of that project.

For now the following basic model should be the target.

```ts
class Organization {
    name: string
    projects: Record<string, Project>
    backlog: Backlog
}

class Project {
    name: string
    teams: Record<string, Team>

}

class Team {
    name: string
    teams: Record<string, Member>
    backlog: Backlog
}

class Member {
    name: string
}

class Backlog {
    features: Record<string, Feature>
    tasks: Record<string, Task>
}

...
```

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
