import mongoose from "mongoose";
import config from "config";
import logger from "./logger"

const connect = async () => {
  const dbUri = config.get<string>('dbUri')

  try {
    await mongoose.connect(dbUri);
    logger.info("Connected to DB");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

export default connect;


//   const uri =
//     "mongodb+srv://stevechude:houseofgrace%401@rest-api.kpvocbv.mongodb.net/?retryWrites=true&w=majority";