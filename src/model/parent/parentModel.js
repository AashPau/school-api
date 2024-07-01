import ParentSchema from "./parentSchema.js";

export const insertParent = (Obj) => {
  return ParentSchema(Obj).save();
};

export const getAParent = (filter) => {
  return ParentSchema.findOne(filter);
};

export const getAllParents = () => {
  return ParentSchema.find();
};

export const updateParentById = ({ _id, obj }) => {
  return ParentSchema.findByIdAndUpdate(_id, obj);
};

export const updateParent = (filter, obj) => {
  return ParentSchema.findOneAndUpdate(filter, obj);
};
