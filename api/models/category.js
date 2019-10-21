/* eslint-disable func-names */
/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define('Category', {
    category_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    department_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true
    }
  }, {
    tableName: 'category',
    timestamps: false,

  });

  Category.associate = (models) => {
    Category.belongsToMany(models.Product, { through: 'ProductCategory', foreignKey: 'category_id', as: 'products' });
    Category.belongsTo(models.Department, { foreignKey: 'department_id', onDelete: 'CASCADE' });
  };

  return Category;
};
