import { useEffect, useRef } from "react";

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
  | "g";

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
};

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-8 text-red-500 animate-pulse">
        The Troll Hub 😂
      </h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {audioList.map(({ key, name }) => (
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
