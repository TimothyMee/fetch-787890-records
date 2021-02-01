
import { app } from '../app';
import * as supertest from 'supertest';
import { resolve } from 'path';

const request = supertest(app);

describe("fetch record", () => {
    it('posts to the fetch endpoint', async done => {
        const response = await request.post('/')
            .send({
                "startDate": "2016-01-01",
                "endDate": "2016-02-01",
                "minCount": 4970,
                "maxCount": 4980
            });
      
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('code')
        expect(response.body).toHaveProperty('msg')
        expect(response.body).toHaveProperty('records')
        expect(response.body.msg).toBe('Success')
        expect(response.body.code).toBe(0)
        expect(response.body.records)
        done()
      })
});

describe("fetch record", () => {
    it('posts to the fetch endpoint with bad date string', async done => {
        const response = await request.post('/')
            .send({
                "startDate": "badDate",
                "endDate": "2016-02-01",
                "minCount": 4970,
                "maxCount": 4980
            });
      
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('msg')
        expect(response.body.msg).toBe('Invalid dates. Check start and end date')
        expect(response.body.code).toBe(400)
        done()
      })
});

describe("fetch record", () => {
    it('posts to the fetch endpoint without body parameters', async done => {
        const response = await request.post('/')
            .send({
                "endDate": "2016-02-01",
                "minCount": 4970,
                "maxCount": 4980
            });
      
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('msg')
        expect(response.body).toHaveProperty('errors')
        expect(response.body.msg).toBe('Error in request parameter(s)')
        expect(response.body.code).toBe(400)
        done()
      })
});