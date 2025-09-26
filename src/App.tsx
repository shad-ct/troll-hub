import { useEffect, useRef, useState } from "react";

type AudioKey =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m" ;

const audioFiles = {
  "1": "/audio/abhaminich kaynenkil pokkotte.mp3",
  "2": "/audio/ohh bhayaknaram thanne.mp3",
  "3": "/audio/entho varan pokunnu enn ente manas prayunnu.mp3",
  "4": "/audio/enthokke aarnu, ellam cheeti poyi.mp3",
  "5": "/audio/evde ppd avatharipichalum.mp3",
  "6": "/audio/evdeyo entho thakaraar pole.mp3",
  "7": "/audio/halleluyasthrodha.mp3",
  "8": "/audio/idhanappuram kadanna kk jose.mp3",
  "9": "/audio/idhokke enth.mp3",
  a: "/audio/ippo entha undaye.mp3",
  b: "/audio/kittya choych vangich.mp3",
  c: "/audio/kon hey thum.mp3",
  d: "/audio/kouthukam leesham koduthala.mp3",
  e: "/audio/maraboodhame.mp3",
  f: "/audio/naashathileeka pokunne.mp3",
  g: "/audio/thalararudh raman kutti.mp3",
  h: "/audio/pavanai_savamai.mp3",
  i:"/audio/angane_angu_poyalo.mp3",
  j:"/audio/ne_arinjaa_njan_pettu.mp3",
  k:"/audio/ne_theernnada.mp3",
  l:"/audio/pidikkavane.mp3",
  m:"/audio/ivanu_pranthanu.mp3"
};

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [query, setQuery] = useState("");
  const lastKeyRef = useRef<string | null>(null);

  const playAudio = (audioName: AudioKey) => {
    if (audioRef.current) {
      audioRef.current.src = audioFiles[audioName];
      audioRef.current
        .play()
        .catch((error: unknown) =>
          console.error("Audio playback failed:", error)
        );
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // If focus is inside an input/textarea we don't want global key shortcuts to fire
      const active = document.activeElement;
      if (
        active &&
        (active.tagName === "INPUT" || active.tagName === "TEXTAREA")
      ) {
        return;
      }

      const key = event.key.toLowerCase();
      if (key in audioFiles) {
        playAudio(key as AudioKey);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const audioList = Object.entries(audioFiles).map(([key, path]) => ({
    key,
    name: path.split("/").pop() || "",
  }));

  const filteredList = audioList.filter(({ key, name }) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      key.toLowerCase().includes(q) ||
      name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-red-500 animate-pulse">
        The Troll Hub 😂
      </h1>
      <div className="w-full max-w-6xl mb-6">
        <div className="flex items-center gap-3 mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by key or filename..."
            className="flex-1 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none border border-gray-700"
            onKeyDown={(e) => {
              // remember last key pressed while typing so we can play it on blur if desired
              try {
                lastKeyRef.current = e.key.toLowerCase();
              } catch {
                lastKeyRef.current = null;
              }
            }}
            onFocus={() => {
              // clear lastKey when focusing so we only consider keys typed during this session
              lastKeyRef.current = null;
            }}
            onBlur={() => {
              // when leaving the input, if the user last pressed a key that maps to audio, play it
              const k = lastKeyRef.current;
              if (k && k in audioFiles) {
                playAudio(k as AudioKey);
              }
              // clear stored key after handling
              lastKeyRef.current = null;
            }}
          />
          <button
            onClick={() => setQuery("")}
            className="px-3 py-2 bg-gray-700 rounded hover:bg-gray-600 text-sm"
          >
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredList.map(({ key, name }) => (
          <div key={key} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <img
              src={`/images/${key}.png`}
              alt={name}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">Key: {key.toUpperCase()}</h3>
            <p className="text-sm text-gray-400 mb-2">{name}</p>
            <button
              onClick={() => playAudio(key as AudioKey)}
              className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Play
            </button>
          </div>
          ))}
        </div>
        {filteredList.length === 0 && (
          <p className="text-center text-gray-400 mt-6">No audio found for "{query}"</p>
        )}
      </div>
      <audio ref={audioRef} />
      <p className="mt-8 text-lg text-gray-400 text-center">
        Created by{" "}
        <a href="https://github.com/shad-ct" className="text-red-500 underline">
          Shad C T
        </a>
      </p>
    </div>
  );
}

export default App;
