const {DataTypes, Model} = require('sequelize');
import {sequelize} from '../database/database';
import Instances from '../models/instances';
import Responses from '../models/responses';

class EmojiData extends Model {
    declare id: number;
}

EmojiData.init(
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
        emotion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        step: {
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
        datetime: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        },
        {
            sequelize,
            modelName: 'emoji_data',
            timestamps: false,
        }

)

EmojiData.belongsTo(Instances, { foreignKey: 'instance_id' });
EmojiData.belongsTo(Responses, { foreignKey: 'response_id' });

export default EmojiData;