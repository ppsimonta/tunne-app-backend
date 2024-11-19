import e from "express";

const { createInstance, getAllInstances, getInstanceHasProfiles, getInstanceByRandomId, addInstanceToUserProfile, getInstancesByProfile, insertResponse, answerInstance, getInstanceAnswers, getRespondants, getParticipantCount, getSingleInstance, getAllEmojiData, getAllBodyData, leaveAllInstances, generateCSVForInstance, getAllDataForInstance, getInstancesByOwner, getResponseIdsForInstance, saveSurveyLayout, getSurvey, getRole, promoteToOwner, getAverageAge, getRandomBodyData } = require('../services/instanceService');


//crete instance
exports.createInstance = async (req: any, res: any) => {
    try {
        await createInstance(req, res);
    } catch (error) {
        console.error('Error in createInstance controller', error);
        res.status(500).send('Internal server error');
    }
}

// Get all instances route
exports.getAllInstances = async (req: any, res: any) => {
    try {
      await getAllInstances(req, res);
    } catch (error) {
      console.error('Error in getallinstances controller', error);
      res.status(500).send('Internal server error');
    }
  };

  //get all instances_has_profiles 
exports.getInstanceHasProfiles = async (req: any, res: any) => {
  try {
    await getInstanceHasProfiles(req, res);
  } catch (error) {
    console.log('Error fetching instances_has_profiles', error);
  }
}

// Create instance for user (join instance)
exports.createInstanceForUser = async (req: any, res: any) => {
  try {
    //get instance by random id
    const instance = await getInstanceByRandomId(req.body.random_id);
    
    if(instance) {
      //if instance exists, add instance to user profile instances_has_profiles table
      await addInstanceToUserProfile(instance.id, req.session.userId);
    
      res.status(200).json({message: 'Instance added to user profile', instance});
    } else {
      res.status(404).json({message: 'Instance not found'});
    }
  } catch (error) {
    console.error('Error in createInstanceForUser controller', error);
    res.status(500).send('Internal server error');
  }
}

//get all instances by profile id
exports.getInstancesByProfile = async (req: any, res: any) => {
  try {
    const instances = await getInstancesByProfile(req.session.userId);
    res.json(instances);
  } catch (error) {
    console.error('Error in getInstancesByProfile controller', error);
    res.status(500).send('Internal server error');
  }
}

//insert response to response table
exports.insertResponse = async (req: any, res: any) => {
  try {
    await insertResponse(req, res);
  } catch (error) {
    console.error('Error in insertResponse controller', error);
    res.status(500).send('Internal server error');
  }
}

//answer instance
exports.answerInstance = async (req: any, res: any) => {
  try {
    await answerInstance(req, res);
  } catch (error) {
    console.error('Error in answerInstance controller', error);
    res.status(500).send('Internal server error');
  }
};

//get instance answers (single user, single instance)
exports.getInstanceAnswers = async (req: any, res: any) => {
  try {
    await getInstanceAnswers(req, res);
  } catch (error) {
    console.error('Error in getInstanceAnswers controller', error);
    res.status(500).send('Internal server error');
  }
}

//get respondants
exports.getRespondants = async (req: any, res: any) => {
  try {
    await getRespondants(req, res);
  } catch (error) {
    console.error('Error in getRespondants controller', error);
    res.status(500).send('Internal server error');
  }
}

//get participant count 
exports.getParticipantCount = async (req: any, res: any) => {
  try {
    await getParticipantCount(req, res);
  } catch (error) {
    console.error('Error in getParticipantCount controller', error);
    res.status(500).send('Internal server error');
  }
}

//get single instance info
exports.getSingleInstance = async (req: any, res: any) => {
  try {
    await getSingleInstance(req, res);
  }
  catch (error) {
    console.error('Error in getSingleInstance controller', error);
    res.status(500).send('Internal server error');
  }
}

//get all emojidata answers for instance
exports.getAllEmojiData = async (req: any, res: any) => {
  try {
    await getAllEmojiData(req, res);
  } catch (error) {
    console.error('Error in getAllEmojiData controller', error);
    res.status(500).send('Internal server error');
  }
}

//get all bodydata answers for instance
exports.getAllBodyData = async (req: any, res: any) => {
  try {
    await getAllBodyData(req, res);
  } catch (error) {
    console.error('Error in getAllBodyData controller', error);
    res.status(500).send('Internal server error');
  }
}

//leave all instances
exports.leaveAllInstances = async (req: any, res: any) => {
  try {
    await leaveAllInstances(req, res);
  } catch (error) {
    console.error('Error in leaveAllInstances controller', error);
    res.status(500).send('Internal server error');
  }
}

//download CSV
exports.downloadCSV = async (req: any, res: any) => {
  try {
    const csvData = await generateCSVForInstance(req.body.instance_id);
    res.header('Content-Type', 'text/csv');
    res.attachment(`instance_${req.body.instance_id}.csv`);
    res.send(csvData);
} catch (error) {
    console.error('Error generating CSV', error);
    res.status(500).json({ error: 'Error generating CSV' });
}
};

//get instances that I own
exports.getInstancesByOwner = async (req: any, res: any) => {
  try {
    const instances = await getInstancesByOwner(req.session.userId);
    res.json(instances);
  } catch (error) {
    console.error('Error in getInstancesByOwner controller', error);
    res.status(500).send('Internal server error');
  }
}

//get response ids for instance
exports.getResponseIdsForInstance = async (req: any, res: any) => {
  try {
    res.json(await getResponseIdsForInstance(req, res));
  } catch (error) {
    console.error('Error in getResponseIdsForInstance controller', error);
    res.status(500).send('Internal server error');
  }
}


//save survey layout 
exports.saveSurveyLayout = async (req: any, res: any) => {
  try {
    await saveSurveyLayout(req, res);
  } catch (error) {
    console.error('Error in saveSurveyLayout controller', error);
    res.status(500).send('Internal server error');
  }
}

//get survey by instance id
exports.getSurvey = async (req: any, res: any) => {
  try {
    await getSurvey(req, res);
  } catch (error) {
    console.error('Error in getSurvey controller', error);
    res.status(500).send('Internal server error');
  }
}

//get role
exports.getRole = async (req: any, res: any) => {
  try {
    await getRole(req, res);
  } catch (error) {
    console.error('Error in getRole controller', error);
    res.status(500).send('Internal server error');
  }
}

//promote to owner
exports.promoteToOwner = async (req: any, res: any) => {
  try {
    await promoteToOwner(req, res);
  } catch (error) {
    console.error('Error in promoteToOwner controller', error);
    res.status(500).send('Internal server error');
  }
}

//get average age
exports.getAverageAge = async (req: any, res: any) => {
  try {
    await getAverageAge(req, res);
  } catch (error) {
    console.error('Error in getAverageAge controller', error);
    res.status(500).send('Internal server error');
  }
}

//get random body data for instance
exports.getRandomBodyData = async (req: any, res: any) => {
  try {
    await getRandomBodyData(req, res);
  } catch (error) {
    console.error('Error in getRandomBodyData controller', error);
    res.status(500).send('Internal server error');
  }
}
