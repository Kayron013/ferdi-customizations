'use strict';

var _path = _interopRequireDefault(require('path'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

module.exports = Franz => {
  const getMessages = function getMessages() {
    //prettier-ignore
    const unreadDirectMsgs = Number(
      Array
        .from(document.querySelectorAll('[class^="numberBadge"]'))
        .reduce((acc, el) => acc + el.textContent, 0)
    );

    const unreadGuildConvos = document.querySelectorAll(
      '[data-ref-id="guildsnav"] div[class^="pill"] span[class^="item"][style*="height: 8px"]'
    ).length;

    Franz.setBadge(unreadDirectMsgs, unreadGuildConvos);
  };

  Franz.loop(getMessages);
  Franz.injectCSS(_path.default.join(__dirname, 'service.css'));
};
