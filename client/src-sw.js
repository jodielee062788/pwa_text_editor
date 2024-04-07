const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache and route all the assets specified in the Workbox manifest file
precacheAndRoute(self.__WB_MANIFEST);

// Create a CacheFirst strategy for caching pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    // Plugin to cache responses based on status codes
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    // Plugin for expiration management of cached responses
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// It ensures that specific URLs are precached and available in the cache before they are requested
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register a route for navigation requests to use the pageCache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);
