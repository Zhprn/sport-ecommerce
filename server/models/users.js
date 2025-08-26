module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id_user: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
    },
    username: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    remember_token: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  User.associate = (models) => {
    User.hasMany(models.Order, { foreignKey: 'id_user' });
  };

  return User;
};
