
export const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] }
};

export const STAGGER_CONTAINER = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

export const IMAGE_ZOOM = {
  hover: { scale: 1.03 },
  transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] }
};

export const BUTTON_HOVER = {
  hover: { y: -2, boxShadow: "0 10px 40px -10px rgba(0,0,0,0.12)" },
  tap: { scale: 0.98 }
};

export const TEXT_REVEAL = {
  initial: { opacity: 0, y: "100%" },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: [0.19, 1, 0.22, 1] }
};
