import Role from "./role.model";
import User from "./user.model";


// Register associations (already in model files, but you can centralize here if you prefer)
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });

export {
  User,
  Role
};
