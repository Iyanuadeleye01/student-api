const swaggerAutogen = require("swagger-autogen");


const doc = {
    info:{
        title:"Student Courses Api",
        description:"Student Records Api"
    },
    host: "localhost:4001",
    schemes: ("http")
};

const outputFile = "./swagger.json";
const endpointFiles = ["./routes/index.js"];

// To generate swagger.json
swaggerAutogen(outputFile, endpointFiles, doc);