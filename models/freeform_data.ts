const {DataTypes, Model} = require('sequelize');
import {sequelize} from '../database/database';
import Responses from '../models/responses';
import Instances from '../models/instances'

class FreeformData extends Model {
    declare id: number;
}

FreeformData.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        response_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'responses',
                key: 'id'
            }
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
            modelName: 'freeform_data',
            timestamps: false,
        }   
    
)

FreeformData.belongsTo(Responses, { foreignKey: 'response_id' });
FreeformData.belongsTo(Instances, { foreignKey: 'instance_id' });


export default FreeformData;