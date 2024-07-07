import TeacherSchema from "./teacherSchema.js";

export const insertTeacher = (Obj) => {
  return TeacherSchema(Obj).save();
};

export const getATeacher = (filter) => {
  return TeacherSchema.findOne(filter);
};

export const getAllTeachers = () => {
  return TeacherSchema.find();
};

export const updateTeacherById = ({ _id, obj }) => {
  return TeacherSchema.findByIdAndUpdate(_id, obj);
};

export const updateTeacher = (filter, obj) => {
  return TeacherSchema.findOneAndUpdate(filter, obj);
};
