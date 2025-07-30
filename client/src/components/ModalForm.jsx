import React from "react";

const ModalForm = ({ isOpen, onClose, onSubmit, form, onChange, isEditing }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96 border-2">
                <h2 className="text-xl font-semibold mb-4">
                    {isEditing ? 'Editar Anime' : 'Añadir Anime'}
                </h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Nombre del Anime</label>
                        <input
                            type="text"
                            name="nombre"
                            autocomplete="off"
                            value={form.nombre}
                            onChange={onChange}
                            required
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Temporada</label>
                        <input
                            type="text"
                            name="temporada"
                            autocomplete="off"
                            value={form.temporada}
                            onChange={onChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Episodio</label>
                        <input
                            type="number"
                            name="episodio"
                            autocomplete="off"
                            value={form.episodio}
                            onChange={onChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-sm font-medium text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {isEditing ? 'Guardar' : 'Añadir'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalForm;
