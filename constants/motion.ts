
export const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
};

export const STAGGER_CONTAINER = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const IMAGE_ZOOM = {
  hover: { scale: 1.03 },
  transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
};

export const BUTTON_HOVER = {
  hover: { y: -2, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)" },
  tap: { scale: 0.98 }
};
