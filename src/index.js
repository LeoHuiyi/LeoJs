/**
+-------------------------------------------------------------------
* LeoJs--index.js
+-------------------------------------------------------------------
* @version    1.0.0 beta
* @author     leo
+-------------------------------------------------------------------
*/

import * as util from "./util/index.js";
import * as Dom from "./dom/index.js";

const LeoJs = {}, LeoJsId = util.api.generateId();

Object.defineProperty(LeoJs, "version", {
    get() {
        return 'LeoJs-1.0';
    },
    enumerable: false,
    configurable: false
});

Object.defineProperty(LeoJs, "id", {
    get() {
        return LeoJsId;
    },
    enumerable: false,
    configurable: false
});

// let s = Symbol('leo');

// console.log(s.toString())

// let dom = new Dom();
// let body = document.getElementById('leo');
//     let a = dom.getDom('.leo').filter('#abc').get();
// console.log(a)

// console.log(body.insertAdjacentHTML('afterend', a))
let dApi = Dom.dApi;
// let a = dApi.$('.leo')
    // console.log(dApi.$is({selector: 'h1', context: dApi.$('#iframe')[0].contentWindow.document}, '.leo'))
    // console.log($('h1').is('.leo'))
    // console.log(dApi.$filter('.leo', 'h1'))
    // console.log($('.leo').filter('h1'))
    // console.log(dApi.$find('#leo', 'h2'))
    // console.log($('#leo').find('h2'))
    // console.log(dApi.$add('#leo', 'h2'))
    // console.log($('#leo').add('h2'))
    // console.log(dApi.$has('.leo', 'h2'))
    // console.log($('.leo').has('h2'))
    // console.log(dApi.$('#iframe')[0].contentWindow.document.body)
    // console.log(dApi.$closest('#in', '#h2', '#leo'))
    // console.log($('#in').closest('#h2', '#leo'))
    // console.log(dApi.$parent('#in', 'div'))
    // console.log($('#in').parent('div'))
    // console.log(dApi.$parents('#in'))
    // console.log($('#in').parents())
    // console.log(dApi.$parentsUntil('h1', 'body', 'div'))
    // console.log($('h1').parentsUntil('body', 'div'))
    // console.log(dApi.$next('#h2', '#eee'))
    // console.log($('#h2').next('#eee'))
    // console.log(dApi.$prev('#h2'))
    // console.log($('#h2').prev())
    // console.log(dApi.$nextAll('#h2', 'h1'))
    // console.log($('#h2').nextAll('h1'))
    // console.log(dApi.$prevAll('#last'))
    // console.log($('#last').prevAll())
    // console.log(dApi.$nextUntil('#frist', '#last', 'div'))
    // console.log($('#frist').nextUntil('#last', 'div'))
    // console.log(dApi.$prevUntil('#last', '#frist', 'h1'))
    // console.log($('#last').prevUntil('#frist', 'h1'))
    // console.log(dApi.$siblings('#last'))
    // console.log($('#last').siblings())
    // console.log(dApi.$children('div'))
    // console.log($('div').children())
    // console.log(dApi.$contents('div'))
    // console.log($('div').contents())
    // console.log(dApi.$remove('.remove'))
    // console.log($('.remove').remove('.span'))
    // console.log(dApi.$empty('#leo'))
    // console.log($('#leo').empty())
    // console.log(dApi.$text('.append',function(elem, i, selector){
    //     console.log(elem, i, selector)
    //     return '34243'
    // }))
    // console.log($('.append').text(function(i, text){
    //     console.log(this, i, text)
    //     return '32424'
    // }))
    // console.log(dApi.$clone('#h2'))
    // console.log($('#h2').clone())
    // console.log(dApi.$append('.append', function(elem, i, elems){
    //     console.log(elem, i, elems)
    //     return i + '';
    // }))
    // console.log($('.append').append(function(i, html){
    //     console.log(this, i, html)
    //     return i + '';
    // }));
    // console.log(dApi.$prepend('.append', 23423, 'h1'))
    // console.log($('.append').prepend($('h1'), [$('#last'), $('.leo')]))
    // console.log(dApi.$before('.append', 'h1', ['#last', '.leo']))
    // console.log($('.append').before($('h1'), [$('#last'), $('.leo')]))
    // console.log(dApi.$after('.append', function(){
    //     return '12312312'
    // }, ['#last', '.leo']))
    // console.log($('.append').after(function(){
    //     return '12312312'
    // }, [$('#last'), $('.leo')]))
    // console.log(dApi.$html('.append', function(elem, i, selector){
    //     console.log(elem, i, selector)
    //     return i + '';
    // }))
    // console.log($('.append').html(function(i, oldhtml){
    //     console.log(this, i, oldhtml)
    //     return i;
    // }))
    // console.log(dApi.$replaceWith('.append', '.append'))
    // console.log($('.append').replaceWith($('.append')))
    // console.log(dApi.$wrapAll('.append', function(elem){
    //     console.log(elem)
    //     return elem;
    // }))
    // console.log($('.append').wrapAll(function(){
    //     console.log(this)
    //     return this;
    // }))
    // console.log(dApi.$not('div', function(elem, i){
    //     console.log(elem, i)
    //     return false;
    // }))
    // console.log($('div').not(function(i, elem){
    //     return false;
    // }))
    // console.log(dApi.$wrapInner('.append', function(elem, i){
    //     console.log(elem, i)
    //     return elem;
    // }))
    // console.log($('.append').wrapInner(function(i, elem){
    //     console.log(this, i)
    //     return this;
    // }))
    // console.log(dApi.$wrap('.append', function(elem, i){
    //     console.log(elem, i)
    //     return elem;
    // }))
    // console.log($('.append').wrap(function(i){
    //     console.log(this, i)
    //     return this;
    // }))
    // console.log(dApi.$unwrap('.unwrap'))
    // console.log($('.unwrap').unwrap('#unwrap1'))
    // console.log(dApi.$prop('input[type="button"]', {'leo': function(node, i){
    //     console.log(node, i)
    //     return false;
    // }, 'lee': function(node, i){
    //     console.log(node, i)
    //     return false;
    // }}))
    // console.log($('input[type="button"]').prop('disabled', function(i, val){

    // }))
    // console.log($('input[type="button"]').prop('leo'))
    // console.log(dApi.$removeProp('input[type="button"]'))
    // console.log($('input[type="button"]').removeProp('leo'))
    // console.log($('input[type="button"]').prop('leo'))
    // console.log(dApi.$removeAttr('input[type="button"]', 'lee'))
    // console.log($('input[type="button"]').removeAttr('leo'))

    // console.log(dApi.$('#multiple option[selected]'));
    // $("#single").val("Single2");
    // $("#multiple").val(["Multiple2", "Multiple3"]);
    // $("input").val(["check1","check2", "radio1"]);
    // console.log($('#textarea').val('2342342'));
    // console.log(dApi.$val('#single'))
    // console.log($("#single").val());
    // console.log(dApi.$val("input", function(node, i){
    //     console.log(node, i)
    //     return i;
    // }));
    // console.log($("input").val(function(i, val){
    //     console.log(this, i, val)
    //     return i;
    // }));

    // $('#box').css( "width","+=200" );
    // console.log(dApi.$css('input', ['width', 'height']))
    // console.log($('input').css("width"))
    // console.log($(window).width())
    // console.log(dApi.$width(window))
    // console.log($('#class').hasClass('leo sdfsdfs'))
    // console.log(dApi.$hasClass('#class', 'leo sdfsdfs'))

    // console.log(dApi.$scrollTop('.demo', 1000))
    // console.log($('.demo').scrollLeft(function(i, left){
    //     console.log(this,i,left)
    //     return 200;
    // }))
    // console.log($('.item-1').offsetParent())
    // console.log(dApi.$offsetParent('.item-1'))
    // console.log($('input').offset({
    //     using(props){
    //         console.log(this, props)
    //     }
    // }))
    // console.log(dApi.$offset('input',{
    //     using(elem, props){
    //         console.log(elem, props)
    //     }
    // }))
    // console.log($('.item-a').position())
    // console.log(dApi.$position('.item-a'))
    // $(function($){
    //     // console.log(this, $('#box'))
    //     // console.log($('#box').css('width'))
    //     // console.log(dApi.$css('#box', 'width'))
    // })

    // $(function($){
    //     console.log(this, $('#box'))
    //     console.log($('#box').css('width'))
    //     console.log(dApi.$css('#box', 'width'))
    // })
    // console.log($('#box').css('width') + 'leo')

    // dApi.$(function(){
    //     console.log(this)
    //     console.log($('#box').css('width'))
    //     console.log(dApi.$css('#box', 'width'))
    // })

    // console.log(dApi.$css('#box', 'width') + 'leo')
    // console.log(dApi.$data('.user', 'user', {'sdfs':'sdfsdf'}))
    // console.log(dApi.$data('.user', 'user', ''))
    // console.log($('.user').data())

dApi.uiPosition(".positionable", {
    of: "#parent",
    my: 'center bottom',
    at: 'center top',
    collision: 'none fit',
    within: window
});

dApi.$()

export default LeoJs;
