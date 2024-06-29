import React, { useState, useEffect } from 'react';
import { ref, set, remove, onValue } from "firebase/database";
import { database } from '../../firebase';
import './AdminPanel.css';

const AdminPanel = () => {
  const [watches, setWatches] = useState({});
  const [currentWatch, setCurrentWatch] = useState({
    brand: '', model: '', referenceNo: '', cost: '', size: '', movement: '',
    conditionOfO: '', color: '', scope: '', description: '', origin: '',
    waterResistance: '', warranty: '', available: true, images: []
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const watchesRef = ref(database, 'watches');
    onValue(watchesRef, (snapshot) => {
      const data = snapshot.val();
      setWatches(data || {});
    });
  }, []);

  const handleInputChange = (e) => {
    setCurrentWatch({ ...currentWatch, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files).map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));
    setCurrentWatch({ ...currentWatch, images: [...currentWatch.images, ...fileArray] });
  };

  const removeImageInput = (index) => {
    const newImages = currentWatch.images.filter((_, i) => i !== index);
    setCurrentWatch({ ...currentWatch, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newWatchRef = ref(database, `watches/${currentWatch.id || Date.now()}`);
      await set(newWatchRef, currentWatch);
      setMessage('Watch successfully updated.');
      setCurrentWatch({
        brand: '', model: '', referenceNo: '', cost: '', size: '', movement: '',
        conditionOfO: '', color: '', scope: '', description: '', origin: '',
        waterResistance: '', warranty: '', available: true, images: []
      });
    } catch (error) {
      setMessage('Error updating watch.');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const watchRef = ref(database, `watches/${id}`);
      await remove(watchRef);
      setMessage('Watch successfully deleted.');
    } catch (error) {
      setMessage('Error deleting watch.');
    }
    setLoading(false);
  };

  const handleEdit = (watch) => {
    setCurrentWatch({ ...watch });
  };

  return (
    <div className="admin-panel">
      <h2>Manage Watches</h2>
      {loading && <div className="loader">Loading...</div>}
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit} className="watch-form">
        <input name="brand" value={currentWatch.brand} onChange={handleInputChange} placeholder="Brand" required />
        <input name="model" value={currentWatch.model} onChange={handleInputChange} placeholder="Model" required />
        <input name="referenceNo" value={currentWatch.referenceNo} onChange={handleInputChange} placeholder="Reference Number" required />
        <input name="cost" value={currentWatch.cost} onChange={handleInputChange} placeholder="Cost" required />
        <input name="size" value={currentWatch.size} onChange={handleInputChange} placeholder="Size" required />
        <input name="movement" value={currentWatch.movement} onChange={handleInputChange} placeholder="Movement" required />
        <input name="conditionOfO" value={currentWatch.conditionOfO} onChange={handleInputChange} placeholder="Condition" required />
        <input name="color" value={currentWatch.color} onChange={handleInputChange} placeholder="Color" required />
        <input name="scope" value={currentWatch.scope} onChange={handleInputChange} placeholder="Scope" required />
        <textarea name="description" value={currentWatch.description} onChange={handleInputChange} placeholder="Description" required></textarea>
        <input name="origin" value={currentWatch.origin} onChange={handleInputChange} placeholder="Origin" required />
        <input name="waterResistance" value={currentWatch.waterResistance} onChange={handleInputChange} placeholder="Water Resistance" required />
        <input name="warranty" value={currentWatch.warranty} onChange={handleInputChange} placeholder="Warranty" required />
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            name="available" 
            checked={currentWatch.available} 
            onChange={(e) => setCurrentWatch({...currentWatch, available: e.target.checked})}
          /> 
          Available
        </label>
        <div className="image-inputs">
          <h4>Images (up to 10)</h4>
          <input type="file" multiple onChange={handleFileChange} />
          {currentWatch.images.map((image, index) => (
            <div key={index} className="image-preview">
              <span>{image.name}</span>
              <button type="button" onClick={() => removeImageInput(index)} className="remove-image">Remove</button>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button">{currentWatch.id ? 'Update' : 'Add'} Watch</button>
      </form>
      <h3>Watch List</h3>
      <div className="watch-list">
        {Object.entries(watches).map(([id, watch]) => (
          <div key={id} className="watch-item">
            <h4>{watch.brand} {watch.model}</h4>
            <p>Ref: {watch.referenceNo}</p>
            <p>Price: {watch.cost}</p>
            <div className="image-preview-container">
              {watch.images.map((img, index) => (
                <img key={index} src={img.url} alt={`Preview of ${watch.brand} ${watch.model} ${index + 1}`} className="watch-image-preview"/>
              ))}
            </div>
            <div className="watch-actions">
              <button onClick={() => handleEdit({ ...watch, id })}>Edit</button>
              <button onClick={() => handleDelete(id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;