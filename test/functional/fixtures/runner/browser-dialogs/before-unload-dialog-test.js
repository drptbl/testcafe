var expect = require('chai').expect;

describe('Handling native dialogs', function () {
    it('Should be successful when the expected beforeUnload dialog appears', function () {
        return runTests('before-unload-dialog.test.js', 'The expected beforeUnload dialog - should be successful.')
            .then(function (err) {
                expect(err).eql('');
            });
    });

    it('Should fail if the expected beforeUnload dialog does not appear', function () {
        return runTests('before-unload-dialog.test.js', 'No expected beforeUnload dialog - should fail.', { shouldFail: true })
            .catch(function (err) {
                var expectedError = [
                    'Error at step "1.Click link "This page"":',
                    ' The expected system beforeUnload dialog did not appear.'
                ].join('');

                expect(err).eql(expectedError);
            });
    });

    it('Should fail if an unexpected beforeUnload dialog appears', function () {
        return runTests('before-unload-dialog.test.js', 'An unexpected beforeUnload dialog - should fail.', { shouldFail: true })
            .catch(function (err) {
                var expectedError = [
                    'Error at step "2.Click link "This page"":',
                    ' Unexpected system beforeUnload dialog message appeared.'
                ].join('');

                expect(err).eql(expectedError);
            });
    });
});
