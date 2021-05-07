const { APP_VERSION_IS } = require("./app-version-is");


(() => {

  let appVersion = null;

  const setAppVersion = inputAppVersion => appVersion = inputAppVersion;

  const getAppVersion = () => {
    if (!appVersion) {
      throw new Error('app version is not set!');
    }

    return appVersion;
  }

  const logAppVersion = () => console.log(appVersion);
  
  const isAppVersionEqualTo = (inputVersion) => {
    let isAppVersionEqualTo = false;

    const appVersion = getAppVersion();

    const [appMajor, appMinor, appPatch] = splitVersion(appVersion);

    const [inputMajor, inputMinor, inputPatch] = splitVersion(inputVersion);

    if (Number(appMajor) === Number(inputMajor) &&
      Number(appMinor) === Number(inputMinor) &&
      Number(appPatch) === Number(inputPatch)) {
      isAppVersionEqualTo = true;
    }

    return isAppVersionEqualTo;
  }

  const isAppVersionNotEqualTo = (inputVersion) => {
    return !isAppVersionEqualTo(inputVersion);
  }

  const isAppVersionGreaterThan = (inputVersion) => {
    let isAppVersionGreaterThan = false;

    const appVersion = getAppVersion();
    const [appMajor, appMinor, appPatch] = splitVersion(appVersion);
    const [inputMajor, inputMinor, inputPatch] = splitVersion(inputVersion);

    if (Number(appMajor) > Number(inputMajor)) {
      isAppVersionGreaterThan = true;
    }
    else if (Number(appMajor) === Number(inputMajor) && Number(appMinor) > Number(inputMinor)) {
      isAppVersionGreaterThan = true
    }
    else if (Number(appMajor) === Number(inputMajor) && Number(appMinor) === Number(inputMinor) && Number(appPatch) > Number(inputPatch)) {
      isAppVersionGreaterThan = true;
    }

    return isAppVersionGreaterThan;
  }

  const isAppVersionGreaterEqualThan = (inputVersion) => {
    let isAppVersionGreaterEqualThan = true;

    const appVersion = getAppVersion();
    const [appMajor, appMinor, appPatch] = splitVersion(appVersion);
    const [inputMajor, inputMinor, inputPatch] = splitVersion(inputVersion);

    if (Number(appMajor) < Number(inputMajor)) {
      isAppVersionGreaterEqualThan = false;
    }
    else if (Number(appMajor) === Number(inputMajor) && Number(appMinor) < Number(inputMinor)) {
      isAppVersionGreaterEqualThan = false
    }
    else if (Number(appMajor) === Number(inputMajor) && Number(appMinor) === Number(inputMinor) && Number(appPatch) < Number(inputPatch)) {
      isAppVersionGreaterEqualThan = false;
    }

    return isAppVersionGreaterEqualThan;
  }

  const isAppVersionLesserThan = (inputVersion) => {
    return !isAppVersionGreaterEqualThan(inputVersion);
  }

  const isAppVersionLesserEqualThan = (inputVersion) => {
    return !isAppVersionGreaterThan(inputVersion);
  }


  const splitVersion = (version) => {

    if (typeof version !== 'string') {
      throw new Error('input version is not of type string')
    }


    const [cleanVersion, preReleaseSuffix] = version.split('-');
    const splitVersion = cleanVersion.split('.');

    if (splitVersion.length !== 3 ||
      splitVersion.some(versionSection => versionSection.length === 0 || Number.isNaN(Number(versionSection)))) {
      throw new Error('input version is not in semver format');
    }

    return splitVersion;
  }



  const versionToggleRunPromiseWhen = (versionToggleMode, inputVersion) => {
    return new Promise((resolve, reject) => {
      switch (versionToggleMode) {
        case APP_VERSION_IS.EQUAL_TO:
          if (isAppVersionEqualTo(inputVersion)) {
            resolve()
          } else {
            reject(`reject - app version is not equal to ${inputVersion}`);
          }
          break;
        case APP_VERSION_IS.NOT_EQUAL_TO:
          if (isAppVersionNotEqualTo(inputVersion)) {
            resolve()
          } else {
            reject(`reject - app version is equal to ${inputVersion}`);
          }
          break;
        case APP_VERSION_IS.GREATER_THAN:
          if (isAppVersionGreaterThan(inputVersion)) {
            resolve();
          } else {
            reject(`reject - app version is not G than ${inputVersion}`);
          }
          break;
        case APP_VERSION_IS.GREATER_EQUAL_THAN:
          if (isAppVersionGreaterEqualThan(inputVersion)) {
            resolve();
          } else {
            reject(`reject - app version is not GEQ than ${inputVersion}`);
          }
          break;
        case APP_VERSION_IS.LESSER_THAN:
          if (isAppVersionLesserThan(inputVersion)) {
            resolve();
          } else {
            reject(`reject - app version is not L than ${inputVersion}`);
          }
          break;
        case APP_VERSION_IS.LESSER_EQUAL_THAN:
          if (isAppVersionLesserEqualThan(inputVersion)) {
            resolve()
          } else {
            reject(`reject - app version os not LEQ than ${inputVersion}`);
          }
          break;
        default:
          throw new Error(`illegal versionToggleMode: ${versionToggleMode}`);
          break;
      }
    });
  }

  const versionToggleRunCallbackWhen = (versionToggleMode, inputVersion, callback) => {
    switch (versionToggleMode) {
      case APP_VERSION_IS.EQUAL_TO:
        if (isAppVersionEqualTo(inputVersion)) {
          return callback();
        }
        break;
      case APP_VERSION_IS.NOT_EQUAL_TO:
        if (isAppVersionNotEqualTo(inputVersion)) {
          return callback();
        }
        break;
      case APP_VERSION_IS.GREATER_THAN:
        if (isAppVersionGreaterThan(inputVersion)) {
          return callback();
        }
        break;
      case APP_VERSION_IS.GREATER_EQUAL_THAN:
        if (isAppVersionGreaterEqualThan(inputVersion)) {
          return callback();
        }
        break;
      case APP_VERSION_IS.LESSER_THAN:
        if (isAppVersionLesserThan(inputVersion)) {
          return callback();
        }
        break;
      case APP_VERSION_IS.LESSER_EQUAL_THAN:
        if (isAppVersionLesserEqualThan(inputVersion)) {
          return callback();
        }
        break;
      default:
        throw new Error(`illegal versionToggleMode: ${versionToggleMode}`);
        break;
    }
  }

  module.exports.setAppVersion = setAppVersion
  module.exports.getAppVersion = getAppVersion;
  module.exports.logAppVersion = logAppVersion;

  module.exports.isAppVersionEqualTo = isAppVersionEqualTo;
  module.exports.isAppVersionNotEqualTo = isAppVersionNotEqualTo;
  module.exports.isAppVersionGreaterThan = isAppVersionGreaterThan;
  module.exports.isAppVersionGreaterEqualThan = isAppVersionGreaterEqualThan;
  module.exports.isAppVersionLesserThan = isAppVersionLesserThan;
  module.exports.isAppVersionLesserEqualThan = isAppVersionLesserEqualThan;

  module.exports.versionToggleRunPromiseWhen = versionToggleRunPromiseWhen;
  module.exports.versionToggleRunCallbackWhen = versionToggleRunCallbackWhen;

  module.exports.splitVersion = splitVersion;

})();