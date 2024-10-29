export default () => ({
  mongoUri: process.env.MONGO_URI || '',
  nodeEnv: process.env.NODE_ENV || '',
  port: process.env.PORT || '',
});
