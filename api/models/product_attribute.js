/* eslint-disable func-names */
/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const ProductAttribute = sequelize.define('ProductAttribute', {
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    attribute_value_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'product_attribute',
    timestamps: false
  });
  return ProductAttribute;
};
