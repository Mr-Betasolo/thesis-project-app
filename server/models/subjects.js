import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  name: { type: String },
  homeworks: [Number],
  quizzes: [Number],
  exams: [Number],
});

export const StudentSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  contact: { type: String },
  grade: { type: String },
  strand: { type: String },
  specialization: { type: String },
  subjects: [SubjectSchema],
});
