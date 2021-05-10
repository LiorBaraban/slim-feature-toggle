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
```

To set up the configuration needed, 
import the featureToggle module at Application Start.
and set the follwing configurations:
  - The full feature-set of the application
  - The subset feature-set of which we want to enable

```js
// At the moment,
// we at CuteCorp. decided to enable the 'Puppies' feature only:


// App.js / index.js / server.js / main.js:
const { featureToggle } = require('slim-feature-toggle');
featureToggle.setAppFeatures([PUPPIES, KITTEN, BABIES]); 
featureToggle.setEnabledAppFeatures([PUPPIES]);
```

After setting the configuration we are good to go.
We can now control the flow of our application.
Simply import the featureToggle module into your code
and use one of the following methods:



```js
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
// featureToggleRunCallback - Execute a callback only if the feature is enabled
// =============================================================================
const { featureToggle } = require('slim-feature-toggle');
const { featureToggleRunCallback } = featureToggle;

featureToggleRunCallback(KITTEN, () => {
  // Execute some super cute kitty logic here ....

  // NOTE - this callback will execute only if the KITTEN feature is enabled,
  //        otherwise it will be skipped.

});



// ======================================================================
// featureToggleRunPromise - Resolve a promise if the feature is enabled, 
//                           Otherwise reject
// ======================================================================
const { featureToggle } = require('slim-feature-toggle');
const { featureToggleRunPromise } = featureToggle;

featureToggleRunPromise(BABIES)
  .then(() => console.log('resolves only if BABIES feature is enabled'))
  .catch(() => console.log('rejects if BABIES feature is disabled'));

```