// @ts-ignore
import Client from '../database'

export type Orders = {
    id: number;
    user_id: string;
    status: string;
}

export type productOrders = {
  id: number;
  order_id: string;
  product_id: string;
  quantity: number;
}

export class ordersClass {
  // a show model to show an order based on user id
  async show(userId: string): Promise<Orders> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM orders WHERE user_id=($1)'
      const result = await conn.query(sql, [userId])
      const endResult = result.rows[0]
      conn.release()
      return endResult
    } catch (err) {
        throw new Error(`Could not show user ${userId}. Error: ${err}`)
    }
  }

  // a create model to open a new order
  async create(userId: string): Promise<Orders> {
      try {
        const status: string = 'active'
        const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
        // @ts-ignore
        const conn = await Client.connect()
        const result = await conn.query(sql, [userId, status])
        const endResult = result.rows[0]
        conn.release()
        return endResult
      } catch (err) {
          throw new Error(`Could not create new order. Error: ${err}`)
      }
  }

  // add to cart model to insert into table order_products
  async addToCart(quantity: number, orderId: string, productId: string): Promise<productOrders> {
    try {
      const status: string = 'active'
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [quantity, orderId, productId])
      const endResult = result.rows[0]
      conn.release()
      return endResult
      } catch (err) {
          throw new Error(`Could not add to cart. Error: ${err}`)
      }
  }
}