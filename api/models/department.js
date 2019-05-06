/* eslint-disable func-names */
/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Department', {
    department_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
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
    tableName: 'department',
    timestamps: false,
  });
};
