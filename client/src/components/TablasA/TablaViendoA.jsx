import { useState, useEffect } from 'react';
import ModalForm from '../ModalForm';
import axios from 'axios';

const TablaViendoA = () => {
    const [animes, setAnimes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [form, setForm] = useState({ nombre: '', temporada: '', episodio: '' });

    // Función para obtener los animes desde la API
    const fetchAnimes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/anime');
            setAnimes(response.data.animes);
        } catch (error) {
            console.error('Error al obtener los animes:', error);
        }
    };
    // useEffect para cargar los animes al montar el componente
    useEffect(() => {
        fetchAnimes();
    }, []);

    const openModal = (index = null) => {
        if (index !== null) {
            setForm(animes[index]);
            setEditingIndex(index);
        } else {
            setForm({ nombre: '', temporada: '', episodio: '' });
            setEditingIndex(null);
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setForm({ nombre: '', temporada: '', episodio: '' });
        setEditingIndex(null);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
        try {
            if (editingIndex !== null) {
                // Actualizar anime
                const response = await axios.put(`http://localhost:5000/api/anime/${animes[editingIndex].id}`, form);
                const updated = [...animes];
                updated[editingIndex] = response.data; // Actualiza con la respuesta de la API
                setAnimes(updated);
            } else {
                // Crear nuevo anime
                const response = await axios.post('http://localhost:5000/api/anime', form);
                setAnimes([...animes, response.data]); // Agrega el nuevo anime a la lista
            }
            closeModal();
        } catch (error) {
            console.error('Error al guardar el anime:', error);
        }
    };

    const handleDelete = async (index) => {
        try {
            // Obtén el ID del anime a eliminar
            const animeId = animes[index].id;
        
            await axios.delete(`http://localhost:5000/api/anime/${animeId}`);
        
            // Actualiza el estado local
            const updated = animes.filter((anime, i) => i !== index);
            setAnimes(updated);
        
        } catch (error) {
            console.error('Error al eliminar:', {
                message: error.message,
                response: error.response?.data
            });
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">Animes Viendo</h1>
            <button
                onClick={() => openModal()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center mb-5 cursor-pointer"
            >
                Añadir Anime
            </button>

            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Temporada</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Episodio</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                    {animes.map((anime, index) => (
                        <tr key={index} className="text-center">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{anime.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{anime.temporada}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{anime.episodio}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                <button
                                    onClick={() => openModal(index)}
                                    className="mr-2 text-indigo-600 hover:text-indigo-900 cursor-pointer"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className="text-red-600 hover:text-red-900 cursor-pointer"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {animes.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-500">
                                No hay animes añadidos.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <ModalForm
                isOpen={modalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
                form={form}
                onChange={handleChange}
                isEditing={editingIndex !== null}
            />
        </div>
    );
};

export default TablaViendoA;