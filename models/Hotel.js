// models/Item.js
import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this item.'],
  },
  description: String,
});

export default mongoose.models.Hotel || mongoose.model('Hotel', HotelSchema);


