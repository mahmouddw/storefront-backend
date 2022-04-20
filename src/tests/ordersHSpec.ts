import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets single order endpoint based on id', async (done) => {
        const response = await request.get('/orders/1');
        expect(response.status).toBe(200);
        done();
    });

    it('posts new order endpoint', async (done) => {
        const response = await request.post('/createOrder/1');
        expect(response.status).toBe(200);
        done();
    });

    it('posts new product to cart endpoint', async (done) => {
        const response = await request.post('/orders/1/products');
        expect(response.status).toBe(200);
        done();
    });
});