import { useMemo } from 'react';

import type { NextPage } from 'next';

import ApplicationShell from 'components/Shell/Application/ApplicationShell';
import CanvasLayout from 'components/Shell/Layout/Canvas/CanvasLayout';

import { styles, helpers } from '.';
import WebcamLayout from 'components/Shell/Layout/Webcam/WebcamLayout';

const LandingView: NextPage = () => {
  const options = useMemo(
    () => ({
      width: 800,
      height: 800,
      resolution: 10,
    }),
    [],
  );

  return (
    <ApplicationShell>
      <div className={styles.container}>
        <WebcamLayout>
          {(_, $video) => (
            <CanvasLayout width={options.width} height={options.height}>
              {(context) =>
                helpers.handleGenerateCanvas(context, options, $video)
              }
            </CanvasLayout>
          )}
        </WebcamLayout>
      </div>
    </ApplicationShell>
  );
};

export default LandingView;
