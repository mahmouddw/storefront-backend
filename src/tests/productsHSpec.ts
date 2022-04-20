import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the products endpoint', async (done) => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
        done();
    });

    it('gets single product endpoint based on id', async (done) => {
        const response = await request.get('/products/2');
        expect(response.status).toBe(200);
        done();
    });

    it('posts new product endpoint', async (done) => {
        const response = await request.post('/addProduct');
        expect(response.status).toBe(200);
        done();
    });
});