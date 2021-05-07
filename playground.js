const { APP_VERSION_IS } = require('./lib/app-version-is')

const { versionToggleRunPromiseWhen, versionToggleRunCallbackWhen } = require('./lib/version-toggle');



versionToggleRunPromiseWhen(APP_VERSION_IS.GREATER_THAN, '1.0.0')
  .then(() => {
    console.log('promise yay');
  })
  .catch(() => {
    console.log('promise nay');
  })


versionToggleRunCallbackWhen(APP_VERSION_IS.EQUAL_TO, '1.0.0', () => {
  console.log('callback yay');
})