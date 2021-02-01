
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