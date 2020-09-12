const db = require("../models");
const mongojs = require("mongojs");

module.exports = function(app) {
    
    // set up route to get all the workouts
    app.get("/api/workouts", (req,res) => {
        db.Workout.find({}).then(dbWorkouts => {
            res.json(dbWorkouts);
        }).catch(err => {
            res.status(400).json(err);
        });
    });

    // set up a route to post a new workout
    app.post("/api/workouts",({body},res) => {
        console.log(body);
       db.Workout.create({}).then(dbWorkouts => {
            res.json(dbWorkouts);

        }).catch(err => {
            res.status(400).json(err);
        });
    });

    // set up a route to update a workout
    app.put("/api/workouts/:id", (req,res) => {
        console.log(body);
db.Workout.find({_id: mongojs.ObjectId(req.params.id)}, (error,found) => {
    if(error) {
        console.log(error);
    } else {
        console.log(found);
        const newWorkout = req.body;
        console.log(newWorkout);
        const workoutList = found[0].workouts;
        workoutList.push(newWorkout);
        db.Workout.updateOne(
            {
                _id: mongojs.ObjectId(req.params.id)
            },
            {$set: {workouts: workoutList}
        },
        (error,edited) => {
            if(error) {
                console.log(error);
            } else {
                res.send(edited);
            }
        }
        );
    }
});
        
    });

    // route to get the stats which return the last 7 workouts
    app.get("/api/workouts/range", (req,res) => {
        db.Workout.find({}).then(dbWorkouts => {
            while(dbWorkouts.length > 7){
                var first = dbWorkouts.shift();
            }
            res.json(dbWorkouts);
        }).catch(err => {
            res.status(400).json(err);
        });
    });
}