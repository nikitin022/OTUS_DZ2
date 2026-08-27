// booking.js — модуль формы записи: валидация и понятные сообщения пользователю.
import { getElementById, isNonEmptyString } from '../utils.js';

// Регулярное выражение для телефона в формате +7 XXX XXX-XX-XX (пробелы/дефисы необязательны)
const PHONE_PATTERN = /^\+7[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

/**
 * Валидирует данные формы.
 * @param {{ name: string, phone: string, service: string, date: string }} data
 * @returns {{ valid: boolean, errors: Record<string, string> }}
 */
export function validateBooking(data) {
  const errors = {};

  if (!isNonEmptyString(data.name)) {
    errors.name = 'Укажите ваше имя.';
  }

  if (!isNonEmptyString(data.phone)) {
    errors.phone = 'Укажите номер телефона.';
  } else if (!PHONE_PATTERN.test(data.phone.trim())) {
    errors.phone = 'Телефон должен быть в формате +7 XXX XXX-XX-XX.';
  }

  if (!isNonEmptyString(data.service)) {
    errors.service = 'Выберите услугу из списка.';
  }

  if (!isNonEmptyString(data.date)) {
    errors.date = 'Выберите желаемую дату.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Показывает сообщение о результате отправки формы.
 * @param {string} message
 * @param {'error'|'success'} type
 */
function showStatus(message, type) {
  const status = getElementById('booking-form-status');
  if (!status) {
    return;
  }
  status.textContent = message;
  status.className = type === 'success'
    ? 'booking-form__status booking-form__status--success'
    : 'booking-form__status booking-form__status--error';
}

/**
 * Инициализирует обработчики формы записи.
 */
export function initBooking() {
  const form = getElementById('booking-form');
  if (!form) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nameEl = getElementById('booking-name');
    const phoneEl = getElementById('booking-phone');
    const serviceEl = getElementById('booking-service');
    const dateEl = getElementById('booking-date');

    const result = validateBooking({
      name: nameEl ? nameEl.value : '',
      phone: phoneEl ? phoneEl.value : '',
      service: serviceEl ? serviceEl.value : '',
      date: dateEl ? dateEl.value : ''
    });

    if (!result.valid) {
      showStatus('Пожалуйста, исправьте ошибки: ' + Object.values(result.errors).join(' '), 'error');
      return;
    }

    showStatus('Спасибо! Заявка отправлена — я свяжусь с вами для подтверждения времени.', 'success');
    form.reset();
  });
}
