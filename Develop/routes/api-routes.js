const Workout = require("../models/workout");

module.exports = function(app) {
    
    // set up route to get all the workouts
    app.get("/api/workouts", (req,res) => {
        Workout.find({}).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
        });
    });

    // set up a route to post a new workout
    app.post("/api/workouts",({body},res) => {
        console.log(body);
        Workout.create(body).then(dbWorkout => {
            res.json(dbWorkout);

        }).catch(err => {
            res.status(400).json(err);
        });
    });

    // set up a route to update a workout
    app.put("/api/workouts/:id", ({params,body},res) => {
        console.log(body);
        Workout.findByIdAndUpdate({__id:params.id},{$push: {exercises: [body]}},{$inc: {totalDuration: body.duration}})
        .then(() => {
            console.log(body);
            Workout.findOne({__id: params.id}).then(dbWorkout => {
                res.json(dbWorkout);
            })
        }).catch(err => {
            res.status(400).json(err);
        });
    });

    // route to get the stats
    app.get("/api/workouts/range", (req,res) => {
        Workout.find({}).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
        });
    });
}