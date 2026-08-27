// booking.test.js — юнит-тесты для validateBooking (без внешнего фреймворка, R9).
// Запуск: node --test tests/booking.test.js
import test from 'node:test';
import assert from 'node:assert/strict';
import { validateBooking } from '../js/modules/booking.js';

// Корректные данные формы — база для большинства кейсов
const validData = {
  name: 'Иван',
  phone: '+7 916 123-45-67',
  service: 'Женская стрижка',
  date: '2026-09-01'
};

test('валидная форма возвращает valid=true и пустые ошибки', () => {
  const result = validateBooking(validData);
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
});

test('пустое имя — ошибка name', () => {
  const result = validateBooking({ ...validData, name: '  ' });
  assert.equal(result.valid, false);
  assert.ok(result.errors.name);
});

test('пустой телефон — ошибка phone', () => {
  const result = validateBooking({ ...validData, phone: '' });
  assert.equal(result.valid, false);
  assert.ok(result.errors.phone);
});

test('некорректный формат телефона — ошибка phone', () => {
  const result = validateBooking({ ...validData, phone: '8916123' });
  assert.equal(result.valid, false);
  assert.ok(result.errors.phone);
});

test('телефон без дефисов и пробелов принимается', () => {
  const result = validateBooking({ ...validData, phone: '+79161234567' });
  assert.equal(result.valid, true);
});

test('невыбранная услуга — ошибка service', () => {
  const result = validateBooking({ ...validData, service: '' });
  assert.equal(result.valid, false);
  assert.ok(result.errors.service);
});

test('пустая дата — ошибка date', () => {
  const result = validateBooking({ ...validData, date: '' });
  assert.equal(result.valid, false);
  assert.ok(result.errors.date);
});

test('несколько ошибок сразу — все присутствуют', () => {
  const result = validateBooking({ name: '', phone: '123', service: '', date: '' });
  assert.equal(result.valid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.service);
  assert.ok(result.errors.date);
});
