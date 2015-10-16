import "../dom/manipulation.js";
import {
    leoDom
}
from "../dom/animate.js";
// $(leoDom.$('.leo')).transition({
//     x: 100,
//     y: 100
// });
// leoDom.$transition('.leo', {
//     x: 100,
//     y: 100
// });

let leo = leoDom.$('.leo');

let cb1 = function(next){
    console.log(1111);
}

let cb2 = function(next){
    console.log(2222);
}

// $.queue(leo[0], 'leo', [cb1, cb2]);

// leoDom.queue(leo[0], 'leo', [cb1, cb2]);

// console.log($.queue(leo[0], 'leo'));

// console.log(leoDom.queue(leo[0], 'leo'));

// leoDom.dequeue(leo[0], 'leo');

// console.log(leoDom.queue(leo[0], 'leo'));

// leoDom.dequeue(leo[0], 'leo');

// console.log(leoDom.queue(leo[0], 'leo'));

// leoDom.dequeue(leo[0], 'leo');

// console.log(leoDom.queue(leo[0], 'leo'));

// $.dequeue(leo[0], 'leo');

// console.log($.queue(leo[0], 'leo'));

// $.dequeue(leo[0], 'leo');

// console.log($.queue(leo[0], 'leo'));

// $.dequeue(leo[0], 'leo');

// console.log($.queue(leo[0], 'leo'));




// $.queue(leo[0], 'fx', [cb1, cb2]);

// leoDom.queue(leo[0], 'fx', [cb1, cb2]);

// console.log($.queue(leo[0]));

// console.log(leoDom.queue(leo[0]));

// leoDom.dequeue(leo[0]);

// console.log(leoDom.queue(leo[0]));

// leoDom.dequeue(leo[0]);

// console.log(leoDom.queue(leo[0]));

// leoDom.dequeue(leo[0]);

// console.log(leoDom.queue(leo[0]));

// $.dequeue(leo[0]);

// console.log($.queue(leo[0]));

// $.dequeue(leo[0]);

// console.log($.queue(leo[0]));

// $.dequeue(leo[0]);

// console.log($.queue(leo[0]));



// $(leo).queue('leo', [cb1, cb2]);

// console.log($(leo).queue('leo'));

// leoDom.$queue(leo, 'leo', [cb1, cb2]);

// console.log(leoDom.$queue(leo, 'leo'));

// leoDom.$dequeue(leo, 'leo');

// console.log(leoDom.$queue(leo, 'leo'));

// leoDom.$dequeue(leo, 'leo');

// console.log(leoDom.$queue(leo, 'leo'));

// leoDom.$dequeue(leo, 'leo');

// console.log(leoDom.$queue(leo, 'leo'));

// $(leo).dequeue('leo');

// console.log($(leo).queue('leo'));

// $(leo).dequeue('leo');

// console.log($(leo).queue('leo'));

// $(leo).dequeue('leo');

// console.log($(leo).queue('leo'));


// $(leo).queue([cb1, cb2]);

// console.log($(leo).queue());

// leoDom.$queue(leo, [cb1, cb2]);

// console.log(leoDom.$queue(leo));

// leoDom.$dequeue(leo);

// console.log(leoDom.$queue(leo));

// leoDom.$dequeue(leo);

// console.log(leoDom.$queue(leo));

// // leoDom.$dequeue(leo);

// // console.log(leoDom.$queue(leo));

// $(leo).dequeue();

// console.log($(leo).queue());

// $(leo).dequeue();

// console.log($(leo).queue());

// // $(leo).dequeue('leo');

// // console.log($(leo).queue('leo'));

let c1 = function(next){
    console.log(1111);
    // console.log(this, next);
    next();
}

let c2 = function(next){
    console.log(2222);
    // console.log(this, next);
    // next();
}

let cl1 = function(elem, next){
    console.log(1111);
    // console.log(elem, next);
    next();
}

let cl2 = function(elem, next){
    console.log(2222);
    // console.log(elem, next);
    // next();
}

$(leo).queue([c1, c2]);

console.log($(leo).queue());

$(leo).clearQueue();

console.log($(leo).queue());

leoDom.$queue(leo, [cl1, cl2]);

console.log(leoDom.$queue(leo));

leoDom.$clearQueue(leo);

console.log(leoDom.$queue(leo));


let group, test;

(function($) {
    function addTestEvents($test) {
        $test.bind('mouseenter', function() {
            var $test = $(this).closest('.test');
            $test.trigger('reset');
            var $box = $test.find('.box:not(.ghost)');
            var $ghost = $box.clone().addClass('ghost').appendTo($test.find('.area'));

            $test.data('code').fn($box, $test);
        });

        $test.bind('mouseleave reset', function() {
            var $test = $(this).closest('.test');
            var $ghost = $test.find('.ghost');
            if ($ghost.length) {
                $test.find('.box:not(.ghost)').remove();
                $test.find('.ghost').removeClass('ghost');
            }
        });
    }

    function testFn(name, fn) {
        var i = $('.tests .test').length;
        var $test = $('<div class="test"><h3></h3><div class="area"><div class="box"></div></div><pre class="code"></pre></div>');

        var m = fn.toString().match(/\{([\s\S]*)\}$/);
        var code = m[1];
        code = code.replace(/^\s*|\s*$/g, '');
        code = code.replace(/\n {4}/g, "\n");
        name = name.replace(/\(.*\)/, function(n) {
            return "<em>" + n.substr(1, n.length - 2) + "</em>";
        });

        $test.attr('id', 'test-' + i);
        $test.find('h3').html(name);
        $test.find('pre').text(code);
        $test.data('code', {
            fn: fn
        });
        addTestEvents($test);

        $('.tests').append($test);
    }

    function groupFn(name) {
        $('.tests').append($('<h4 class="group-heading">').text(name));
    }

    group = groupFn;
    test = testFn;
})(jQuery);

group('Transformations');
test('Translation', function($box) {
    leoDom.$transition($box[0], {
        x: 20,
        y: 20
    });
});
test('Rotate', function($box) {
    leoDom.$transition($box[0], {
        rotate: 45
    });
});
test('Rotate via string', function($box) {
    leoDom.$transition($box[0], {
        rotate: '45deg'
    });
});
test('Skew X', function($box) {
    leoDom.$transition($box[0], {
        skewX: 30
    });
});
test('Skew Y', function($box) {
    leoDom.$transition($box[0], {
        skewY: 30
    });
});
test('Skew XY', function($box) {
    leoDom.$transition($box[0], {
        skewY: 30,
        skewX: 30
    });
});
test('Scale up', function($box) {
    leoDom.$transition($box[0], {
        scale: 2
    });
});
test('Scale down', function($box) {
    leoDom.$transition($box[0], {
        scale: 0.5
    });
});
group('3D transformations');
test('Rotate X', function($box) {
    leoDom.$transition($box[0], {
        perspective: '500px',
        rotateX: 180
    });
});
test('Rotate Y', function($box) {
    leoDom.$transition($box[0], {
        perspective: '500px',
        rotateY: 180
    });
});
test('Rotate X/Y', function($box) {
    leoDom.$transition($box[0], {
        perspective: '500px',
        rotateX: 180,
        rotateY: 180
    });
});
group('Params');
test('Delay', function($box) {
    leoDom.$transition($box[0], {
        rotate: 45,
        delay: 2000
    });
});
test('Delay zero', function($box) {
    leoDom.$transition($box[0], {
        x: 50,
        delay: 0
    });
    leoDom.$transition($box[0], {
        x: 0
    });
});
test('Ease (should be snappy)', function($box) {
    leoDom.$transition($box[0], {
            x: 100
        }, 500,
        'cubic-bezier(0,0.9,0.3,1)');
});
group('Chaining');
test('Queueing', function($box) {
    leoDom.$transition($box[0], {
        x: 50
    });
    leoDom.$transition($box[0], {
        x: 0
    });
    leoDom.$transition($box[0], {
        y: 50
    });
    leoDom.$transition($box[0], {
        y: 0
    });
});
test('Duration 0 (should not flicker)', function($box) {
    leoDom.$transition($box[0], {
        x: 50
    }, 0);
    leoDom.$transition($box[0], {
        x: 0
    }, 0);
    leoDom.$transition($box[0], {
        y: 50
    }, 0);
});
group('Callbacks');
test('2nd param', function($box) {
    leoDom.$transition($box[0], {
            rotate: 45
        },
        function() {
            leoDom.$html($box[0], 'OK');
        });
});
test('3rd param', function($box) {
    leoDom.$transition($box[0], {
            rotate: 45
        },
        500,
        function() {
            leoDom.$html($box[0], 'OK');
        });
});
test('as "complete"', function($box) {
    leoDom.$transition($box[0], {
        rotate: 45,
        complete: function() {
            leoDom.$html($box[0], 'OK');
        }
    });
});
group('Misc');
test('CSS with Transition', function($box) {
    leoDom.$css($box[0], {
        x: -50
    });
    leoDom.$transition($box[0], {
        x: 50
    });
});
test('Opacity', function($box) {
    leoDom.$transition($box[0], {
        opacity: 0
    });
});
test('Transition of transform (no jump first time)', function($box) {
    leoDom.$transition($box[0], {
        transform: "translateX(80px)"
    });
});

// function timeout(ms) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, ms);
//     });
// }

// async function asyncPrint(value, ms) {
//     console.time('leo');
//     await timeout(ms);
//     console.timeEnd('leo');
//     console.log(value)
// }

// asyncPrint('hello world', 5000);
