import { ImageOff } from "lucide-react";
import Modal from "./Modal";
import { useJaap } from "../context/JaapContext";

export default function WallpaperPicker({ open, onClose }) {
  const { mantra, selectedWallpaper, setWallpaper } = useJaap();

  const choose = (src) => {
    setWallpaper(src);
    onClose();
  };

  return (
    <Modal open={open} title="Choose a background" onClose={onClose}>
      <button className={`wallpaper-option no-image ${!selectedWallpaper ? "selected" : ""}`} onClick={() => choose(null)}>
        <ImageOff size={22} />
        <span>No image</span>
      </button>
      <div className="wallpaper-grid">
        {mantra.wallpapers.map((item) => (
          <button
            type="button"
            className={`wallpaper-card ${selectedWallpaper === item.src ? "selected" : ""}`}
            key={item.id}
            onClick={() => choose(item.src)}
          >
            <img src={item.src} alt={item.name} />
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </Modal>
  );
}
