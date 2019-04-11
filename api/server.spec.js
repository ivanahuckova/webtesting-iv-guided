const server = require('./server');
const request = require('supertest');

describe('server', () => {
  describe('GET / endpoint', () => {
    it('is the right environment', () => {
      expect(process.env.DB_ENV).toBe('testing');
    });
    it('returns the right response body', () => {
      const expectedResponseBody = JSON.stringify({ api: 'up' });
      return request(server)
        .get('/')
        .expect(expectedResponseBody)
        .expect('Content-Length', expectedResponseBody.length.toString())
        .expect(200);
    });

    it('returns the right response body if name in qstring', () => {
      const expectedResponseBody = JSON.stringify({ api: 'Welcome, Samar' });
      return request(server)
        .get('/?name=Samar')
        .expect(expectedResponseBody)
        .expect('Content-Length', expectedResponseBody.length.toString());
    });

    it('returns the right response body if name in qstring', () => {
      const expectedResponseBody = JSON.stringify({ api: 'Welcome, Samar' });
      return request(server)
        .get('/?name=Samar')
        .expect('Set-Cookie', 'know=true');
    });
  });

  describe('GET /hobbits endpoint', () => {
    it('returns 200', () => {
      return request(server)
        .get('/hobbits')
        .expect(200);
    });

    it('right length of array (sync)', async () => {
      const res = await request(server).get('/hobbits');
      expect(res.body).toHaveLength(0);
    });

    it('right length of array (promises)', () => {
      return request(server)
        .get('/hobbits')
        .then(res => {
          expect(res.body).toHaveLength(0);
        });
    });
  });
});
