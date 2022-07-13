import logger from 'pino';    // pino is going to be the logger.
import dayjs from 'dayjs';   //so we can format the timestamp.

const log = logger({
  // prettyPrint: true,
  transport: {
        target: 'pino-pretty',
        options: {
            ignore:'req.headers,res',
        }
    },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;

// pid is the process id.