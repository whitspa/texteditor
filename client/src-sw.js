const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevaalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

//Implemented asset caching in the registerRoute function
registerRoute(
  ({request}) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevaalidate({cacheName:'asset-cache',
plugins: [
  new CacheableResponsePlugin({
    statuses: [0, 200],
  }),

  new ExpirationPlugin({
    maxEntries: 60,
    maxAgeSeconds: 30 * 24 * 60 * 60,
  })
]})
);
