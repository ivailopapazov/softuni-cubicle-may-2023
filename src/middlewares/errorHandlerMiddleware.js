const { extractErrorMessages } = require('../utils/errorHelpers');

module.exports = (err, req, res, next) => {
    const errorMessages = extractErrorMessages(err);

    res.render('404', { errorMessages });
}