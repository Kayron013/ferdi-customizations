'use strict';

const { remote } = require('electron');

const path = require('path');

const webContents = remote.getCurrentWebContents();
const { session } = webContents;
setTimeout(() => {
  const elem = document.querySelector('.landing-title.version-title');

  if (elem && elem.innerText.toLowerCase().includes('google chrome')) {
    window.location.reload();
  }
}, 1000);
window.addEventListener('beforeunload', async () => {
  try {
    session.flushStorageData();
    session.clearStorageData({
      storages: ['appcache', 'serviceworkers', 'cachestorage', 'websql', 'indexdb'],
    });
    const registrations = await window.navigator.serviceWorker.getRegistrations();
    registrations.forEach(r => {
      r.unregister();
      console.log('ServiceWorker unregistered');
    });
  } catch (err) {
    console.err(err);
  }
});

module.exports = Franz => {
  const getMessages = function getMessages() {
    const elems = [...document.querySelectorAll('._2gsiG')];

    const isMuted = el => el.querySelector('[data-icon = "muted"]') !== null;

    const count = elems.reduce((acc, el) => {
      if (isMuted(el)) {
        return acc;
      }
      const countEl = el.querySelector('.VOr2j');
      const c = countEl ? Number(countEl.textContent) : 0;
      return acc + c;
    }, 0);

    Franz.setBadge(count);
  };

  Franz.injectCSS(path.join(__dirname, 'service.css'));
  Franz.loop(getMessages);
};
