module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id_order: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_user: { type: DataTypes.INTEGER, allowNull: false },
    total_harga: { type: DataTypes.INTEGER, allowNull: false },
    alamat: { type: DataTypes.STRING, allowNull: false },
    catatan: { type: DataTypes.STRING },
    status: { 
      type: DataTypes.ENUM("pending", "paid", "cancelled", "arrived"), 
      defaultValue: "pending" 
    }
  }, {
    tableName: 'orders',
    timestamps: true
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'id_user' });
    Order.hasMany(models.OrderItem, { foreignKey: 'id_order', as: 'items' });
    Order.hasOne(models.Payment, { foreignKey: 'id_order', as: 'payment' });
  };

  return Order;
};
