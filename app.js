/**
 * Konfigurasi PDF.js
 */

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


/**
 * Membaca teks dari file PDF
 */
async function readPDF(file) {

    const arrayBuffer =
        await file.arrayBuffer();

    const pdf =
        await pdfjsLib.getDocument({
            data: arrayBuffer
        }).promise;

    let fullText = "";

    for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
    ) {

        const page =
            await pdf.getPage(pageNumber);

        const textContent =
            await page.getTextContent();

        const pageText =
            textContent.items
                .map(item => item.str)
                .join(" ");

        fullText += pageText;

        fullText += "\n\n";
    }

    return fullText.trim();
}


/**
 * Membuat PDF baru dari teks
 */
function createPDF(text) {

    const { jsPDF } = window.jspdf;

    const doc =
        new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

    const margin = 15;

    const pageWidth =
        doc.internal.pageSize.getWidth();

    const pageHeight =
        doc.internal.pageSize.getHeight();

    const maxWidth =
        pageWidth - margin * 2;

    const lineHeight = 7;

    let y = margin;

    const lines =
        doc.splitTextToSize(
            text,
            maxWidth
        );

    for (const line of lines) {

        if (
            y + lineHeight >
            pageHeight - margin
        ) {

            doc.addPage();

            y = margin;
        }

        doc.text(
            line,
            margin,
            y
        );

        y += lineHeight;
    }

    return doc;
}


/**
 * Download PDF
 */
function downloadPDF(text, filename) {

    const doc =
        createPDF(text);

    doc.save(filename);
}