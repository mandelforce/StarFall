// Old service worker address: phones that installed the game from the old address still have a worker registered here.
// This replacement removes it, clears the old caches and reloads the open pages, which then redirect to the new address.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
  })());
});
