import test from 'ava';
import request from 'supertest';

test('Repositories: create', t => {
  request
    .get('/hello')
    .expect(200);

  t.fail('todo');
});

// more tests ...
