const {DataTypes, Model} = require('sequelize');
import {sequelize} from '../database/database';
import Profiles from '../models/user';
import Instances from '../models/instances'

class Responses extends Model {
    declare id: number;
}

Responses.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        profile_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instance_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'instances',
                key: 'id'
            }
        },
    },
    
            {
                sequelize,
                modelName: 'responses',
                timestamps: false,
            }
)

Responses.belongsTo(Instances, { foreignKey: 'instance_id' });

export default Responses;