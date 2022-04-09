import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  name: { type: String },
  homeworks: [],
  quizzes: [],
  exams: [],
});

export const StudentSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  contact: { type: String },
  grade: { type: String },
  strand: { type: String },
  specialization: { type: String },
  subjects: [SubjectSchema],
});
