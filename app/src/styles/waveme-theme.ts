/**
 * Waveme 水墨风格主题
 * 灵感来源：中国传统国画水墨风格
 * 核心理念：上善若水，不争不抢，潜心打磨，水到渠成
 */

export const wavemeColors = {
  // 主色调 - 水墨色系
  ink: {
    50: '#faf9f7',   // 宣纸白
    100: '#f5f3f0',  // 淡墨底
    200: '#e8e4df',  // 浅灰
    300: '#d4cfc7',  // 中灰
    400: '#a39e96',  // 深灰
    500: '#6b665e',  // 墨色
    600: '#4a453f',  // 浓墨
    700: '#2d2a26',  // 焦墨
    800: '#1a1815',  // 近黑
    900: '#0d0c0b',  // 纯黑
  },
  
  // 点缀色 - 国画传统色
  accent: {
    // 朱砂 - 用于重要按钮、强调
    cinnabar: '#c45c48',
    cinnabarLight: '#d97b6a',
    cinnabarDark: '#a34432',
    
    // 石青 - 用于次级强调
    azurite: '#4a7c8c',
    azuriteLight: '#6a9cac',
    azuriteDark: '#3a5c6c',
    
    // 藤黄 - 用于点缀、高亮
    gamboge: '#d4a574',
    gambogeLight: '#e4c594',
    
    // 花青 - 用于链接、交互
    indigo: '#5c7a6c',
    indigoLight: '#7c9a8c',
    
    // 赭石 - 用于温暖元素
    ochre: '#b8916c',
  },
  
  // 自然色 - 山水元素
  nature: {
    // 竹青
    bamboo: '#7a9a7c',
    bambooLight: '#9aba9c',
    
    // 松烟
    pine: '#5c6b5c',
    
    // 云母
    mica: '#f0ede8',
    
    // 水色
    water: '#8c9ca4',
    waterLight: '#acbcc4',
    
    // 山岚
    mist: '#c4d0d4',
  },
  
  // 状态色
  state: {
    success: '#6b8c5c',  // 竹青绿
    warning: '#d4a574',  // 藤黄
    error: '#c45c48',    // 朱砂
    info: '#4a7c8c',     // 石青
  },
};

// 渐变定义
export const wavemeGradients = {
  // 水墨晕染
  inkWash: 'linear-gradient(180deg, #faf9f7 0%, #f5f3f0 50%, #e8e4df 100%)',
  
  // 山水意境
  landscape: 'linear-gradient(135deg, #f5f3f0 0%, #e8e4df 30%, #d4cfc7 60%, #c4d0d4 100%)',
  
  // 晨曦
  dawn: 'linear-gradient(180deg, #f0ede8 0%, #e8e4df 50%, #d4cfc7 100%)',
  
  // 暮色
  dusk: 'linear-gradient(180deg, #d4cfc7 0%, #a39e96 50%, #6b665e 100%)',
  
  // 朱砂按钮
  cinnabar: 'linear-gradient(135deg, #d97b6a 0%, #c45c48 100%)',
  
  // 石青按钮
  azurite: 'linear-gradient(135deg, #6a9cac 0%, #4a7c8c 100%)',
};

// 阴影定义 - 柔和自然
export const wavemeShadows = {
  sm: '0 1px 2px 0 rgba(45, 42, 38, 0.05)',
  md: '0 4px 6px -1px rgba(45, 42, 38, 0.08), 0 2px 4px -2px rgba(45, 42, 38, 0.04)',
  lg: '0 10px 15px -3px rgba(45, 42, 38, 0.08), 0 4px 6px -4px rgba(45, 42, 38, 0.04)',
  xl: '0 20px 25px -5px rgba(45, 42, 38, 0.08), 0 8px 10px -6px rgba(45, 42, 38, 0.04)',
  inner: 'inset 0 2px 4px 0 rgba(45, 42, 38, 0.04)',
  // 水墨晕染效果
  ink: '0 8px 32px -8px rgba(107, 102, 94, 0.15)',
};

// 字体定义
export const wavemeFonts = {
  // 标题字体 - 书法感
  heading: '"Noto Serif SC", "Source Han Serif SC", "SimSun", serif',
  // 正文字体 - 清晰易读
  body: '"Noto Sans SC", "Source Han Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
  // 装饰字体
  decorative: '"ZCOOL XiaoWei", "Ma Shan Zheng", cursive',
};

// 间距系统
export const wavemeSpacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
};

// 圆角系统 - 自然柔和
export const wavemeRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
  full: '9999px',
};

// 动画定义
export const wavemeAnimations = {
  // 水墨晕染
  inkSpread: `
    @keyframes inkSpread {
      0% { transform: scale(0); opacity: 0; }
      50% { opacity: 0.6; }
      100% { transform: scale(1.5); opacity: 0; }
    }
  `,
  
  // 水波涟漪
  ripple: `
    @keyframes ripple {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(4); opacity: 0; }
    }
  `,
  
  // 云雾飘动
  mist: `
    @keyframes mist {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(20px); }
    }
  `,
  
  // 墨迹滴落
  inkDrop: `
    @keyframes inkDrop {
      0% { transform: translateY(-100%); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateY(0); opacity: 0.8; }
    }
  `,
  
  // 呼吸效果
  breathe: `
    @keyframes breathe {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }
  `,
};

// 导出完整的 Tailwind 配置扩展
export const wavemeTailwindConfig = {
  theme: {
    extend: {
      colors: wavemeColors,
      fontFamily: {
        heading: wavemeFonts.heading,
        body: wavemeFonts.body,
        decorative: wavemeFonts.decorative,
      },
      boxShadow: wavemeShadows,
      borderRadius: wavemeRadius,
      spacing: wavemeSpacing,
      backgroundImage: {
        'ink-wash': wavemeGradients.inkWash,
        'landscape': wavemeGradients.landscape,
        'dawn': wavemeGradients.dawn,
        'dusk': wavemeGradients.dusk,
      },
      animation: {
        'ink-spread': 'inkSpread 2s ease-out',
        'ripple': 'ripple 1.5s ease-out',
        'mist': 'mist 8s ease-in-out infinite',
        'ink-drop': 'inkDrop 1s ease-out',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
    },
  },
};
