import { useState, useEffect } from "react";
import axios from "axios";
import ModalFormManga from "../ModalFormManga";

const TablaManga = () => {
    const [manga, setManga] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [form, setForm] = useState({ nombre: "", capitulo: "", web: "" });
    const [selectedWeb, setSelectedWeb] = useState("");
    const [webs, setWebs] = useState([]);

    // Función para obtener los animes desde la API
    const fetchManga = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/manga");
            setManga(response.data.manga);

            // Extraer webs únicas
            const uniqueWebs = [...new Set(response.data.manga.map(m => m.web))];
            setWebs(uniqueWebs);
        } catch (error) {
            console.error("Error al obtener los mangas:", error);
        }
    };
    // useEffect para cargar los animes al montar el componente
    useEffect(() => {
        fetchManga();
    }, []);

    const openModal = (index = null) => {
        if (index !== null) {
            setForm(manga[index]);
            setEditingIndex(index);
        } else {
            setForm({ nombre: "", capitulo: "" });
            setEditingIndex(null);
        }
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setForm({ nombre: "", capitulo: "" });
        setEditingIndex(null);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingIndex !== null) {
                // Actualizar manga
                const response = await axios.put(
                    `http://localhost:5000/api/manga/${manga[editingIndex].id}`,
                    form
                );
                const updated = [...manga];
                updated[editingIndex] = response.data; // Actualiza con la respuesta de la API
                setManga(updated);
            } else {
                // Crear nuevo anime
                const response = await axios.post(
                    "http://localhost:5000/api/manga",
                    form
                );
                setManga([...manga, response.data]); // Agrega el nuevo anime a la lista
            }
            closeModal();
        } catch (error) {
            console.error("Error al guardar el manga:", error);
        }
    };

    const handleDelete = async (index) => {
        try {
            // Obtén el ID del anime a eliminar
            const mangaId = manga[index].id;

            await axios.delete(`http://localhost:5000/api/manga/${mangaId}`);

            // Actualiza el estado local
            const updated = manga.filter((manga, i) => i !== index);
            setManga(updated);
        } catch (error) {
            console.error("Error al eliminar:", {
                message: error.message,
                response: error.response?.data,
            });
        }
    };

    const filteredManga = selectedWeb ? manga.filter(m => m.web === selectedWeb) : manga;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">Manga</h1>
            <button
                onClick={() => openModal()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center mb-5 cursor-pointer"
            >
                Añadir Manga
            </button>

            <select
                value={selectedWeb}
                onChange={(e) => setSelectedWeb(e.target.value)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center mb-5 cursor-pointer"
            >
                <option value="">Todas las Webs</option>
                {webs.map((web, index) => (
                    <option key={index} value={web}>{web}</option>
                ))}
            </select>

            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Capítulo</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">WEB</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                    {filteredManga.map((manga, index) => (
                        <tr key={index} className="text-center">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{manga.nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">ch.{manga.capitulo}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{manga.web}</td>
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
                    {filteredManga.length === 0 && (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-500">
                                No hay mangas añadidos.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <ModalFormManga
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

export default TablaManga;