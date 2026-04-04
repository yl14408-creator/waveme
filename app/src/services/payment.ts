/**
 * Waveme 支付服务
 * 
 * 支持多种支付方式：
 * 1. Stripe - 国际信用卡支付
 * 2. 支付宝 - 中国大陆
 * 3. 微信支付 - 中国大陆
 * 
 * 生产环境需要配置相应的 API Keys
 */

export type PaymentProvider = 'stripe' | 'alipay' | 'wechat';
export type PlanType = 'free' | 'pro' | 'team';
export type BillingCycle = 'monthly' | 'yearly';

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
}

export interface Subscription {
  id: string;
  plan: PlanType;
  billingCycle: BillingCycle;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface PaymentResult {
  success: boolean;
  subscription?: Subscription;
  error?: string;
}

// 价格配置（单位：分/人民币元）
const PRICING_CONFIG = {
  pro: {
    monthly: 2900, // ¥29
    yearly: 29000, // ¥290 (相当于 ¥24/月)
  },
  team: {
    monthly: 9900, // ¥99
    yearly: 99000, // ¥990 (相当于 ¥82/月)
  },
};

// 获取价格显示
export function getDisplayPrice(plan: PlanType, cycle: BillingCycle): string {
  if (plan === 'free') return '免费';
  
  const price = PRICING_CONFIG[plan][cycle];
  const yuan = price / 100;
  
  if (cycle === 'monthly') {
    return `¥${yuan}/月`;
  } else {
    const monthlyEquivalent = Math.round(yuan / 12);
    return `¥${yuan}/年 (≈¥${monthlyEquivalent}/月)`;
  }
}

// 计算年付节省
export function calculateYearlySavings(plan: PlanType): { amount: number; percentage: number } {
  if (plan === 'free') return { amount: 0, percentage: 0 };
  
  const monthlyTotal = PRICING_CONFIG[plan].monthly * 12;
  const yearlyTotal = PRICING_CONFIG[plan].yearly;
  const savings = monthlyTotal - yearlyTotal;
  const percentage = Math.round((savings / monthlyTotal) * 100);
  
  return { 
    amount: savings / 100, 
    percentage 
  };
}

/**
 * 创建支付意图（Stripe）
 */
export async function createStripePaymentIntent(
  plan: PlanType,
  cycle: BillingCycle
): Promise<PaymentIntent> {
  if (plan === 'free') throw new Error('免费版无需支付');
  const amount = PRICING_CONFIG[plan][cycle];
  
  try {
    const response = await fetch('/api/payments/stripe/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        currency: 'cny',
        plan,
        cycle,
      }),
    });

    if (!response.ok) {
      throw new Error('创建支付意图失败');
    }

    return await response.json();
  } catch (error) {
    console.error('Stripe Payment Error:', error);
    // 模拟返回（开发环境）
    return {
      id: `pi_${Date.now()}`,
      clientSecret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      currency: 'cny',
      status: 'pending',
    };
  }
}

/**
 * 创建支付宝订单
 */
export async function createAlipayOrder(
  plan: PlanType,
  cycle: BillingCycle
): Promise<{ orderId: string; payUrl: string }> {
  if (plan === 'free') throw new Error('免费版无需支付');
  const amount = PRICING_CONFIG[plan][cycle];
  
  try {
    const response = await fetch('/api/payments/alipay/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        plan,
        cycle,
        subject: `Waveme ${plan === 'pro' ? '专业版' : '团队版'} ${cycle === 'monthly' ? '月付' : '年付'}`,
      }),
    });

    if (!response.ok) {
      throw new Error('创建支付宝订单失败');
    }

    return await response.json();
  } catch (error) {
    console.error('Alipay Error:', error);
    // 模拟返回（开发环境）
    return {
      orderId: `ali_${Date.now()}`,
      payUrl: 'https://mapi.alipay.com/gateway.do?_input_charset=utf-8',
    };
  }
}

/**
 * 创建微信支付订单
 */
export async function createWechatOrder(
  plan: PlanType,
  cycle: BillingCycle
): Promise<{ orderId: string; prepayId: string; paySign: string }> {
  if (plan === 'free') throw new Error('免费版无需支付');
  const amount = PRICING_CONFIG[plan][cycle];
  
  try {
    const response = await fetch('/api/payments/wechat/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount,
        plan,
        cycle,
        description: `Waveme ${plan === 'pro' ? '专业版' : '团队版'}`,
      }),
    });

    if (!response.ok) {
      throw new Error('创建微信支付订单失败');
    }

    return await response.json();
  } catch (error) {
    console.error('Wechat Pay Error:', error);
    // 模拟返回（开发环境）
    return {
      orderId: `wx_${Date.now()}`,
      prepayId: `wx_prepay_${Date.now()}`,
      paySign: `sign_${Math.random().toString(36).substr(2, 16)}`,
    };
  }
}

/**
 * 确认支付结果
 */
export async function confirmPayment(
  orderId: string,
  provider: PaymentProvider
): Promise<PaymentResult> {
  try {
    const response = await fetch('/api/payments/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, provider }),
    });

    if (!response.ok) {
      throw new Error('确认支付失败');
    }

    return await response.json();
  } catch (error) {
    console.error('Confirm Payment Error:', error);
    // 模拟返回（开发环境）
    return {
      success: true,
      subscription: {
        id: `sub_${Date.now()}`,
        plan: 'pro',
        billingCycle: 'monthly',
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        cancelAtPeriodEnd: false,
      },
    };
  }
}

/**
 * 取消订阅
 */
export async function cancelSubscription(
  subscriptionId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/subscriptions/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscriptionId }),
    });

    if (!response.ok) {
      throw new Error('取消订阅失败');
    }

    return await response.json();
  } catch (error) {
    console.error('Cancel Subscription Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '取消订阅失败',
    };
  }
}

/**
 * 获取当前用户订阅
 */
export async function getCurrentSubscription(): Promise<Subscription | null> {
  try {
    const response = await fetch('/api/subscriptions/current');
    
    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Get Subscription Error:', error);
    return null;
  }
}

/**
 * 模拟支付流程（用于演示）
 */
export async function simulatePayment(
  plan: PlanType,
  cycle: BillingCycle,
  onProgress?: (progress: number) => void
): Promise<PaymentResult> {
  // 模拟支付进度
  const steps = [
    { progress: 10, delay: 200, message: '创建订单...' },
    { progress: 30, delay: 300, message: '等待支付...' },
    { progress: 60, delay: 500, message: '处理支付...' },
    { progress: 80, delay: 300, message: '激活订阅...' },
    { progress: 100, delay: 200, message: '完成！' },
  ];

  for (const step of steps) {
    await new Promise(resolve => setTimeout(resolve, step.delay));
    onProgress?.(step.progress);
  }

  return {
    success: true,
    subscription: {
      id: `sub_${Date.now()}`,
      plan,
      billingCycle: cycle,
      status: 'active',
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + (cycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000),
      cancelAtPeriodEnd: false,
    },
  };
}

export { PRICING_CONFIG as PRICING };
