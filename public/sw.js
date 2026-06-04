self.addEventListener('install', function () { console.log('Install!'); });
self.addEventListener("activate", event => { console.log('Activate!'); console.log(event); });
self.addEventListener('fetch', function (event) { console.log('Fetch!', event.request); });

self.addEventListener('message', (event) => {
  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage('1.0');
  }
});