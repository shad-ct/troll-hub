export type AudioKey =
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
	| "m"
	| "n"
	| "o"
	| "p"
	| "q"
	| "r"
	| "s"
	| "t"
	| "u"
	| "v"
	| "w"
	| "x"
	| "y"
	| "z"

export const audioFiles = {
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
	i: "/audio/angane_angu_poyalo.mp3",
	j: "/audio/ne_arinjaa_njan_pettu.mp3",
	k: "/audio/ne_theernnada.mp3",
	l: "/audio/pidikkavane.mp3",
	m: "/audio/ivanu_pranthanu.mp3",
	n: "/audio/ivan-koya-njan-koya.mp3",
	o: "/audio/oh god u again.mp3",
	p: "/audio/oru_paatu_vechthannal_onnentertain_cheyamayirunnu.mp3",
	q: "/audio/padachone_ingalu_kaatholi.mp3",
	r: "/audio/maanga-pari-chelikuthu.mp3",
	s: "/audio/salim kumar funny laugh.mp3",
	t: "/audio/ingane_oru_kuruppine_njn_kandillalo.mp3",
	u: "/audio/ente-illatha-budhiyil-oraidea.mp3",
	v: "/audio/pavam-avan-vijrambichu-poyi.mp3",
	w: "/audio/kollaam-ivanaalu_kollaam.mp3",
	x: "/audio/korachu-korachu.mp3",
	y: "/audio/ayyo-ente-kutta-evidonokke-adi-varunnu.mp3",
	z: "/audio/njan oru velya sambhavalle.mp3",
}

// ─── International meme sounds ────────────────────────────────────────────────
// 53 files, 3 duplicates removed = 53 unique files.
// Keys: 0-9 (10) + a-z (26) + F1-F12 (12) + / * - + . (5) = 53 total

export type IntlKey =
	| "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
	| "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j"
	| "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" | "t"
	| "u" | "v" | "w" | "x" | "y" | "z"
	| "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8"
	| "F9" | "F10" | "F11" | "F12"
	| "/" | "*" | "-" | "+" | "."

export const intlAudioFiles: Record<IntlKey, string> = {
	// 0–9
	"0": "/audio/international/50986408-what-meme-388653.mp3",
	"1": "/audio/international/among-us-role-reveal-sound.mp3",
	"2": "/audio/international/anime-wow-sound-effect-mp3cut.mp3",
	"3": "/audio/international/bye-bye-lumi-athena-sfx.mp3",
	"4": "/audio/international/cartoon-music-game-sfx-comment-below-high-meme-voice-amp-ding-494532.mp3",
	"5": "/audio/international/children-yaysound-effect.mp3",
	"6": "/audio/international/dexter-meme.mp3",
	"7": "/audio/international/dragon-studio-thud-sound-effect-405470.mp3",
	"8": "/audio/international/dun-dun-dun-sound-effect-brass_8nFBccR.mp3",
	"9": "/audio/international/emotional-damage-meme.mp3",
	// a–z
	a: "/audio/international/english-or-spanish-song.mp3",
	b: "/audio/international/error_CDOxCYm.mp3",
	c: "/audio/international/faaah.mp3",
	d: "/audio/international/fail-sound-effect.mp3",
	e: "/audio/international/fbi-open-up_dwLhIFf.mp3",
	f: "/audio/international/fein-fein-fein-fein.mp3",
	g: "/audio/international/freesound_community-bruh-sound-effect-1-6970.mp3",
	h: "/audio/international/galaxy-meme.mp3",
	i: "/audio/international/gta-san-andreas-ah-shit-here-we-go-again_PHjnAqj.mp3",
	j: "/audio/international/helicopter-meme.mp3",
	k: "/audio/international/hold-up-tiktok.mp3",
	l: "/audio/international/huh-cat-meme.mp3",
	m: "/audio/international/huh_37bAoRo.mp3",
	n: "/audio/international/johnnybacon156-fah-469417.mp3",
	o: "/audio/international/let-her-go.mp3",
	p: "/audio/international/let-him-cook-now.mp3",
	q: "/audio/international/loading-lost-connection-green-screen-with-sound-effect-2_K8HORkT.mp3",
	r: "/audio/international/meme-de-creditos-finales.mp3",
	s: "/audio/international/meri-jung-emotional.mp3",
	t: "/audio/international/movie_1_C2K5NH0.mp3",
	u: "/audio/international/nani-meme-sound-effect.mp3",
	v: "/audio/international/ncprime-mid-nights-sound-291477.mp3",
	w: "/audio/international/no-no-wait-wait.mp3",
	x: "/audio/international/oh-my-god-meme.mp3",
	y: "/audio/international/oh-no-no-no-tik-tok-song-sound-effect.mp3",
	z: "/audio/international/oiia-oiia-sound.mp3",
	// F1–F16
	F1: "/audio/international/okay-meme.mp3",
	F2: "/audio/international/omg-bruh-oh-hell-nah.mp3",
	F3: "/audio/international/punch-gaming-sound-effect-hd_RzlG1GE.mp3",
	F4: "/audio/international/punch_u4LmMsr.mp3",
	F5: "/audio/international/quack-meme.mp3",
	F6: "/audio/international/run-vine-sound-effect.mp3",
	F7: "/audio/international/savetweetvid_tadwtrm1nizoqxxv.mp3",
	F8: "/audio/international/shelvis_makes_games-sus-meme-sound-181271.mp3",
	F9: "/audio/international/spiderman-meme-song.mp3",
	F10: "/audio/international/the-lion-sleeps-tonight.mp3",
	F11: "/audio/international/they-ask-you-how-you-are-and-you-just-have-to-say-that-youre-fine-sound-effect_IgYM1CV.mp3",
	F12: "/audio/international/tmpbxydyrz3.mp3",
	"/": "/audio/international/universfield-yeah-boy-114748.mp3",
	"*": "/audio/international/u_ecyjl18pfk-wait-a-minute-who-are-you-425166.mp3",
	"-": "/audio/international/x-files-theme-song-copy_dLYAyUk.mp3",
	"+": "/audio/international/y2mate-mp3cut_sRzY6rh.mp3",
	".": "/audio/international/zvuk-fotoapparata.mp3",
}

export const intlDisplayNames: Record<IntlKey, string> = {
	"0": "What?!",
	"1": "Among Us Role Reveal",
	"2": "Anime Wow",
	"3": "Bye Bye",
	"4": "Ding!",
	"5": "Children Yay",
	"6": "Dexter Meme",
	"7": "Thud",
	"8": "Dun Dun Dun",
	"9": "Emotional Damage",
	a: "English or Spanish?",
	b: "Error",
	c: "Faaah",
	d: "Fail",
	e: "FBI Open Up",
	f: "Fein Fein Fein",
	g: "Bruh",
	h: "Galaxy Brain",
	i: "Ah Sh*t Here We Go Again",
	j: "Helicopter Meme",
	k: "Hold Up",
	l: "Huh Cat",
	m: "Huh",
	n: "Fah",
	o: "Let Her Go",
	p: "Let Him Cook",
	q: "Lost Connection",
	r: "Meme Credits",
	s: "Meri Jung Emotional",
	t: "Movie Sting",
	u: "Nani?!",
	v: "Mid Nights",
	w: "No No Wait Wait",
	x: "Oh My God",
	y: "Oh No No No",
	z: "Oiia Oiia",
	F1: "Okay Meme",
	F2: "OMG Bruh Oh Hell Nah",
	F3: "Punch (Gaming)",
	F4: "Punch",
	F5: "Quack",
	F6: "Run! (Vine)",
	F7: "Save Tweet Vid",
	F8: "Sus (Among Us)",
	F9: "Spider-Man Meme Song",
	F10: "The Lion Sleeps Tonight",
	F11: "That's Fine (How Are You)",
	F12: "Mystery Sting",
	"/": "Yeah Boy",
	"*": "Wait a Minute, Who Are You?",
	"-": "X-Files Theme",
	"+": "Y2Mate Sting",
	".": "Camera Click",
}

export const intlEmojis: Record<IntlKey, string> = {
	"0": "🤔", "1": "📮", "2": "😮", "3": "👋", "4": "🔔",
	"5": "🎉", "6": "🧪", "7": "💥", "8": "🎭", "9": "💢",
	a: "🌍", b: "⚠️", c: "😤", d: "❌", e: "🚔",
	f: "🎵", g: "😐", h: "🌌", i: "🚗", j: "🚁",
	k: "✋", l: "🐱", m: "❓", n: "😆", o: "🎸",
	p: "👨‍🍳", q: "📶", r: "🎬", s: "😢", t: "🎼",
	u: "😲", v: "🌙", w: "🛑", x: "😱", y: "😬",
	z: "🌀",
	F1: "👍", F2: "😳", F3: "👊", F4: "💢", F5: "🦆",
	F6: "🏃", F7: "📱", F8: "🔴", F9: "🕷️", F10: "🦁",
	F11: "😅", F12: "❔",
	"/": "🎤", "*": "👀", "-": "👽", "+": "🎵", ".": "📷",
}

export const intlImages: Record<IntlKey, string> = {
	"0": "https://i.imgflip.com/1otk96.jpg",
	"1": "https://i.imgflip.com/4fxh1h.jpg",
	"2": "https://i.imgflip.com/3lmzyx.jpg",
	"3": "https://i.imgflip.com/5c7lwq.jpg",
	"4": "https://i.imgflip.com/2wifvo.jpg",
	"5": "https://i.imgflip.com/dqd9n.jpg",
	"6": "https://i.imgflip.com/4acd7j.jpg",
	"7": "https://i.imgflip.com/1c1uej.jpg",
	"8": "https://i.imgflip.com/yuw3j.jpg",
	"9": "https://i.imgflip.com/6s7o23.jpg",
	a: "https://i.imgflip.com/a0rdo.jpg",
	b: "https://i.imgflip.com/4t0m5.jpg",
	c: "https://i.imgflip.com/2hwmh0.jpg",
	d: "https://i.imgflip.com/1ur9b0.jpg",
	e: "https://i.imgflip.com/3oevdk.jpg",
	f: "https://i.imgflip.com/6k9gnj.jpg",
	g: "https://i.imgflip.com/4t0m5.jpg",
	h: "https://i.imgflip.com/7r5hd8.jpg",
	i: "https://i.imgflip.com/26am.jpg",
	j: "https://i.imgflip.com/2wifvo.jpg",
	k: "https://i.imgflip.com/261o3j.jpg",
	l: "https://i.imgflip.com/6k9gnj.jpg",
	m: "https://i.imgflip.com/3si4.jpg",
	n: "https://i.imgflip.com/1bij.jpg",
	o: "https://i.imgflip.com/1bij.jpg",
	p: "https://i.imgflip.com/26am.jpg",
	q: "https://i.imgflip.com/1ur9b0.jpg",
	r: "https://i.imgflip.com/3lmzyx.jpg",
	s: "https://i.imgflip.com/6s7o23.jpg",
	t: "https://i.imgflip.com/yuw3j.jpg",
	u: "https://i.imgflip.com/3lmzyx.jpg",
	v: "https://i.imgflip.com/7r5hd8.jpg",
	w: "https://i.imgflip.com/1otk96.jpg",
	x: "https://i.imgflip.com/261o3j.jpg",
	y: "https://i.imgflip.com/4acd7j.jpg",
	z: "https://i.imgflip.com/3oevdk.jpg",
	F1: "https://i.imgflip.com/yuw3j.jpg",
	F2: "https://i.imgflip.com/2hwmh0.jpg",
	F3: "https://i.imgflip.com/1c1uej.jpg",
	F4: "https://i.imgflip.com/1c1uej.jpg",
	F5: "https://i.imgflip.com/7r5hd8.jpg",
	F6: "https://i.imgflip.com/1bij.jpg",
	F7: "https://i.imgflip.com/5c7lwq.jpg",
	F8: "https://i.imgflip.com/4fxh1h.jpg",
	F9: "https://i.imgflip.com/1yz9x1.jpg",
	F10: "https://i.imgflip.com/dqd9n.jpg",
	F11: "https://i.imgflip.com/4t0m5.jpg",
	F12: "https://i.imgflip.com/3si4.jpg",
	"/": "https://i.imgflip.com/a0rdo.jpg",
	"*": "https://i.imgflip.com/261o3j.jpg",
	"-": "https://i.imgflip.com/4fxh1h.jpg",
	"+": "https://i.imgflip.com/2wifvo.jpg",
	".": "https://i.imgflip.com/1otk96.jpg",
}
