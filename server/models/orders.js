module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id_order: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_user: { type: DataTypes.INTEGER, allowNull: false },
    id_product: { type: DataTypes.INTEGER, allowNull: false },
    id_pembayaran: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    total_harga: { type: DataTypes.INTEGER, allowNull: false },
    alamat: { type: DataTypes.STRING, allowNull: false },
    catatan: { type: DataTypes.STRING }
  }, {
    tableName: 'orders',
    timestamps: false
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'id_user' });
    Order.belongsTo(models.Product, { foreignKey: 'id_product' });
    Order.belongsTo(models.Payment, { foreignKey: 'id_pembayaran' });
  };

  return Order;
};
