const forEachPixel = (
  { pixels, size }: { pixels: ImageData; size: number },
  callback: (x: number, y: number) => void,
) => {
  for (let x = 0; x < pixels.width; x += size) {
    for (let y = 0; y < pixels.height; y += size) {
      callback(x, y);
    }
  }
};

const handleMapColorToSymbol = (value: number) => {
  // const map = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
  // const map = '        .:░▒▓█';
  const map = '       .:-i|=+%O#@';

  const ratio = value / 255;
  const index = Math.floor(map.length * ratio);
  return map[index];
};

const handleGenerateCanvas = (
  context: CanvasRenderingContext2D,
  options: { width: number; height: number; resolution: number },
  $video?: HTMLVideoElement | null,
) => {
  const render = () => {
    context.fillRect(0, 0, options.width, options.height);

    const cells: { x: number; y: number; symbol: string }[] = [];

    if (!$video) {
      return;
    }

    context.drawImage(
      $video as HTMLVideoElement,
      0,
      0,
      options.width,
      options.height,
    );

    const pixels = context.getImageData(0, 0, options.width, options.height);

    forEachPixel({ pixels, size: options.resolution }, (x, y) => {
      const amountOfIndicesPerPosition = 4;

      const posX = x * amountOfIndicesPerPosition;
      const posY = y * amountOfIndicesPerPosition;

      const posCurrent = posY * pixels.width + posX;

      const red = pixels.data[posCurrent];
      const green = pixels.data[posCurrent + 1];
      const blue = pixels.data[posCurrent + 2];
      const transparency = pixels.data[posCurrent + 3];

      if (transparency < 128) {
        return;
      }

      const averageColorValue = (red + green + blue) / 3;
      const symbol = handleMapColorToSymbol(averageColorValue);

      cells.push({ x, y, symbol });
    });

    context.clearRect(0, 0, options.width, options.height);

    cells.forEach((cell) => {
      context.fillStyle = 'white';
      context.font = `${options.resolution}px Helvetica`;
      context.fillText(cell.symbol, cell.x, cell.y);
    });
  };

  const loop = () =>
    requestAnimationFrame(() => {
      render();
      loop();
    });

  loop();
};

const helpers = {
  handleGenerateCanvas,
};

export default helpers;
