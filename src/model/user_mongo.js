const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  password: { type: String, default: null },
  phone: { type: String, default: null },
  role: { type: String, default: null },
  email: { type: String, default: null },
  date_birth: { type: Date, default: null },
  photo_user: { type: String, default: null },
  review_status: { type: String, default: null },
  address: { type: String, default: null },
  domisili: { type: String, default: null },
  rating: { type: Number, default: null },
  NIK: { type: String, default: null },
  member: { type: String, default: 'bronze' },
  otp: { type: String, default: null },
  referral_code: { type: String, default: null },
  point: { type: Number, default: 0 },
  auth: { type: Number, default: 0 },
  tempat_tgl: { type: String, default: null },
  nik: { type: String, default: null },
  nomor_telp: { type: String, default: null },
  alamat: { type: String, default: null },
  photo_ktp: { type: String, default: null },
  voucher: { type: String, default: null },
  no_ktp: { type: String, default: null },
  no_npwp: { type: String, default: null },
  foto_npwp: { type: String, default: null },
  foto_ijazah: { type: String, default: null },
  education: { type: String, default: null },
  bank: { type: String, default: null },
  no_bank: { type: String, default: null }
});



// //generate hase {if used}
// userSchema.methods.generateHash = function (password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(), null);
// }

// //checking {if password is valid}
// userSchema.methods.validPassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// }

const User = mongoose.model('User', userSchema);

module.exports = User;
