/* jshint indent: 2 */
// eslint-disable-next-line func-names
module.exports = function (sequelize, DataTypes) {
  const Review = sequelize.define('Review', {
    review_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    customer_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'review',
    timestamps: false
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Product, {
      foreignKey: 'product_id',
      onDelete: 'CASCADE'
    });

    Review.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};
