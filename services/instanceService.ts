import Instances from "../models/instances";
import Profiles from "../models/user";
import InstancesHasProfiles from "../models/instances_has_profiles";
import Responses from "../models/responses";
import EmojiData from "../models/emoji_data";
import BodyDataSpots from "../models/body_data_spots";
import FreeformData from "../models/freeform_data";
import RatingData from "../models/rating_data";
import getRandomInt from "../helpers/generateRandomId";
import SurveyElements from "../models/survey_elements";
import AgeData from "../models/age_data";
const  convertToCSV  = require('../helpers/downloadCSV');



interface InstancesHasProfilesInstance {
    instance_id: string; 
}

Profiles.belongsToMany(Instances, { through: InstancesHasProfiles, foreignKey: 'profile_id' });
Instances.belongsToMany(Profiles, { through: InstancesHasProfiles, foreignKey: 'instance_id' });


//create instance
export const createInstance = async (req: any, res: any) => {
    try {
        
        //validate request
        if (!req.body.name) {
            return res.status(400).json({error: 'Name is required'});
        }
        
        const instance = await Instances.create({
            name: req.body.name,
            random_id: req.body.random_id,
            owner_id: req.session.userId,
        });
        
        await InstancesHasProfiles.create({
            profile_id: req.session.userId,
            instance_id: instance.id,
            role: 'owner'
        });

        res.status(200).json({message: 'Instance created'})
        }
        catch (error) {
            console.log(req.session.userId)
            console.error('Error creating instance', error);
            res.status(500).json({error: 'Error creating instance'});
        }
    }

//get all instances
export const getAllInstances = async (req: any, res: any) => {
    try {
        const instances = await Instances.findAll();
        res.json(instances);

        if (!instances) {
            res.status(404).json({error: 'No instances found'});
        }

    } catch (error) {
        console.error('Error fetching instances', error);
        res.status(500).send('Internal server error');
    }
}

// Get all instances_has_profiles 
export const getInstanceHasProfiles = async (req: any, res: any) => {
    try {
        const instances_has_profiles = await InstancesHasProfiles.findAll();
        res.json(instances_has_profiles);

        if (!instances_has_profiles) {
            res.status(404).json({error: 'No instances_has_profiles found'});
        }

    } catch (error) {
        console.log('Error fetching instances_has_profiles', error);
    }
}
   

//get instance by random id
export const getInstanceByRandomId = async (randomId: string) => {
    try {
        const instance = await Instances.findOne({
            where: {
                random_id: randomId
            }
        });

        if (!instance) {
            throw new Error('No instance found');
        }

        return instance;
    
    } catch (error) {
        console.error('Error fetching instance by random id', error);
        throw error;
    }
}



//add instance to user profile instances_has_profiles table
export const addInstanceToUserProfile = async (instanceId: number, profileId: string) => {
    try {
        if (!profileId) {
            const myInstance = await Instances.findOne({
                where: {
                    id: instanceId
                }
            });

            return myInstance;
        }
        await InstancesHasProfiles.create({
            profile_id: profileId,
            instance_id: instanceId,
            role: 'member'
        });

    } catch (error) {
        console.error('Error adding instance to user profile', error);
        throw error;
    }
}

//get instances by profile id
export const getInstancesByProfile = async (profileId: string) => {
    try {
        const instances = await InstancesHasProfiles.findAll({
            where: {
                profile_id: profileId
            }
        });
        if (!instances) {
            throw new Error('No instances found');
        }
        const instanceIds = instances.map((instance: InstancesHasProfilesInstance) => instance.instance_id);
        const myInstances = await Instances.findAll({
            where: {
                id: instanceIds
            }
        });
        if (!myInstances) {
            throw new Error('No instances found');
        }
        return myInstances
    } catch (error) {
        console.error('Error fetching instances by profile id', error);
        throw error;
    }
}

//insert response to response table
export const insertResponse = async (req: any, res: any) => {
    try {
        const response = await Responses.create({
            instance_id: req.body.instance_id,
            profile_id: req.body.profile_id ? req.body.profile_id : getRandomInt(1000000000)
        });
        if (!req.body.instance_id) {
            return res.status(404).json({error: 'Instance id is required'});
        }
        res.status(200).json({message: 'Response added', response})
    }
    catch (error) {
        console.error('Error inserting response', error);
        res.status(500).json({error: 'Error inserting response'});
    }
}

//answer instance
export const answerInstance = async (req: any, res: any) => {
    try {
        const { emojiData, bodyData, freeformData, ratingData, ageData} = req.body; //destructure

        //check if emoji data and body data are arrays
        if (
            !Array.isArray(emojiData) || !Array.isArray(bodyData)
            || !Array.isArray(freeformData) || !Array.isArray(ratingData)
            || !Array.isArray(ageData)
        ) 
        {
            throw new Error('Invalid request format, use array instead');
        }

        //iterate over emojidata
        for(const answer of emojiData) {
            const emojiDataResult = await EmojiData.create({
                instance_id: answer.instance_id,
                emotion: answer.emotion,
                step: answer.step,
                response_id: answer.response_id,
                datetime: answer.datetime,
            });
        }

        for(const answer of bodyData) {
            const bodyDataResult = await BodyDataSpots.create({
                instance_id: answer.instance_id,
                timestep: answer.timestep,
                hex_color: answer.hex_color,
                x_position: answer.x_position,
                y_position: answer.y_position,
                size: answer.size,
                body_part: answer.body_part,
                response_id: answer.response_id,
            });
        }

        for(const answer of freeformData) {
            const freeformDataResult = await FreeformData.create({
                instance_id: answer.instance_id,
                title: answer.title,
                value: answer.value,
                response_id: answer.response_id,
            });
        }

        for(const answer of ratingData) {
            const ratingDataResult = await RatingData.create({
                instance_id: answer.instance_id,
                title: answer.title,
                value: answer.value,
                response_id: answer.response_id,
            });
        }
        for(const answer of ageData) {
            const ageDataResult = await AgeData.create({
                instance_id: answer.instance_id,
                title: answer.title,
                value: answer.value,
                response_id: answer.response_id,
            });
        }
        res.status(200).json({message: 'Instance answered'});
    } catch(error) {
        console.error('Error answering instance', error);
        res.status(500).json({error: 'Error answering instance'});
    }
};

// Get instance answers (single user, single instance)
export const getInstanceAnswers = async (req: any, res: any) => {
    console.log("RESPONSE ID: ", req.query.response_id);

    if (!req.query.response_id) {
        return res.status(400).json({error: 'Response id is required'});
    }

    try {
        const emojiData = await EmojiData.findAll({
            where: {
                response_id: req.query.response_id
            }
        });
        const circleData = await BodyDataSpots.findAll({
            where: {
                response_id: req.query.response_id
            }
        });
        const freeformData = await FreeformData.findAll({
            where: {
                response_id: req.query.response_id
            }
        });
        const ratingData = await RatingData.findAll({
            where: {
                response_id: req.query.response_id
            }
        });
        const ageData = await AgeData.findAll({
            where: {
                response_id: req.query.response_id
            }
        });
        res.json({ emojiData, circleData, freeformData, ratingData, ageData });
    } catch (error) {
        console.error('Error fetching instance answers', error);
        res.status(500).json({ error: 'Error fetching instance answers' });
    }
};


//get respondants for instance
export const getRespondants = async (req: any, res: any) => {
    try {
        const respondants = await Responses.findAll({
            where: {
                instance_id: req.query.instance_id
            }
        });
        if (!respondants) {
            res.status(404).json({error: 'No respondants found'});
        }
        res.json(respondants);
    } catch (error) {
        console.error('Error fetching respondants', error);
        res.status(500).json({error: 'Error fetching respondants'});
    }
}

//get participant count for instance
export const getParticipantCount = async (req: any, res: any) => {
    try {
        const participantCount = await InstancesHasProfiles.findAll({
            where: {
                instance_id: req.query.instance_id
            }
        });
        if (!participantCount) {
            res.status(404).json({error: 'No participants found'});
        }
        res.json(participantCount);
    }
    catch (error) {
        console.error('Error fetching participant count', error);
        res.status(500).json({error: 'Error fetching participant count'});
    }
}

//get single instance info
export const getSingleInstance = async (req: any, res: any) => {
    try {
        const instance = await Instances.findOne({
            where: {
                id: req.query.instance_id
            }
        });
        if (!instance) {
            res.status(404).json({error: 'Instance not found'});
        }
        res.json(instance);
    } catch (error) {
        console.error('Error fetching single instance', error);
        res.status(500).json({error: 'Error fetching single instance'});
    }
}

//get all emojidata answers for instance
export const getAllEmojiData = async (req: any, res: any) => {
    try{
        const emojiData = await EmojiData.findAll({
            where: {
                instance_id: req.query.instance_id
            }
        });
        if (!emojiData) {
            res.status(404).json({error: 'No emoji data found'});
        }
        res.json(emojiData);
    }
    catch (error) {
        console.error('Error fetching emoji data', error);
        res.status(500).json({error: 'Error fetching emoji data'});
    }
}

//get all body data answers for instance
export const getAllBodyData = async (req: any, res: any) => {
    try{
        const bodyData = await BodyDataSpots.findAll({
            where: {
                instance_id: req.query.instance_id
            }
        });
        if (!bodyData) {
            res.status(404).json({error: 'No body data found'});
        }
        res.json(bodyData);
    }
    catch (error) {
        console.error('Error fetching body data', error);
        res.status(500).json({error: 'Error fetching body data'});
    }
}

//leave all instances
export const leaveAllInstances = async (req: any, res: any) => {
    try {
        await InstancesHasProfiles.destroy({
            where: {
                profile_id: req.query.profile_id
            }
        });
    } catch (error) {
        console.error('Error leaving all instances', error);
        throw error;
    }
}

//get csv of anwers
export const getAllDataForInstance = async (instance_id: any) => {
    try {
        const emojiData = await EmojiData.findAll({
            where: { instance_id }
        });

        const bodyData = await BodyDataSpots.findAll({
            where: { instance_id }
        });

        const freeformData = await FreeformData.findAll({
            where: { instance_id }
        });

        const ratingData = await RatingData.findAll({
            where: { instance_id }
        });
        const ageData = await AgeData.findAll({
            where: { instance_id }
        });

        const combinedData: any[] = [
            ...emojiData.map((item: any) => ({ type: 'emojiData', ...item.dataValues })),
            ...bodyData.map((item: any) => ({ type: 'bodyData', ...item.dataValues })),
            ...freeformData.map((item: any) => ({ type: 'freeformData', ...item.dataValues })),
            ...ratingData.map((item: any) => ({ type: 'ratingData', ...item.dataValues })),
            ...ageData.map((item: any) => ({ type: 'ageData', ...item.dataValues })),
        ];
        return combinedData;
    } catch (error) {
        console.error('Error fetching data for instance', error);
        throw error;
    }
};

export const generateCSVForInstance = async (instance_id: any) => {
    const data = await getAllDataForInstance(instance_id);
    return convertToCSV(data);
};

// Function to get instances by owner
export const getInstancesByOwner = async (userId: any) => {
    
    try {
        // Await the promise to get the actual result from InstancesHasProfiles.findAll()
        const idForOwner = await InstancesHasProfiles.findAll({
            where: {
                profile_id: userId,
                role: 'owner'
            }
        });

        const ids = idForOwner.map((instance: any) => instance.instance_id);

        // Fetch instances where owner_id is userId
        const instancesWithOwnerId = await Instances.findAll({
            where: {
                owner_id: userId 
            }
        });

        // Fetch instances where id is in the ids array
        const instancesWithId = await Instances.findAll({
            where: {
                id: ids
            }
        });

        let allInstances = [...instancesWithOwnerId, ...instancesWithId]
        
        const uniqueInstances = Array.from(new Set(allInstances.map(instance => instance.id)))
        .map(id => allInstances.find(inst => inst.id === id));

        return uniqueInstances;

    } catch (error) {
        console.error('Error fetching instances by owner', error);
        throw error;
    }
};

//get response ids for instance
export const getResponseIdsForInstance = async (req: any, res: any) => {
    try {
        const responses = await Responses.findAll({
            where: {
                instance_id: req.query.instance_id
            }
        });
        if (!responses) { 
            res.status(404).json({error: 'No responses found'});
        }
        return responses.map((response: any) => response.id);
    } catch (error) {
        console.error('Error fetching response ids for instance', error);
        throw error;
    }
}

//save survey layout
export const saveSurveyLayout = async (req: any, res: any) => {
    try {
        // Get questions
        const questions = req.body.questions;

        // Check if data exists for the survey
        const existingData = await SurveyElements.findAll({ where: { instance_id: req.body.instance_id } });
        
        // If data exists, delete it
        if (existingData.length > 0) {
            await SurveyElements.destroy({ where: { instance_id: req.body.instance_id } });
        }

        // Change format
        const newSteps = questions.steps.map((item: any, index: Number) => {
            return {
                label: item.label,
                element_type: "step",
                element_order: index,
                step_id: index
            }    
        });
        let newQuestions: any[] = [];
        for (const [stepIndex, step] of questions.steps.entries()) {
            for (const [questionIndex, question] of step.questions.entries()) {
                newQuestions.push({
                    element_type: 'question',
                    element_order: questionIndex,
                    step_id: stepIndex,
                    question_type: question.type,
                    title: question.title,
                    heading: question.heading,
                });
            }
        }

        // Save to database
        for(const element of [...newSteps, ...newQuestions]) {
            await SurveyElements.create({
                element_type: element.element_type,
                step_id: element.step_id,
                instance_id: req.body.instance_id,
                label: element.label,
                type: element.question_type,
                title: element.title,
                heading: element.heading,
                element_order: element.element_order,
                created_at: new Date(),
            });
        }
        
        res.status(200).json({message: 'Survey layout saved'});

    } catch (error) {
        console.error('Error saving survey layout', error);
        res.status(500).json({error: 'Error saving survey layout'});
    }
}


//get survey by instance id
export const getSurvey = async (req: any, res: any) => {
    try {
        const surveyLayout = await SurveyElements.findAll({
            where: {
                instance_id: req.query.instance_id
            }
        });

        const formattedSurvey =
        {
            steps: 
            surveyLayout
            .filter((step: any) => step.element_type === 'step')
            .map((step: any) => ({
                label: step.label,
                questions: 
                    surveyLayout
                    .filter((question: any) => question.element_type === 'question' && question.step_id === step.step_id)
                    .map((question: any) => ({
                        title: question.title,
                        heading: question.heading,
                        type: question.type
                    }))
                }))
        };

        console.log(formattedSurvey)
    
        res.json(formattedSurvey);
    } catch (error) {
        console.error('Error fetching survey layout', error);
        res.status(500).json({error: 'Error fetching survey layout'});
    }
}

//get role of user
export const getRole = async (req: any, res: any) => {
    try {
        const role = await InstancesHasProfiles.findOne({
            where: {
                instance_id: req.query.instance_id,
                profile_id: req.query.profile_id
            }
        });
        res.json(role.role);
    } catch (error) {
        console.error('Error fetching role', error);
        res.status(500).json({error: 'Error fetching role'});
    }
}

//promote to owner role
export const promoteToOwner = async (req: any, res: any) => {
    try {

        // check user id by given email and take id from it
        const profile = await Profiles.findOne({
            where: {
                email: req.body.email
            }
        });
        console.log(req.body)

        if (!profile) {
            return res.status(404).json({error: 'Profile not found'});
        }
        
        const isJoined = await InstancesHasProfiles.findOne({
            where: {
                instance_id: req.body.instance_id,
                profile_id: profile.id
            }
        });

        if(!isJoined) {
            return res.status(400).json({error: 'User has not joined this instance'});
        }

        await InstancesHasProfiles.update({
            role: 'owner'
        }, {
            where: {
                instance_id: req.body.instance_id,
                profile_id: profile.id
            }
        });
        res.status(200).json({message: 'Promoted to owner'});
    } catch (error) {
        console.error('Error promoting to owner', error);
        res.status(500).json({error: 'Error promoting to owner'});
    }
}

// average age for instance
export const getAverageAge = async (req: any, res: any) => {
    try {
        const ageData = await AgeData.findAll({
            where: {
                instance_id: req.query.instance_id
            }
        });

        // Muunna ikäryhmät keskiarvoiksi
        const ageValues = ageData.map((data: any) => {
            if (data.value === "65+") {
                return 70;
            }
            const ageRange = data.value.match(/(\d+)-(\d+)/);
            if (ageRange) {
                const minAge = parseInt(ageRange[1], 10);
                const maxAge = parseInt(ageRange[2], 10);
                return (minAge + maxAge) / 2;
            } else {
                return null; // Jos ikämuoto ei täsmää
            }
        }).filter((value: any) => value !== null); // Poistetaan null-arvot

        // Tarkistetaan, ettei ikäarvot ole tyhjiä
        if (ageValues.length === 0) {
            return res.status(400).json({ error: 'No valid age data found' });
        }

        // Laske keskiarvo
        const averageAge = ageValues.reduce((acc: any, curr: any) => acc + curr, 0) / ageValues.length;
        res.json({ averageAge });
    } catch (error) {
        console.error('Error fetching average age', error);
        res.status(500).json({ error: 'Error fetching average age' });
    }
}

//get random body data for instance
export const getRandomBodyData = async (req: any, res: any) => {
    try {
        const bodyDataList = await BodyDataSpots.findAll({
            where: {
                instance_id: req.query.instance_id
            }
        });

        const randomIndex = Math.floor(Math.random() * bodyDataList.length);
        const randomBodyData = bodyDataList[randomIndex];

        return res.json(randomBodyData);
    } catch (error) {
        console.error('Error fetching random body data', error);
        throw error;
    }
}