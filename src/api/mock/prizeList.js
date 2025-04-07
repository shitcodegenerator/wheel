// 奖品列表数据
const mockPrizeList4 = [
  {
    prize_name: "測試文案Ａ",
    prize_amount: 0,
    prize_id: 1,
    icon: "https://images.1138403.com/mcs-images/ticket/gtppbdtf4/3195047_1739618674360.png",
  },
  {
    prize_name: "现金奖励Ａ",
    prize_amount: 888,
    prize_id: 2,
    icon: null,
  },
  {
    prize_name: "现金奖励Ｂ",
    prize_amount: 188,
    prize_id: 3,
    icon: null,
  },
  {
    prize_name: "现金奖励Ｃ",
    prize_amount: 88,
    prize_id: 4,
    icon: null,
  },
];

const mockPrizeList8 = [
  ...mockPrizeList4,
  {
    prize_name: "測試文案Ｂ",
    prize_amount: 3888,
    prize_id: 5,
    icon: null,
  },
  {
    prize_name: "測試文案Ｃ",
    prize_amount: 2888,
    prize_id: 6,
    icon: null,
  },
  {
    prize_name: "測試文案Ｄ",
    prize_amount: 1888,
    prize_id: 7,
    icon: null,
  },
  {
    prize_name: "測試文案Ｅ",
    prize_amount: 588,
    prize_id: 8,
    icon: null,
  },
];

const mockPrizeList12 = [
  ...mockPrizeList8,
  {
    prize_name: "測試文案Ｆ",
    prize_amount: 0,
    prize_id: 9,
    icon: null,
  },
  {
    prize_name: "測試文案Ｇ",
    prize_amount: 8888,
    prize_id: 10,
    icon: null,
  },
  {
    prize_name: "測試文案Ｈ",
    prize_amount: 6888,
    prize_id: 11,
    icon: null,
  },
  {
    prize_name: "測試文案Ｑ",
    prize_amount: 4888,
    prize_id: 12,
    icon: null,
  },
];

// 模拟API响应
const mockPrizeLists = {
  4: mockPrizeList4,
  8: mockPrizeList8,
  12: mockPrizeList12,
};

export const getPrizeList = async (count = 8) => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // 验证参数
  if (![4, 8, 12].includes(count)) {
    throw new Error('目前只有做4,8,12三種項目');
  }
  
  // 返回对应的奖品列表
  return mockPrizeLists[count];
}; 

export const getWinner = async () => {
  // 模拟API延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  

  // 返回对应的奖品列表
  return {
    prize_id: 1,
    prize_name: "測試文案Ａ",
    prize_amount: 0,
    icon: "https://images.1138403.com/mcs-images/ticket/gtppbdtf4/3195047_1739618674360.png",
  }
}; 