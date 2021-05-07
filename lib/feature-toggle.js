(() => {

  let appFeatures = [];
  let enabledAppFeatures = [];

  let isAppFeaturesSet = false;
  let isEnabledAppFeaturesSet = false;

  const setAppFeatures = (inputAppFeatures) => {
    appFeatures = inputAppFeatures;
    isAppFeaturesSet = true;
  }

  const setEnabledAppFeatures = (inputEnabledAppFeatures) => {
    enabledAppFeatures = inputEnabledAppFeatures;
    isEnabledAppFeaturesSet = true;
  }

  const logAppFeatures = () => console.log(appFeatures);

  const logEnabledAppFeatures = () => console.log(enabledAppFeatures);

  const isFeatureEnabled = (feature) => {

    let isFeatureEnabled = false;

    if (!isAppFeaturesSet){
      const errorMessage = 'app features are not set';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
    if (!isEnabledAppFeaturesSet){
      const errorMessage = 'enabled app features are not set'
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  
    if (!enabledAppFeatures || enabledAppFeatures.length === 0) {
      isFeatureEnabled = false;
    }
  
    isFeatureEnabled = appFeatures.some(x=>x === feature) && enabledAppFeatures.some(x=>x === feature);

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
  
  module.exports.setAppFeatures = setAppFeatures;
  module.exports.setEnabledAppFeatures = setEnabledAppFeatures;

  module.exports.logAppFeatures = logAppFeatures;
  module.exports.logEnabledAppFeatures = logEnabledAppFeatures;

  module.exports.isFeatureEnabled = isFeatureEnabled;
  module.exports.featureToggleRunCallback = featureToggleRunCallback;
  module.exports.featureToggleRunPromise = featureToggleRunPromise;


})();



