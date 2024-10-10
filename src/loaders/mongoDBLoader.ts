import { env } from '../env';
const configs = {
  username: env.mongodb.username,
  password: env.mongodb.password,
  dbname: env.mongodb.name,
  host: env.mongodb.host,
  port: env.mongodb.port,
  dBname: env.mongodb.dbName,
};

import mongoose from 'mongoose';
export default () => {
  const mongoconnect = () => {
    mongoose
      .connect(
        `mongodb+srv://${configs.username}:${configs.password}@${configs.host}/${configs.dBname}?retryWrites=true&w=majority&appName=${configs.dbname}`,
      )
      .then(() => {
        return console.info(
          `Successfully connected to DB Server - uri: ${configs.host}`,
        );
      })
      .catch((error) => {
        console.log(error);
        return process.exit(1);
      });
  };
  mongoconnect();
  mongoose.connection.on('disconnected', mongoconnect);
};
