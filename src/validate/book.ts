import Joi from "joi";

export const CreateBook = Joi.object({
  title: Joi.string().required().trim(),
  author: Joi.string().required().trim(),
  published_date: Joi.string().required(),
  ISBN: Joi.string().required().trim(),
})

export const UpdateBook = Joi.object({
  title: Joi.string().trim(),
  author: Joi.string().trim(),
  published_date: Joi.string(),
  ISBN: Joi.string().trim(),
})