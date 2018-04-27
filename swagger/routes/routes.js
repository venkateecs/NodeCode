const Joi = require('joi');
const add = {
    path: '/api/add',
    method: 'POST',
    config: {
        handler: (request) => {
            var sum = parseInt(request.payload.a) + parseInt(request.payload.b);
            return(sum);
        },
        description: 'Get algebraic sum',
        notes: 'Pass two numbers as a & b and returns sum',
        tags: ['api'],
        validate: {
            payload: {
                a : Joi.number()
                        .required(),
                b : Joi.number()
                        .required(),
            }
        }
    }
}

const div = {
    path: '/api/div',
    method: 'POST',
    config: {
        handler: (request, reply) => {
            var div = parseInt(request.payload.a) / parseInt(request.payload.b);
            return(div);
        },
        description: 'Get algebraic division',
        notes: 'Pass two numbers as a & b and returns quotient',
        tags: ['api'],
        validate: {
            payload: {
                a : Joi.number()
                        .required(),
                b : Joi.number()
                        .required(),
            }
        }
    }
    }

module.exports = [add , div]