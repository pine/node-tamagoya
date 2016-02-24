'use strict';

const cheerio = require('cheerio');
const co = require('co');
const defaults = require('lodash.defaults');
const got = require('got');
const zip = require('lodash.zip');

const defaultOpts = {
  ua: 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko)' +
    ' Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136',
  url: 'http://www.tamagoya.co.jp/menu.html'
};

function fetchMenus(opts) {
  opts = defaults(opts, defaultOpts);

  return co(function *() {
    const res = yield got(opts.url, {headers: {'user-agent': opts.ua}});

    const $ = cheerio.load(res.body);
    const menuTitles = $('.menu_title');
    const menuLists = $('.menu_list');
    const menus = zip(menuTitles, menuLists);

    return menus.map(pair => {
      const menuTitle = $(pair[0]);
      const menuList = $(pair[1]);

      const date = _parseDateByTitle(menuTitle.text());
      const menus = _parseMenuList($, menuList);
      const calorie = _parseCalorie(menuList);

      return {date, menus, calorie};
    });
  });
}

function _parseDateByTitle(title) {
  const regex = /(\d+)/;
  const matches = regex.exec(title);

  if (!matches) {
    return null;
  }
  const days = parseInt(matches[1], 10);

  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  lastMonth.setDate(days);

  const thisMonth = new Date();
  thisMonth.setDate(days);

  // Use closer to now
  const now = new Date();
  const diffLastMonth = Math.abs(now - lastMonth);
  const diffThisMonth = Math.abs(now - thisMonth);
  return diffLastMonth < diffThisMonth ? lastMonth : thisMonth;
}

function _parseMenuList($, menuList) {
  const items = menuList.find('li');
  return [].slice.call(items).map(item => $(item).text());
}

function _parseCalorie(menuList) {
  return menuList.find('.menu_calorie').text() || null;
}

module.exports = fetchMenus;
