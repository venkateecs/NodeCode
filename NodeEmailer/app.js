const sendmail = require('sendmail')();

sendmail({
    from: 'venkateecs@gmail.com',
    to: 'ramana.gulla@fissionlabs.in',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
});