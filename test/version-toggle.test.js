const mockGetAppVersion = (versionToggleModule, fakeAppVersion) => jest.spyOn(versionToggleModule, 'getAppVersion').mockImplementation(() => fakeAppVersion);
const { APP_VERSION_IS } = require('../lib/app-version-is');


describe('version-toggle', () => {

  beforeEach(() => {
    jest.resetModules();
  })

  describe('getAppVersion', () => {
    it('should return a semantic version if appVersion was set', () => {
      const versionToggleModule = require('../lib/version-toggle');
      versionToggleModule.setAppVersion('1.2.3');
      expect(versionToggleModule.getAppVersion()).toContain('1.2.3');
    })

    it('should throw if appVersion was not set', () => {
      const versionToggleModule = require('../lib/version-toggle');
      const { getAppVersion } = versionToggleModule;
      // forgot to setAppVersion('1.0.0') on purpose

      expect(() => {
        getAppVersion()
      }).toThrowError();
    })
  })

  describe('logAppVersion', () => {
    const versionToggleModule = require('../lib/version-toggle');
    versionToggleModule.setAppVersion('1.2.3');
    jest.spyOn(console, 'log');

    versionToggleModule.logAppVersion();
    expect(console.log).toHaveBeenCalled();
  })

  describe('splitAppVersion', () => {

    it('should split a version into major, minor, patch when given an input in semver notation', () => {
      const { splitVersion } = require('../lib/version-toggle')
      const semverInput = '1.2.3';

      const [major, minor, patch] = splitVersion(semverInput);

      expect(major).toBe('1');
      expect(minor).toBe('2');
      expect(patch).toBe('3');
    });

    it('should throw if input is not a string', () => {
      const { splitVersion } = require('../lib/version-toggle')

      const inputThatIsNotAString = 123;

      expect(() => {
        splitVersion(inputThatIsNotAString)
      }).toThrow();

    });

    it('should throw if input is a string but not in a semver notation', () => {
      const { splitVersion } = require('../lib/version-toggle')

      const inputThatIsNotSemver = '123-a.1';
      expect(() => {
        splitVersion(inputThatIsNotSemver)
      }).toThrow();

    });

  })

  describe('isAppVersionEqualTo', () => {
    it('should return true when appVersion is equal to inputVersion', () => {
      const versionToggleModule = require('../lib/version-toggle');
      const { setAppVersion, isAppVersionEqualTo } = versionToggleModule;
      setAppVersion('1.2.3');

      const isEqual = isAppVersionEqualTo('1.2.3');
      expect(isEqual).toBeTruthy();
    });

    it('should return false when appVersion is NOT equal to inputVersion', () => {
      const versionToggleModule = require('../lib/version-toggle');
      const { setAppVersion, isAppVersionEqualTo } = versionToggleModule;
      setAppVersion('1.2.3');

      const isEqual = isAppVersionEqualTo('4.5.6');
      expect(isEqual).toBeFalsy();
    });

    it('should throw if appVersion is not set', () => {
      const versionToggleModule = require('../lib/version-toggle');
      const { isAppVersionEqualTo } = versionToggleModule;
      // forgot to setAppVersion('1.2.3') on purpose... 

      expect(() => {
        isAppVersionEqualTo('1.2.3')
      }).toThrow();

    });
  });

  describe('isAppVersionGreaterThan', () => {
    it('should return true when appVersion is greater than inputVersion', () => {
      const { setAppVersion, isAppVersionGreaterThan } = require('../lib/version-toggle');
      setAppVersion('1.2.3');

      expect(isAppVersionGreaterThan('1.0.0')).toBeTruthy();
      expect(isAppVersionGreaterThan('1.1.1')).toBeTruthy();
      expect(isAppVersionGreaterThan('1.2.2')).toBeTruthy();
    });

    it('should return false when appVersion is equal to inputVersion', () => {
      const { setAppVersion, isAppVersionGreaterThan } = require('../lib/version-toggle');
      setAppVersion('1.2.3');

      expect(isAppVersionGreaterThan('1.2.3')).toBeFalsy();
    });

    it('should return false when appVersion is lesser than inputVersion', () => {
      const { setAppVersion, isAppVersionGreaterThan } = require('../lib/version-toggle');
      setAppVersion('1.2.3');

      expect(isAppVersionGreaterThan('1.2.4')).toBeFalsy();
      expect(isAppVersionGreaterThan('1.3.4')).toBeFalsy();
      expect(isAppVersionGreaterThan('4.5.6')).toBeFalsy();
    });

    it('should throw if appVersion is not set', () => {
      const { isAppVersionGreaterThan } = require('../lib/version-toggle');
      // forgot to setAppVersion('1.2.3') on purpose

      expect(() => {
        isAppVersionGreaterThan('4.5.6')
      }).toThrow();
    })

    it('should throw if inputVersion is not set', () => {
      const { setAppVersion, isAppVersionGreaterThan } = require('../lib/version-toggle');
      setAppVersion('1.2.3');

      expect(() => {
        isAppVersionGreaterThan(undefined)
      }).toThrow();
    })
  })

  

});