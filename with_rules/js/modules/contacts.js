// contacts.js — модуль контактов: текущий год в подвале.
import { getElementById } from '../utils.js';

/**
 * Инициализирует подвал: подставляет текущий год в #footer-year.
 * При отсутствии контейнера безопасно завершается (progressive enhancement R5).
 */
export function initContacts() {
  const yearEl = getElementById('footer-year');
  if (!yearEl) {
    return;
  }
  yearEl.textContent = String(new Date().getFullYear());
}
