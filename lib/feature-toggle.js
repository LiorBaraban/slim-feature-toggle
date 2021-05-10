(() => {

  let appFeatures = {};

  let isAppFeaturesSet = false;
  let isEnabledAppFeaturesSet = false;

  const setAppFeatures = (inputAppFeatures) => {
    appFeatures = inputAppFeatures;
    isAppFeaturesSet = true;
  }

  const logAppFeatures = () => console.log(appFeatures);

  const logEnabledAppFeatures = () => console.log(enabledAppFeatures);

  const isFeatureEnabled = (inputFeatureComplex) => {

    if (!isAppFeaturesSet) {
      const errorMessage = 'app features are not set';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // set as array if inputs, even when one
    let featureChainArray = null;
    if (Array.isArray(inputFeatureComplex)) {
      featureChainArray = inputFeatureComplex;
    } else {
      featureChainArray = [inputFeatureComplex];
    }

    const isEnabledFeatureChainArray = featureChainArray.map(featureChainItem => {
      const splitFeatureChain = featureChainItem.split('.');
      
      // traversing on a feature chain, cheking if the entire chain is enabled
      let pointerToFeature = appFeatures; 
      let isFeatureChainEnabled = true;
      splitFeatureChain.forEach(split => {
        pointerToFeature = pointerToFeature[split];
        isFeatureChainEnabled = isFeatureChainEnabled && pointerToFeature && pointerToFeature.enabled === true;
      })

      return isFeatureChainEnabled;
    })

    return isEnabledFeatureChainArray.reduce((accumulator, current) => accumulator && current);
  }

  const featureToggleRunCallback = (inputFeatureComplex, callback) => {
    if (isFeatureEnabled(inputFeatureComplex)) {
      callback();
    }
  }

  const featureToggleRunPromise = (inputFeatureComplex) => {
    return new Promise((resolve, reject) => {
      if (isFeatureEnabled(inputFeatureComplex)) {
        resolve();
      } else {
        reject(`${inputFeatureComplex} is not allowed`);
      }
    })
  }

  module.exports.setAppFeatures = setAppFeatures;
  // module.exports.setEnabledAppFeatures = setEnabledAppFeatures;

  module.exports.logAppFeatures = logAppFeatures;
  module.exports.logEnabledAppFeatures = logEnabledAppFeatures;

  module.exports.isFeatureEnabled = isFeatureEnabled;
  module.exports.featureToggleRunCallback = featureToggleRunCallback;
  module.exports.featureToggleRunPromise = featureToggleRunPromise;


})();



