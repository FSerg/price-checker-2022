// @ts-nocheck

import pretty from '@mechanicalhuman/bunyan-pretty';
import bunyan from 'bunyan';

let loglevel = 'info';
if (process.env.NODE_ENV === 'production') {
  loglevel = 'error';
}

const log = bunyan.createLogger({
  name: 'price-checker-2022',
  stream: pretty(process.stdout),
  level: loglevel
});
export default log;
