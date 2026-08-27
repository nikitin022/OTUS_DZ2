// contacts.js — модуль контактов: инициализация статичных элементов секции.
import { getElementById } from '../utils.js';

/**
 * Проставляет текущий год в подвале сайта.
 * Вынесено в модуль контактов как пример ответственной инициализации.
 */
export function initContacts() {
  const yearEl = getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}
