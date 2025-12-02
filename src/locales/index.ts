

export default {
  'zh-CN': {
    app_name: '永连加速器',
    login: {
      title: '欢迎回来',
      subtitle: '请登录您的账号',
      email: '邮箱地址',
      password: '密码',
      remember: '记住我',
      forgot: '忘记密码？',
      submit: '登 录',
      no_account: '还没有账号？',
      register: '立即注册',
      success: '登录成功',
      validation: {
        email_required: '请输入邮箱地址',
        email_format: '邮箱格式不正确',
        password_required: '请输入密码',
        password_length: '密码长度不能少于6位'
      }
    },
    register: {
      title: '创建账号',
      subtitle: '立即加入 永连加速器',
      code: '邮箱验证码',
      send_code: '发送验证码',
      confirm_password: '确认密码',
      invite_code: '邀请码 (选填)',
      submit: '注 册',
      has_account: '已有账号？',
      login: '立即登录',
      success: '注册成功',
      code_sent: '验证码已发送',
      validation: {
        password_mismatch: '两次输入密码不一致'
      }
    },
    forgot_password: {
      title: '重置密码',
      subtitle: '通过邮箱验证码重置您的密码',
      new_password: '新密码',
      submit: '重置密码',
      success: '密码重置成功，请登录',
      back_login: '返回登录'
    },
    menu: {
      dashboard: '仪表盘',
      group_subscribe: '订阅',
      group_user: '用户',
      nodes: '节点列表',
      subscribe: '购买',
      knowledge: '使用教程',
      orders: '我的订单',
      traffic: '流量明细',
      tickets: '问题工单',
      invite: '邀请返利',
      profile: '个人中心',
      logout: '退出登录',
      user_role: '用户'
    },
    dashboard: {
      notice: '最新公告：亚洲地区节点优化已完成，请及时更新订阅。',
      plan: '当前套餐',
      balance: '账户余额',
      traffic: '流量使用情况',
      recharge: '充值',
      expiry: '到期时间',
      reset_days: '距离重置还有 {days} 天',
      quick_sub: '一键订阅',
      copy_link: '复制订阅',
      copy_success: '订阅地址复制成功',
      import_clash: '导入 Clash',
      import_shadowrocket: '导入 Shadowrocket',
      qrcode: '二维码',
      traffic_history: '流量历史',
      chart_placeholder: '图表组件区域'
    },
    nodes: {
      filters: {
        all: '全部',
        premium: '高级中继',
        standard: '标准节点',
        gaming: '游戏专用',
        streaming: '流媒体'
      },
      rate: '倍率',
      status: {
        online: '在线',
        offline: '离线'
      },
      load: '负载',
      copy_success: '已复制 {name} 的配置链接'
    },
    subscribe: {
      title: '选择您的套餐',
      subtitle: '解锁高速、安全、稳定的网络体验',
      charity_banner: '20%收入用于资助贫困学生；你的购买，将帮助一名学生重返校园',
      cycles: {
        monthly: '月付',
        quarterly: '季付',
        yearly: '年付',
        biennial: '两年付'
      },
      discount_50: '5折',
      discount_33: '3.3折',
      plans: {
        standard: '基础套餐',
        premium: '高速套餐',
        business: '极速套餐',
        ultimate: '独享专线'
      },
      features: {
        traffic: '{amount} 流量',
        speed: '限速 {limit}',
        devices: '限制 {count} 台设备',
        unlimited_devices: '不限制设备数',
        nodes_standard: '基础节点访问',
        nodes_global: '全球高速节点',
        iepl: 'IEPL 专线加速',
        ip: '独享独立 IP',
        support: '24/7 专属客服',
        priority: '最高优先级接入'
      },
      per_cycle: '/{cycle}',
      unit: {
        month: '月',
        quarter: '季',
        year: '年',
        two_years: '两年'
      },
      select: '立即订阅',
      popular: '最受欢迎',
      checkout: {
        title: '订单结算',
        selected: '已选择',
        total: '总计',
        pay: '立即支付',
        refund_policy: '支持7天无理由退款，请放心购买'
      }
    },
    knowledge: {
      title: '使用教程',
      search: '搜索教程...',
      windows: 'Windows 使用教程',
      ios: 'iOS 使用教程',
      faq: '常见问题',
      windows_content: [
        '1. 在节点页面下载 v2rayN 客户端。',
        '2. 复制您的订阅链接。',
        '3. 打开客户端，添加订阅地址并更新订阅。'
      ],
      ios_content: [
        '1. 使用非国区 Apple ID 登录 App Store 下载 Shadowrocket。',
        '2. 在仪表盘点击"一键订阅"或扫描二维码导入。'
      ],
      faq_content: [
        'Q: 为什么速度很慢？',
        'A: 请尝试切换到负载较低的节点，或检查本地网络环境。'
      ]
    },
    orders: {
      title: '订单记录',
      id: '订单号',
      date: '日期',
      plan: '商品名称',
      amount: '金额',
      status: '状态',
      paid: '已支付',
      unpaid: '待支付',
      discounted: '已折抵',
      cancel: '取消',
      pay_now: '立即支付',
      balance_payment: '余额支付',
      deduction: '抵扣',
      refund: '退款'
    },
    traffic: {
      title: '流量明细',
      date: '日期',
      upload: '上传',
      download: '下载',
      total: '总计',
      unit: '单位: GB'
    },
    tickets: {
      title: '问题工单',
      create: '新建工单',
      subject: '主题',
      status: '状态',
      last_update: '最后更新',
      actions: '操作',
      view: '查看',
      status_open: '处理中',
      status_closed: '已关闭',
      status_replied: '已回复',
      placeholder_subject: '请输入工单主题',
      placeholder_content: '请详细描述您遇到的问题...',
      submit: '提交工单',
      reply: '回复',
      reply_placeholder: '请输入回复内容...',
      send: '发送'
    },
    invite: {
      title: '邀请返利',
      total_commission: '累计获得佣金',
      available_commission: '可提现佣金',
      invite_count: '累计邀请人数',
      withdraw: '申请提现',
      copy_link: '复制邀请链接',
      link_placeholder: '您的专属邀请链接',
      records: '返利记录',
      user: '注册用户',
      reward: '获得奖励',
      time: '注册时间'
    },
    profile: {
        title: '个人中心',
        security: '安全设置',
        change_password: '修改密码',
        current_password: '当前密码',
        new_password: '新密码',
        confirm_password: '确认新密码',
        save: '保存修改',
        subscription: '订阅设置',
        reset_config: '重置订阅信息',
        reset_warning: '警告：重置后，您所有的订阅链接、UUID 将会变更，您需要重新配置所有客户端。',
        reset_btn: '重置订阅信息',
        reset_success: '重置成功，请重新配置客户端',
        password_success: '密码修改成功'
    }
  },
  'en-US': {
    app_name: 'Yonglian Accelerator',
    login: {
      title: 'Welcome Back',
      subtitle: 'Please login to your account',
      email: 'Email Address',
      password: 'Password',
      remember: 'Remember me',
      forgot: 'Forgot Password?',
      submit: 'Login',
      no_account: "Don't have an account?",
      register: 'Register',
      success: 'Login Successful',
      validation: {
        email_required: 'Email is required',
        email_format: 'Invalid email format',
        password_required: 'Password is required',
        password_length: 'Password must be at least 6 characters'
      }
    },
    register: {
      title: 'Create Account',
      subtitle: 'Join Yonglian today',
      code: 'Verification Code',
      send_code: 'Send Code',
      confirm_password: 'Confirm Password',
      invite_code: 'Invite Code (Optional)',
      submit: 'Register',
      has_account: 'Already have an account?',
      login: 'Login Now',
      success: 'Registration Successful',
      code_sent: 'Code Sent',
      validation: {
        password_mismatch: 'Passwords do not match'
      }
    },
    forgot_password: {
      title: 'Reset Password',
      subtitle: 'Reset your password via email code',
      new_password: 'New Password',
      submit: 'Reset Password',
      success: 'Password reset successful, please login',
      back_login: 'Back to Login'
    },
    menu: {
      dashboard: 'Dashboard',
      group_subscribe: 'Subscription',
      group_user: 'User',
      nodes: 'Nodes',
      subscribe: 'Purchase',
      knowledge: 'Knowledge',
      orders: 'Orders',
      traffic: 'Traffic Details',
      tickets: 'Support Tickets',
      invite: 'Referral',
      profile: 'Profile',
      logout: 'Logout',
      user_role: 'User'
    },
    dashboard: {
      notice: 'Latest: Asia nodes optimization completed. Please update subscription.',
      plan: 'Current Plan',
      balance: 'Balance',
      traffic: 'Traffic Usage',
      recharge: 'Top Up',
      expiry: 'Expires At',
      reset_days: '{days} days until reset',
      quick_sub: 'Quick Subscribe',
      copy_link: 'Copy Subscription',
      copy_success: 'Subscription address copied successfully',
      import_clash: 'Import Clash',
      import_shadowrocket: 'Import Shadowrocket',
      qrcode: 'QR Code',
      traffic_history: 'Traffic History',
      chart_placeholder: 'Chart Area'
    },
    nodes: {
      filters: {
        all: 'All',
        premium: 'Premium',
        standard: 'Standard',
        gaming: 'Gaming',
        streaming: 'Streaming'
      },
      rate: 'Rate',
      status: {
        online: 'Online',
        offline: 'Offline'
      },
      load: 'Load',
      copy_success: 'Copied config for {name}'
    },
    subscribe: {
      title: 'Choose Your Plan',
      subtitle: 'Unlock high-speed, secure, and stable network access',
      charity_banner: '20% of revenue supports underprivileged students. Your purchase helps a student return to school.',
      cycles: {
        monthly: 'Monthly',
        quarterly: 'Quarterly',
        yearly: 'Yearly',
        biennial: 'Biennial'
      },
      discount_50: '50% OFF',
      discount_33: '67% OFF',
      plans: {
        standard: 'Basic Plan',
        premium: 'High-Speed Plan',
        business: 'Extreme Speed Plan',
        ultimate: 'Exclusive Line'
      },
      features: {
        traffic: '{amount} Traffic',
        speed: 'Speed Limit {limit}',
        devices: 'Limit {count} Devices',
        unlimited_devices: 'Unlimited Devices',
        nodes_standard: 'Basic Nodes',
        nodes_global: 'Global High-Speed Nodes',
        iepl: 'IEPL Dedicated Line',
        ip: 'Dedicated IP',
        support: '24/7 Support',
        priority: 'Highest Priority'
      },
      per_cycle: '/{cycle}',
      unit: {
        month: 'mo',
        quarter: 'qtr',
        year: 'yr',
        two_years: '2yr'
      },
      select: 'Subscribe Now',
      popular: 'Most Popular',
      checkout: {
        title: 'Checkout',
        selected: 'Selected',
        total: 'Total',
        pay: 'Pay Now',
        refund_policy: '7-day no-reason refund supported.'
      }
    },
    knowledge: {
      title: 'Knowledge Base',
      search: 'Search...',
      windows: 'Windows Tutorial',
      ios: 'iOS Tutorial',
      faq: 'FAQ',
      windows_content: [
        '1. Download v2rayN client from nodes page.',
        '2. Copy your subscription link.',
        '3. Open client, add subscription URL and update.'
      ],
      ios_content: [
        '1. Download Shadowrocket from App Store (non-CN ID required).',
        '2. Click "Quick Subscribe" or scan QR code on dashboard.'
      ],
      faq_content: [
        'Q: Why is the speed slow?',
        'A: Try switching to a node with lower load or check your local network.'
      ]
    },
    orders: {
      title: 'Order History',
      id: 'Order ID',
      date: 'Date',
      plan: 'Item',
      amount: 'Amount',
      status: 'Status',
      paid: 'Paid',
      unpaid: 'Unpaid',
      discounted: 'Discounted',
      cancel: 'Cancel',
      pay_now: 'Pay Now',
      balance_payment: 'Balance Payment',
      deduction: 'Offset Amount',
      refund: 'Refund Amount'
    },
    traffic: {
      title: 'Traffic Details',
      date: 'Date',
      upload: 'Upload',
      download: 'Download',
      total: 'Total',
      unit: 'Unit: GB'
    },
    tickets: {
      title: 'Support Tickets',
      create: 'New Ticket',
      subject: 'Subject',
      status: 'Status',
      last_update: 'Last Update',
      actions: 'Actions',
      view: 'View',
      status_open: 'Open',
      status_closed: 'Closed',
      status_replied: 'Replied',
      placeholder_subject: 'Ticket Subject',
      placeholder_content: 'Describe your issue...',
      submit: 'Submit',
      reply: 'Reply',
      reply_placeholder: 'Type your reply...',
      send: 'Send'
    },
    invite: {
      title: 'Referral Program',
      total_commission: 'Total Earned',
      available_commission: 'Available',
      invite_count: 'Invited Users',
      withdraw: 'Withdraw',
      copy_link: 'Copy Link',
      link_placeholder: 'Your referral link',
      records: 'Rebate Records',
      user: 'User',
      reward: 'Reward',
      time: 'Date'
    },
    profile: {
        title: 'Profile',
        security: 'Security Settings',
        change_password: 'Change Password',
        current_password: 'Current Password',
        new_password: 'New Password',
        confirm_password: 'Confirm Password',
        save: 'Save Changes',
        subscription: 'Subscription Settings',
        reset_config: 'Reset Subscription Config',
        reset_warning: 'Warning: Resetting will change your UUID and subscription links. You will need to reconfigure all your clients.',
        reset_btn: 'Reset Config',
        reset_success: 'Reset successful. Please reconfigure clients.',
        password_success: 'Password changed successfully'
    }
  },
  'ja-JP': {
    app_name: '永連アクセラレータ',
    login: {
      title: 'お帰りなさい',
      subtitle: 'アカウントにログインしてください',
      email: 'メールアドレス',
      password: 'パスワード',
      remember: 'ログイン状態を保持',
      forgot: 'パスワードをお忘れですか？',
      submit: 'ログイン',
      no_account: 'アカウントをお持ちでないですか？',
      register: '登録する',
      success: 'ログイン成功',
      validation: {
        email_required: 'メールアドレスを入力してください',
        email_format: '無効なメール形式です',
        password_required: 'パスワードを入力してください',
        password_length: 'パスワードは6文字以上でなければなりません'
      }
    },
    register: {
      title: 'アカウント作成',
      subtitle: '永連に参加しましょう',
      code: '認証コード',
      send_code: 'コード送信',
      confirm_password: 'パスワード確認',
      invite_code: '招待コード（任意）',
      submit: '登録',
      has_account: 'すでにアカウントをお持ちですか？',
      login: '今すぐログイン',
      success: '登録成功',
      code_sent: 'コードを送信しました',
      validation: {
        password_mismatch: 'パスワードが一致しません'
      }
    },
    forgot_password: {
      title: 'パスワードのリセット',
      subtitle: 'メール認証コードでパスワードをリセット',
      new_password: '新しいパスワード',
      submit: 'リセット',
      success: 'パスワードがリセットされました。ログインしてください',
      back_login: 'ログインに戻る'
    },
    menu: {
      dashboard: 'ダッシュボード',
      group_subscribe: 'サブスクリプション',
      group_user: 'ユーザー',
      nodes: 'ノードリスト',
      subscribe: '購入',
      knowledge: '利用ガイド',
      orders: '注文履歴',
      traffic: '通信明細',
      tickets: 'サポート',
      invite: '招待・報酬',
      profile: 'プロフィール',
      logout: 'ログアウト',
      user_role: 'ユーザー'
    },
    dashboard: {
      notice: '最新：アジア地域のノード最適化が完了しました。サブスクリプションを更新してください。',
      plan: '現在のプラン',
      balance: '残高',
      traffic: 'データ使用量',
      recharge: 'チャージ',
      expiry: '有効期限',
      reset_days: 'リセットまであと {days} 日',
      quick_sub: 'ワンクリック購読',
      copy_link: 'サブスクリプションをコピー',
      copy_success: 'サブスクリプションアドレスをコピーしました',
      import_clash: 'Clashにインポート',
      import_shadowrocket: 'Shadowrocketにインポート',
      qrcode: 'QRコード',
      traffic_history: '通信履歴',
      chart_placeholder: 'チャートエリア'
    },
    nodes: {
      filters: {
        all: 'すべて',
        premium: 'プレミアム',
        standard: '標準',
        gaming: 'ゲーム用',
        streaming: 'ストリーミング'
      },
      rate: '倍率',
      status: {
        online: 'オンライン',
        offline: 'オフライン'
      },
      load: '負荷',
      copy_success: '{name} の設定をコピーしました'
    },
    subscribe: {
      title: 'プランを選択',
      subtitle: '高速で安全、安定したネットワーク体験を',
      charity_banner: '収益の20％は貧困家庭の学生支援に使われます。あなたの購入が、一人の学生の復学を助けます。',
      cycles: {
        monthly: '月払い',
        quarterly: '四半期払い',
        yearly: '年払い',
        biennial: '2年払い'
      },
      discount_50: '50% OFF',
      discount_33: '67% OFF',
      plans: {
        standard: 'ベーシック',
        premium: '高速プラン',
        business: '極速プラン',
        ultimate: '専用回線'
      },
      features: {
        traffic: '{amount} データ通信量',
        speed: '速度制限 {limit}',
        devices: 'デバイス制限 {count} 台',
        unlimited_devices: 'デバイス数無制限',
        nodes_standard: '標準ノードアクセス',
        nodes_global: 'グローバル高速ノード',
        iepl: 'IEPL専用線',
        ip: '専用IP',
        support: '24/7 サポート',
        priority: '最高優先度'
      },
      per_cycle: '/{cycle}',
      unit: {
        month: '月',
        quarter: '期',
        year: '年',
        two_years: '2年'
      },
      select: '今すぐ購読',
      popular: '一番人気',
      checkout: {
        title: '決済',
        selected: '選択済み',
        total: '合計',
        pay: '今すぐ支払う',
        refund_policy: '7日間無理由返金対応、安心してお買い求めください'
      }
    },
    knowledge: {
      title: 'ナレッジベース',
      search: '検索...',
      windows: 'Windows チュートリアル',
      ios: 'iOS チュートリアル',
      faq: 'よくある質問',
      windows_content: [
        '1. ノードページからv2rayNクライアントをダウンロードします。',
        '2. 購読リンクをコピーします。',
        '3. クライアントを開き、購読URLを追加して更新します。'
      ],
      ios_content: [
        '1. 海外のApple IDを使用してApp StoreからShadowrocketをダウンロードします。',
        '2. ダッシュボードの「ワンクリック購読」をクリックするか、QRコードをスキャンします。'
      ],
      faq_content: [
        'Q: なぜ速度が遅いのですか？',
        'A: 負荷の低いノードに切り替えるか、ローカルネットワークを確認してください。'
      ]
    },
    orders: {
      title: '注文履歴',
      id: '注文番号',
      date: '日付',
      plan: '商品名',
      amount: '金額',
      status: 'ステータス',
      paid: '支払い済み',
      unpaid: '未払い',
      discounted: '割引適用',
      cancel: 'キャンセル',
      pay_now: '今すぐ支払い',
      balance_payment: '残高払い',
      deduction: '控除',
      refund: '返金'
    },
    traffic: {
      title: '通信明細',
      date: '日付',
      upload: 'アップロード',
      download: 'ダウンロード',
      total: '合計',
      unit: '単位: GB'
    },
    tickets: {
      title: 'サポート',
      create: '新規チケット',
      subject: '件名',
      status: 'ステータス',
      last_update: '最終更新',
      actions: '操作',
      view: '表示',
      status_open: '処理中',
      status_closed: '完了',
      status_replied: '返信あり',
      placeholder_subject: '件名を入力',
      placeholder_content: '問題を詳しく説明してください...',
      submit: '送信',
      reply: '返信',
      reply_placeholder: '返信内容を入力...',
      send: '送信'
    },
    invite: {
      title: '招待・報酬',
      total_commission: '獲得報酬総額',
      available_commission: '出金可能額',
      invite_count: '招待人数',
      withdraw: '出金申請',
      copy_link: 'リンクをコピー',
      link_placeholder: 'あなたの招待リンク',
      records: '報酬履歴',
      user: 'ユーザー',
      reward: '報酬',
      time: '日時'
    },
    profile: {
        title: 'プロフィール',
        security: 'セキュリティ設定',
        change_password: 'パスワード変更',
        current_password: '現在のパスワード',
        new_password: '新しいパスワード',
        confirm_password: 'パスワード確認',
        save: '変更を保存',
        subscription: 'サブスクリプション設定',
        reset_config: 'サブスクリプション情報をリセット',
        reset_warning: '警告: リセットするとUUIDとサブスクリプションリンクが変更されます。すべてのクライアントを再設定する必要があります。',
        reset_btn: '情報をリセット',
        reset_success: 'リセット成功。クライアントを再設定してください。',
        password_success: 'パスワードが変更されました'
    }
  },
  'ko-KR': {
    app_name: 'Yonglian 가속기',
    login: {
      title: '환영합니다',
      subtitle: '계정에 로그인하십시오',
      email: '이메일 주소',
      password: '비밀번호',
      remember: '로그인 유지',
      forgot: '비밀번호를 잊으셨나요?',
      submit: '로그인',
      no_account: '계정이 없으신가요?',
      register: '회원가입',
      success: '로그인 성공',
      validation: {
        email_required: '이메일 주소를 입력해주세요',
        email_format: '잘못된 이메일 형식입니다',
        password_required: '비밀번호를 입력해주세요',
        password_length: '비밀번호는 6자 이상이어야 합니다'
      }
    },
    register: {
      title: '계정 생성',
      subtitle: '지금 가입하세요',
      code: '인증 코드',
      send_code: '코드 전송',
      confirm_password: '비밀번호 확인',
      invite_code: '초대 코드 (선택)',
      submit: '가입하기',
      has_account: '이미 계정이 있으신가요?',
      login: '로그인',
      success: '가입 성공',
      code_sent: '코드가 전송되었습니다',
      validation: {
        password_mismatch: '비밀번호가 일치하지 않습니다'
      }
    },
    forgot_password: {
      title: '비밀번호 재설정',
      subtitle: '이메일 인증 코드를 통해 비밀번호를 재설정하세요',
      new_password: '새 비밀번호',
      submit: '재설정',
      success: '비밀번호가 재설정되었습니다. 로그인하세요',
      back_login: '로그인으로 돌아가기'
    },
    menu: {
      dashboard: '대시보드',
      group_subscribe: '구독',
      group_user: '사용자',
      nodes: '노드 목록',
      subscribe: '구매',
      knowledge: '사용 가이드',
      orders: '주문 내역',
      traffic: '트래픽 상세',
      tickets: '고객 지원',
      invite: '추천 보상',
      profile: '개인 센터',
      logout: '로그아웃',
      user_role: '사용자'
    },
    dashboard: {
      notice: '최신: 아시아 지역 노드 최적화가 완료되었습니다. 구독을 업데이트해주세요.',
      plan: '현재 플랜',
      balance: '잔액',
      traffic: '데이터 사용량',
      recharge: '충전',
      expiry: '만료일',
      reset_days: '초기화까지 {days}일 남음',
      quick_sub: '원클릭 구독',
      copy_link: '구독 복사',
      copy_success: '구독 주소가 복사되었습니다',
      import_clash: 'Clash 가져오기',
      import_shadowrocket: 'Shadowrocket 가져오기',
      qrcode: 'QR 코드',
      traffic_history: '트래픽 기록',
      chart_placeholder: '차트 영역'
    },
    nodes: {
      filters: {
        all: '전체',
        premium: '프리미엄',
        standard: '표준',
        gaming: '게임용',
        streaming: '스트리밍'
      },
      rate: '배율',
      status: {
        online: '온라인',
        offline: '오프라인'
      },
      load: '부하',
      copy_success: '{name} 설정이 복사되었습니다'
    },
    subscribe: {
      title: '플랜 선택',
      subtitle: '고속, 보안, 안정적인 네트워크 경험을 잠금 해제하세요',
      charity_banner: '수익의 20%는 빈곤 학생을 후원하는 데 사용됩니다. 귀하의 구매는 한 학생이 학교로 돌아가는 데 도움이 됩니다.',
      cycles: {
        monthly: '월간',
        quarterly: '분기별',
        yearly: '연간',
        biennial: '2년'
      },
      discount_50: '50% 할인',
      discount_33: '67% 할인',
      plans: {
        standard: '기본 플랜',
        premium: '고속 플랜',
        business: '초고속 플랜',
        ultimate: '독점 라인'
      },
      features: {
        traffic: '{amount} 트래픽',
        speed: '속도 제한 {limit}',
        devices: '기기 {count}대 제한',
        unlimited_devices: '기기 무제한',
        nodes_standard: '표준 노드 액세스',
        nodes_global: '글로벌 고속 노드',
        iepl: 'IEPL 전용 회선',
        ip: '전용 IP',
        support: '24/7 지원',
        priority: '최우선 액세스'
      },
      per_cycle: '/{cycle}',
      unit: {
        month: '월',
        quarter: '분기',
        year: '년',
        two_years: '2년'
      },
      select: '구독하기',
      popular: '인기',
      checkout: {
        title: '결제',
        selected: '선택됨',
        total: '합계',
        pay: '지금 결제',
        refund_policy: '7일 이내 무조건 환불 가능'
      }
    },
    knowledge: {
      title: '지식 베이스',
      search: '검색...',
      windows: 'Windows 튜토리얼',
      ios: 'iOS 튜토리얼',
      faq: '자주 묻는 질문',
      windows_content: [
        '1. 노드 페이지에서 v2rayN 클라이언트를 다운로드합니다.',
        '2. 구독 링크를 복사합니다.',
        '3. 클라이언트를 열고 구독 URL을 추가한 후 업데이트합니다.'
      ],
      ios_content: [
        '1. 해외 Apple ID를 사용하여 App Store에서 Shadowrocket을 다운로드합니다.',
        '2. 대시보드에서 "원클릭 구독"을 클릭하거나 QR 코드를 스캔합니다.'
      ],
      faq_content: [
        'Q: 속도가 왜 느린가요?',
        'A: 부하가 낮은 노드로 전환하거나 로컬 네트워크를 확인해보세요.'
      ]
    },
    orders: {
      title: '주문 내역',
      id: '주문 번호',
      date: '날짜',
      plan: '상품명',
      amount: '금액',
      status: '상태',
      paid: '결제됨',
      unpaid: '미결제',
      discounted: '할인됨',
      cancel: '취소',
      pay_now: '지금 결제',
      balance_payment: '잔액 결제',
      deduction: '차감',
      refund: '환불'
    },
    traffic: {
      title: '트래픽 상세',
      date: '날짜',
      upload: '업로드',
      download: '다운로드',
      total: '합계',
      unit: '단위: GB'
    },
    tickets: {
      title: '고객 지원',
      create: '새 티켓',
      subject: '제목',
      status: '상태',
      last_update: '최근 업데이트',
      actions: '작업',
      view: '보기',
      status_open: '진행 중',
      status_closed: '종료',
      status_replied: '답변 완료',
      placeholder_subject: '티켓 제목',
      placeholder_content: '문제를 자세히 설명해주세요...',
      submit: '제출',
      reply: '답장',
      reply_placeholder: '답장 입력...',
      send: '보내기'
    },
    invite: {
      title: '추천 보상',
      total_commission: '총 커미션',
      available_commission: '출금 가능',
      invite_count: '초대 인원',
      withdraw: '출금 신청',
      copy_link: '링크 복사',
      link_placeholder: '추천 링크',
      records: '리베이트 기록',
      user: '사용자',
      reward: '보상',
      time: '일시'
    },
    profile: {
        title: '개인 센터',
        security: '보안 설정',
        change_password: '비밀번호 변경',
        current_password: '현재 비밀번호',
        new_password: '새 비밀번호',
        confirm_password: '비밀번호 확인',
        save: '변경 사항 저장',
        subscription: '구독 설정',
        reset_config: '구독 정보 초기화',
        reset_warning: '경고: 초기화 시 UUID 및 구독 링크가 변경됩니다. 모든 클라이언트를 재설정해야 합니다.',
        reset_btn: '정보 초기화',
        reset_success: '초기화 성공. 클라이언트를 재설정하십시오.',
        password_success: '비밀번호가 성공적으로 변경되었습니다'
    }
  }
};