for (let i = 0; i < 10000; i++) {
  setTimeout(() => {
    console.log(`Logging line number: ${i}`);
  }, 1000 * i);
}
