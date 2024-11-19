const instanceController = require('../controllers/instanceController');
const express = require('express');
const router = express.Router();
const cors = require('cors');


router.post('/create', instanceController.createInstance)

// Get all instances route
router.get('/instances', instanceController.getAllInstances);

// Get all instances_has_profiles route
router.get('/instances_has_profiles', instanceController.getInstanceHasProfiles)

// Join instance route
router.post('/join', instanceController.createInstanceForUser)

//get instances by profile id
router.get('/myprofile', instanceController.getInstancesByProfile)

//insert response
router.post('/response', instanceController.insertResponse)

//answer instance
router.post('/answer', instanceController.answerInstance)

//get instance answers (single user, single instance)
router.get('/OneUserAnswer', instanceController.getInstanceAnswers)

//get respondants 
router.get('/respondants', instanceController.getRespondants)

//get participant count
router.get('/participantCount', instanceController.getParticipantCount)

//get single instance by instance id
router.get('/singleInstance', instanceController.getSingleInstance)

//get all emoji data for instance
router.get('/emojiDataInstance', instanceController.getAllEmojiData)

//get all body data for instance
router.get('/bodyDataInstance', instanceController.getAllBodyData)

//leave all instances
router.delete('/leaveAll', instanceController.leaveAllInstances)

//download CSV
router.post('/downloadCSV', instanceController.downloadCSV)

//get instances that I own
router.get('/myOwnInstances', instanceController.getInstancesByOwner)

//get response ids for instance
router.get('/responseIds', instanceController.getResponseIdsForInstance)

//save survey layout
router.post('/saveSurvey', instanceController.saveSurveyLayout)

//get survey by id
router.get('/getSurvey', instanceController.getSurvey)

//get role
router.get('/getRole', instanceController.getRole)

//promote to owner
router.post('/promote', instanceController.promoteToOwner)

//get average age
router.get('/averageAge', instanceController.getAverageAge)

//get random body data for instance
router.get('/randomBodyData', instanceController.getRandomBodyData)

module.exports = router;