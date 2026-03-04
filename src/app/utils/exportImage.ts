import { toPng } from 'html-to-image';

export async function exportAnalysisAsImage(elementId: string): Promise<void> {
  const element = document.getElementById(elementId);
  
  if (!element) {
    throw new Error('Element not found');
  }

  try {
    // Add a temporary class to optimize for export
    element.classList.add('exporting');
    
    // Wait a bit for any animations to settle
    await new Promise(resolve => setTimeout(resolve, 100));

    const dataUrl = await toPng(element, {
      quality: 0.95,
      pixelRatio: 2,
      backgroundColor: '#faf8f6',
    });

    // Remove temporary class
    element.classList.remove('exporting');

    // Create download link
    const link = document.createElement('a');
    link.download = `bedah-rute-analysis-${Date.now()}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    element.classList.remove('exporting');
    throw new Error(`Failed to export image: ${error}`);
  }
}
