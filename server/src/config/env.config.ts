import path from 'path';
import Joi from 'joi';
import dotenv from 'dotenv';
import { EnvSchema, Modes } from '@appTypes';

dotenv.config({ path: path.join(__dirname, '../.env') });

const envSchema = Joi.object<EnvSchema>()
  .keys({
    PORT: Joi.string().default('8080'),
    // MONGODB_URL: Joi.string().required().description('mongodb url'),
    MODE: Joi.string().description(
      `Debug (${Modes.DEBUG}) or production (${Modes.PRODUCTION}) mode.`
    ),
    JWT_SECRET: Joi.string().default('some random secret key'),
    JWT_DURATION_MIN: Joi.number().default(300)
  })
  .options({ allowUnknown: true });

const { value, error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Invalid env configurations :-\n${error.message}`);
}

const modeType = value.MODE === Modes.PRODUCTION ? Modes.PRODUCTION : Modes.DEBUG;
const portNo = parseInt(value.PORT);

if (isNaN(portNo)) {
  throw new Error('Port no. should be a number');
}

const configs = {
  get port(): number {
    return portNo;
  },
  get mode(): Modes {
    return modeType;
  },
  // get mongooseUrl(): string {
  //   return value.MONGODB_URL;
  // },
  get jwtSecret(): string {
    return value.JWT_SECRET;
  },
  get jwtDurationMin(): number {
    return value.JWT_DURATION_MIN;
  }
};

export { configs };
