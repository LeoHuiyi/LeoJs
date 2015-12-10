import {
    leoDom
}
from "../dom/attr.js";

// console.log(leoDom.$prop('input', 'checked'));
// console.log($('input').prop('checked'));

// leoDom.$prop('input', 'checked', true);
// $('input').prop('checked', true);

// leoDom.$prop('input', {'checked': false, 'disabled': false});
// $('input').prop({'checked': false, 'disabled': false});

// leoDom.$prop('input', 'checked', function(elem, i, val){
//     console.log(elem, i, val);
//     return !val;
// });
// $('input').prop('checked', function(i, val){
//     console.log(this, i, val);
//     return !val;
// });

// leoDom.$prop('input', {'leo1': 12123, 'leo2': 1231231});
// $('input').prop({'leo1': false, 'leo2': false});

// console.log(leoDom.$prop('input', 'leo1'));
// console.log($('input').prop('leo2'));

// leoDom.$removeProp('input', 'leo1');
// $('input').removeProp('leo2');

// console.log(leoDom.$prop('input', 'leo1'));
// console.log($('input').prop('leo2'));



// console.log(leoDom.$attr('.greatphoto', 'alt'));
// console.log($('.greatphoto').attr('alt'));

// leoDom.$attr('.greatphoto', 'alt', 'hahahaahhaha');
// $('.greatphoto').attr('alt', 'hahahaahhaha');

// leoDom.$attr('.greatphoto', {'alt': 'oooooo', 'leo': 'tctctc'});
// $('.greatphoto').attr({'alt': 'oooooo', 'leo': 'tctctc'});

// leoDom.$attr('.greatphoto', 'alt', function(elem, i, attr){
//     console.log(elem, i, attr);
//     return !attr;
// });
// $('.greatphoto').attr('alt', function(i, attr){
//     console.log(this, i, attr);
//     return !attr;
// });

// leoDom.$removeAttr('.greatphoto', 'alt src');
// $('.greatphoto').removeAttr('alt src');

// console.log(leoDom.$val("#single"))
// console.log($("#single").val());
// leoDom.$val("#single", 'Single');
// $("#single").val('Single')
// console.log(leoDom.$val("#multiple"));
// console.log($("#multiple").val());
// leoDom.$val("#multiple", ['Multiple2', 'Multiple1']);
// $("#multiple").val(['Multiple2', 'Multiple1']);
// console.log(leoDom.$val("#multiple"));
// console.log($("#multiple").val())
// console.log(leoDom.$val('input[name=checkboxname]'));
// console.log($('input[name=checkboxname]').val());
// leoDom.$val('input[leo=tc]', ["check1", "check2", "radio1"]);
// $("input[leo=tc]").val(["check1", "check2", "radio1"]);
// leoDom.$val('input[leo=tc]', function(elem, i, val){
//     console.log(elem, i, val);
//     return val;
// });
// $("input[leo=tc]").val(function(i, val){
//     console.log(this, i, val);
//     return val;
// });
// console.log(leoDom.$val('.text') === $('.text').val());
// leoDom.$val('.text', 'leosdfsdfsdfs');
// console.log(leoDom.$val('.text'), $('.text').val());

// console.log(leoDom.$('p:last-of-type'))

// leoDom.$addClass('p:last-of-type', "selected highlight");
// $('p:last-of-type').addClass("selected highlight");
// leoDom.$addClass('p:last-of-type', function(elem, i, cls){
//     console.log(elem, i, cls);
//     return 'aaa';
// });
// $('p:last-of-type').addClass(function(i, cls){
//     console.log(this, i, cls);
//     return 'vvv'
// });
// console.log(leoDom.$hasClass('p:last-of-type','highlight'));
// leoDom.$removeClass('p:last-of-type', "highlight");
// leoDom.$removeClass('p:last-of-type', function(elem, i, cls){
//     console.log(elem, i, cls);
//     return 'aaa';
// });
// $('p:last-of-type').removeClass(function(i, cls){
//     console.log(this, i, cls);
//     return 'vvv'
// });
// console.log(leoDom.$hasClass('p:last-of-type','selected highlight'));
// $("p:last").addClass("selected highlight");


// $('#btn').on('click', function(event) {
//     event.preventDefault();
//     // $('p').toggleClass("selected highlight");
//     leoDom.$toggleClass('p', "selected highlight");
// });

