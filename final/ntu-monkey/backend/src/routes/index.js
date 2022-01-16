import Account from './api/account.js'
import Profile from './api/profile.js'
import Task from './api/task.js'
import TaskApplicant from './api/taskApplicant.js'

// var Account = require('./api/account');
// var Profile = require('./api/profile');
// var Task = require('./api/task')
// var TaskApplicant = require('./api/taskApplicant')

module.exports = function(app) {
    app.use("/api/account", Account, Profile);
    app.use("/api/task", Task, TaskApplicant);
};
