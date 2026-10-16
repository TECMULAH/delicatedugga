import { useEffect, useState } from "react";

const KEY = "delicate-dugga-picks";

export default function usePicks() {
  const [picks, setPicks] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(saved)) setPicks(saved);
    } catch {
      setPicks([]);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(picks));
  }, [picks, ready]);

  function toggle(item) {
    setPicks((current) =>
      current.some((pick) => pick.src === item.src)
        ? current.filter((pick) => pick.src !== item.src)
        : [...current, { src: item.src, caption: item.caption, section: item.section }]
    );
  }

  return {
    picks,
    toggle,
    clear: () => setPicks([]),
    has: (src) => picks.some((pick) => pick.src === src),
  };
}
