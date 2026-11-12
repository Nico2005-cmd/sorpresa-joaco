const welcome = document.getElementById('welcome');
const experience = document.getElementById('experience');
const enterBtn = document.getElementById('enterBtn');
const audio = document.getElementById('bgMusic');
const soundBtn = document.getElementById('soundBtn');
const backTop = document.getElementById('backTop');

function updateSoundButton() {
  soundBtn.innerHTML = audio.paused
    ? '♫ <span>MÚSICA OFF</span>'
    : '♫ <span>MÚSICA ON</span>';
}

async function startMusic() {
  try {
    audio.volume = 0.7;
    audio.muted = false;
    await audio.play();
    updateSoundButton();
    return true;
  } catch (error) {
    // Los navegadores pueden bloquear el autoplay hasta que el visitante toque la página.
    updateSoundButton();
    return false;
  }
}

// Intentar reproducir apenas se carga la página.
// Si el navegador lo bloquea, se vuelve a intentar al pulsar «Entrar».
window.addEventListener('DOMContentLoaded', () => {
  startMusic();
});

enterBtn.addEventListener('click', async () => {
  // Iniciar la reproducción durante el clic del visitante para superar el bloqueo de autoplay.
  const musicPromise = startMusic();

  welcome.classList.add('hidden');
  experience.classList.add('visible');
  experience.setAttribute('aria-hidden', 'false');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  await musicPromise;
});

soundBtn.addEventListener('click', async () => {
  if (audio.paused) {
    await startMusic();
  } else {
    audio.pause();
    updateSoundButton();
  }
});

backTop.addEventListener('click', () => {
  experience.classList.remove('visible');
  experience.setAttribute('aria-hidden', 'true');
  welcome.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

audio.addEventListener('play', updateSoundButton);
audio.addEventListener('pause', updateSoundButton);
audio.addEventListener('error', () => {
  soundBtn.innerHTML = '♫ <span>ERROR DE AUDIO</span>';
  console.error('No se pudo cargar public/audio.mp3. Comprueba que el archivo exista.');
});

const embers = document.querySelector('.embers');
for (let i = 0; i < 34; i++) {
  const spark = document.createElement('span');
  spark.style.left = `${Math.random() * 100}%`;
  spark.style.top = `${Math.random() * 100}%`;
  spark.style.animationDuration = `${7 + Math.random() * 12}s`;
  spark.style.animationDelay = `${Math.random() * -18}s`;
  spark.style.opacity = `${0.25 + Math.random() * 0.6}`;
  embers.appendChild(spark);
}


// Misión interactiva: cada objetivo se marca al tocarlo.
const missionTasks = [...document.querySelectorAll('.mission-task')];
const missionCount = document.getElementById('missionCount');
const missionProgress = document.getElementById('missionProgress');
const missionStatus = document.getElementById('missionStatus');
const missionComplete = document.getElementById('missionComplete');

function updateMission() {
  const completed = missionTasks.filter(task => task.classList.contains('completed')).length;
  missionCount.textContent = `${completed} / ${missionTasks.length}`;
  missionProgress.style.width = `${(completed / missionTasks.length) * 100}%`;
  missionStatus.textContent = completed === missionTasks.length
    ? 'Has demostrado que tienes lo necesario para esta misión.'
    : `Te ${completed === 1 ? 'falta' : 'faltan'} ${missionTasks.length - completed} objetivo${missionTasks.length - completed === 1 ? '' : 's'} por completar.`;
  missionComplete.hidden = completed !== missionTasks.length;
}

missionTasks.forEach(task => {
  task.addEventListener('click', () => {
    task.classList.toggle('completed');
    task.setAttribute('aria-pressed', task.classList.contains('completed') ? 'true' : 'false');
    updateMission();
  });
});

// Pergamino secreto.
const secretBtn = document.getElementById('secretBtn');
const secretMessage = document.getElementById('secretMessage');
secretBtn.addEventListener('click', () => {
  const isOpen = !secretMessage.hidden;
  secretMessage.hidden = isOpen;
  secretBtn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  secretBtn.querySelector('span:nth-child(2)').textContent = isOpen
    ? 'DESCUBRIR MENSAJE'
    : 'CERRAR PERGAMINO';
  secretBtn.querySelector('small').textContent = isOpen
    ? 'Pulsa para abrir el pergamino'
    : 'Un mensaje especial para ti';
  if (!isOpen) {
    setTimeout(() => secretMessage.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  }
});
