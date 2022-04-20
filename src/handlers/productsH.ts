import express, { Request, Response } from 'express'
import { productsStore } from '../models/productsM'
import jwt from 'jsonwebtoken'

const store = new productsStore()

// an index function of all products
const index = async (_req: Request, res: Response) => {
  try {
  const artProducts = await store.index()
  res.json(artProducts)
  } catch(error) {
    res.json(`${error}`)
  }
}

// show single product based on id
const show = async (req: Request, res: Response) => {
  try {
   const artProducts = await store.show(parseInt(req.params.id))
   res.json(artProducts)
  } catch(error) {
    res.json(`${error}`)
  }
}

// add/insrt new product
const create = async (req: Request, res: Response) => {
  const name: string = req.body.name
  const price: number = parseInt(req.body.price)
  const category: string = req.body.category

  try {
    const authorizationHeader = String(req.headers.authorization)
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
    const newProduct = await store.create(name, price, category)
    res.json(newProduct)
  } catch(error) {
    res.json(`${error}`)
  }
}

// products routes
const productsRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/addProduct', create)
}

export default productsRoutes