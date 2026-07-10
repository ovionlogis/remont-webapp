import { renderToBuffer } from '@react-pdf/renderer';

import { registerPdfFonts } from '@/pdf/fonts';
import PriceDocument from '@/pdf/PriceDocument';

export const dynamic = 'force-static';

export async function GET() {
  registerPdfFonts();

  const buffer = await renderToBuffer(<PriceDocument />);

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="price.pdf"'
    }
  });
}
