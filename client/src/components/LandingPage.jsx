function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header Section */}
            <header className="bg-blue-600 text-white py-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center px-6">
                    <h1 className="text-3xl font-bold">Lyricals</h1>
                    <nav>
                        <ul className="flex space-x-6">
                            <li><a href="#features" className="hover:underline">Features</a></li>
                            <li><a href="#about" className="hover:underline">About</a></li>
                            <li><a href="#contact" className="hover:underline">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="flex-grow flex items-center justify-center bg-gray-100 py-16 text-center">
                <div className="container px-6">
                    <h2 className="text-4xl font-bold mb-4">Discover Lyrics, Share Music Love ❤️</h2>
                    <p className="text-lg mb-6">Search for song lyrics, rate your favorite tunes, and create a personalized music experience with Lyricals.</p>
                    <a href="#features" className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700">Explore Features</a>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <h3 className="text-3xl font-bold text-center mb-10">Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "🎶 Search for Song Lyrics", desc: "Find the full lyrics and details of your favorite songs." },
                            { title: "❤️ Favorite Songs", desc: "Like songs to add them to your personal favorites list." },
                            { title: "🔄 Song Suggestions", desc: "Get recommendations based on your search history and favorites." },
                            { title: "🌘 Dark/Light Mode", desc: "Toggle between dark and light modes for a comfortable experience." },
                            { title: "⭐ Rate Songs", desc: "Share your opinion by rating songs." }
                        ].map((feature, index) => (
                            <div key={index} className="bg-gray-200 p-6 rounded-lg shadow-md text-center">
                                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto text-center">
                    <p>&copy; 2025 Lyricals. All rights reserved.</p>
                    <p className="mt-2">Follow us on
                        <a href="#" className="text-blue-400 hover:underline mx-2">Twitter</a>
                        <a href="#" className="text-blue-400 hover:underline mx-2">Facebook</a>
                        <a href="#" className="text-blue-400 hover:underline mx-2">Instagram</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;