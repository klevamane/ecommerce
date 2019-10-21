/* eslint-disable func-names */
/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Attribute = sequelize.define('Attribute', {
    attribute_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'attribute',
    timestamps: false,
  });
  Attribute.associate = (models) => {
    // Attribute.belongsToMany(models.Product, { through: 'ProductAttribute', foreignKey: 'attribute_id', as: 'products' });
    Attribute.hasMany(models.AttributeValue, { foreignKey: 'attribute_id', onDelete: 'CASCADE' });
  };

  return Attribute;
};
