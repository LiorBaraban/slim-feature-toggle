
describe('version-toggle', () => {

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

  describe('')

});