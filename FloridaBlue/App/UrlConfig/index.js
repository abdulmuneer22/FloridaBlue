import config from 'react-native-config'


switch (config.BASE_ENV) {
    case 'test':
        module.exports = require('./config.test');
        break;
    case 'Debug':
        module.exports = require('./config.stage');
    case 'stage':
        module.exports = require('./config.stage');
        break;
    case 'prod':
        module.exports = require('./config.prod');
   case 'Release':
        module.exports = require('./config.prod');     
        break;
    default:
        module.exports = require('./config.stage');
}