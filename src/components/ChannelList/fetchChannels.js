export const fetchChannels = async () => {
  try {
    const response = await fetch('https://iptv-org.github.io/iptv/countries/ar.m3u');
    if (!response.ok) throw new Error('Error al cargar la lista de canales');
    const m3uText = await response.text();
    return parseM3U(m3uText);
  } catch (error) {
    console.error('Error fetching channels:', error);
    throw error;
  }
};

const parseM3U = (m3uText) => {
  const lines = m3uText.split('\n');
  const channelList = {};
  const logoRegex = /tvg-logo="([^"]*)".*?,(.+)/;
  const categoryRegex = /group-title="([^"]*)"/;

  let currentChannel = {};
  let currentCategory = '';

  for (const line of lines) {
    if (line.startsWith('#EXTINF')) {
      const logoMatch = line.match(logoRegex);
      const categoryMatch = line.match(categoryRegex);
      
      if (logoMatch) {
        currentChannel = { 
          title: logoMatch[2].replace(/\s*\(.*?\)\s*|\s*\[.*?\]\s*/g, '').trim(), 
          logo: logoMatch[1],
          url: ''
        };
        currentCategory = (categoryMatch?.[1]?.split(';')[0] || 'Otros').replace(/Undefined/, 'Otros').trim();
      }
    } else if (line.startsWith('http')) {
      currentChannel.url = line;
      if (!channelList[currentCategory]) {
        channelList[currentCategory] = [];
      }
      channelList[currentCategory].push(currentChannel);
      currentChannel = {};
    }
  }

  return channelList;
};