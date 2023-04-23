import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { useState } from 'react';

interface Props {
  children: (
    stream: MediaStream | undefined,
    videoElement: HTMLVideoElement | null,
  ) => ReactNode | ReactNode[];
}

const WebcamLayout: FC<Props> = (props) => {
  const { children } = props;

  const [stream, setStream] = useState<MediaStream>();

  const $video = useRef<HTMLVideoElement>(null);

  const handleTriggerWebcamStream = async () => {
    if (!$video.current) {
      return;
    }

    try {
      const result = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      $video.current.srcObject = result;
      $video.current.play();

      setStream(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleTriggerWebcamStream();
  }, []);

  return (
    <div>
      <video
        ref={$video}
        autoPlay
        playsInline
        width={640}
        height={480}
        className="hidden"
      />
      {children(stream, $video.current)}
    </div>
  );
};

export default WebcamLayout;
