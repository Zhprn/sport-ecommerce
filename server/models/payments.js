module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id_pembayaran: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    method: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('success', 'pending'), defaultValue: 'pending' }
  }, {
    tableName: 'payments',
    timestamps: false
  });

  Payment.associate = (models) => {
    Payment.hasOne(models.Order, { foreignKey: 'id_pembayaran' });
  };

  return Payment;
};
