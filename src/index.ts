import mongoose from 'mongoose';

import { configs } from '@appConfig';
import { app } from './app';

(async () => {
  // await mongoose.connect(configs.mongooseUrl, configs.mongoose.options);
  app.listen(configs.port, () => console.log(`server listening on ${configs.port}...`));
})();
