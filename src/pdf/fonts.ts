import path from 'path';

import { Font } from '@react-pdf/renderer';

const fontsDir = path.join(process.cwd(), 'src/assets/fonts');

let registered = false;

export const registerPdfFonts = () => {
  if (registered) {
    return;
  }

  Font.register({
    family: 'PT Sans',
    fonts: [
      { src: path.join(fontsDir, 'PT_Sans-Web-Regular.ttf'), fontWeight: 400 },
      { src: path.join(fontsDir, 'PT_Sans-Web-Bold.ttf'), fontWeight: 700 }
    ]
  });

  Font.register({
    family: 'PT Serif',
    fonts: [
      { src: path.join(fontsDir, 'PT_Serif-Web-Regular.ttf'), fontWeight: 400 },
      { src: path.join(fontsDir, 'PT_Serif-Web-Bold.ttf'), fontWeight: 700 }
    ]
  });

  registered = true;
};
