(function () {
  const blockLottie = (obj) => {
    if (!obj) return;
    const originalLoad = obj.loadAnimation;
    obj.loadAnimation = function (options) {
      console.log("Lottie blocked on:", options.path || "inline data");
      return {
        play: () => {},
        pause: () => {},
        stop: () => {},
        destroy: () => {},
        setSpeed: () => {},
        goToAndStop: () => {},
      };
    };
  };
  if (window.lottie) blockLottie(window.lottie);
  Object.defineProperty(window, "lottie", {
    set: (val) => {
      blockLottie(val);
      window._lottie = val;
    },
    get: () => window._lottie,
  });
})();
