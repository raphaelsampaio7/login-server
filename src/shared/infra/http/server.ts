import 'reflect-metadata';

import app from '../../../app';
import '../typeorm';
import '../../container';

require('dotenv/config');

app.listen(process.env.PORT || 3333, () => {
  console.log('🐱‍🏍 Server started!');
});
