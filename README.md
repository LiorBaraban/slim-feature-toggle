## Slim Feature Toggle

slim-feature-toggle is a JavaScript library for toggling content based on features and version management.

slim-feature-toggle fits for both client and server applications and is agnostic to frameworks 

The following example will guide you through it

```js
// Welcome to CuteCorp. 
// These are the cute Features and Sub-Features we develop in our app
// We use the 'enabled' property to set each feature's availability
const appFeatures = {
  PUPPIES: {
    enabled: true,
    POODLES: {
      enabled: true
    },
    LABRADORS: {
      enabled: false
    }
  },
  KITTEN: { enabled: true },
  BABIES: { enabled: true }
};
```

To set up the configuration needed, 

import the featureToggle module at Application Start and set the app's features:

```js
// inside App.js / index.js / server.js / main.js:
const { featureToggle } = require('slim-feature-toggle');
featureToggle.setAppFeatures(appFeatures); 
```

After setting the configuration we are good to go.

Simply import the featureToggle module into your code and control the application flow using one of the following methods:

```js
// =========================================
// isFeatureEnabled - a Simple Control Flow:
// =========================================
const { featureToggle } = require('slim-feature-toggle');
const { isFeatureEnabled } = featureToggle;

if (isFeatureEnabled('PUPPIES')) {
  console.log(`TODO - Render the PuppyList component here ... `)
} else {
  console.log(`TODO - Engage a free monthly puppy subscription offer here ...`);
}

// feature set arrays are also supported:
if (isFeatureEnabled(['KITTEN', 'BABIES'])) {
  console.log(`Do stuff if both KITTEN and BABIES are enabled`);
}

// nested features traversal are also supported using . notation:
if (isFeatureEnabled('PUPPIES.POODLES')) {
  console.log(`Run if both PUPPIES feature and POODLES sub-feature are enabled`);
}



// =============================================================================
// featureToggleRunCallback - Execute a callback only if the feature is enabled
// =============================================================================
const { featureToggle } = require('slim-feature-toggle');
const { featureToggleRunCallback } = featureToggle;

featureToggleRunCallback('KITTEN', () => {
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

featureToggleRunPromise('BABIES')
  .then(() => console.log('resolves only if BABIES feature is enabled'))
  .catch(() => console.log('rejects if BABIES feature is disabled'));

```