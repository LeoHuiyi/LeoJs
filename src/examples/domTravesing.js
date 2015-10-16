import {leoDom} from "../dom/traversing.js";

// console.log(leoDom.$parent('li.item-a', '.level-2'));
// console.log($('li.item-a').parent('.level-2'));

// console.log(leoDom.$parents('li.item-a'), leoDom.$parents('li.item-a', 'ul'))
// console.log($('li.item-a').parents(), $('li.item-a').parents('ul'))

// let ul = leoDom.$('ul')[0];
// console.log(leoDom.$parentsUntil('li.item-a'), leoDom.$parentsUntil('li.item-a', '.level-1'), leoDom.$parentsUntil('li.item-a', '.level-1', 'ul'), leoDom.$parentsUntil('li.item-a', ul, 'ul'));
// console.log($('li.item-a').parentsUntil(), $('li.item-a').parentsUntil('.level-1'), $('li.item-a').parentsUntil('.level-1', 'ul'), leoDom.$parentsUntil('li.item-a', ul, 'ul'));

// console.log(leoDom.$next('.third-item'), leoDom.$next('.third-item', '.next'));
// console.log($('.third-item').next(), $('.third-item').next('.next'));

// console.log(leoDom.$nextAll('.third-item'), leoDom.$nextAll('.third-item', '.next'));
// console.log($('.third-item').nextAll(), $('.third-item').nextAll('.next'));

// let ul = leoDom.$('.next');
// console.log(leoDom.$nextUntil('.third-item'), leoDom.$nextUntil('.third-item', '.next'), leoDom.$nextUntil('.third-item', '.next', 'li'), leoDom.$nextUntil('.third-item', ul, 'li'));
// console.log($('.third-item').nextUntil(), $('.third-item').nextUntil('.next'), $('.third-item').nextUntil('.next', 'li'),$('.third-item').nextUntil(ul, 'li'));

// console.log(leoDom.$prev('.third-item'), leoDom.$prev('.third-item', 'li'));
// console.log($('.third-item').prev(), $('.third-item').prev('li'));

// console.log(leoDom.$prevAll('.third-item'), leoDom.$prevAll('.third-item', '.prev'));
// console.log($('.third-item').prevAll(), $('.third-item').prevAll('.prev'));

// let ul = leoDom.$('.prev');
// console.log(leoDom.$prevUntil('.third-item'), leoDom.$prevUntil('.third-item', '.prev'), leoDom.$prevUntil('.third-item', '.prev', 'li'), leoDom.$prevUntil('.third-item', ul, 'li'));
// console.log($('.third-item').prevUntil(), $('.third-item').prevUntil('.prev'), $('.third-item').prevUntil('.prev', 'li'), $('.third-item').prevUntil(ul, 'li'));

// console.log(leoDom.$children('.level-3'), leoDom.$children('.level-3', '.item-3'));
// console.log($('.level-3').children(), $('.level-3').children('.item-3'));

// console.log(leoDom.$contents('html'));
// console.log($('html').contents());

// console.log(leoDom.$siblings('.third-item'), leoDom.$siblings('.third-item', '.haha'));
// console.log($('.third-item').siblings(), $('.third-item').siblings('.haha'));
