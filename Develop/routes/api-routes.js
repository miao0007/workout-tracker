// const db = require("../models");
// const mongojs = require("mongojs");

// module.exports = function(app) {
    
//     // set up route to get all the workouts
//     app.get("/api/workouts", (req,res) => {
//         db.Workout.find({})
//         .then((dbWorkouts) => {
//             res.json(dbWorkouts);
//         }).catch(err => {
//             res.status(400).json(err);
//         });
//     });

//     // set up a route to post a new workout
//     app.post("/api/workouts/",(req,res) => {
//         console.log(req.body);
//        db.Workout.create(req.body,(error,data) => {
//            if(error) {
//                res.send(error);
//            }else {
//             res.json(data);
//            }
//        });
//     });

//     // set up a route to update a workout
//     app.put("/api/workouts/:id", (req,res) => {
       
//     db.Workout.findOne({_id: mongojs.ObjectId(req.params.id)}, (error,found) => {

//     if(error) {
//         res.send(error);
//     } else {
//         res.send(found);
//         const newWorkout = req.body;
//         console.log(newWorkout);
//         const workoutList = found[0].exercises;
//         workoutList.push(newWorkout);
//         db.Workout.updateOne(
//             {
//                 _id: mongojs.ObjectId(req.params.id)
//             },
//             {$set: {exercises: workoutList}
//         },
//         (error,edited) => {
//             if(error) {
//                 res.send(error);
//             } else {
//                 res.send(edited);
//             }
//         }
//         );
//     }
// });
        
//     });

//     // route to get the stats which return previous workouts
//     app.get("/api/workouts/range", (req,res) => {
//         db.Workout.find({}).then(dbWorkouts => {
//             console.log("Workout Range");
//             res.json(dbWorkouts);
//         }).catch(err => {
//             res.status(400).json(err);
//         });
//     });
// }
const db = require("../models");
const mongojs = require("mongojs");



module.exports = function(app) {
    // get all the workouts from the database
    app.get("/api/workouts", function(req, res) {
        db.Workout.find({}).then(function(dbWorkouts) {
            res.json(dbWorkouts);
        });
    });

    // add an exercise to an existing workout
    app.put("/api/workouts/:id", function(req, res) {
        db.Workout.find({ _id: mongojs.ObjectId(req.params.id) }, (error, found) => {
            if (error) {
                console.log(error);
            } else {
                console.log(found);
                const newExercise = req.body;
                console.log(newExercise);
                const exerciseList = found[0].exercises;
                exerciseList.push(newExercise);
                db.Workout.updateOne(
                    {
                        _id: mongojs.ObjectId(req.params.id)
                    },
                    {
                        $set: {
                            exercises: exerciseList
                        }
                    },
                    (error, edited) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.send(edited);
                        }
                    }
                );
            }
        });
    });

    // create a new workout
    app.post("/api/workouts/", function(req, res) {
        db.Workout.create({})
        .then(data => {
            res.json(data);
        });
    });

    // only return the last 7 workouts
    app.get("/api/workouts/range", function(req, res) {
        db.Workout.find({}).then(function(dbWorkouts) {
            while(dbWorkouts.length > 7) {
                let first = dbWorkouts.shift()
            }
            res.json(dbWorkouts);
        });
    });
}