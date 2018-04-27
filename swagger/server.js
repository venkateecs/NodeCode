const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Joi = require('joi');
const HapiSwagger = require('hapi-swagger');
const Routes = require('./routes/routes');

const server = Hapi.server({
    host:'localhost',
    port:3000
});

const options = {
    info: {
        'title': 'Test API Documentation',
        'version': '0.0.1',
    }
};

start() ;

async function start() {
    try {
        await server.register([{
            plugin: Inert,
            options: {}
        }, {
            plugin: Vision,
            options: {}
        },
        {
            plugin: HapiSwagger,
            options: options
        }
    ]).then((err)=> {
        try {
            server.start();
            server.route(Routes);
            console.log(`Hapi server running at ${server.info.uri}`);  
        } catch(err) {
            console.log(err);
        }
    })
    } catch(err) {
       console.log(err) ;
    }
}
// server.route({
//     path: '/api/add',
//     method: 'POST',
//     config: {
//         handler: (request) => {
//             var sum = parseInt(request.payload.a) + parseInt(request.payload.b);
//             return(sum);
//         },
//         description: 'Get algebraic sum',
//         notes: 'Pass two numbers as a & b and returns sum',
//         tags: ['api'],
//         validate: {
//             payload: {
//                 a : Joi.number()
//                         .required(),
//                 b : Joi.number()
//                         .required(),
//             }
//         }
//     }
// },
// );
// server.route({
// path: '/api/div',
// method: 'POST',
// config: {
//     handler: (request, reply) => {
//         var div = parseInt(request.payload.a) / parseInt(request.payload.b);
//         return(div);
//     },
//     description: 'Get algebraic division',
//     notes: 'Pass two numbers as a & b and returns quotient',
//     tags: ['api'],
//     validate: {
//         payload: {
//             a : Joi.number()
//                     .required(),
//             b : Joi.number()
//                     .required(),
//         }
//     }
// }
// }); 
