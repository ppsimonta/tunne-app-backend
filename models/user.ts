const {Sequelize, DataTypes, Model} = require('sequelize');
import {sequelize} from '../database/database';

class Profiles extends Model {
    declare id: number;
}

Profiles.init(
    {
        id: {
            type:DataTypes.STRING,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        
    },

        {
            sequelize,
            modelName: 'profiles',
        },
    )


export default Profiles;