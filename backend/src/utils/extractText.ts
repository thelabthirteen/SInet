import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

// Function to fetch content from URL
function FetchContentFromUrl(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, (response) => {
      const chunks: Buffer[] = [];
      response.on('data', (chunk) => {
        chunks.push(chunk);
      });
      response.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
      response.on('error', (err) => {
        reject(err);
      });
    });
  });
}

// Function to extract text from PDF
async function ExtractTextFromPdf(filePath: string | Buffer): Promise<string> {
  try {
    const data = typeof filePath === 'string' ? fs.readFileSync(filePath) : filePath;
    const pdfData = await pdfParse(data);
    return pdfData.text;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error extracting text from PDF: ' + error.message);
    }
    throw new Error('Unknown error extracting text from PDF');
  }
}

// Function to extract text from Word document
async function ExtractTextFromWord(filePath: string | Buffer): Promise<string> {
  try {
    const data = typeof filePath === 'string' ? fs.readFileSync(filePath) : filePath;
    const result = await mammoth.extractRawText({ buffer: data });
    return result.value;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Error extracting text from Word document: ' + error.message);
    }
    throw new Error('Unknown error extracting text from Word document');
  }
}

// Main function to handle URL or local file path
export default async function ExtractTextFromFile(input: string): Promise<string> {
  try {
    let fileBuffer: Buffer;

    // Check if input is URL or local file path
    if (input.startsWith('http://') || input.startsWith('https://')) {
      // Fetch content from URL
      fileBuffer = await FetchContentFromUrl(input);
    } else {
      // Read content from local file
      const ext = path.extname(input).toLowerCase();
      if (ext === '.pdf' || ext === '.docx') {
        fileBuffer = fs.readFileSync(input);
      } else {
        throw new Error('Unsupported file type');
      }
    }

    // Determine the file type and extract text
    const ext = path.extname(input).toLowerCase();
    if (ext === '.pdf') {
      return await ExtractTextFromPdf(fileBuffer);
    } else if (ext === '.docx') {
      return await ExtractTextFromWord(fileBuffer);
    } else {
      throw new Error('Unsupported file type');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error('Failed to extract text: ' + error.message);
    }
    throw new Error('Unknown error extracting text');
  }
}

