// utils/logger.js
const logger = {
    info: (message, data = {}) => {
      console.log(`[INFO] ${message}`, data);
    },
    error: (message, error = {}) => {
      console.error(`[ERROR] ${message}`, error);
    }
  };
  
  export default logger;