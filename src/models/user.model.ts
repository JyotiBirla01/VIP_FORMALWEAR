// import { DataTypes } from "sequelize";


// const User:any = sequelize.define("users", {
//   id: {
//   type: DataTypes.INTEGER,
//   autoIncrement: true,
//   primaryKey: true,
//   allowNull: false
// },

//     roleId:{
//         type: DataTypes.STRING,
//         defaultValue:2
//     },
//     roleName: {
//         type: DataTypes.STRING,
//         // allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     retriveId: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     confirmPassword: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
   
//     phone:{
//         type:DataTypes.STRING,
//         allowNull:true
//     },
//     firstName:{
//         type:DataTypes.STRING,
//         allowNull:true
//     },
//     lastName:{
//         type:DataTypes.STRING,
//         allowNull:true
//     },
    
//     createdAt: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: true
//     },
//     deletedAt: {
//         type: DataTypes.DATE,
//         allowNull: true
//     }
// }, {
//     tableName: 'users',
//     deletedAt: 'deletedAt',
//     timestamps: true,
//     paranoid: true
// });





// export default User;



import {
  DataTypes,
  Model,
  Optional
} from 'sequelize';
import { sequelize } from "../config/database";

// --------------------
// TypeScript interfaces
// --------------------

interface UserAttributes {
  id: number;
  roleId: number;
  roleName: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  retriveId?: string;
  resetToken?: string | null;
  phone?: string;
  firstName?: string;
  lastName?: string;
  provider?: string; 
  providerId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

// --------------------
// Sequelize model
// --------------------

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public roleId!: number;
  public roleName!: string;
  public email?: string;
  public password?: string;
  public confirmPassword?: string;
  public retriveId?: string;
  public resetToken?: string | null;
  public phone?: string;
  public firstName?: string;
  public lastName?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;
}

// --------------------
// Init model
// --------------------

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },

    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
    },

    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    retriveId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
provider: {
  type: DataTypes.STRING,
  allowNull: true,
},
providerId: {
  type: DataTypes.STRING,
  allowNull: true,
},

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: true,
  }
);



export default User;
