const {DataTypes, Model} = require('sequelize');
import {sequelize} from '../database/database';
import Instances from '../models/instances';
import Responses from '../models/responses';

class BodyDataSpots extends Model {
    declare id: number;
}

BodyDataSpots.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        instance_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'instances',
                key: 'id'
            }
        },
        timestep: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hex_color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        x_position: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        y_position: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        size: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        body_part: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        response_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'responses',
                key: 'id'
            }
        },
        },
        {
            sequelize,
            modelName: 'body_data_spots',
            timestamps: false,
        }
 
)

BodyDataSpots.belongsTo(Instances, { foreignKey: 'instance_id' });
BodyDataSpots.belongsTo(Responses, { foreignKey: 'response_id' });

export default BodyDataSpots;