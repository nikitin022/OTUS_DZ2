// main.js — точка входа: подключение и инициализация всех модулей (hw_ai_rules п.3.1).
import { renderServices, populateBookingSelect } from './modules/services.js';
import { initGallery } from './modules/gallery.js';
import { initBooking } from './modules/booking.js';
import { initContacts } from './modules/contacts.js';

/**
 * Единая точка инициализации всех модулей.
 * Каждый модуль безопасно завершается, если его контейнер отсутствует
 * (progressive enhancement — сайт работает даже без JS).
 */
function initApp() {
  renderServices();
  populateBookingSelect();
  initGallery();
  initBooking();
  initContacts();
}

initApp();
