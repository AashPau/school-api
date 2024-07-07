import StudentSchema from "./studentSchema.js";

export const insertStudent = (Obj) => {
  return StudentSchema(Obj).save();
};

export const getAStudent = (filter) => {
  return StudentSchema.findOne(filter);
};

export const getAllStudents = () => {
  return StudentSchema.find();
};

export const updateStudentById = ({ _id, obj }) => {
  return StudentSchema.findByIdAndUpdate(_id, obj);
};

export const updateStudent = (filter, obj) => {
  return StudentSchema.findOneAndUpdate(filter, obj);
};
