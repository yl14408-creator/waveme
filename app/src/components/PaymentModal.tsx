import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  X, 
  CreditCard, 
  QrCode, 
  MessageCircle,
  Loader2,
  CheckCircle2,
  Shield
} from 'lucide-react';
import { 
  simulatePayment, 
  getDisplayPrice, 
  type PlanType, 
  type BillingCycle,
  type PaymentResult 
} from '@/services/payment';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: PlanType;
  billingCycle: BillingCycle;
  onSuccess: (result: PaymentResult) => void;
}

type PaymentStep = 'select' | 'processing' | 'success' | 'error';
type PaymentMethod = 'stripe' | 'alipay' | 'wechat';

export function PaymentModal({ 
  isOpen, 
  onClose, 
  plan, 
  billingCycle,
  onSuccess 
}: PaymentModalProps) {
  const [step, setStep] = useState<PaymentStep>('select');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSelectMethod = (method: PaymentMethod) => {
    setSelectedMethod(method);
    handlePayment(method);
  };

  const handlePayment = async (method: PaymentMethod) => {
    setStep('processing');
    setProgress(0);

    try {
      // 使用模拟支付（开发环境）
      // 生产环境应该调用真实的支付 API
      const result = await simulatePayment(plan, billingCycle, (p) => {
        setProgress(p);
      });

      if (result.success) {
        setStep('success');
        setTimeout(() => {
          onSuccess(result);
        }, 1500);
      } else {
        setStep('error');
        setError(result.error || '支付失败');
      }
    } catch (err) {
      setStep('error');
      setError(err instanceof Error ? err.message : '支付失败');
    }
  };

  const handleRetry = () => {
    setStep('select');
    setSelectedMethod(null);
    setError(null);
  };

  const paymentMethods = [
    {
      id: 'stripe' as PaymentMethod,
      name: '信用卡',
      description: '支持 Visa、MasterCard',
      icon: <CreditCard className="w-6 h-6" />,
      color: '#635BFF',
    },
    {
      id: 'alipay' as PaymentMethod,
      name: '支付宝',
      description: '中国大陆用户',
      icon: <QrCode className="w-6 h-6" />,
      color: '#1677FF',
    },
    {
      id: 'wechat' as PaymentMethod,
      name: '微信支付',
      description: '中国大陆用户',
      icon: <MessageCircle className="w-6 h-6" />,
      color: '#07C160',
    },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-[#faf9f7] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#e8e4df] bg-white">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#4a7c8c]" />
              <span className="font-semibold text-[#3d3d3d]">安全支付</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#f5f3f0] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-[#8c8c8c]" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 'select' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Order Summary */}
                <div className="bg-[#f5f3f0] rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#6a6a6a]">方案</span>
                    <span className="font-medium text-[#3d3d3d]">
                      {plan === 'pro' ? '专业版' : '团队版'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#6a6a6a]">周期</span>
                    <span className="font-medium text-[#3d3d3d]">
                      {billingCycle === 'monthly' ? '月付' : '年付'}
                    </span>
                  </div>
                  <div className="border-t border-[#e8e4df] pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[#3d3d3d] font-medium">总计</span>
                      <span className="text-2xl font-bold text-[#4a7c8c]">
                        {getDisplayPrice(plan, billingCycle)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <h3 className="text-sm font-medium text-[#6a6a6a] mb-3">选择支付方式</h3>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => handleSelectMethod(method.id)}
                      className="w-full flex items-center gap-4 p-4 bg-white border border-[#e8e4df] rounded-xl hover:border-[#4a7c8c] hover:shadow-md transition-all"
                    >
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                        style={{ backgroundColor: method.color }}
                      >
                        {method.icon}
                      </div>
                      <div className="text-left flex-1">
                        <h4 className="font-medium text-[#3d3d3d]">{method.name}</h4>
                        <p className="text-sm text-[#8c8c8c]">{method.description}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <p className="text-xs text-[#8c8c8c] text-center mt-4">
                  支付即表示你同意我们的服务条款和隐私政策
                </p>
              </motion.div>
            )}

            {step === 'processing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#e8e4df"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#4a7c8c"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${progress * 2.51} 251`}
                      className="transition-all duration-300"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[#4a7c8c] animate-spin" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">
                  正在处理支付...
                </h3>
                <p className="text-sm text-[#8c8c8c]">
                  {progress < 30 && '创建订单...'}
                  {progress >= 30 && progress < 60 && '等待支付确认...'}
                  {progress >= 60 && progress < 90 && '处理支付...'}
                  {progress >= 90 && '激活订阅...'}
                </p>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-[#7a9a7c] rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-[#3d3d3d] mb-2">
                  支付成功！
                </h3>
                <p className="text-sm text-[#6a6a6a]">
                  你的订阅已激活，正在跳转...
                </p>
              </motion.div>
            )}

            {step === 'error' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-[#c45c48] rounded-full flex items-center justify-center mx-auto mb-6">
                  <X className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#3d3d3d] mb-2">
                  支付失败
                </h3>
                <p className="text-sm text-[#c45c48] mb-6">
                  {error}
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleRetry}
                    variant="outline"
                    className="flex-1 border-[#d8d4cf]"
                  >
                    重试
                  </Button>
                  <Button
                    onClick={onClose}
                    className="flex-1 bg-gradient-to-r from-[#4a7c8c] to-[#5a8c9c] text-white"
                  >
                    稍后支付
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {step === 'select' && (
            <div className="p-4 bg-[#f5f3f0] border-t border-[#e8e4df]">
              <div className="flex items-center justify-center gap-4 text-[#8c8c8c]">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs">SSL 加密</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-xs">7 天退款</span>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
