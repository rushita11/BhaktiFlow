export const MANTRAS = [
  {
    id: "radha",
    label: "Radha",
    devanagari: "राधा",
    subtitle: "Prem aur bhakti",
    gradient: "linear-gradient(145deg, #fff7ed, #ffe4d6)",
    audio: "/audio/radha.mp3",
    wallpapers: [
      { id: "radha-1", name: "Vrindavan Glow", src: "/images/radha-1.svg" },
      { id: "radha-2", name: "Divine Lotus", src: "/images/radha-2.svg" }
    ]
  },
  {
    id: "krishna",
    label: "Krishna",
    devanagari: "कृष्ण",
    subtitle: "Anand aur karuna",
    gradient: "linear-gradient(145deg, #eef4ff, #dbeafe)",
    audio: "/audio/krishna.mp3",
    wallpapers: [
      { id: "krishna-1", name: "Blue Serenity", src: "/images/krishna-1.svg" },
      { id: "krishna-2", name: "Flute Melody", src: "/images/krishna-2.svg" }
    ]
  },
  {
    id: "ram",
    label: "Ram",
    devanagari: "राम",
    subtitle: "Maryada aur shanti",
    gradient: "linear-gradient(145deg, #fff8e8, #ffedbd)",
    audio: "/audio/ram.mp3",
    wallpapers: [
      { id: "ram-1", name: "Golden Dawn", src: "/images/ram-1.svg" },
      { id: "ram-2", name: "Ayodhya Light", src: "/images/ram-2.svg" }
    ]
  },
  {
    id: "sita",
    label: "Sita",
    devanagari: "सीता",
    subtitle: "Shraddha aur sahas",
    gradient: "linear-gradient(145deg, #fff1f5, #ffe4ea)",
    audio: "/audio/sita.mp3",
    wallpapers: [
      { id: "sita-1", name: "Rose Prayer", src: "/images/sita-1.svg" },
      { id: "sita-2", name: "Sacred Garden", src: "/images/sita-2.svg" }
    ]
  },
  {
    id: "shiva",
    label: "Shiva",
    devanagari: "शिव",
    subtitle: "Dhyan aur vairagya",
    gradient: "linear-gradient(145deg, #eff6ff, #e0e7ff)",
    audio: "/audio/shiva.mp3",
    wallpapers: [
      { id: "shiva-1", name: "Kailash Calm", src: "/images/shiva-1.svg" },
      { id: "shiva-2", name: "Moon Meditation", src: "/images/shiva-2.svg" }
    ]
  }
];

export const getMantra = (id) => MANTRAS.find((item) => item.id === id) || MANTRAS[0];
