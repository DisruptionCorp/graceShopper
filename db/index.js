const conn = require('./conn');
const Product = require('./models/Product');
const Order = require('./models/Order');
const LineItem = require('./models/LineItem');
const User = require('./models/User');

//Associations
Order.hasMany(LineItem);
Product.hasMany(LineItem);

User.hasMany(Order);
Order.belongsTo(User);

//Seed function
const seed = () => {
    return Promise.all([
            User.create({ name: 'kevin', password: 'moe' }),
            User.create({ name: 'daniel', password: 'larry' }),
            User.create({ name: 'andrew', password: 'admin' }),
            User.create({ name: 'sanjai', password: 'admin' })
        ])
        .then(([kevin, daniel, andrew, sanjai]) => {
            return Promise.all([
                Product.create({ name: 'gloves' }),
                Product.create({ name: 'rope' }),
                Product.create({ name: 'axe' }),
                Product.create({ name: 'bodybag' }),
                Order.create({ status: 'ORDER', userId: kevin.id }),
                Order.create({ status: 'ORDER', userId: daniel.id }),
            ])
        })
        .then(([gloves, rope, axe, bodybag, order1, order2]) => {
            return Promise.all([
                LineItem.create({ orderId: order1.id, productId: rope.id }),
                LineItem.create({ orderId: order2.id, productId: bodybag.id }),
                LineItem.create({ orderId: order2.id, productId: axe.id }),
                LineItem.create({ orderId: order2.id, productId: gloves.id }),
            ]);
        })
        .catch(err => console.log(err));
};

module.exports = { conn, Product, Order, LineItem, User, seed };
