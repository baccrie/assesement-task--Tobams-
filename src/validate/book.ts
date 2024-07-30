import Joi from "joi";

export  const ValidateBook = Joi.object({
  title: Joi.string().required().trim().lowercase(),
  author: Joi.string().required().trim().lowercase(),
  published_date: Joi.date().required(),
  ISBN: Joi.string().required().trim().lowercase(),
  coverImage: Joi.string()
})