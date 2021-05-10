// Welcome to CuteCorp. 
// The following shows how we use the slim-feature-toggle library.

// These are the cute Features we develop in our app
const PUPPIES = 'PUPPIES';
const KITTEN = 'KITTEN';
const BABIES = 'BABIES';


// This is the featureToggle module
const { featureToggle } = require('./index');


// First thing first, we should let featureToggle know the application's features
featureToggle.setAppFeatures([PUPPIES, KITTEN, BABIES]);


// Next, we should handle which features we want to enable
// At the moment, we at CuteCorp. only want to expose the 'Puppies' feature:
featureToggle.setEnabledAppFeatures([PUPPIES]);


// Now we can control the flow of our based application (Client / Server)
// based on the features we enabled:



// ===== Is Feature Enabled ======
const { featureToggle } = require('./index');
const { isFeatureEnabled } = featureToggle;

if (isFeatureEnabled(PUPPIES)) {
  console.log(`puppies are enabled and that's great`)
  // we should probably render the PuppyList component here...
} else {
  console.log(`puppies are disabled and that's sad`);
  // perhaps we should engage an offer for a free monthly puppy subscription!
}




// ===== featureToggleRunCallback ======

const { featureToggleRunCallback } = featureToggle;

featureToggleRunCallback(KITTEN, () => {
  // add some super cute kitty logic here,
  // note that this callback would be skipped until we enable the KITTEN feature.
});



// ===== featureToggleRunPromise ======

const { featureToggleRunPromise } = featureToggle;

const promise = featureToggleRunPromise(BABIES)
  .then(() => console.log('this then block would run only if BABIES feature is enabled'))
  .catch(() => console.log('this catch block would run only if BABIES feature is disabled'));


