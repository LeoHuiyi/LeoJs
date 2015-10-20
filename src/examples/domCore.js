import {leoDom} from "../dom/core.js";

leoDom.ready(function(){
    let iframeDoc = leoDom.$('#iframe')[0].contentWindow.document;
    console.log(leoDom.$(leoDom.$tag('span')), $(leoDom.$tag('span')))
    console.log(leoDom.$(leoDom.$qsa('span')), $(leoDom.$qsa('span')))
    console.log(leoDom.$(leoDom.$qsa('abc')), $(leoDom.$qsa('sdfsd')))
    console.log(leoDom.$('input[type=button]'));
    console.log(leoDom.$id('div'));
    console.log(leoDom.$tag('span'));
    console.log(leoDom.$class('class'));
    console.log(leoDom.$qs('input[type=button]'));
    console.log(leoDom.$qsa('input[name=leotc]'));
    console.log(leoDom.$newHtml('<div id="new"><table></table></div>'));
    console.log(leoDom.$('<div id="new"><table></table></div>'));
    console.log(iframeDoc);
    console.log($('body', iframeDoc));
    console.log(leoDom.$('body', iframeDoc));
    console.log(leoDom.$({selector: 'body', context: iframeDoc}));
    console.log(leoDom.$is({selector: 'body', context: iframeDoc}, '.leo'));
    console.log(leoDom.$is('#div', 'div'))
    console.log(leoDom.$filter('.leo', 'span'))
    console.log(leoDom.$not('.leo', 'span'))
    console.log(leoDom.$find('.leo', 'span'))
    console.log(leoDom.$add('.leo', 'span'))
    console.log($('.leo').add('span'))
    console.log($('<div>', document.getElementsByTagName('span')))
    console.log(leoDom.$('<div>', 'span'))
    console.log(leoDom.$has('.leo', 'span'))
    console.log($('.leo').has('span'))
    console.log(leoDom.$('.leo', '[name=only]'))
    console.log($('.leo', '[name=only]'))
    console.log(leoDom.$closest('.item-1', '.item-ii', document.getElementById('ul')))
    console.log($('.item-1').closest('.item-ii', document.getElementById('ul')))
});

leoDom.ready(function(){
    console.log(leoDom.$id('div'));
});

console.log(leoDom.$('#div'));
