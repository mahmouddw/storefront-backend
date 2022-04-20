// @ts-ignore
import Client from '../database'

export type ProductsType = {
  id: number;
  name: string;
  price: number;
  category: string;
}

export class productsStore {
  // index of all products
  async index(): Promise<ProductsType[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products'
      const result = await conn.query(sql)
      conn.release()
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`)
    }
  }

  // show single product based on id
  async show(id: number): Promise<ProductsType> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM products WHERE id=($1)'
      const result = await conn.query(sql, [id])
      const product = result.rows[0]
      conn.release()
      return product
    } catch (err) {
        throw new Error(`Could not show product ${id}. Error: ${err}`)
    }
  }

  // add/insert new product
  async create(name:string, price:number, category:string): Promise<ProductsType> {
    try {
      const sql = 'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [name, price, category])
      const artProduct = result.rows[0]
      conn.release()
      return artProduct
      } catch (err) {
          throw new Error(`Could not add new product ${name}. Error: ${err}`)
      }
  }
}