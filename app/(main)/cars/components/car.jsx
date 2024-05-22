'use client';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Car({ name, number, id }) {
  const handleEdit = async () => {
    window.location.href = `${window.location.origin}/cars/edit/${id}`
};

const handleDelete = async () => {
    try {
        const token = Cookies.get('csrftoken'); 
        const response = await axios.delete(`${window.location.origin}/api/car/delete/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-CSRFToken': token
          }
        });
        console.log('Delete response:', response.data);
        // обновление UI после удаления машины
    } catch (error) {
        console.error('Error deleting car:', error);
    } finally {
      window.location.href = `${window.location.origin}/cars`
    }
    
};

const handleTechInspection = async () => {
  window.location.href = `${window.location.origin}/services/${id}`
};

    return (
        <div className="card" style={{ marginBottom: "1rem" }}>
            <div className="card-body">
                <h5 className="card-title">Имя: {name}</h5>
                <p className="card-text">Номер: {number}</p>
                <div className="row">
                    <div className="col-12 mb-2">
                        <button className="btn btn-primary btn-block w-100" onClick={handleEdit}>Изменить</button>
                    </div>
                    <div className="col-12 mb-2">
                        <button className="btn btn-danger btn-block w-100" onClick={handleDelete}>Удалить</button>
                    </div>
                    <div className="col-12 mb-2">
                        <button className="btn btn-secondary btn-block w-100" onClick={handleTechInspection}>Тех Осмотры</button>
                    </div>
                </div>
            </div>
        </div>
    );
}