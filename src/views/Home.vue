
<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Navbar -->
    <nav class="w-full py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div class="flex items-center gap-3 group cursor-pointer" @click="$router.push('/')">
        <!-- Custom Logo (Shield + Lightning) -->
        <div class="w-10 h-10 relative">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full transform group-hover:scale-110 transition-transform duration-300">
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#2563EB" />
                        <stop offset="100%" style="stop-color:#9333EA" />
                    </linearGradient>
                </defs>
                <!-- Shield Path -->
                <path d="M50 92C50 92 88 74 88 50V22L50 8L12 22V50C12 74 50 92 50 92Z" stroke="url(#logoGradient)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
                <!-- Lightning Path -->
                <path d="M58 32L38 56H52L46 80L66 50H52L58 32Z" fill="url(#logoGradient)" />
            </svg>
        </div>
        <span class="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
          {{ $t('app_name') }}
        </span>
      </div>
      <div class="flex gap-4">
        <el-button @click="$router.push('/login')" round>登录</el-button>
        <el-button type="primary" @click="$router.push('/register')" round>注册</el-button>
      </div>
    </nav>

    <!-- Hero Section -->
    <main class="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
      <!-- Background Blobs -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div class="absolute top-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div class="relative z-10 max-w-4xl mx-auto space-y-8">
        <!-- Beautified Hero Tag -->
        <div class="inline-flex items-center gap-2 pl-1 pr-4 py-1 rounded-full bg-white border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-default mb-4 group">
          <span class="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 group-hover:rotate-12 transition-transform">
               <path fill-rule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436h.001c-1.228.954-2.81 1.637-4.506 1.792l1.642 2.463c.27.405.256.936-.035 1.327l-1.635 2.18a.75.75 0 01-1.127.075l-4.226-4.226a.75.75 0 01-.075-1.127l2.18-1.635a.998.998 0 011.327-.036l2.463 1.642a11.977 11.977 0 01-1.792-4.506zM7.5 15a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" clip-rule="evenodd" />
             </svg>
          </span>
          <span class="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            下一代网络加速服务
          </span>
        </div>

        <h1 class="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight">
          连接世界，<span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">唯快不破</span>
        </h1>
        <p class="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          永连加速器为您提供全球高速节点，解锁流媒体，加速游戏，保护您的隐私安全。稳定、快速、易用。
        </p>

        <div class="flex flex-col items-center gap-8 mt-10">
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <el-button type="primary" size="large" class="!px-12 !py-7 !text-xl !rounded-full shadow-lg shadow-blue-500/30 transition-transform hover:-translate-y-1 animate-breath" @click="$router.push('/register')">
              立即开始免费试用
            </el-button>
            <el-button size="large" class="!px-10 !py-6 !text-lg !rounded-full border-2 border-blue-100 hover:border-blue-300" @click="$router.push('/dashboard')">
              查看节点概况
            </el-button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
            <div class="p-4 rounded-2xl bg-white/70 border border-gray-100 shadow-sm flex items-center gap-3 text-left">
              <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <el-icon><TrendCharts /></el-icon>
              </div>
              <div>
                <p class="text-sm text-gray-500">平均延迟</p>
                <p class="text-lg font-bold text-gray-900">35 ms</p>
              </div>
            </div>
            <div class="p-4 rounded-2xl bg-white/70 border border-gray-100 shadow-sm flex items-center gap-3 text-left">
              <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <el-icon><DataAnalysis /></el-icon>
              </div>
              <div>
                <p class="text-sm text-gray-500">全球节点</p>
                <p class="text-lg font-bold text-gray-900">30+ 地区</p>
              </div>
            </div>
            <div class="p-4 rounded-2xl bg-white/70 border border-gray-100 shadow-sm flex items-center gap-3 text-left">
              <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <el-icon><Finished /></el-icon>
              </div>
              <div>
                <p class="text-sm text-gray-500">可用率</p>
                <p class="text-lg font-bold text-gray-900">99.99%</p>
              </div>
            </div>
          </div>

          <!-- Platform Support -->
          <div class="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm font-medium">
             <div class="flex items-center gap-1.5"><el-icon><Monitor /></el-icon> Windows</div>
             <div class="flex items-center gap-1.5"><el-icon><Platform /></el-icon> macOS</div>
             <div class="flex items-center gap-1.5"><el-icon><Iphone /></el-icon> iOS</div>
             <div class="flex items-center gap-1.5"><el-icon><Cellphone /></el-icon> Android</div>
          </div>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16 px-4">
        <div class="p-6 rounded-3xl bg-white/80 border border-gray-100 shadow-sm text-left flex items-start gap-4">
          <div class="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
            <el-icon><Refresh /></el-icon>
          </div>
          <div>
            <p class="text-sm text-gray-500">智能选路</p>
            <p class="text-lg font-semibold text-gray-900">动态选择最优线路，保证高峰期也能稳定。</p>
          </div>
        </div>
        <div class="p-6 rounded-3xl bg-white/80 border border-gray-100 shadow-sm text-left flex items-start gap-4">
          <div class="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600">
            <el-icon><Timer /></el-icon>
          </div>
          <div>
            <p class="text-sm text-gray-500">秒级响应</p>
            <p class="text-lg font-semibold text-gray-900">全平台一键连接，排障支持平均 5 分钟内响应。</p>
          </div>
        </div>
        <div class="p-6 rounded-3xl bg-white/80 border border-gray-100 shadow-sm text-left flex items-start gap-4">
          <div class="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <el-icon><Lock /></el-icon>
          </div>
          <div>
            <p class="text-sm text-gray-500">安全托底</p>
            <p class="text-lg font-semibold text-gray-900">双重加密与自动 Kill Switch，网络异常时自动保护隐私。</p>
          </div>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16 px-4 text-left">
        <!-- Feature 1: Speed -->
        <div class="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100 group">
          <div class="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                <path fill-rule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">极速连接</h3>
          <p class="text-gray-500">采用 IEPL 专线传输，智能路由算法，低延迟、无丢包，为您提供宛如置身当地的极速网络体验。</p>
        </div>

        <!-- Feature 2: Privacy -->
        <div class="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100 group">
          <div class="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                <path fill-rule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">隐私安全</h3>
          <p class="text-gray-500">银行级 AES-256 加密技术，自动隐藏真实 IP 地址，严格执行零日志策略，全方位保护隐私。</p>
        </div>

        <!-- Feature 3: Global -->
        <div class="p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-gray-100 group">
          <div class="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1011.476 0 26.994 26.994 0 00-11.476 0zM12 5.25a.75.75 0 01.75.75v.75c0 .414.336.75.75.75h.75a.75.75 0 01.75.75v3.75a3 3 0 01-3 3h-3a.75.75 0 01-.75-.75v-1.5a.75.75 0 00-.75-.75H7.5a.75.75 0 01-.75-.75V7.5a.75.75 0 01.75-.75H12z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">全球覆盖</h3>
          <p class="text-gray-500">优质节点遍布全球 30+ 国家和地区，原生 IP 解锁 Netflix、Disney+ 等流媒体内容，畅游无界。</p>
        </div>
      </div>

      <!-- Quick Start Section -->
      <div class="max-w-6xl mx-auto mt-24 px-4">
        <div class="bg-gradient-to-r from-blue-50 via-white to-purple-50 rounded-[2rem] border border-blue-100/60 p-10 md:p-14 shadow-sm">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div class="text-left space-y-4 max-w-2xl">
              <p class="text-sm font-semibold text-blue-600 inline-flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                3 步即可完成加速
              </p>
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">无需折腾，开箱即用</h2>
              <p class="text-gray-500 text-lg">
                全自动化配置向导与智能节点推荐，帮您秒连最优线路。支持客户端一键导入配置，适合新手与高阶用户。
              </p>
              <div class="flex flex-wrap gap-3">
                <span class="px-3 py-1 rounded-full bg-white border border-blue-100 text-sm text-blue-600">全平台客户端</span>
                <span class="px-3 py-1 rounded-full bg-white border border-purple-100 text-sm text-purple-600">智能选线</span>
                <span class="px-3 py-1 rounded-full bg-white border border-emerald-100 text-sm text-emerald-600">零日志</span>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
              <div class="quick-step">
                <div class="quick-step__badge">1</div>
                <h3 class="quick-step__title">注册账户</h3>
                <p class="quick-step__desc">不到 1 分钟完成邮箱注册，领取 3 天试用。</p>
              </div>
              <div class="quick-step">
                <div class="quick-step__badge">2</div>
                <h3 class="quick-step__title">下载客户端</h3>
                <p class="quick-step__desc">支持 Windows、macOS、iOS、Android，一键导入配置。</p>
              </div>
              <div class="quick-step">
                <div class="quick-step__badge">3</div>
                <h3 class="quick-step__title">一键连接</h3>
                <p class="quick-step__desc">智能推荐最优节点，流媒体与游戏全程低延迟。</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Testimonials -->
      <div class="max-w-6xl mx-auto mt-24 px-4">
        <div class="text-center mb-12">
          <p class="text-sm font-semibold text-purple-600">真实用户反馈</p>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mt-2">高分口碑，体验有保障</h2>
          <p class="text-gray-500 mt-3">专业玩家、远程办公与留学生的共同选择，帮助您保持稳定低延迟连接。</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="testimonial-card">
            <div class="testimonial-card__header">
              <div class="avatar">A</div>
              <div>
                <p class="font-semibold text-gray-900">阿成 · 电竞主播</p>
                <p class="text-xs text-gray-500">常用日本、香港节点</p>
              </div>
              <span class="rating">4.9 ★</span>
            </div>
            <p class="testimonial-card__content">高峰期打游戏延迟也很稳，掉线率几乎没有，直播推流一路畅通。</p>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-card__header">
              <div class="avatar">Z</div>
              <div>
                <p class="font-semibold text-gray-900">Zoe · 留学生</p>
                <p class="text-xs text-gray-500">Netflix / Disney+ 解锁</p>
              </div>
              <span class="rating">5.0 ★</span>
            </div>
            <p class="testimonial-card__content">原生 IP 流媒体全部解锁，速度比我之前用的快太多，看片子再也不卡了。</p>
          </div>

          <div class="testimonial-card">
            <div class="testimonial-card__header">
              <div class="avatar">L</div>
              <div>
                <p class="font-semibold text-gray-900">Leo · 远程办公</p>
                <p class="text-xs text-gray-500">跨区协作 / 会议</p>
              </div>
              <span class="rating">4.8 ★</span>
            </div>
            <p class="testimonial-card__content">Zoom 会议画质稳定，传文件速度快，客服响应也很及时。</p>
          </div>
        </div>
      </div>

      <!-- Platform Download -->
      <div class="max-w-6xl mx-auto mt-24 px-4">
        <div class="rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 text-white p-10 md:p-14 shadow-lg relative overflow-hidden">
          <div class="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,_#60a5fa,_transparent_45%),_radial-gradient(circle_at_bottom_right,_#a855f7,_transparent_35%)]"></div>
          <div class="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div class="space-y-4 text-left max-w-xl">
              <p class="inline-flex items-center gap-2 text-sm font-semibold text-blue-100">
                <span class="w-2 h-2 rounded-full bg-blue-300"></span>
                全平台随时开跑
              </p>
              <h2 class="text-3xl md:text-4xl font-bold leading-tight">一个账号，畅连所有设备</h2>
              <p class="text-blue-100 text-lg leading-relaxed">覆盖桌面、移动与路由器，支持订阅导入与分流模式。无论在家办公还是外出旅行，秒连低延迟线路。</p>
              <div class="flex flex-wrap gap-3">
                <span class="download-tag">AES-256 / TLS 1.3</span>
                <span class="download-tag">原生 IP 解锁</span>
                <span class="download-tag">自动分流</span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:max-w-xl">
              <div class="download-card">
                <div class="download-card__icon bg-blue-500/20 text-blue-200">
                  <el-icon><Monitor /></el-icon>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-blue-100/80">桌面端</p>
                  <p class="text-lg font-semibold">Windows / macOS</p>
                </div>
                <el-button type="primary" plain size="small" class="!border-white/30 !text-white !px-4" @click="$router.push('/download')">下载</el-button>
              </div>

              <div class="download-card">
                <div class="download-card__icon bg-indigo-500/20 text-indigo-200">
                  <el-icon><Iphone /></el-icon>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-blue-100/80">移动端</p>
                  <p class="text-lg font-semibold">iOS / Android</p>
                </div>
                <el-button type="primary" plain size="small" class="!border-white/30 !text-white !px-4" @click="$router.push('/download')">下载</el-button>
              </div>

              <div class="download-card">
                <div class="download-card__icon bg-emerald-500/20 text-emerald-200">
                  <el-icon><Platform /></el-icon>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-blue-100/80">路由器</p>
                  <p class="text-lg font-semibold">OpenWrt / Merlín</p>
                </div>
                <el-button type="primary" plain size="small" class="!border-white/30 !text-white !px-4" @click="$router.push('/docs/router')">配置</el-button>
              </div>

              <div class="download-card">
                <div class="download-card__icon bg-amber-500/20 text-amber-200">
                  <el-icon><Refresh /></el-icon>
                </div>
                <div class="flex-1">
                  <p class="text-sm text-blue-100/80">一键导入</p>
                  <p class="text-lg font-semibold">订阅 / Clash / Surge</p>
                </div>
                <el-button type="primary" plain size="small" class="!border-white/30 !text-white !px-4" @click="$router.push('/docs/import')">查看</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="max-w-5xl mx-auto mt-24 px-4">
          <div class="text-center mb-10">
            <p class="text-sm font-semibold text-blue-600">常见问题</p>
            <h2 class="text-3xl font-bold text-gray-900 mt-2">开始之前，你可能想了解</h2>
            <p class="text-gray-500 mt-3">最关心的延迟、隐私、售后等问题，这里都有答案。</p>
          </div>
        <div class="space-y-4">
          <div class="faq-item">
            <div class="faq-item__question">试用期有流量或速度限制吗？</div>
            <p class="faq-item__answer">新注册用户可获得 3 天全速试用，无限流量，体验与正式套餐一致。期间随时可以在控制台查看节点实时延迟。</p>
          </div>
          <div class="faq-item">
            <div class="faq-item__question">如何保障隐私安全？</div>
            <p class="faq-item__answer">我们执行零日志政策，并支持 AES-256 与 TLS 1.3 双重加密，所有客户端均开启 Kill Switch 防止意外断线泄露真实 IP。</p>
          </div>
          <div class="faq-item">
            <div class="faq-item__question">售后支持的响应时间是多久？</div>
            <p class="faq-item__answer">7x24 在线工单与 Telegram 群组，平均 5 分钟内响应，复杂问题可由工程师远程协助排查，保障跨平台一致体验。</p>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Charity & Student Section -->
    <section class="py-20 bg-white border-t border-gray-50">
      <div class="max-w-6xl mx-auto px-4">
        <div class="rounded-[2.5rem] bg-gradient-to-br from-rose-50 via-white to-orange-50 p-8 md:p-16 relative overflow-hidden shadow-sm border border-rose-100">
          <!-- Decor -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div class="absolute bottom-0 left-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

          <div class="relative z-10">
            <div class="text-center mb-16">
               <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">传递温暖，改变命运</h2>
               <p class="text-gray-500 text-lg">我们不仅仅是一个工具，更希望成为一份力量</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <!-- Student Free -->
                <div class="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-sm border border-rose-100 h-full transform transition hover:-translate-y-1 duration-300 group">
                    <div class="w-16 h-16 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-500 text-3xl mb-6 group-hover:scale-110 transition-transform">
                         <!-- Graduation Cap SVG -->
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-9 h-9">
                            <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 002.1 9.762.75.75 0 011.17 8.72 60.65 60.65 0 0111.7 2.805z" />
                            <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a.75.75 0 01-.46.71 47.878 47.878 0 00-8.105 4.342.75.75 0 01-.832 0 47.877 47.877 0 00-8.104-4.342.75.75 0 01-.461-.71c.035-1.442.121-2.87.255-4.286A48.4 48.4 0 0110.94 15.473c.195.1.4.19.61.265z" />
                         </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">学生免费</h3>
                    <p class="text-gray-600 text-lg leading-relaxed">
                        我们深知求学不易，请放心薅羊毛。<br>
                        如果您是学生且经济困难，请联系客服获取免费使用权限。
                    </p>
                </div>

                <!-- Charity -->
                <div class="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-sm border border-orange-100 h-full transform transition hover:-translate-y-1 duration-300 group">
                     <div class="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500 text-3xl mb-6 group-hover:scale-110 transition-transform">
                        <!-- Charity Heart SVG -->
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-9 h-9">
                           <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">公益助学</h3>
                    <div class="space-y-4 text-gray-600">
                        <p class="text-lg font-medium text-orange-600">
                            20% 收入将用于资助贫困学生
                        </p>
                        <p class="leading-relaxed text-sm text-gray-500">
                            我们只资助因贫困无法继续学业的学生，实行一对一资助，确保资金用于被资助学生。
                        </p>
                        <p class="leading-relaxed text-sm text-gray-500 pt-2 border-t border-gray-100">
                            教育应该是人最基本的权利，是人改变命运的唯一途径，然而还有很多人没有受教育的机会。我们想力所能及的帮助一些人，每资助一个学生，让他能继续学业，他就有机会改变自己的命运。
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-10 bg-gray-50 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-6 text-center text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} 永连加速器 (Yonglian Accelerator). All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Monitor, Platform, Iphone, Cellphone, TrendCharts, DataAnalysis, Finished, Refresh, Timer, Lock } from '@element-plus/icons-vue';
</script>

<style scoped>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes breath {
  0% { transform: scale(1); box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.1); }
  50% { transform: scale(1.03); box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.4), 0 10px 10px -5px rgba(59, 130, 246, 0.2); }
  100% { transform: scale(1); box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3), 0 4px 6px -2px rgba(59, 130, 246, 0.1); }
}
.animate-breath {
  animation: breath 2s infinite ease-in-out;
}

.quick-step {
  @apply bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full text-left;
}

.quick-step__badge {
  @apply w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold mb-4;
}

.quick-step__title {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.quick-step__desc {
  @apply text-sm text-gray-500 leading-relaxed;
}

.testimonial-card {
  @apply bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-full text-left flex flex-col gap-4 transition duration-300 hover:-translate-y-1 hover:shadow-lg;
}

.testimonial-card__header {
  @apply flex items-center gap-4;
}

.testimonial-card__content {
  @apply text-gray-600 leading-relaxed text-sm;
}

.avatar {
  @apply w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold;
}

.rating {
  @apply ml-auto px-3 py-1 rounded-full bg-yellow-50 text-yellow-600 text-xs font-semibold border border-yellow-100;
}

.download-tag {
  @apply px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-blue-100 backdrop-blur;
}

.download-card {
  @apply bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3 shadow-sm backdrop-blur hover:border-white/30 transition;
}

.download-card__icon {
  @apply w-12 h-12 rounded-xl flex items-center justify-center text-xl;
}

.faq-item {
  @apply bg-white border border-gray-100 rounded-2xl p-6 shadow-sm;
}

.faq-item__question {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.faq-item__answer {
  @apply text-sm text-gray-600 leading-relaxed;
}
</style>
