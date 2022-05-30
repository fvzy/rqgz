const monk = require('monk')

// Connection URL
var url = "mongodb://ulm30xth0tctc5rxub55:6tQgyDajbXFfDAt7qOWF@bsybtxu8zrpdaib-mongodb.services.clever-cloud.com:27017/bsybtxu8zrpdaib?retryWrites=true&w=majority";
try {
    if (url == '') throw console.log('Cek konfigurasi database, var url belum diisi');
} catch (e) {
    return;
}
var db = monk(url);

db.then(() => {
        console.log('Connected correctly to server')
    })
    .catch((e) => {
        console.log("Gagal connect ke database, \ncek configurasi database apakah Connection URL sudah benar")
    })

module.exports = db
