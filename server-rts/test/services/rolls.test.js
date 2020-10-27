const assert = require('assert');
const app = require('../../src/app');

describe('\'rolls\' service', () => {
  it('registered the service', () => {
    const service = app.service('rolls');

    assert.ok(service, 'Registered the service');
  });
});
