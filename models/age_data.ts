const {DataTypes, Model} = require('sequelize');
import {sequelize} from '../database/database';
import Responses from './responses';
import Instances from './instances'

class AgeData extends Model {
    declare id: number;
}

AgeData.init(
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
            modelName: 'age_data',
            timestamps: false,
        }
)

AgeData.belongsTo(Responses, { foreignKey: 'response_id' });
AgeData.belongsTo(Instances, { foreignKey: 'instance_id' });

export default AgeData;