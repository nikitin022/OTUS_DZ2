// utils.js — переиспользуемые хелперы проекта (hw_ai_rules п.3.1)

/**
 * Безопасное получение элемента по id.
 * Возвращает null, если элемент не найден — вызывающий код решает, как поступить.
 * @param {string} id
 * @returns {HTMLElement | null}
 */
export function getElementById(id) {
  return document.getElementById(id);
}

/**
 * Форматирует число в строку цены вида «1 200 ₽».
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  return new Intl.NumberFormat('ru-RU').format(amount) + ' ₽';
}

/**
 * Полный перечень категорий услуг — источник для фильтров/группировки.
 */
export const SERVICE_CATEGORIES = ['Парикмахер', 'Массаж'];

/**
 * Проверка, что значение — непустая строка (после обрезки пробелов).
 * @param {unknown} value
 * @returns {boolean}
 */
export function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}
