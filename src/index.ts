import fastify from 'fastify';
import fastifyCors from '@fastify/cors';

const server = fastify({ logger: true });

server.register(fastifyCors, {
  origin: "*"
});

const teams = [
    {"id": 1,"name": "ferrari", base: "italy"},
    {"id": 2,"name": "mercedes", base: "england"},
    {"id": 3,"name": "redbull", base: "austria"}
];

const drivers = [
    {"id": 1,"name": "lewis hamilton", team: "ferrari"},
    {"id": 2,"name": "max verstappen", team: "redbull"},
    {"id": 3,"name": "charles leclerc", team: "ferrari"}
];

server.get('/teams', async (request, response) => {
 response.type('application/json').code(200);
 return [teams];
});

server.get('/drivers', async (request, response) => {
 response.type('application/json').code(200);
 return [drivers];
});

interface ParamsDrivers {
  id: string;
}

server.get<{ Params: ParamsDrivers }>('/drivers/:id', async (request, response) => {
  const  id  = parseInt(request.params.id);
  const driver = drivers.find(d => d.id === id);

  if (!driver) {
    response.type('application/json').code(404);
    return { message: "Driver not found" };
  } 
  else {
    response.type('application/json').code(200);
    return [driver];
  }
});

server.listen({ port: 3333 }, () => {
  console.log("Server connect");
});