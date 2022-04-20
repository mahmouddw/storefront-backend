import { usersType, usersClass } from '../models/usersM';
import dotenv from 'dotenv'

dotenv.config()
const pepper = process.env.BCRYPT_PASSWORD
const usersFunctions = new usersClass()

describe("Users Model", () => {
  it('should have an index method', () => {
    expect(usersFunctions.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(usersFunctions.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(usersFunctions.create).toBeDefined();
  });

  it('should have a check method', () => {
    expect(usersFunctions.checkUser).toBeDefined();
  });

  it('checkUser method should validate a user', async () => {
    const result = await usersFunctions.checkUser("mahmoudahmed","password1");
    expect(result).toEqual('mahmoudahmed');
  });

  it('create method should add a user', async () => {
    const result = await usersFunctions.create("Mahmoud","Ahmed","mahmoudahmed2","password",10);
    expect(result).toBeTruthy();
  });
});