module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    id_payment: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_order: { type: DataTypes.INTEGER, allowNull: false },
    metode: { type: DataTypes.STRING, allowNull: false }, // Transfer Bank, COD, dll
    jumlah_bayar: { type: DataTypes.INTEGER, allowNull: false },
    status: { 
      type: DataTypes.ENUM("unpaid", "paid", "failed", "arrived"), 
      defaultValue: "unpaid" 
    }
  }, {
    tableName: 'payments',
    timestamps: true
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Order, { foreignKey: 'id_order' });
  };

  return Payment;
};
