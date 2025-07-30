import React from "react";
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-slate-900 text-white w-80 p-6 border-r-2 font-sans flex flex-col items-center">
            <div className="mb-10">
                <h1 className="text-5xl font-bold">MyCRUD</h1>
            </div>
            <nav className="w-full flex flex-col items-center">
                <NavLink
                    to="/viendo"
                    className={({ isActive }) =>
                        (isActive
                            ? 'w-40 px-4 py-2 bg-slate-600 rounded text-white text-center'
                            : 'w-40 px-4 py-2 bg-white text-slate-900 rounded hover:bg-slate-100 transition text-center') + ' mb-6'
                    }
                >
                    Viendo
                </NavLink>
                <NavLink
                    to="/esperando"
                    className={({ isActive }) =>
                        (isActive
                            ? 'w-40 px-4 py-2 bg-slate-600 rounded text-white text-center'
                            : 'w-40 px-4 py-2 bg-white text-slate-900 rounded hover:bg-slate-100 transition text-center') + ' mb-6'
                    }
                >
                    Esperando
                </NavLink>
                <NavLink
                    to="/manga"
                    className={({ isActive }) =>
                        isActive
                            ? 'w-40 px-4 py-2 bg-slate-600 rounded text-white text-center'
                            : 'w-40 px-4 py-2 bg-white text-slate-900 rounded hover:bg-slate-100 transition text-center'
                    }
                >
                    Manga
                </NavLink>
            </nav>
        </header>
    );
}

export default Header;