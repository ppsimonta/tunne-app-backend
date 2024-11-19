const {DataTypes, Model} = require('sequelize');
import {sequelize} from '../database/database';
import Instances from './instances';

class SurveyElements extends Model {
    declare id: number;
}

SurveyElements.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        element_type: {
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
        step_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        label: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        heading: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        element_order: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
        {
            sequelize,
            modelName: 'survey_elements',
            timestamps: false,
        }
)

SurveyElements.belongsTo(Instances, { foreignKey: 'instance_id' });

export default SurveyElements;