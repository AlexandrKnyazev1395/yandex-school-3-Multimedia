function videoToCanvas(canvas, video) {
  const context = canvas.getContext('2d');
  const raf = () => {
    requestAnimationFrame(() => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        try {
          const { width, height } = canvas;
          context.drawImage(video, 0, 0, width, height);
        } catch (e) { }
      }
      raf()
    })
  }
  raf()
}

export default videoToCanvas;