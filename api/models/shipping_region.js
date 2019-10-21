/* jshint indent: 2 */
/* eslint-disable func-names */

module.exports = function (sequelize, DataTypes) {
  const ShippinRegion = sequelize.define('ShippingRegion', {
    shipping_region_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    shipping_region: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'shipping_region',
    timestamps: false
  });

  return ShippinRegion;
};
