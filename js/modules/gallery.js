// gallery.js вЂ” РјРѕРґСѓР»СЊ РіР°Р»РµСЂРµРё СЂР°Р±РѕС‚: СЃРµС‚РєР° РєР°СЂС‚РѕС‡РµРє Рё Р»Р°Р№С‚Р±РѕРєСЃ.
// РЈРїСЂР°РІР»РµРЅРёРµ СЃ РєР»Р°РІРёР°С‚СѓСЂС‹: Enter/РїСЂРѕР±РµР» РѕС‚РєСЂС‹РІР°СЋС‚, Esc Р·Р°РєСЂС‹РІР°РµС‚.
import { getElementById } from '../utils.js';

/**
 * РњР°СЃСЃРёРІ СЂР°Р±РѕС‚. РЎС…РµРјР° СЌР»РµРјРµРЅС‚Р° (СЃРј. РЁР°Рі 1 РїР»Р°РЅР° CoT):
 * { src, alt, caption }
 */
export const WORKS = [
  {
    src: 'assets/images/work-1.svg',
    alt: 'Р РµР·СѓР»СЊС‚Р°С‚ Р¶РµРЅСЃРєРѕР№ СЃС‚СЂРёР¶РєРё РєР°СЃРєР°Рґ',
    caption: 'РЎС‚СЂРёР¶РєР° В«РєР°СЃРєР°РґВ»'
  },
  {
    src: 'assets/images/work-2.svg',
    alt: 'Р РµР·СѓР»СЊС‚Р°С‚ РѕРєСЂР°С€РёРІР°РЅРёСЏ Р±Р°Р»Р°СЏР¶',
    caption: 'РћРєСЂР°С€РёРІР°РЅРёРµ Р±Р°Р»Р°СЏР¶'
  },
  {
    src: 'assets/images/work-3.svg',
    alt: 'РџСЂР°Р·РґРЅРёС‡РЅР°СЏ СѓРєР»Р°РґРєР°',
    caption: 'РЈРєР»Р°РґРєР° РЅР° РјРµСЂРѕРїСЂРёСЏС‚РёРµ'
  },
  {
    src: 'assets/images/work-4.svg',
    alt: 'РљР»Р°СЃСЃРёС‡РµСЃРєР°СЏ РјСѓР¶СЃРєР°СЏ СЃС‚СЂРёР¶РєР°',
    caption: 'РњСѓР¶СЃРєР°СЏ СЃС‚СЂРёР¶РєР°'
  },
  {
    src: 'assets/images/work-5.svg',
    alt: 'РђРЅС‚РёСЃС‚СЂРµСЃСЃ-РјР°СЃСЃР°Р¶ РіРѕР»РѕРІС‹',
    caption: 'РђРЅС‚РёСЃС‚СЂРµСЃСЃ-РјР°СЃСЃР°Р¶'
  },
  {
    src: 'assets/images/work-6.svg',
    alt: 'РћР±С‰РёР№ СЂР°СЃСЃР»Р°Р±Р»СЏСЋС‰РёР№ РјР°СЃСЃР°Р¶',
    caption: 'РћР±С‰РёР№ РјР°СЃСЃР°Р¶'
  }
];

/**
 * Р РµРЅРґРµСЂРёС‚ РєР°СЂС‚РѕС‡РєРё РіР°Р»РµСЂРµРё Рё РїРѕРґРєР»СЋС‡Р°РµС‚ Р»Р°Р№С‚Р±РѕРєСЃ.
 * РџСЂРё РѕС‚СЃСѓС‚СЃС‚РІРёРё РєРѕРЅС‚РµР№РЅРµСЂР° Р±РµР·РѕРїР°СЃРЅРѕ Р·Р°РІРµСЂС€Р°РµС‚СЃСЏ.
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
    button.setAttribute('aria-label', `РћС‚РєСЂС‹С‚СЊ: ${work.caption}`);

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

  // Р—Р°РєСЂС‹С‚РёРµ РїРѕ Esc Рё РєР»РёРєСѓ РїРѕ С„РѕРЅСѓ
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

