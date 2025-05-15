import React from "react";

function Header() {
    return (
        <header className="h-screen w-80 p-6 border-r-2 font-sans flex flex-col items-center">
            <div>
                <h1 className="text-5xl font-bold mb-10">MyCRUD</h1>
            </div>
            <nav className="w-full justify-items-center">
                <div className="mb-6 block">
                    <h2 className="text-3xl font-semibold mb-3">Animes</h2>
                    <ul className="space-y-1 text-xl">
                        <li className="pl-4 hover:underline"><a href="">Viendo</a></li>
                        <li className="pl-4 hover:underline"><a href="">Esperando</a></li>
                    </ul>
                </div>

                <div className="block">
                    <h2 className="text-3xl font-semibold mb-3">Mangas</h2>
                    <ul className="space-y-1 text-xl">
                        <li className="pl-4 hover:underline"><a href="">Samuraiscan</a></li>
                        <li className="pl-4 hover:underline"><a href="">Mangadex</a></li>
                        <li className="pl-4 hover:underline"><a href="">Ikigatoon</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default Header;