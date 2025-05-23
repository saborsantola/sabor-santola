// ======= INTRO LAYER =======
const introLayer = document.querySelector('.intro-layer');
if (introLayer) {
  introLayer.addEventListener('click', () => {
    introLayer.style.opacity = '0';
    setTimeout(() => {
      introLayer.style.display = 'none';
    }, 500);
  });
}

// ======= SLIDESHOW PRATO DO DIA =======
const slides = document.querySelectorAll('.slideshow img');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

if (slides.length > 0) {
  showSlide(currentSlide);
  setInterval(nextSlide, 5000);
}

// ======= COMENTÁRIOS, LIKES E AVALIAÇÃO =======
const form = document.querySelector('.form-comentario');
const textarea = form ? form.querySelector('textarea') : null;
const comentariosLista = document.querySelector('.comentarios-lista');
const starsInput = form ? form.querySelectorAll('.star') : [];

function createComentarioItem(text, rating) {
  // Container do comentário
  const comentarioItem = document.createElement('div');
  comentarioItem.classList.add('comentario-item');
  comentarioItem.style.position = 'relative'; // para posicionar o like

  // Texto do comentário
  const textoElem = document.createElement('p');
  textoElem.classList.add('comentario-texto');
  textoElem.textContent = text;

  // Avaliação com estrelas fixa (apenas mostrar)
  const avaliacaoElem = document.createElement('div');
  avaliacaoElem.classList.add('avaliacao-estrelas');
  for (let i = 1; i <= 5; i++) {
    const starSpan = document.createElement('span');
    starSpan.textContent = i <= rating ? '★' : '☆';
    starSpan.style.color = i <= rating ? 'gold' : '#ccc';
    starSpan.style.fontSize = '18px';
    starSpan.style.marginRight = '3px';
    avaliacaoElem.appendChild(starSpan);
  }

  // Botão like
  const likeBtn = document.createElement('button');
  likeBtn.classList.add('like-btn');
  likeBtn.innerHTML = '👍';
  likeBtn.style.background = 'transparent';
  likeBtn.style.border = 'none';
  likeBtn.style.cursor = 'pointer';
  likeBtn.style.fontSize = '18px';

  // Contador de likes
  const likeCount = document.createElement('span');
  likeCount.textContent = '0';
  likeCount.style.marginLeft = '6px';
  likeCount.style.fontWeight = '700';
  likeCount.style.color = 'var(--verde)';

  // Container para like e contador
  const likeContainer = document.createElement('div');
  likeContainer.style.position = 'absolute';
  likeContainer.style.right = '20px';
  likeContainer.style.bottom = '18px';
  likeContainer.style.display = 'flex';
  likeContainer.style.alignItems = 'center';

  likeContainer.appendChild(likeBtn);
  likeContainer.appendChild(likeCount);

  comentarioItem.appendChild(avaliacaoElem);
  comentarioItem.appendChild(textoElem);
  comentarioItem.appendChild(likeContainer);

  // Likes state
  let likes = 0;
  let liked = false;

  likeBtn.addEventListener('click', () => {
    if (!liked) {
      likes++;
      liked = true;
      likeBtn.classList.add('liked');
      likeBtn.style.color = 'var(--verde)';
    } else {
      likes--;
      liked = false;
      likeBtn.classList.remove('liked');
      likeBtn.style.color = '#888';
    }
    likeCount.textContent = likes;
  });

  return comentarioItem;
}

if (form && textarea && comentariosLista && starsInput.length > 0) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const text = textarea.value.trim();
    if (text.length === 0) return;

    // Pega rating selecionado
    let rating = 0;
    starsInput.forEach(star => {
      if (star.checked) rating = parseInt(star.value);
    });
    if (rating === 0) {
      alert('Por favor, selecione uma avaliação com estrelas!');
      return;
    }

    const newComentario = createComentarioItem(text, rating);
    comentariosLista.prepend(newComentario);

    textarea.value = '';
    starsInput.forEach(star => star.checked = false);
  });
}
const btnLikeSite = document.getElementById('btnLikeSite');
const likeCountSite = document.getElementById('likeCountSite');

// Pega likes do localStorage, ou inicia em 0
let likesSite = localStorage.getItem('likesSite');
likesSite = likesSite ? parseInt(likesSite) : 0;
likeCountSite.textContent = likesSite;

// Verifica se o usuário já curtiu o site
let likedSite = localStorage.getItem('likedSite') === 'true';

if(likedSite) {
  btnLikeSite.disabled = true;
  btnLikeSite.textContent = '👍 Você já curtiu';
  btnLikeSite.style.cursor = 'default';
}

btnLikeSite.addEventListener('click', () => {
  if(likedSite) return;

  likesSite++;
  likeCountSite.textContent = likesSite;
  likedSite = true;

  btnLikeSite.disabled = true;
  btnLikeSite.textContent = '👍 Você já curtiu';
  btnLikeSite.style.cursor = 'default';

  localStorage.setItem('likesSite', likesSite);
  localStorage.setItem('likedSite', 'true');
});
