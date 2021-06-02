export default {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/campeonato-ts-api',
  port: process.env.PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || 'saA<cj6=-UW',
  bucketName: process.env.AWS_S3_BUCKET,
  defaultRegion: process.env.DEFAULT_REGION,
  defaultFilesACL: process.env.DEFAULT_FILES_ACL,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
}
