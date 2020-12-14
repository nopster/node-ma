const { Pool } = require('pg');

module.exports = (config) => {
  const client = new Pool(config);

  return {
    testConnection: async () => {
      try {
        await client.query('SELECT NOW()');
        console.log('PG connected');
      } catch (err) {
        console.error(err.message || err);
        throw err;
      }
    },

    close: async () => {
      console.log('INFO: closing pg DB wrapper');
      client.end();
    },

    createProduct: async ({ type, color, price, quantity = 0 }) => {
      const timestamp = new Date();
      const res = await client.query(
        'INSERT INTO products(type, color, price, quantity, created_at, updated_at, deleted_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [type, color, price, quantity, timestamp, timestamp, null],
      );

      console.log(`DEBUG: New product created: ${JSON.stringify(res.rows[0])}`);

      return res.rows[0];
    },

    getProduct: async (id) => {
      const res = await client.query(
        'SELECT * from products where id = $1 AND deleted_at is NULL',
        [id],
      );
      if (!res.rows[0]) {
        throw Error('Product not found');
      }

      return res.rows[0];
    },

    updateProduct: async (id, product) => {
      const query = [];
      const values = [];

      for (const [i, [key, value]] of Object.entries(product).entries()) {
        query.push(`${key} = $${i + 1}`);
        values.push(value);
      }

      values.push(id);

      const res = await client.query(
        `UPDATE products SET ${query.join(',')} where id = $${values.length}`,
        values,
      );

      if (res.rowCount === 0) {
        throw Error('Product not updated');
      }

      console.log(`DEBUG: Product updated: ${JSON.stringify(product)}`);

      return product;
    },

    deleteProduct: async (id) => {
      const timestamp = new Date();
      const res = await client.query(
        'UPDATE products SET deleted_at = $1 WHERE id=$2 AND deleted_at is NULL',
        [timestamp, id],
      );

      if (res.rowCount === 0) {
        throw Error('Product not found or already deleted');
      }

      return [];
    },

    insertOrUpdateQty: async (product) => {
      const res = await client.query(
        'SELECT * FROM products WHERE type = $1 AND color = $2 AND price = $3',
        [product.type, product.color, product.price],
      );
      if (!res.rows[0]) {
        await client.query(
          'INSERT INTO products(type, color, price, quantity, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)',
          [product.type, product.color, product.price, product.quantity, new Date(), new Date()],
        );
      } else {
        await client.query('UPDATE products SET quantity = $1, updated_at = $2 WHERE id = $3', [
          res.rows[0].quantity + product.quantity,
          new Date(),
          res.rows[0].id,
        ]);
      }
    },
  };
};
