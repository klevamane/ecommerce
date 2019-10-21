/* eslint-disable func-names */
/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Tax = sequelize.define('Tax', {
    tax_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    tax_type: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    tax_percentage: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    tableName: 'tax',
    timestamps: false
  });
  return Tax;
};
