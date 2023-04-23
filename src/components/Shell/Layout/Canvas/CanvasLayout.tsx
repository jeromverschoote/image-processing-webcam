import React, { FC, useEffect, useRef, useState } from 'react';

import { styles } from '.';
import { toClassName } from 'helpers/format';

interface Props {
  type?: '2d';

  width: number;
  height: number;

  children: (context: CanvasRenderingContext2D) => any;

  className?: string;
}

const CanvasLayout: FC<Props> = (props) => {
  const { type = '2d', width, height, children, className } = props;

  const [context, setContext] = useState<
    CanvasRenderingContext2D | null | undefined
  >();

  const $canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setContext($canvas.current?.getContext(type));
  }, [$canvas, type]);

  return (
    <canvas
      ref={$canvas}
      width={width}
      height={height}
      className={toClassName(styles.container, className)}
    >
      {context && children(context)}
    </canvas>
  );
};

export default CanvasLayout;
