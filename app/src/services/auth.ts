/**
 * Waveme 认证服务
 * 支持邮箱注册登录和 Google OAuth
 */

import { createClient, SupabaseClient, type User, AuthError } from '@supabase/supabase-js';

// Supabase 配置
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// 初始化 Supabase 客户端
let supabase: SupabaseClient | null = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface AuthResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
}

/**
 * 检查是否配置了 Supabase
 */
export function isAuthConfigured(): boolean {
  return !!supabase;
}

/**
 * 获取当前登录用户
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!supabase) return null;

  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error || !user) return null;

    return convertToAuthUser(user);
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

/**
 * 监听认证状态变化
 */
export function onAuthStateChange(
  callback: (user: AuthUser | null) => void
): () => void {
  if (!supabase) {
    console.warn('Supabase 未配置');
    return () => {};
  }

  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (session?.user) {
        callback(convertToAuthUser(session.user));
      } else {
        callback(null);
      }
    }
  );

  return () => subscription.unsubscribe();
}

/**
 * 邮箱注册
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  name: string
): Promise<AuthResult> {
  if (!supabase) {
    return { success: false, error: '认证服务未配置' };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    if (!data.user) {
      return { success: false, error: '注册失败' };
    }

    return {
      success: true,
      user: convertToAuthUser(data.user),
    };
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, error: '注册失败，请重试' };
  }
}

/**
 * 邮箱登录
 */
export async function signInWithEmail(
  email: string,
  password: string
): Promise<AuthResult> {
  if (!supabase) {
    return { success: false, error: '认证服务未配置' };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    if (!data.user) {
      return { success: false, error: '登录失败' };
    }

    return {
      success: true,
      user: convertToAuthUser(data.user),
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: '登录失败，请重试' };
  }
}

/**
 * Google OAuth 登录
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  if (!supabase) {
    return { success: false, error: '认证服务未配置' };
  }

  try {
    // 获取当前页面路径，用于回调后返回
    const currentPath = window.location.pathname + window.location.search;
    
    // 构建回调URL - 使用当前页面作为回调目标
    // Supabase 需要配置以下回调URL:
    // - http://localhost:5173/ (开发环境)
    // - https://your-domain.com/ (生产环境)
    const redirectUrl = window.location.origin;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    // OAuth 会跳转到 Google，这里返回成功表示跳转已触发
    return { success: true };
  } catch (error) {
    console.error('Google sign in error:', error);
    return { success: false, error: 'Google 登录失败，请重试' };
  }
}

/**
 * GitHub OAuth 登录
 */
export async function signInWithGitHub(): Promise<AuthResult> {
  if (!supabase) {
    return { success: false, error: '认证服务未配置' };
  }

  try {
    // 使用当前页面作为回调目标
    const redirectUrl = window.location.origin;
    
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    return { success: true };
  } catch (error) {
    console.error('GitHub sign in error:', error);
    return { success: false, error: 'GitHub 登录失败，请重试' };
  }
}

/**
 * 登出
 */
export async function signOut(): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: '认证服务未配置' };
  }

  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { success: false, error: '登出失败' };
  }
}

/**
 * 重置密码
 */
export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    return { success: false, error: '认证服务未配置' };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    return { success: true };
  } catch (error) {
    console.error('Reset password error:', error);
    return { success: false, error: '重置密码失败' };
  }
}

/**
 * 更新用户资料
 */
export async function updateProfile(
  updates: { name?: string; avatar?: string }
): Promise<AuthResult> {
  if (!supabase) {
    return { success: false, error: '认证服务未配置' };
  }

  try {
    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: updates.name,
        avatar_url: updates.avatar,
      },
    });

    if (error) {
      return { success: false, error: getErrorMessage(error) };
    }

    if (!data.user) {
      return { success: false, error: '更新失败' };
    }

    return {
      success: true,
      user: convertToAuthUser(data.user),
    };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error: '更新失败' };
  }
}

/**
 * 将 Supabase User 转换为 AuthUser
 */
function convertToAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email || '',
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || '用户',
    avatar: user.user_metadata?.avatar_url || user.user_metadata?.picture,
    plan: user.user_metadata?.plan || 'free',
    createdAt: user.created_at || new Date().toISOString(),
  };
}

/**
 * 获取友好的错误信息
 */
function getErrorMessage(error: AuthError): string {
  switch (error.message) {
    case 'Invalid login credentials':
      return '邮箱或密码错误';
    case 'User already registered':
      return '该邮箱已注册';
    case 'Password should be at least 6 characters':
      return '密码至少需要6位';
    case 'Unable to validate email address: invalid format':
      return '邮箱格式不正确';
    case 'Email not confirmed':
      return '请先到邮箱确认注册';
    default:
      return error.message || '操作失败，请重试';
  }
}

/**
 * 模拟登录（用于演示）
 */
export async function mockSignIn(email: string): Promise<AuthResult> {
  // 模拟延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    success: true,
    user: {
      id: 'mock-user-id',
      email,
      name: email.split('@')[0],
      plan: 'free',
      createdAt: new Date().toISOString(),
    },
  };
}

export { supabase };
