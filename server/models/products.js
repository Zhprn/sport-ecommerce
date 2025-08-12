module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id_product: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nama_product: { type: DataTypes.STRING, allowNull: false },
    harga_produk: { type: DataTypes.INTEGER, allowNull: false },
    rating_produk: { type: DataTypes.DECIMAL(2,1), allowNull: false },
    id_category: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'products',
    timestamps: false
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { 
      foreignKey: 'id_category',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Product.hasMany(models.Order, { 
      foreignKey: 'id_product',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };

  return Product;
};
