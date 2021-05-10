## Slim Feature Toggle

slim-feature-toggle is a JavaScript library for toggling content based on features and version management.

slim-feature-toggle fits for both client and server applications and is agnostic to frameworks 

The following example will guide you through it

```js
// Welcome to CuteCorp. 
// These are the cute Features we develop in our app
const PUPPIES = 'PUPPIES';
const KITTEN = 'KITTEN';
const BABIES = 'BABIES';


// This is the featureToggle module
const { featureToggle } = require('slim-feature-toggle');

// In the application start we should import the featureToggle module
// and set both:
//    appFeatures (our application entire feature set)
//    enabledFeatures (the subset feature set we decide to enable)

// This is the entire feature set of CuteCorp.
featureToggle.setAppFeatures([PUPPIES, KITTEN, BABIES]);

// But at the moment we only want to enable the 'Puppies' module:
featureToggle.setEnabledAppFeatures([PUPPIES]);

// Thats it.
// Now we can use slim-feature-toggle to control the application's flow based on those settings:



// =========================================
// isFeatureEnabled - a Simple Control Flow:
// =========================================
const { featureToggle } = require('slim-feature-toggle');
const { isFeatureEnabled } = featureToggle;

if (isFeatureEnabled(PUPPIES)) {
  console.log(`TODO - Render the PuppyList component here ... `)
} else {
  console.log(`TODO - Engage a free monthly puppy subscription offer here ...`);
}



// =============================================================================
// featureToggleRunCallback - execute a callback only if the feature is enabled
// =============================================================================
const { featureToggle } = require('slim-feature-toggle');
const { featureToggleRunCallback } = featureToggle;

featureToggleRunCallback(KITTEN, () => {
  // Execute some super cute kitty logic here ....

  // NOTE - this callback will execute only if the KITTEN feature is enabled,
  //        otherwise it will be skipped.

});



// =======================================================================================
// featureToggleRunPromise - resolve a promise if the feature is enabled, otherwise reject
// =======================================================================================
const { featureToggle } = require('slim-feature-toggle');
const { featureToggleRunPromise } = featureToggle;

featureToggleRunPromise(BABIES)
  .then(() => console.log('this then block would run only if BABIES feature is enabled'))
  .catch(() => console.log('this catch block would run only if BABIES feature is disabled'));

```