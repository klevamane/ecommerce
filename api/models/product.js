/* eslint-disable func-names */
/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    discounted_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: '0.00'
    },
    image: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    image_2: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    thumbnail: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    display: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'product',
    timestamps: false
  });
  Product.associate = (models) => {
    Product.belongsToMany(models.Category, { through: 'ProductCategory', foreignKey: 'product_id', as: 'categories' });
    Product.belongsToMany(models.AttributeValue, { through: 'ProductAttribute', foreignKey: 'product_id', as: 'attributevalue' });
    // Product.hasMany(models.Attribute, { through: 'ProductAttribute' });
    Product.hasMany(models.Review, { foreignKey: 'product_id', onDelete: 'CASCADE' });
  };
  return Product;
};
