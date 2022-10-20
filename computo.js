function generateRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

process.on("message", (cant) => {
  let result = {};
  for (let i = 0; i < cant; i++) {
    const num = generateRandomInt(1, 1000);
    if (!result.hasOwnProperty(num)) {
      Object.defineProperty(result, num, {
        value: 1,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    } else {
      Object.defineProperty(result, num, {
        value: result[num] + 1,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    }
  }
  process.send(result);
});
