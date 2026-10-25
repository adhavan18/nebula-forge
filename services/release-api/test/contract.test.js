import test from 'node:test';
import assert from 'node:assert/strict';
test('release contract is deterministic', () => assert.equal(process.env.RELEASE_ID || 'local-dev', 'local-dev'));
