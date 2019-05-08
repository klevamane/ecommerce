/* eslint-disable func-names */
/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    credit_card: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address_1: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    address_2: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    region: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    postal_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    shipping_region_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    day_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    eve_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    mob_phone: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'customer',
    timestamps: false,
    hooks: {
      // Delete the password to ensure that it wont be returned
      // as a response
      afterCreate: (instance, options) => {
        delete instance.dataValues.password;
      }
    }
  });
  return Customer;
};
