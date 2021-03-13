const request = require('supertest');
import 'babel-polyfill';
const app = require('../server/index')

describe('Post request', () => {
    it('create request', async () => {
      const res = await request(app).post('/sentiment').send({status:'ok'})
      expect(res.statusCode).toEqual(200)
    })
  })