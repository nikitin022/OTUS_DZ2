// gallery.js — модуль галереи работ: сетка карточек и лайтбокс.
// Управление с клавиатуры: Enter/пробел открывают, Esc закрывает (R5 — доступность).
import { getElementById } from '../utils.js';

/**
 * Массив работ. Схема элемента (см. Шаг 1 CoT):
 * { src, alt, caption }
 */
export const WORKS = [
  {
    src: 'assets/images/work-1.svg',
    alt: 'Результат женской стрижки каскад',
    caption: 'Стрижка «каскад»'
  },
  {
    src: 'assets/images/work-2.svg',
    alt: 'Результат окрашивания балаяж',
    caption: 'Окрашивание балаяж'
  },
  {
    src: 'assets/images/work-3.svg',
    alt: 'Праздничная укладка',
    caption: 'Укладка на мероприятие'
  },
  {
    src: 'assets/images/work-4.svg',
    alt: 'Классическая мужская стрижка',
    caption: 'Мужская стрижка'
  },
  {
    src: 'assets/images/work-5.svg',
    alt: 'Антистресс-массаж головы',
    caption: 'Антистресс-массаж'
  },
  {
    src: 'assets/images/work-6.svg',
    alt: 'Общий расслабляющий массаж',
    caption: 'Общий массаж'
  }
];

/**
 * Рендерит карточки галереи и подключает лайтбокс.
 * При отсутствии контейнера безопасно завершается (progressive enhancement R5).
 */
export function initGallery() {
  const grid = getElementById('gallery-grid');
  const lightbox = getElementById('lightbox');
  if (!grid || !lightbox || !Array.isArray(WORKS)) {
    return;
  }

  const imageEl = getElementById('lightbox-image');
  const captionEl = getElementById('lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox__close');

  const openLightbox = (work) => {
    if (imageEl) {
      imageEl.src = work.src;
      imageEl.alt = work.alt;
    }
    if (captionEl) {
      captionEl.textContent = work.caption;
    }
    lightbox.hidden = false;
    if (closeBtn) {
      closeBtn.focus();
    }
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
  };

  const fragment = document.createDocumentFragment();

  WORKS.forEach((work, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-item';
    button.setAttribute('aria-label', `Открыть: ${work.caption}`);

    const img = document.createElement('img');
    img.className = 'gallery-item__image';
    img.src = work.src;
    img.alt = work.alt;
    img.loading = 'lazy';

    button.append(img);
    button.addEventListener('click', () => openLightbox(WORKS[index]));
    fragment.append(button);
  });

  grid.replaceChildren(fragment);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  // Закрытие по Esc и клику по фону (R5 — работа с клавиатуры и мышью)
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) {
      closeLightbox();
    }
  });

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}
