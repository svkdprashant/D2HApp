let chai = require('chai');
let expect = chai.expect;
const validate = require('./../validate');

describe('Test cases to validate user input while adding balance', () => {
    it('Blank space should not be allowed', (done) => {
        expect(validate.validateUserBalance(' ')).to.be.false;
        done()
    })

    it('null should not be allowed', (done) => {
        expect(validate.validateUserBalance(null)).to.be.false;
        done()
    })

    it('Alphabet with number should not be allowed', (done) => {
        expect(validate.validateUserBalance('50abc')).to.be.false;
        done()
    })
    it('Special Character should not be allowed', (done) => {
        expect(validate.validateUserBalance('@#@@#')).to.be.false;
        done()
    })

    it('Amount with multiple dot should not be allowed', (done) => {
        expect(validate.validateUserBalance('50.40.30')).to.be.false;
        done()
    })

    it('Digit with floating value is allowed', (done) => {
        expect(validate.validateUserBalance(50.34)).to.be.true;
        done()
    })

    it('Digit without floating value is allowed', (done) => {
        expect(validate.validateUserBalance(50)).to.be.true;
        done()
    })
})

describe('Test cases to validate channel name while a user writes a channel name', () => {
    it('Special Character should not be allowed', (done) => {
        expect(validate.validateChannelName('@#@@#')).to.be.false;
        done()
    })

    it('Decimal value should not allowed', (done) => {
        expect(validate.validateChannelName('10.6')).to.be.false;
        done()
    })

    it('Alphanumeric value should be allowed', (done) => {
        expect(validate.validateChannelName('TV 9')).to.be.true;
        done()
    })
})