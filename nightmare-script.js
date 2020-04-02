var Nightmare = require('nightmare');
((cb) => {
  var nightmare = new Nightmare({ show: true });
  nightmare.viewport(540, 960)
    .goto('https://hangouts.google.com/')
        .wait(200000)
      .click('.sign-in')
      .wait(200000)
    .end()
    .catch(cb)
    .then(cb);
})((res) => { console.log(res); });