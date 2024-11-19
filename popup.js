document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchButton').addEventListener('click', async () => {
        const searchButton = document.getElementById('searchButton');
        searchButton.disabled = true;
        searchButton.textContent = 'Searching...';
        
        const query = document.getElementById('searchInput').value;
        const results = document.getElementById('results');
        
        if (!query.trim()) {
          showError('Please enter a channel name');
          return;
        }
      
        showLoading();
      
        try {
          const response = await fetch(`http://localhost:4567/search?query=${encodeURIComponent(query)}`);
          // const response = await fetch(`https://youtube-channel-finder.onrender.com/search?query=${encodeURIComponent(query)}`);
          const data = await response.json();
          
          if (data.error) {
            showError(data.error);
            return;
          }
          if (!Array.isArray(data)) {
            showError('Invalid response from server');
            return;
          }
          
          if (data.length === 0) {
            showError('No channels found');
            return;
          }
      
          displayResults(data);
        } catch (error) {
          showError('Failed to connect to server');
          console.error(error);
        } finally {
            searchButton.disabled = false;
        }
      });

    document.getElementById('searchInput').focus();
    document.getElementById('clearButton').addEventListener('click', clearSearch);
    document.getElementById('searchInput').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            document.getElementById('searchButton').click();
        }
    });
});
  
  function showLoading() {
    const results = document.getElementById('results');
    results.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>Searching YouTube channels...</p>
      </div>
    `;
  }
  
  function showError(message) {
    const results = document.getElementById('results');
    results.innerHTML = `
      <div class="error">
        <span class="error-icon">!</span>
        <span class="error-message">${message}</span>
      </div>
    `;
  }
  
  function displayResults(channels) {
    const sortedChannels = sortChannels(channels);
    const results = document.getElementById('results');
    if (!channels || channels.length === 0) {
        showError('No channels found');
        return;
    }
    
    results.innerHTML = sortedChannels.map(channel => `
        <div class="channel">
            <img src="${channel.thumbnail || 'default-channel-icon.png'}" 
                 alt="${channel.title || 'Channel thumbnail'}"
                 onerror="this.src='https://via.placeholder.com/100x100?text=No+Image'"
                 class="channel-thumbnail">
            <div class="channel-info">
                <h3>${channel.title || 'Untitled Channel'}</h3>
                <p class="stats">
                    ${formatNumber(channel.subscribers)} subscribers 
                    • ${formatNumber(channel.video_count)} videos
                </p>
                <div class="channel-actions">
                    <a href="https://youtube.com/channel/${channel.channel_id}" 
                       target="_blank" 
                       class="visit-channel-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Visit Channel
                    </a>
                </div>
            </div>
        </div>
    `).join('');
  }  
  function formatNumber(num) {
    if (num === undefined || num === null) {
        return 'N/A';
    }
    
    num = parseInt(num);
    
    if (isNaN(num)) {
        return 'N/A';
    }

    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
  
  function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('searchInput').focus();
  }
  
  function sortChannels(channels, criteria = 'subscribers') {
    return channels.sort((a, b) => b[criteria] - a[criteria]);
  }