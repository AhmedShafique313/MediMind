import pdf from 'pdf-parse';

export interface ParsedPDF {
  text: string;
  numPages: number;
  info: {
    title?: string;
    author?: string;
    creationDate?: string;
  };
}

export async function parsePDF(buffer: Buffer): Promise<ParsedPDF> {
  try {
    const data = await pdf(buffer);

    return {
      text: data.text,
      numPages: data.numpages,
      info: {
        title: data.info?.Title,
        author: data.info?.Author,
        creationDate: data.info?.CreationDate,
      },
    };
  } catch (error) {
    console.error('PDF Parsing Error:', error);
    throw new Error(
      `Failed to parse PDF: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

export function validatePDFText(text: string): boolean {
  // Check if text has minimum length and contains medical-related keywords
  if (!text || text.trim().length < 50) {
    return false;
  }

  const medicalKeywords = [
    'patient',
    'test',
    'result',
    'lab',
    'laboratory',
    'report',
    'value',
    'range',
    'specimen',
    'analysis',
    'diagnosis',
    'examination',
  ];

  const lowerText = text.toLowerCase();
  const foundKeywords = medicalKeywords.filter((keyword) =>
    lowerText.includes(keyword)
  );

  // At least 2 medical keywords should be present
  return foundKeywords.length >= 2;
}

export function cleanExtractedText(text: string): string {
  return (
    text
      // Remove excessive whitespace
      .replace(/\s+/g, ' ')
      // Remove page numbers
      .replace(/Page \d+ of \d+/gi, '')
      // Remove common headers/footers
      .replace(/^\s*\d+\s*$/gm, '')
      .trim()
  );
}
