const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter a workout type",
        },
        name: {
          type: String,
          trim: true,
          required: "Enter a workout name",
        },
        duration: {
          type: Number,
          required: "Enter a workout duration in minutes.",
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
        distance: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true
    },
  }
);
// TO add a dynamically created property to schema
workoutSchema.virtual("totalDuration").get(function () {
  // to calculate the sum of workout duration
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
