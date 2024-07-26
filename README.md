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
