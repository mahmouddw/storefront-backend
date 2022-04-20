// @ts-ignore
import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()
const pepper = process.env.BCRYPT_PASSWORD

export type usersType = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export class usersClass {
  // an index model to show all users
  async index(): Promise<usersType[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      conn.release()
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  // a show model to show single user based on id
  async show(id: number): Promise<usersType> {
    try {
  // @ts-ignore
    const conn = await Client.connect()
    const sql = 'SELECT * FROM users WHERE id=($1)'
    const result = await conn.query(sql, [id])
    const product = result.rows[0]
    conn.release()
    return product
    } catch (err) {
        throw new Error(`Could not find user ${id}. Error: ${err}`)
    }
  }

  // a create model to create a new user
  async create(firstName: string, lastName: string, username: string, plainPassword: string, salt: number): Promise<usersType> {
    try {
    const hash = bcrypt.hashSync(plainPassword+pepper, salt);
    // @ts-ignore
    const conn = await Client.connect()
    const sql = 'INSERT INTO users (first_name, last_name, username, password) VALUES($1, $2, $3, $4) RETURNING *'
    const result = await conn.query(sql, [firstName, lastName, username, hash])
    const user = result.rows[0]
    conn.release()
    //console.log(user)
    return user
    } catch(err) {
      throw new Error(`Could not create user. Error: ${err}`)
    }
  }

  // check user model to validate a user (sign-in)
  async checkUser(username: string, password: string) {
    //... fetch user from a db etc.
    // @ts-ignore
    const conn = await Client.connect()
    const sql = 'SELECT password FROM users WHERE username=($1)'
    const result = await conn.query(sql, [username])
    conn.release()
      
    if(result.rows.length) {
      const user = result.rows[0]
      const match = bcrypt.compareSync(password+pepper, user.password);

      if(match) {
        //login
            console.log('true match');
            return username;
      } else {
            //...
            console.log('not match');
            return false;
      }
    }
  }
}