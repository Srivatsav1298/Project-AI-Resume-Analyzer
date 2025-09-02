export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  isLoading = true;
  console.log("Loading pdfjs-dist module...");

  // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
  loadPromise = import("pdfjs-dist/build/pdf.mjs")
    .then((lib) => {
      console.log("pdfjs-dist loaded successfully.");
      lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      pdfjsLib = lib;
      isLoading = false;
      return lib;
    })
    .catch((err) => {
      console.error("Failed to load pdfjs-dist:", err);
      isLoading = false;
      throw err;
    });

  return loadPromise;
}

export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
  console.log("Starting PDF to image conversion...");
  try {
    const lib = await loadPdfJs();

    console.log("Reading PDF file into ArrayBuffer...");
    const arrayBuffer = await file.arrayBuffer();

    console.log("Loading PDF document...");
    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
    console.log(`PDF loaded. Number of pages: ${pdf.numPages}`);

    console.log("Getting page 1...");
    const page = await pdf.getPage(1);
    console.log("Page 1 loaded.");

    const viewport = page.getViewport({ scale: 4 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (context) {
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    } else {
      console.warn("Canvas context is null!");
    }

    console.log("Rendering page...");
    await page.render({ canvasContext: context!, viewport }).promise;
    console.log("Page rendered successfully.");

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File([blob], `${originalName}.png`, {
              type: "image/png",
            });

            console.log("PDF converted to image successfully.");
            resolve({
              imageUrl: URL.createObjectURL(blob),
              file: imageFile,
            });
          } else {
            console.error("Failed to create image blob from canvas.");
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
          }
        },
        "image/png",
        1.0
      );
    });
  } catch (err) {
    console.error("Error during PDF to image conversion:", err);
    return {
      imageUrl: "",
      file: null,
      error: `Failed to convert PDF: ${err}`,
    };
  }
}
