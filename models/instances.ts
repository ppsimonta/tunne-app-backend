const {DataTypes, Model} = require('sequelize');
import {sequelize} from '../database/database';
import Profiles from '../models/user';

class Instances extends Model {
    declare id: number;
}

Instances.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        random_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner_id: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'profiles',
                key: 'id'
            }
        },
    },

        {
            sequelize,
            modelName: 'instances',
        }
)

Instances.belongsTo(Profiles, { foreignKey: 'owner_id' });

export default Instances;