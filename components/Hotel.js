// components/Item.js
export default function Hotel({ hotel, handleDelete, handleEdit }) {
    return (
      <div>
        <h3> {hotel.name} </h3>
        <p> {hotel.description} </p>
        <button onClick={() => handleEdit(hotel)}> Edit </button>
        <button onClick={() => handleDelete(hotel._id)}> Delete </button>
      </div>
    );
}