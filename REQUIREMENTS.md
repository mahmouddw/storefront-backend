# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- AN INDEX route: '/products' [GET]
- A SHOW route: '/products/:id' [GET]
- A CREATE route: '/addProduct' [POST]

#### Users
- AN INDEX route: '/users' [GET]
- A SHOW route: '/users/:id' [GET]
- A CREATE route: '/createUser' [POST]

#### Orders
- A SHOW route: '/orders/:id' [GET]

- Note: I have added some optional endpoints as well.

## Data Shapes

#### Product
- id
- name
- price
- category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- user_id
- status of order (active or complete)

#### Order_Products
- id
- order_id
- product_id
- quantity

## Database schema

#### products TABLE
  Column  |          Type          | Collation | Nullable |               Default
----------+------------------------+-----------+----------+--------------------------------------
 id       | integer                |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying(100) |           |          |
 price    | integer                |           |          |
 category | character varying(100) |           |          |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES pro
ducts(id)

#### users TABLE
   Column   |          Type          | Collation | Nullable |              Default
------------+------------------------+-----------+----------+-----------------------------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 first_name | character varying(100) |           |          |
 last_name  | character varying(100) |           |          |
 username   | character varying(100) |           |          |
 password   | character varying      |           |          |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

#### orders TABLE
 Column  |         Type          | Collation | Nullable |              Default
---------+-----------------------+-----------+----------+------------------------------------
 id      | integer               |           | not null | nextval('orders_id_seq'::regclass)
 user_id | bigint                |           |          |
 status  | character varying(50) |           |          |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(
id)

#### order_products TABLE
   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 order_id   | bigint  |           |          |
 product_id | bigint  |           |          |
 quantity   | integer |           |          |
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

