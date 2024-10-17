// pages/index.js
import { useState, useEffect } from 'react';
import Hotel from '../components/Hotel';

export default function Home() {

  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newHotel, setNewHotel] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    const res = await fetch('/api/hotels');
    const { data } = await res.json();
    setHotels(data);
  };

  const handleCreate = async () => {
    const res = await fetch('/api/hotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newHotel),
    });
    const { data } = await res.json();
    setHotels([...hotels, data]);
    setNewHotel({ name: '', description: '' });
  };

  const handleDelete = async (id) => {
    await fetch(`/api/hotels/${id}`, {
      method: 'DELETE',
    });
    setHotels(hotels.filter((hotel) => hotel._id !== id));
  };

  const handleEdit = async (hotel) => {
    const updatedName = prompt('Enter new name:', hotel.name ) ;
    const updatedDescription = prompt('Enter new description:', hotel.description);

    const res = await fetch(`/api/hotels/${hotel._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: updatedName, description: updatedDescription }),
    });
    const { data } = await res.json();
    setHotels(hotels.map((i) => (i._id === hotel._id ? data : i)));
  };

  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
    
      <h1> Hotel Search App</h1>
    
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <h2> Add new Hotel </h2>
    
      <input
        type="text"
        placeholder="Name"
        value={newHotel.name}
        onChange={(e) => setNewHotel({ ...newHotel, name: e.target.value })}
/>
    
      <input
        type="text"
        placeholder="Description"
        value={newHotel.description}
        onChange={  (e) => setNewHotel({ ...newHotel, description: e.target.value })  }
      />
      
      <button onClick={handleCreate}> Add Hotel </button>
      <h2> Available hotels  </h2>

      <div>
        {filteredHotels.map((hotel) => (
          <Hotel
            key={hotel._id}
            hotel={hotel}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}
