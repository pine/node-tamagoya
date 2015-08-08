'use strict';

var _ = require('lodash');
var request = require('request');
var cheerio = require('cheerio');

var defaults = {
  ua: 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136',
  url: 'http://www.tamagoya.co.jp/menu.html'
};

function fetchMenus(opts, done) {
  if (_.isFunction(opts)) {
    done = opts;
    opts = {};
  }

  var opts = _.extend(defaults, opts);

  request({
    url: opts.url,
    headers: {
      'user-agent': opts.ua
    }
  }, function (err, res, body) {
    if (err) { return done(err); }

    var $ = cheerio.load(body);
    var menuTitles = $('.menu_title');
    var menuLists = $('.menu_list');

    var menus = _.zip(menuTitles, menuLists);
    done(null, _.map(menus, function (pair) {
      var menuTitle = $(pair[0]);
      var menuList = $(pair[1]);

      var date  = _parseDateByTitle(menuTitle.text());
      var menus = _parseMenuList($, menuList);
      var calorie = _parseCalorie(menuList);

      return {
        date: date,
        menus: menus,
        calorie: calorie
      };
    }));
  });
}

function _parseDateByTitle(title) {
  var regex = /(\d+)/;
  var matches = regex.exec(title);

  if (!matches) { return null; }
  var days = parseInt(matches[1], 10);

  var lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  lastMonth.setDate(days);

  var thisMonth = new Date();
  thisMonth.setDate(days);

  // 現在日時に近い方を採用する
  var now = new Date();
  var diffLastMonth = Math.abs(now - lastMonth);
  var diffThisMonth = Math.abs(now - thisMonth);
  return diffLastMonth < diffThisMonth ? lastMonth : thisMonth;
}

function _parseMenuList($, menuList) {
  var items = menuList.find('li');
  return _.map(items, function (i) { return $(i).text(); });
}

function _parseCalorie(menuList) {
  return menuList.find('.menu_calorie').text() || null;
}

module.exports = fetchMenus;
