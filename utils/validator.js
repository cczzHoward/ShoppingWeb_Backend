const joi = require('joi');

const registerValidation = (data) => {
    const userSchema = joi.object({
        username: joi.string().min(3).max(63).required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(255).required(),
        role: joi.string().valid('customer', 'seller', 'admin').default('customer')
    });

    return userSchema.validate(data);
}

const loginValidation = (data) => {
    const userSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).max(255).required()
    });

    return userSchema.validate(data);
};

const postProductValidation = (data) => {
    const productSchema = joi.object({
        title: joi.string().min(3).max(63).required(),
        price: joi.number().min(1).max(99999).required(),
        category: joi.string().valid('food', 'drink', 'others').required(),
        description: joi.string().required(),
        image: joi.string().default('').dataUri()
    });

    return productSchema.validate(data);
}

module.exports = {
    registerValidation,
    loginValidation,
    postProductValidation
};