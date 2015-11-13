/**
 * Load segment.io snippet on this page, given an apiToken as
 * a string. This does the same thing as the official snippet,
 * but is designed for usage with browserify and hardcodes
 * https:// instead of matching the page's scheme.
 *
 * @param {string} apiToken
 * @returns {undefined}
 * @example
 * var segmentioInsert = require('segmentio-insert')
 * segmentioInsert('my-api-token');
 */
function segmentioInsert(apiToken) {
    var analytics = window.analytics = window.analytics || [];
    if (analytics.initialize) return;

    if (analytics.invoked) {
      if (window.console && console.error) {
        console.error('Segment snippet included twice.');
      }
      return;
    }

    analytics.invoked = true;

    // Defer API calls so that they can be invoked _before_ the
    // actual code is loaded
    analytics.methods = [
      'trackSubmit',
      'trackClick',
      'trackLink',
      'trackForm',
      'pageview',
      'identify',
      'reset',
      'group',
      'track',
      'ready',
      'alias',
      'page',
      'once',
      'off',
      'on'
    ];

    analytics.factory = function(t) {
        return function() {
            var e = Array.prototype.slice.call(arguments);
            e.unshift(t);
            analytics.push(e);
            // call callback
            if (typeof e[e.length - 1] === 'function') {
              e[e.length - 1]();
            }
            return analytics;
        };
    };

    for (var t = 0; t < analytics.methods.length; t++) {
        var e = analytics.methods[t];
        analytics[e] = analytics.factory(e);
    }

    analytics.load = function(t) {
        var e = document.createElement('script');
        e.type = 'text/javascript';
        e.async = true;
        e.src = 'https://cdn.segment.com/analytics.js/v1/' + t + '/analytics.min.js';
        var n = document.getElementsByTagName('script')[0];
        n.parentNode.insertBefore(e, n);
    };

    analytics.SNIPPET_VERSION = '3.1.0';
    analytics.load(apiToken);
    analytics.page();
    return analytics;
}

module.exports = segmentioInsert;
