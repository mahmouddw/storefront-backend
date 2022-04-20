import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the users endpoint', async (done) => {
        const response = await request.get('/users');
        expect(response.status).toBe(200);
        done();
    });

    it('gets single user endpoint based on id', async (done) => {
        const response = await request.get('/users/1');
        expect(response.status).toBe(200);
        done();
    });

    it('posts new user endpoint', async (done) => {
        const response = await request.post('/createUser');
        expect(response.status).toBe(200);
        done();
    });
    
    it('posts to validate a user endpoint', async (done) => {
        const response = await request.post('/validateUser');
        expect(response.status).toBe(200);
        done();
    });
});