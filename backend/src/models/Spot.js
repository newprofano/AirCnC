const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema(
  {
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

SpotSchema.virtual('thumbnail_url').get(function() {
  return `http://localhost:3333/files/${this.thumbnail}`;
  //trocar localhost peo ip do seu computador ex: 192.168.0.15:3333......
});

module.exports = mongoose.model('Spot', SpotSchema);
