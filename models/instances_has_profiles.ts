const {Sequelize, DataTypes, Model} = require('sequelize');
import {sequelize} from '../database/database';
import Profiles from '../models/user';
import Instances from '../models/instances'

class InstancesHasProfiles extends Model {
    
}

InstancesHasProfiles.init(
    {
        profile_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'profiles',
                key: 'id'
            }
        },
        instance_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'instances',
                key: 'id'
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    
    {
        sequelize,
        modelName: 'instances_has_profiles',
        timestamps: false,
    }
)

InstancesHasProfiles.belongsTo(Profiles, { foreignKey: 'profile_id' });
InstancesHasProfiles.belongsTo(Instances, { foreignKey: 'instance_id' });

export default InstancesHasProfiles;