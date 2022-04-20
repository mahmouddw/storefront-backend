import { Orders, productOrders, ordersClass } from '../models/ordersM';

const ordersFunctions = new ordersClass()

describe("Orders Model", () => {
  it('should have a show method', () => {
    expect(ordersFunctions.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(ordersFunctions.create).toBeDefined();
  });

  it('should have an addToCart method', () => {
    expect(ordersFunctions.addToCart).toBeDefined();
  });

  it('show method should return an order based on user id', async () => {
    const result = await ordersFunctions.show('1');
    expect(result).toEqual({
      id: 1,
      user_id: '1',
      status: 'active'
    });
  });

  it('create method should add a product', async () => {
    const result = await ordersFunctions.create('1');
    expect(result).toBeTruthy();
  });

  it('create method should add a product', async () => {
    const result = await ordersFunctions.addToCart(2, '1', '1');
    expect(result).toBeTruthy();
  });
});