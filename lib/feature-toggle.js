const { APP_FEATURES } = require.main.require("./app-features");

const isFeatureEnabled = (appFeature) => {
  const enabledFeatures = process.env.ENABLED_FEATURES.split(',');

  let isFeatureEnabled = false;

  if (!enabledFeatures || enabledFeatures.length === 0) {
    isFeatureEnabled = false;
  }

  if (appFeature == APP_FEATURES.ROOT_PDF_GENERATOR) {
    isFeatureEnabled = true;  // this is the root feature of the application - always enabled
  }

  isFeatureEnabled = Object.entries(APP_FEATURES).some(x => x[0] === appFeature) && enabledFeatures.some(x => x === appFeature);

  return isFeatureEnabled
}

const featureToggleRunCallback = (appFeature, callback) => {
  if (isFeatureEnabled(appFeature)) {
    callback();
  }
}


const featureToggleRunPromise = (appFeature) => {
  return new Promise((resolve, reject) => {
    if (isFeatureEnabled(appFeature)) {
      resolve();
    } else {
      reject(`${appFeature} is not allowed`);
    }
  })
}


module.exports.isFeatureEnabled = isFeatureEnabled;

module.exports.featureToggleRunCallback = featureToggleRunCallback;

module.exports.featureToggleRunPromise = featureToggleRunPromise;



