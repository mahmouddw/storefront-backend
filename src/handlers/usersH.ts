import express, { Request, Response } from 'express';
import { usersClass } from '../models/usersM';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';

const usersFunctions = new usersClass()

dotenv.config()
const saltRounds = Number(process.env.SALT_ROUNDS);

// an index function to show all users
const index = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = String(req.headers.authorization)
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
    const results = await usersFunctions.index()
    res.json(results)
  } catch(error) {
    res.json(`invalid token ${error}`)
  }
}

// a show function to show single user based on id
const show = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = String(req.headers.authorization)
    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, process.env.TOKEN_SECRET as string)
    const results = await usersFunctions.show(parseInt(req.params.id))
    res.json(results)
  } catch(error) {
    res.json(`invalid token ${error}`)
  }
}

// a create function to create a new user
const create = async (req: Request, res: Response) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username = req.body.userame
    const password = req.body.password
    try{
    const validate = await usersFunctions.create(firstName, lastName, username, password, saltRounds)
    var token = jwt.sign({ user: username }, process.env.TOKEN_SECRET as string);
    res.json(token)
    } catch (err) {
    res.json(`${err}`)
  }
}

// check user function to validate a user (sign-in)
const validateUser = async (req: Request, res: Response) => {
    const username = req.body.username
    const password = req.body.password
 try {
     const results = await usersFunctions.checkUser(username, password)
     console.log(results)
     var token = jwt.sign({ user: username }, process.env.TOKEN_SECRET as string);
     res.json(token)
 } catch(err) {
     res.json(`${err}`)
 }
}

// users routes
const usersRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/createUser', create)
  app.post('/validateUser', validateUser)
}

export default usersRoutes