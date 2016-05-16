'use strict';

import proxyquire from 'proxyquire';
import test from 'ava';
import tk from 'timekeeper';

const got = function () { return got.impl.apply(null, arguments); };
const tamagoya = proxyquire('../lib/tamagoya', { got });

test('defaultOpts', t => {
  got.impl = function (url, opts) {
    t.is(url, 'http://www.tamagoya.co.jp/menu.html');
    t.truthy(opts.headers['user-agent'].match(/^Mozilla/));
    return Promise.resolve({ body: '' });
  };

  return tamagoya();
});

test('parse', t => {
  got.impl = function (url, opts) {
    return Promise.resolve({
      body: `
<div id="menu_conteiner">
  <div class="menu_title"><p class="menutitle_date">22</p></div>
  <div class="menu_list">
    <ul class="week_menulist">
    <li class="menu_maindish">shrimp</li>
    <li class="menu_arrow">stew</li>
    <li class="menu_arrow">salad</li>
    </ul>
    <p class="menu_calorie">340kcal</p>
  </div>
</div>
`
    });
  };

  tk.travel(new Date(2016, 1, 25));
  return tamagoya().then(list => {
    const menus = list.shift();
    t.is(menus.calorie, '340kcal');
    t.deepEqual(menus.menus, ['shrimp', 'stew', 'salad']);
    t.is(menus.date.getFullYear(), 2016);
    t.is(menus.date.getMonth(), 1);
    t.is(menus.date.getDate(), 22);
  });
});
