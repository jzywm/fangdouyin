const formatDuration = (seconds: number): string => {
  // 1. 计算小时：总秒数 / 3600，向下取整
  const h = Math.floor(seconds / 3600);
  
  // 2. 计算分钟：(总秒数 % 3600) / 60，向下取整
  const m = Math.floor((seconds % 3600) / 60);
  
  // 3. 计算秒数：总秒数 % 60
  const s = Math.floor(seconds % 60);

  // 4. 补零操作 (例如 9 变成 09)，并拼接字符串
  // 如果小时为0，可以选择隐藏小时部分，这里默认保留
  const hh = h.toString().padStart(2, '0');
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');
if(hh == '00'){
  return`${mm}:${ss}`;
}
  return `${hh}:${mm}:${ss}`;
};

export default formatDuration