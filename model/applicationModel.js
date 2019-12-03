const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ApplySchema = new Schema({
  user_name:{type:String, required:true},
  user_phone:{type:String, required: true},
  mention:String,
  created_at:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Application', ApplySchema);