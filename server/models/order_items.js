module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    id_item: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_order: { type: DataTypes.INTEGER, allowNull: false },
    id_product: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    harga_satuan: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'order_items',
    timestamps: false
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: 'id_order' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'id_product' });
  };

  return OrderItem;
};
