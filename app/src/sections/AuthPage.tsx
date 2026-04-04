import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  ArrowRight,
  Github,
  Chrome,
  CheckCircle2,
  Droplets,
  AlertCircle
} from 'lucide-react';
import { 
  signInWithEmail, 
  signUpWithEmail, 
  signInWithGoogle, 
  signInWithGitHub,
  isAuthConfigured,
  mockSignIn,
  type AuthUser
} from '@/services/auth';
import { useI18n } from '@/i18n';

interface AuthPageProps {
  onNavigate: (page: string) => void;
  onLogin?: (user: AuthUser) => void;
}

export function AuthPage({ onNavigate, onLogin }: AuthPageProps) {
  const { t, language } = useI18n();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [authConfigured, setAuthConfigured] = useState(true);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    // 检查认证服务是否配置
    setAuthConfigured(isAuthConfigured());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      let result;

      if (mode === 'login') {
        // 登录
        if (authConfigured) {
          result = await signInWithEmail(email, password);
        } else {
          // 使用模拟登录
          result = await mockSignIn(email);
        }

        if (result.success && result.user) {
          setSuccess(language === 'en' ? 'Login successful!' : '登录成功！');
          onLogin?.(result.user);
          setTimeout(() => onNavigate('dashboard'), 800);
        } else {
          setError(result.error || (language === 'en' ? 'Login failed' : '登录失败'));
        }
      } else {
        // 注册
        if (!agreeTerms) {
          setError(language === 'en' ? 'Please agree to the terms' : '请同意服务条款');
          setIsLoading(false);
          return;
        }

        if (password.length < 6) {
          setError(language === 'en' ? 'Password must be at least 6 characters' : '密码至少需要6位');
          setIsLoading(false);
          return;
        }

        if (authConfigured) {
          result = await signUpWithEmail(email, password, name);
        } else {
          // 模拟注册成功
          await new Promise(resolve => setTimeout(resolve, 1000));
          setSuccess(language === 'en' ? 'Registration successful! Please login' : '注册成功！请登录');
          setTimeout(() => {
            setMode('login');
            setSuccess('');
          }, 1500);
          setIsLoading(false);
          return;
        }

        if (result.success) {
          setSuccess(language === 'en' ? 'Registration successful! Please check your email' : '注册成功！请查收邮件确认');
          setTimeout(() => {
            setMode('login');
            setSuccess('');
          }, 2000);
        } else {
          setError(result.error || (language === 'en' ? 'Registration failed' : '注册失败'));
        }
      }
    } catch (err) {
      setError(language === 'en' ? 'Operation failed, please try again' : '操作失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      if (authConfigured) {
        const result = await signInWithGoogle();
        if (!result.success) {
          setError(result.error || (language === 'en' ? 'Google login failed' : 'Google 登录失败'));
        }
        // Google OAuth 会跳转，不需要处理成功情况
      } else {
        // 模拟 Google 登录
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser = {
          id: 'google-mock-id',
          email: 'user@gmail.com',
          name: 'Google User',
          plan: 'free' as const,
          createdAt: new Date().toISOString(),
        };
        setSuccess(language === 'en' ? 'Login successful!' : '登录成功！');
        onLogin?.(mockUser);
        setTimeout(() => onNavigate('dashboard'), 800);
      }
    } catch (err) {
      setError(language === 'en' ? 'Google login failed' : 'Google 登录失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      if (authConfigured) {
        const result = await signInWithGitHub();
        if (!result.success) {
          setError(result.error || (language === 'en' ? 'GitHub login failed' : 'GitHub 登录失败'));
        }
      } else {
        // 模拟 GitHub 登录
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockUser = {
          id: 'github-mock-id',
          email: 'user@github.com',
          name: 'GitHub User',
          plan: 'free' as const,
          createdAt: new Date().toISOString(),
        };
        setSuccess(language === 'en' ? 'Login successful!' : '登录成功！');
        onLogin?.(mockUser);
        setTimeout(() => onNavigate('dashboard'), 800);
      }
    } catch (err) {
      setError(language === 'en' ? 'GitHub login failed' : 'GitHub 登录失败');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8">
        {/* Left side - Branding */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col justify-center"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-stone-600 to-stone-800 rounded-xl flex items-center justify-center">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-stone-900">waveme</span>
          </div>
          
          <h1 className="text-4xl font-bold text-stone-900 mb-4">
            {language === 'en' ? 'Build Your' : '打造你的'}
            <br />
            <span className="text-stone-600">{language === 'en' ? 'Personal Brand' : '个人品牌'}</span>
          </h1>
          
          <p className="text-lg text-stone-600 mb-8">
            {language === 'en' 
              ? 'Create a stunning personal website like a pro designer. Track every visit and know who is viewing your resume.'
              : '像专业设计师一样，轻松创建精美的个人网站。追踪每一次访问，了解谁在看你的简历。'}
          </p>

          <div className="space-y-4">
            {[
              language === 'en' ? '20+ Beautiful Templates' : '20+ 精美模板',
              language === 'en' ? 'Real-time Analytics' : '实时数据洞察',
              language === 'en' ? 'One-click Deploy' : '一键部署上线',
              language === 'en' ? 'Custom Domain' : '自定义域名',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 bg-stone-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-stone-600" />
                </div>
                <span className="text-stone-700">{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 border border-stone-200"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-stone-600 to-stone-800 rounded-xl flex items-center justify-center">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-stone-900">waveme</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-1 bg-stone-100 rounded-xl mb-8">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              {language === 'en' ? 'Login' : '登录'}
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              {language === 'en' ? 'Register' : '注册'}
            </button>
          </div>

          {/* Error/Success messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm"
              >
                {success}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-stone-700">
                  {language === 'en' ? 'Name' : '姓名'}
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder={language === 'en' ? 'Enter your name' : '请输入你的姓名'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-stone-700">
                {language === 'en' ? 'Email' : '邮箱'}
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-sm font-medium text-stone-700">
                {language === 'en' ? 'Password' : '密码'}
              </Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={language === 'en' ? 'Enter password' : '请输入密码'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-stone-600 border-stone-300 rounded focus:ring-stone-500"
                />
                <label htmlFor="terms" className="text-sm text-stone-600">
                  {language === 'en' ? 'I agree to the ' : '我已阅读并同意'}
                  <button type="button" className="text-stone-600 hover:underline font-medium">{language === 'en' ? 'Terms of Service' : '服务条款'}</button>
                  {language === 'en' ? ' and ' : '和'}
                  <button type="button" className="text-stone-600 hover:underline font-medium">{language === 'en' ? 'Privacy Policy' : '隐私政策'}</button>
                </label>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-stone-700 hover:bg-stone-800 text-white py-6"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {language === 'en' ? 'Processing...' : '处理中...'}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {mode === 'login' 
                    ? (language === 'en' ? 'Login' : '登录')
                    : (language === 'en' ? 'Register' : '注册')
                  }
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-stone-500">
                {language === 'en' ? 'Or continue with' : '或使用以下方式'}
              </span>
            </div>
          </div>

          {/* Social login */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors disabled:opacity-50"
            >
              <Chrome className="w-5 h-5" />
              <span className="text-sm text-stone-700">Google</span>
            </button>
            <button
              type="button"
              onClick={handleGitHubLogin}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-stone-200 rounded-xl hover:bg-stone-50 transition-colors disabled:opacity-50"
            >
              <Github className="w-5 h-5" />
              <span className="text-sm text-stone-700">GitHub</span>
            </button>
          </div>

          {!authConfigured && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700">
                {language === 'en' 
                  ? 'Currently in demo mode. Configure Supabase auth for real login functionality.'
                  : '当前使用演示模式。如需真实登录功能，请配置 Supabase 认证服务。'}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
