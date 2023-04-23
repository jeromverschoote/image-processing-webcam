import type p5 from 'p5';

export type P5CanvasType<
  Props extends { [key: string]: unknown } = { [key: string]: unknown },
> = p5 & {
  updateWithProps?: (props: Props) => void;
};
