function interferenceCanvas(canvas, width, height) {
  const context = canvas.getContext('2d');
  const raf = () => {
    requestAnimationFrame(() => {
      const { width, height } = canvas;
      const image = context.getImageData(0, 0, width, height);
      const imageData = image.data;
      const min = 7;
      const max = 9;
      for (var i = 0; i < imageData.length; i += 24) {
        const rest = i;
        const rand = Math.floor(min + Math.random() * (max + 1 - min));
        if (i % rand === 0) {
          imageData[i] = 100;     // red
          imageData[i + 1] = 100; // green
          imageData[i + 2] = 100; // blue
        }
      }
      context.putImageData(image, 0, 0);
      raf()
    })
  }
  raf()


}

export default interferenceCanvas;