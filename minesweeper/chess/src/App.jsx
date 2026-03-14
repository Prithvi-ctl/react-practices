function App() {
  return (
    <div className="flex min-h-screen bg-[#302e2b] ">
      {/* Sidebar / NavBar */}
      <NavBar />

      {/* Main content scrolls independently */}
      <main className="flex-1 overflow-y-auto p-4 flex flex-col">
        <Board />
      </main>
    </div>
  );
}

function NavBar() {
  return (
    <nav className="flex flex-col py-4 bg-[#262522] sticky top-0 h-screen w-1/6 min-w-[180px] max-w-[250px]">
      {/* List of icons */}
      <ul className="flex flex-col items-center gap-4">
        <img src="/logo.webp" alt="logo" className="w-16 h-16 object-contain" />
        <img src="/play-white.svg" alt="play" className="w-12 h-12 object-contain" />
        <img src="/puzzle.svg" alt="puzzle" className="w-12 h-12 object-contain" />
        <img src="/hat.svg" alt="hat" className="w-12 h-12 object-contain" />
        <img src="/train.svg" alt="train" className="w-12 h-12 object-contain" />
        <img src="/binoculars.svg" alt="binoculars" className="w-12 h-12 object-contain" />
        <img src="/communiy.svg" alt="community" className="w-12 h-12 object-contain" />
        <img src="/ellipsis.svg" alt="ellipsis" className="w-12 h-12 object-contain" />
      </ul>
    </nav>
  );
}

function Board() {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src="/chessboard.gif"
          className="w-full md:w-1/2 lg:w-1/3 object-contain"
          alt="chessboard"
        />
        <div className="flex-1 flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">
            Play Chess Online
          </span>
          <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">
            on the #1 Site!
          </span>
          <span className="text-white text-base sm:text-lg md:text-xl">
            Join 230+ million players in the world's largest chess community
          </span>
          <button className="bg-green-900 text-white px-6 py-2 rounded hover:bg-green-600 mt-2">
            Get Started
          </button>
        </div>
      </div>

      {/* Lessons Section */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">
            Improve Your <br />
            Game with Lessons
          </span>
          <span className="text-white text-base sm:text-lg md:text-xl">
            Learn with quick, fun lessons <br /> designed for players of all levels
          </span>
          <button className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-600 mt-2 flex items-center gap-2">
            <img src="/hat.svg" className="w-5 h-5" alt="hat" /> Start a Lesson
          </button>
        </div>
        <img
          src="/lessons.webp"
          className="w-full md:w-1/2 lg:w-1/3 object-contain"
          alt="lessons"
        />
      </div>

      {/* Bots Section */}
      <div className="flex flex-col md:flex-row items-center gap-8">
        <img
          src="/bots.webp"
          className="w-full md:w-1/2 lg:w-1/3 object-contain"
          alt="bots"
        />
        <div className="flex-1 flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <span className="text-white font-bold text-2xl sm:text-3xl md:text-4xl">
            Play Chess Bots
          </span>
          <span className="text-white text-base sm:text-lg md:text-xl">
            Play against unique chess personalities <br /> ranging in skill and playstyle.
          </span>
          <button className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-blue-600 mt-2">
            Challenge a Bot
          </button>
        </div>
      </div>

      
      <div className="flex flex-col items-center gap-4">
        <span className="text-white font-bold text-4xl sm:text-5xl md:text-6xl text-center">
          Learn, Play, and Have Fun!
        </span>
        <button className="bg-green-900 text-white px-6 py-2 rounded hover:bg-green-600">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
