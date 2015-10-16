import leoJs from "../index.js";

console.log(leoJs.id, leoJs.version, leoJs.dom)
let leoDom = leoJs.dom;
leoDom.$data('a', 'leo', 'hahah');
leoDom.$on(document, 'click', 'a', function(event){
    event.preventDefault();
    console.log(this, event, leoDom.$data(event.target, 'leo'));
});
