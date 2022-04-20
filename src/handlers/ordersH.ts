import express, { Request, Response } from 'express';
import { ordersClass } from '../models/ordersM';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

const ordersFunctions = new ordersClass()

dotenv.config()

// a show function to show an order based on user id
const show = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = String(req.headers.authorization)
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
    const results = await ordersFunctions.show(req.params.userId)
    res.json(results)
  } catch(error) {
      res.json(`invalid token ${error}`)
  }
}

// a create function to open a new order
const create = async (req: Request, res: Response) => {
  const userId: string = req.params.userId
  try {
    const authorizationHeader = String(req.headers.authorization)
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
    const newOrder = await ordersFunctions.create(userId)
    res.json(newOrder)
  } catch(err) {
      res.json(`${err}`)
  }
}

// add to cart function to insert into table order_products
const addproduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.orderId
  const productId: string = req.body.productId
  const quantity: number = req.body.quantity
  try{
    const authorizationHeader = String(req.headers.authorization)
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
    const addedProduct = await ordersFunctions.addToCart(quantity, orderId, productId)
    res.json(addedProduct)
  } catch (err) {
      res.json(err)
  }
}

//orders routes
const ordersRoutes = (app: express.Application) => {
  app.get('/orders/:userId', show)
  app.post('/createOrder/:userId', create)
  app.post('/orders/:orderId/products', addproduct)
}
  
export default ordersRoutes