import { ProductsType, productsStore } from '../models/productsM';

const store = new productsStore()

describe("Products Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toContain({"id":1,"name":"London Canvas","price":50,"category":"canvas-prints"});
  });

  it('show method should return the correct product', async () => {
    const result = await store.show(1);
    expect(result).toEqual({"id":1,"name":"London Canvas","price":50,"category":"canvas-prints"});
  });
  
  it('create method should add a product', async () => {
    const result = await store.create("Paris Canvas",60,"canvas-prints");
    expect(result).toBeTruthy();
  });
});