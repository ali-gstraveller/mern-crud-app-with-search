// pages/api/items/[id].js
import dbConnect from '../../../lib/dbConnect';
import Hotel from '../../../models/Hotel';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const hotel = await Hotel.findById(id);
        if (!hotel) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: hotel });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const hotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true });
        if (!hotel) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: hotel });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedHotel = await Hotel.deleteOne({ _id: id });
        if (!deletedHotel) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
