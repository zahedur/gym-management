const express = require('express');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const AuthController = require('../controllers/AuthController');
const UserController = require("../controllers/UsersController");
const ProfileController = require("../controllers/ProfileController");
const MembersController = require("../controllers/MembersController");
const TrainersController = require("../controllers/TrainersController");
const PackageController = require("../controllers/PackageController");
const PlansController = require("../controllers/PlansController");
const MembershipsController = require("../controllers/MembershipsController");
const ScheduleController = require("../controllers/ScheduleController");

const router = express.Router();

//Auth and profile
router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);
router.get("/profile", AuthMiddleware, ProfileController.Profile);
router.post("/update-profile", AuthMiddleware, ProfileController.UpdateProfile);
router.post("/change-password", AuthMiddleware, ProfileController.changePassword);


// Users
router.get("/users", AuthMiddleware, UserController.Index);
router.post("/users/create", AuthMiddleware, UserController.Create);
router.post("/users/edit", AuthMiddleware, UserController.Edit);
router.post("/users/update", AuthMiddleware, UserController.Update);
router.post("/users/delete", AuthMiddleware, UserController.Delete);


// Members
router.get("/members", AuthMiddleware, MembersController.Index);
router.post("/members/create", AuthMiddleware, MembersController.Create);
router.post("/members/edit", AuthMiddleware, MembersController.Edit);
router.post("/members/update", AuthMiddleware, MembersController.Update);
router.post("/members/delete", AuthMiddleware, MembersController.Delete);
router.post("/members/view", AuthMiddleware, MembersController.View);


// Trainers
router.get("/trainers", AuthMiddleware, TrainersController.Index);
router.post("/trainers/create", AuthMiddleware, TrainersController.Create);
router.post("/trainers/edit", AuthMiddleware, TrainersController.Edit);
router.post("/trainers/update", AuthMiddleware, TrainersController.Update);
router.post("/trainers/delete", AuthMiddleware, TrainersController.Delete);
router.post("/trainers/view", AuthMiddleware, TrainersController.View);


// Packages
router.get("/packages", AuthMiddleware, PackageController.Index);
router.post("/packages/create", AuthMiddleware, PackageController.Create);
router.post("/packages/edit", AuthMiddleware, PackageController.Edit);
router.post("/packages/update", AuthMiddleware, PackageController.Update);
router.post("/packages/delete", AuthMiddleware, PackageController.Delete);
router.post("/packages/view", AuthMiddleware, PackageController.View);


// Plans
router.get("/plans", AuthMiddleware, PlansController.Index);
router.post("/plans/create", AuthMiddleware, PlansController.Create);
router.post("/plans/edit", AuthMiddleware, PlansController.Edit);
router.post("/plans/update", AuthMiddleware, PlansController.Update);
router.post("/plans/delete", AuthMiddleware, PlansController.Delete);
router.post("/plans/view", AuthMiddleware, PlansController.View);


// Membership
router.get("/memberships", AuthMiddleware, MembershipsController.Index);
router.post("/memberships/create", AuthMiddleware, MembershipsController.Create);
router.post("/memberships/edit", AuthMiddleware, MembershipsController.Edit);
router.post("/memberships/update", AuthMiddleware, MembershipsController.Update);
router.post("/memberships/delete", AuthMiddleware, MembershipsController.Delete);
router.post("/memberships/view", AuthMiddleware, MembershipsController.View);
router.get("/memberships/form-data", AuthMiddleware, MembershipsController.MembershipFormData);


// Schedules
router.get("/schedules", AuthMiddleware, ScheduleController.Index);
router.post("/schedules/create", AuthMiddleware, ScheduleController.Create);
router.post("/schedules/edit", AuthMiddleware, ScheduleController.Edit);
router.post("/schedules/update", AuthMiddleware, ScheduleController.Update);
router.post("/schedules/delete", AuthMiddleware, ScheduleController.Delete);
router.post("/schedules/view", AuthMiddleware, ScheduleController.View);
router.get("/schedules/form-data", AuthMiddleware, ScheduleController.ScheduleFormData);


module.exports = router;
