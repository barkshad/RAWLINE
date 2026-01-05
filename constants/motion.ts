
export const SPRING_CONFIG = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1
};

export const EASE_EDITORIAL = [0.19, 1, 0.22, 1];

export const FADE_UP = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE_EDITORIAL }
};

export const STAGGER_CONTAINER = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const IMAGE_FOCUS = {
  hover: { scale: 1.03 },
  transition: { duration: 1.5, ease: EASE_EDITORIAL }
};

export const HOVER_LIFT = {
  initial: { y: 0 },
  hover: { y: -4 },
  transition: { duration: 0.4, ease: EASE_EDITORIAL }
};
