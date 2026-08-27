// services.js — модуль услуг и прайса (одна предметная область, R13).
// Содержит данные прайса и рендер карточек услуг в секцию #services-list,
// а также наполнение выпадающего списка в форме записи.
import { getElementById, formatPrice, isNonEmptyString } from '../utils.js';

/**
 * Массив услуг. Схема элемента (см. Шаг 1 CoT):
 * { id, name, category, price, duration, alt }
 * duration — длительность в минутах, price — в рублях (целое число).
 */
export const SERVICES = [
  {
    id: 'haircut',
    name: 'Женская стрижка',
    category: 'Парикмахер',
    price: 1500,
    duration: 60,
    alt: 'Аккуратная женская стрижка средней длины'
  },
  {
    id: 'haircut-men',
    name: 'Мужская стрижка',
    category: 'Парикмахер',
    price: 1200,
    duration: 45,
    alt: 'Классическая мужская стрижка'
  },
  {
    id: 'coloring',
    name: 'Окрашивание',
    category: 'Парикмахер',
    price: 3800,
    duration: 120,
    alt: 'Естественное окрашивание волос'
  },
  {
    id: 'styling',
    name: 'Укладка',
    category: 'Парикмахер',
    price: 900,
    duration: 40,
    alt: 'Праздничная укладка волос'
  },
  {
    id: 'back-massage',
    name: 'Массаж спины',
    category: 'Массаж',
    price: 1800,
    duration: 45,
    alt: 'Расслабляющий массаж спины'
  },
  {
    id: 'full-massage',
    name: 'Общий массаж',
    category: 'Массаж',
    price: 3200,
    duration: 90,
    alt: 'Общий оздоровительный массаж тела'
  },
  {
    id: 'anti-stress-massage',
    name: 'Антистресс-массаж',
    category: 'Массаж',
    price: 2200,
    duration: 60,
    alt: 'Антистрессовый массаж головы и шеи'
  }
];

/**
 * Рендерит карточки услуг в #services-list.
 * При отсутствии контейнера или пустых данных просто завершается (progressive enhancement R5).
 */
export function renderServices() {
  const list = getElementById('services-list');
  if (!list || !Array.isArray(SERVICES) || SERVICES.length === 0) {
    return;
  }

  const fragment = document.createDocumentFragment();

  SERVICES.forEach((service) => {
    const card = document.createElement('article');
    card.className = 'service-card';

    const title = document.createElement('h3');
    title.className = 'service-card__title';
    title.textContent = service.name;

    const desc = document.createElement('p');
    desc.className = 'service-card__desc';
    desc.textContent = service.alt;

    const meta = document.createElement('div');
    meta.className = 'service-card__meta';

    const price = document.createElement('span');
    price.className = 'service-card__price';
    price.textContent = formatPrice(service.price);

    const duration = document.createElement('span');
    duration.className = 'service-card__duration';
    duration.textContent = `${service.duration} мин`;

    meta.append(price, duration);
    card.append(title, desc, meta);
    fragment.append(card);
  });

  list.replaceChildren(fragment);
}

/**
 * Наполняет select #booking-service вариантами из SERVICES.
 * Имя услуги становится значением option.
 */
export function populateBookingSelect() {
  const select = getElementById('booking-service');
  if (!select || !Array.isArray(SERVICES)) {
    return;
  }

  const fragment = document.createDocumentFragment();

  SERVICES.forEach((service) => {
    if (!isNonEmptyString(service.name)) {
      return;
    }
    const option = document.createElement('option');
    option.value = service.name;
    option.textContent = service.name;
    fragment.append(option);
  });

  select.append(fragment);
}
