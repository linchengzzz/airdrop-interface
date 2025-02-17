import React from 'react';
import { toast } from 'react-toastify';
import { isMobile } from 'react-device-detect';
import { getAddress } from '@ethersproject/address';
import Message from '../components/message';

export function isAddress(value: any): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function shortenSteamId(steamId?: string): string {
  return steamId ? steamId.substring(0, 2) + '...' + steamId.substring(steamId.length - 2) : '';
}

export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export const isBrowser = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export const openLink = (url: string) => {
  if (isMobile) {
    window.location.href = url;
  } else {
    const winRef = window.open(url, '_blank');
    if (!winRef) {
      toast.error(<Message message="Please allow popups for this website." title="Ah shit, here we go again" />);
    }
  }
};

export const formatMinutes = (min?: number) => {
  if (min === undefined || min === null) return '--';
  const h = min / 60;
  const floor = Math.floor(min / 60);
  if (floor >= 100) return floor + ' h';
  return (h > floor && h > 0.1 ? h.toFixed(1) : floor) + ' h';
};

export function getSteamGameImage(appid: number) {
  return `https://cdn.akamai.steamstatic.com/steam/apps/${appid}/capsule_184x69.jpg`;
}

export function getSteamProfileEdit(steamId: string) {
  return `https://steamcommunity.com/profiles/${steamId}/edit/settings`;
}

export const getVerifySignData = (account?: string) => ({
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
    ],
    Permit: [{ name: 'account', type: 'address' }],
  },
  domain: { name: 'P12 Verifier', version: '1' },
  primaryType: 'Permit',
  message: {
    account: account || '',
  },
});

export const getEmailSignData = ({ account, email }: { account: string; email: string }) => ({
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
    ],
    Permit: [
      { name: 'account', type: 'address' },
      { name: 'email', type: 'string' },
    ],
  },
  domain: { name: 'P12 Email Verifier', version: '1' },
  primaryType: 'Permit',
  message: { account, email },
});

export const getCountMemo = (count?: number) => {
  return count === 3 ? '1+2' : count;
};

export const downloadImage = (data: string) => {
  const downloadLink = document.createElement('a');
  downloadLink.href = data;
  downloadLink.download = 'poster.jpg';
  downloadLink.click();
};
