module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id_category: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name_category: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'categories',
    timestamps: false
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: 'id_category' });
  };

  return Category;
};
