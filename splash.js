// Splash screen fade-out
setTimeout(() => {
  document.getElementById('splash-screen').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}, 4000);

// Tab switching logic
function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(sec => sec.classList.remove('active'));

  document.querySelector(`button[onclick*="${tabId}"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');

  if (tabId === 'downloads') renderDownloadList();
}

// Video player logic
function loadVideo() {
  const url = document.getElementById('video-url').value;
  const player = document.getElementById('video-player');

  if (url.endsWith('.m3u8')) {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(player);
    } else if (player.canPlayType('application/vnd.apple.mpegurl')) {
      player.src = url;
    } else {
      alert('HLS not supported on this device.');
    }
  } else {
    player.src = url;
  }

  player.play();
}

// Music player logic
function loadMusic() {
  const fileInput = document.getElementById('music-file');
  const player = document.getElementById('music-player');
  const title = document.getElementById('music-title');

  const file = fileInput.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  player.src = url;
  title.textContent = file.name;
  player.play();
}

// Download manager logic
function downloadMedia() {
  const url = document.getElementById('download-url').value;
  const filename = url.split('/').pop().split('?')[0];
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();

  const downloads = JSON.parse(localStorage.getItem('leo-downloads') || '[]');
  downloads.push({ name: filename, url });
  localStorage.setItem('leo-downloads', JSON.stringify(downloads));
  renderDownloadList();
}

function renderDownloadList() {
  const list = document.getElementById('download-list');
  const downloads = JSON.parse(localStorage.getItem('leo-downloads') || '[]');
  list.innerHTML = '';

  downloads.forEach(file => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${file.name}</strong><br/>
      <video src="${file.url}" controls style="width:100%; max-height:200px;"></video>
    `;
    list.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', renderDownloadList);
