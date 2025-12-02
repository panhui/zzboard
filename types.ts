export interface User {
  email: string;
  uuid: string;
  balance: number;
  commission_balance: number;
  plan_name: string;
  expired_at: number; // timestamp
  transfer_enable: number; // bytes
  u: number; // upload usage bytes
  d: number; // download usage bytes
  is_admin: number;
  avatar_url: string;
  token: string;
}

export interface ServerNode {
  id: number;
  name: string;
  type: 'shadowsocks' | 'vmess' | 'vless' | 'trojan' | 'hysteria2';
  country_code: string;
  rate: number; // traffic multiplier
  tags: string[];
  status: 'online' | 'offline' | 'maintenance';
  online_users?: number;
}

export enum Tab {
  DASHBOARD = 'dashboard',
  NODES = 'nodes',
  PROFILE = 'profile'
}

export interface ApiError {
  message: string;
}