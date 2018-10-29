const Sequelize = require('sequelize');
const db = require('../conn');
const { Product } = require('../index')

const LineItem = db.define('lineItem', {
  quantity: {
    type: db.Sequelize.INTEGER,
    defaultValue: 1,
  },
  cost: {
  	type: Sequelize.DECIMAL,
  	allowNull: true,
  	validate: {
  	  isDecimal: true
  	}
  }
}/*, {
	hook: {
	  afterValidate (lineItem){
	  	if(productId){
	  	  Product.findById(this.productId)
	  	  .then( product => lineItem.cost = lineItem.quantity*product.price)
	  }
	  }
	}
}*/, { 
  include: [ Product ] 
});

module.exports = LineItem;

