import axios from 'axios';
import { getPrizeList as getMockPrizeList } from './mock/prizeList';

// 是否使用mock数据
const USE_MOCK = true;

// 创建axios实例
const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://api.example.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * 获取奖品列表
 * @param {number} count - 奖品数量（4/8/12）
 * @returns {Promise<Array>} 奖品列表
 */
export const getPrizeList = async (count = 8) => {
  if (USE_MOCK) {
    return getMockPrizeList(count);
  }

  try {
    const response = await api.get('/prize/list', {
      params: { count }
    });
    return response.data;
  } catch (error) {
    console.error('获取奖品列表失败:', error);
    throw error;
  }
};

/**
 * 获取中奖信息
 * @returns {Promise<Object>} 中奖信息
 */
export const getWinnerPrize = async (prizeAmount = 8) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (USE_MOCK) {
    // 模拟中奖数据
    return {
      prize_id: Math.floor(Math.random() * prizeAmount) + 1,
    };
  }

  try {
    const response = await api.get('/prize/winner');
    return response.data;
  } catch (error) {
    console.error('获取中奖信息失败:', error);
    throw error;
  }
}; 