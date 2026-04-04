/**
 * PDF 转图片服务
 * 使用 pdf.js 将 PDF 页面转换为图片
 */

import * as pdfjsLib from 'pdfjs-dist';

// 设置 pdf.js worker
// 使用 CDN 版本的 worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PDFToImageOptions {
  scale?: number; // 缩放比例，默认 2（相当于 144 DPI）
  maxPages?: number; // 最大页数，默认 5
  onProgress?: (currentPage: number, totalPages: number) => void;
}

interface PDFToImageResult {
  success: boolean;
  images: string[]; // base64 图片数组
  error?: string;
  pageCount: number;
}

/**
 * 将 PDF 文件转换为图片
 */
export async function convertPDFToImages(
  file: File,
  options: PDFToImageOptions = {}
): Promise<PDFToImageResult> {
  const { scale = 2, maxPages = 5, onProgress } = options;

  try {
    // 读取文件为 ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // 加载 PDF
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const pageCount = Math.min(pdf.numPages, maxPages);
    
    const images: string[] = [];
    
    // 逐页转换为图片
    for (let pageNum = 1; pageNum <= pageCount; pageNum++) {
      onProgress?.(pageNum, pageCount);
      
      const page = await pdf.getPage(pageNum);
      
      // 设置画布尺寸
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      if (!context) {
        throw new Error('无法创建 canvas 上下文');
      }
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      // 渲染页面到 canvas
      const renderTask = page.render({
        canvasContext: context,
        viewport: viewport,
        annotationMode: pdfjsLib.AnnotationMode.DISABLE,
      } as any);
      
      await renderTask.promise;
      
      // 转换为 base64
      const imageBase64 = canvas.toDataURL('image/png').split(',')[1];
      images.push(imageBase64);
      
      // 清理
      page.cleanup();
    }
    
    return {
      success: true,
      images,
      pageCount,
    };
  } catch (error) {
    console.error('PDF to Image Error:', error);
    return {
      success: false,
      images: [],
      pageCount: 0,
      error: error instanceof Error ? error.message : 'PDF 转换失败',
    };
  }
}

/**
 * 检查浏览器是否支持 PDF 转换
 */
export function isPDFConversionSupported(): boolean {
  return typeof window !== 'undefined' && 
         typeof document !== 'undefined' &&
         typeof document.createElement('canvas').getContext === 'function';
}

/**
 * 获取 PDF 页数（不转换）
 */
export async function getPDFPageCount(file: File): Promise<number> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    return pdf.numPages;
  } catch (error) {
    console.error('Get PDF Page Count Error:', error);
    return 0;
  }
}
