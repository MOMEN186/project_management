const usersRouter = require('express').Router();
const usersController = require('../controllers/usersContoller');
const db = require('../db');

usersRouter.get('/project_users', usersController.getProjectUsers);
usersRouter.get('/team_users', usersController.getTeamUsers);
usersRouter.post('/addUserToTeam', usersController.addUserToTeam);
usersRouter.post('/upload/cover_photo/:id',db.upload.single("cover_photo"),usersController.uploadImage);
usersRouter.post('/upload/profile_photo/:id',db.upload.single("profile_photo"),usersController.uploadImage);

usersRouter.delete('/deleteimage/:id', usersController.deleteImage);
usersRouter.get('/getimage/:id', usersController.getImage);
usersRouter.put("/update/:id", usersController.editUserInfo);
usersRouter.get("/:id", usersController.getUserInfo);

module.exports = usersRouter;
