/* eslint-disable func-names */
/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const AttributeValue = sequelize.define('AttributeValue', {
    attribute_value_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    attribute_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    value: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'attribute_value',
    timestamps: false
  });

  AttributeValue.associate = (models) => {
    AttributeValue.belongsToMany(models.Product, { through: 'ProductAttribute', foreignKey: 'attribute_value_id', as: 'products' });
    AttributeValue.belongsTo(models.Attribute, { foreignKey: 'attribute_id', onDelete: 'CASCADE' });
  };
  return AttributeValue;
};
