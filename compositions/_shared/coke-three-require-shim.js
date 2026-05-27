var require = function (id) {
  if (id === "three" && typeof THREE !== "undefined") return THREE;
  throw new Error("require " + id);
};
