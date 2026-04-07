import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  Sparkles,
  Shield,
  Lock,
  Eye,
  Globe,
  FileUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { parsePDF, validatePDFFile, getFileSizeInfo, MAX_FILE_SIZE } from '@/services/pdfParser';
import { useI18n } from '@/i18n/index.tsx';
import type { ResumeData, UploadState } from '@/types';

interface UploadPageProps {
  onNavigate: (page: string) => void;
  onResumeData: (data: ResumeData) => void;
}

export function UploadPage({ onNavigate, onResumeData }: UploadPageProps) {
  const { t } = useI18n();
  const [uploadState, setUploadState] = useState<UploadState>({
    status: 'idle',
    progress: 0,
    fileName: '',
  });
  const [dragActive, setDragActive] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [blockSearchEngine, setBlockSearchEngine] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // 先验证文件
    const validation = validatePDFFile(file);
    if (!validation.valid) {
      setUploadState({
        status: 'error',
        progress: 0,
        fileName: file.name,
        error: validation.error,
      });
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);

    // 开始上传
    setUploadState({
      status: 'uploading',
      progress: 0,
      fileName: file.name,
    });

    try {
      // 解析PDF
      const result = await parsePDF(file, {
        onProgress: (progress) => {
          setUploadState((prev) => ({
            ...prev,
            progress,
          }));
        },
        language: 'auto',
        useRealAPI: true, // 使用真实API解析
      });

      if (result.success && result.data) {
        setUploadState({
          status: 'success',
          progress: 100,
          fileName: file.name,
        });

        // Show warning for image-based PDFs
        if (result.warning === 'image_pdf') {
          setUploadState((prev) => ({
            ...prev,
            error: t('upload.imagePdfWarning'),
          }));
        }

        // 传递解析的数据
        onResumeData(result.data);

        // 延迟后跳转到模板选择页面
        setTimeout(() => {
          onNavigate('templates');
        }, result.warning === 'image_pdf' ? 3000 : 1500);
      } else {
        setUploadState({
          status: 'error',
          progress: 0,
          fileName: file.name,
          error: result.error || t('upload.status.error'),
        });
      }
    } catch (error) {
      setUploadState({
        status: 'error',
        progress: 0,
        fileName: file.name,
        error: error instanceof Error ? error.message : t('upload.status.error'),
      });
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  const resetUpload = () => {
    setUploadState({
      status: 'idle',
      progress: 0,
      fileName: '',
    });
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const getStatusIcon = () => {
    switch (uploadState.status) {
      case 'uploading':
      case 'parsing':
        return <Loader2 className="w-12 h-12 text-[#4a7c8c] animate-spin" />;
      case 'success':
        return <CheckCircle2 className="w-12 h-12 text-[#7a9a7c]" />;
      case 'error':
        return <AlertCircle className="w-12 h-12 text-[#c45c48]" />;
      default:
        return <Upload className="w-12 h-12 text-[#4a7c8c]" />;
    }
  };

  const getStatusText = () => {
    switch (uploadState.status) {
      case 'uploading':
        return t('upload.status.uploading');
      case 'parsing':
        return t('upload.status.parsing');
      case 'success':
        return t('upload.status.success');
      case 'error':
        return uploadState.error || t('upload.status.error');
      default:
        return t('upload.dragText');
    }
  };

  // 获取拖拽区域样式
  const getDropZoneStyle = () => {
    if (dragActive) {
      return 'bg-[#f0f5f3] border-2 border-dashed border-[#4a7c8c]';
    }
    if (uploadState.status === 'error') {
      return 'bg-[#fdf5f3] border-2 border-dashed border-[#c45c48]';
    }
    if (uploadState.status === 'success') {
      return 'bg-[#f5f8f5] border-2 border-dashed border-[#7a9a7c]';
    }
    return 'bg-[#faf9f7] border-2 border-dashed border-[#d8d4cf] hover:border-[#4a7c8c] hover:bg-[#f5f3f0]';
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Privacy Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 bg-gradient-to-r from-[#3d3d3d] to-[#5a5a5a] rounded-2xl text-white"
        >
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-[#7a9a7c]" />
            <span className="font-semibold">{t('privacy.slogan') || '你的简历属于你'}</span>
          </div>
          <p className="text-sm text-gray-300 mb-4">{t('privacy.promise') || '我们最小化收集数据，你的隐私是我们的首要考虑'}</p>
          
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={privacyMode}
                onChange={(e) => setPrivacyMode(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#4a7c8c] focus:ring-[#4a7c8c]"
              />
              <span className="text-sm flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {t('privacy.mode') || '隐私模式'}
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={blockSearchEngine}
                onChange={(e) => setBlockSearchEngine(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#4a7c8c] focus:ring-[#4a7c8c]"
              />
              <span className="text-sm flex items-center gap-1">
                <Globe className="w-4 h-4" />
                {t('privacy.searchEngine') || '阻止搜索引擎收录'}
              </span>
            </label>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0f5f3] rounded-full text-[#4a7c8c] text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>AI {t('upload.feature.auto') || '智能解析'}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#3d3d3d] mb-4">
            {t('upload.title') || '上传你的简历'}
          </h1>
          <p className="text-lg text-[#6a6a6a] max-w-xl mx-auto">
            {t('upload.subtitle') || '支持 PDF 格式，AI 将自动提取信息并生成个人网站'}
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="overflow-hidden border-[#e8e4df]">
            <CardContent className="p-0">
              <div
                className={`relative p-12 transition-all duration-300 ${getDropZoneStyle()}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,application/pdf"
                  onChange={handleChange}
                />

                <div className="flex flex-col items-center text-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={uploadState.status}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="mb-6"
                    >
                      {uploadState.status === 'idle' ? (
                        <div className="w-20 h-20 bg-[#f0f5f3] rounded-full flex items-center justify-center">
                          <FileUp className="w-10 h-10 text-[#4a7c8c]" />
                        </div>
                      ) : (
                        getStatusIcon()
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <h3 className="text-xl font-semibold text-[#3d3d3d] mb-2">
                    {getStatusText()}
                  </h3>

                  {uploadState.status === 'idle' && (
                    <>
                      <p className="text-[#8c8c8c] mb-2">
                        {t('upload.supported') || '支持 PDF 格式'}
                      </p>
                      {/* 文件大小提示 */}
                      <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-[#f5f3f0] rounded-lg">
                        <FileText className="w-4 h-4 text-[#8c8c8c]" />
                        <span className="text-sm text-[#6a6a6a]">
                          {t('upload.maxSize')}
                        </span>
                      </div>
                      <Button
                        onClick={onButtonClick}
                        className="bg-gradient-to-r from-[#4a7c8c] to-[#5a8c9c] hover:from-[#3a6c7c] hover:to-[#4a7c8c] text-white"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        {t('common.clickUpload') || '点击上传'}
                      </Button>
                    </>
                  )}

                  {/* 显示已选文件信息 */}
                  {selectedFile && uploadState.status !== 'idle' && (
                    <div className="mt-4 p-3 bg-white rounded-lg border border-[#e8e4df]">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-[#4a7c8c]" />
                        <div className="text-left">
                          <p className="text-sm font-medium text-[#3d3d3d]">{selectedFile.name}</p>
                          <p className="text-xs text-[#8c8c8c]">{getFileSizeInfo(selectedFile.size)}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {(uploadState.status === 'uploading' ||
                    uploadState.status === 'parsing') && (
                    <div className="w-full max-w-md mt-6">
                      <Progress 
                        value={uploadState.progress} 
                        className="h-2 bg-[#e8e4df]"
                      />
                      <p className="text-sm text-[#6a6a6a] mt-2">
                        {uploadState.progress}%
                      </p>
                    </div>
                  )}

                  {uploadState.status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4"
                    >
                      <p className="text-[#7a9a7c] mb-2">
                        {t('upload.status.success') || '成功解析'} <strong>{uploadState.fileName}</strong>
                      </p>
                      {uploadState.error && (
                        <p className="text-[#c4a248] text-sm mb-2">
                          {uploadState.error}
                        </p>
                      )}
                      <p className="text-[#8c8c8c] text-sm">
                        {t('common.loading') || '正在跳转...'}
                      </p>
                    </motion.div>
                  )}

                  {uploadState.status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4"
                    >
                      <p className="text-[#c45c48] mb-2">{uploadState.error}</p>
                      <Button
                        onClick={resetUpload}
                        variant="outline"
                        className="mt-4 border-[#d8d4cf] hover:bg-[#f5f3f0]"
                      >
                        <X className="w-4 h-4 mr-2" />
                        {t('common.back') || '重新上传'}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: <FileText className="w-6 h-6 text-[#4a7c8c]" />,
              title: t('upload.feature.auto') || '智能解析',
              description: t('upload.feature.autoDesc') || 'AI 自动识别简历内容，无需手动输入',
            },
            {
              icon: <Sparkles className="w-6 h-6 text-[#c45c48]" />,
              title: t('upload.feature.structure') || '结构化数据',
              description: t('upload.feature.structureDesc') || '自动提取工作经历、教育背景、技能等信息',
            },
            {
              icon: <CheckCircle2 className="w-6 h-6 text-[#7a9a7c]" />,
              title: t('upload.feature.preview') || '即时预览',
              description: t('upload.feature.previewDesc') || '上传后立即看到生成的个人网站效果',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-white shadow-sm border border-[#e8e4df]"
            >
              <div className="w-12 h-12 bg-[#f5f3f0] rounded-lg flex items-center justify-center flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-[#3d3d3d] mb-1">
                  {feature.title}
                </h4>
                <p className="text-sm text-[#6a6a6a]">{feature.description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 p-6 bg-[#f0f5f3] rounded-xl border border-[#d8e4df]"
        >
          <h4 className="font-semibold text-[#3a6c7c] mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {t('upload.tips.title') || '上传提示'}
          </h4>
          <ul className="space-y-2 text-sm text-[#4a7c8c]">
            <li>• {t('upload.tips.pdf') || '请上传 PDF 格式的简历文件'}</li>
            <li>• {t('upload.tips.format') || '文件大小不能超过 10MB'}</li>
            <li>• {t('upload.tips.edit') || '解析后你可以随时编辑和优化内容'}</li>
          </ul>
        </motion.div>

        {/* Security Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-4 bg-[#f5f3f0] rounded-xl border border-[#e8e4df]"
        >
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-[#8c8c8c] mt-0.5" />
            <div>
              <h4 className="font-medium text-[#3d3d3d] mb-1">{t('privacy.title') || '隐私保护'}</h4>
              <p className="text-sm text-[#6a6a6a]">
                {t('privacy.minimalDesc') || '我们仅收集必要的数据'} {t('privacy.encryptionDesc') || '所有数据传输均加密'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
