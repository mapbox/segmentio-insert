var test = require('tape'),
  segmentioInsert = require('./');

test('segmentioInsert', function(t) {
  var analytics = segmentioInsert('foo');
  t.ok(analytics.track);
  t.end();
});
