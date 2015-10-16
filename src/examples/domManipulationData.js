import "../dom/data.js";
import {leoDom} from "../dom/manipulation.js";

// let remove = leoDom.$('.remove');
// console.log(leoDom.$data(remove, 'leo', '2342342342'))
// console.log(leoDom.$data(remove, 'leo'))
// console.log(leoDom.$remove('.remove'))
// console.log(leoDom.$data(remove, 'leo'))

// let emptySp = leoDom.$('#emptySp');
// console.log(leoDom.$data(emptySp, {'leo': '2342342342', 'leo1': 'hahah'}))
// console.log($(emptySp).data({'leo': '2342342342', 'leo1': 'hahah'}))
// console.log(leoDom.$data(emptySp))
// console.log($(emptySp).data())
// console.log(leoDom.$empty('.empty'))
// console.log($('.empty').empty())
// console.log(leoDom.$data(emptySp))
// console.log($(emptySp).data());

// let textSp = leoDom.$('#textSp');
// console.log(leoDom.$data(textSp, {'leo': '2342342342', 'leo1': 'hahah'}))
// console.log($(textSp).data({'leo': '2342342342', 'leo1': 'hahah'}))
// leoDom.$removeData(textSp, ['leo', 'leo1'])
// $(textSp).removeData(['leo', 'leo1'])
// console.log(leoDom.$data(textSp))
// console.log($(textSp).data())
// // console.log(leoDom.$text('.text'))
// // console.log($('.text').text())
// console.log(leoDom.$text('.text', 'hahahah'))
// console.log($('.text').text('hahahah'))
// console.log(leoDom.$data(textSp))
// console.log($(textSp).data())

// let clone = leoDom.$('.clone');

// console.log(leoDom.$data(clone, {'leo': '2342342342', 'leo1': 'hahah'}));
// console.log($(clone).data({'leo': '2342342342', 'leo1': 'hahah'}));
// console.log(leoDom.$data(clone));

// let clone1 = leoDom.$clone(clone, true);
// let $clone1 = $(clone).clone(true);

// // console.log(clone1)

// console.log(leoDom.$data(clone1), $clone1.data())

// let htmlIn = leoDom.$('.html-in');

// console.log(leoDom.$html('.html'));
// console.log($('.html').html());

// leoDom.$data(htmlIn, {'leo': '2342342342', 'leo1': 'hahah'});
// $(htmlIn).data({'leo': '2342342342', 'leo1': 'hahah'});
// console.log(leoDom.$data(htmlIn),'=====',$(htmlIn).data());

// leoDom.$html('.html', function(elem, i, html){
//     console.log(elem, i, html);
//     return html;
// });
// $('.html').html(function(i, html){
//     console.log(this, i, html);
//     return html;
// });

// // leoDom.$html('.html', '<div><sapn><table><tr><td>leo</td></tr></table></sapn></div>');
// // $('.html').html('<div><sapn><table><tr><td>leo</td></tr></table></sapn></div>');

// console.log(leoDom.$data(htmlIn),'=====',$(htmlIn).data());

// let ap = leoDom.$('.ap');

// leoDom.$append('.inner', '<p>Test</p>');
// $('.inner').append('<p>Test</p>');
// leoDom.$append('.inner', [ap, '<p>Test</p>']);
// $('.inner').append([$(ap), '<p>Test</p>']);

// leoDom.$append('.inner', document.createTextNode("leoleoleo"));
// $(".inner").append(document.createTextNode("leoleoleo"));
// leoDom.$append('.inner', function(elem, i, html){
//     console.log(elem, i, html);
//     return html + 'leo';
// });
// $('.inner').append(function(i, html){
//     console.log(this, i, html);
//     return html + 'leo';
// });

// leoDom.$prepend('.inner', '<p>Test</p>');
// $('.inner').prepend('<p>Test</p>');
// leoDom.$prepend('.inner', [ap, '<p>Test</p>']);
// $('.inner').prepend([$(ap), '<p>Test</p>']);

// leoDom.$prepend('.inner', document.createTextNode("leoleoleo"));
// $(".inner").prepend(document.createTextNode("leoleoleo"));
// leoDom.$prepend('.inner', function(elem, i, html){
//     console.log(elem, i, html);
//     return html + 'leo';
// });
// $('.inner').prepend(function(i, html){
//     console.log(this, i, html);
//     return html + 'leo';
// });

// leoDom.$before('.inner', '<p>Test</p>');
// $('.inner').before('<p>Test</p>');
// leoDom.$before('.inner', [ap, '<p>Test</p>']);
// $('.inner').before([$(ap), '<p>Test</p>']);

// leoDom.$before('.inner', document.createTextNode("leoleoleo"));
// $(".inner").before(document.createTextNode("leoleoleo"));
// leoDom.$before('.inner', function(elem, i, html){
//     console.log(elem, i, html);
//     return html + 'leo';
// });
// $('.inner').before(function(i, html){
//     console.log(this, i, html);
//     return html + 'leo';
// });

// leoDom.$after('.inner', '<p>Test</p>');
// $('.inner').after('<p>Test</p>');
// leoDom.$after('.inner', [ap, '<p>Test</p>']);
// $('.inner').after([$(ap), '<p>Test</p>']);
// leoDom.$after('.inner', document.createTextNode("leoleoleo"));
// $(".inner").after(document.createTextNode("leoleoleo"));
// leoDom.$after('.inner', function(elem, i, html){
//     console.log(elem, i, html);
//     return html + 'leo';
// });
// $('.inner').after(function(i, html){
//     console.log(this, i, html);
//     return html + 'leo';
// });

// let inner = leoDom.$('.inner');
// leoDom.$data(inner, {'leo': '2342342342', 'leo1': 'hahah'});
// console.log(leoDom.$data(inner));
// $(inner).data({'leo': '2342342342', 'leo1': 'hahah'});
// leoDom.$replaceWith('.inner', '<p>Test</p>');
// $('.inner').replaceWith('<p>Test</p>');
// leoDom.$replaceWith('.inner', [ap, '<p>Test</p>']);
// $('.inner').replaceWith([$(ap), '<p>Test</p>']);

// leoDom.$replaceWith('.inner', document.createTextNode("leoleoleo"));
// $(".inner").replaceWith(document.createTextNode("leoleoleo"));
// leoDom.$replaceWith('.inner', function(elem, i, html){
//     console.log(elem, i, html);
//     return html + 'leo';
// });
// $('.inner').replaceWith(function(i, html){
//     console.log(this, i, html);
//     return html + 'leo';
// });
// console.log(leoDom.$data(inner), $(inner).data());
