// Register Card template
Vue.component('card', {
    template: '#cardTpl',
    data: {
        ticks: []
    },
    computed: {
        completed: function() {
            return (this.done >= this.repeat);
        }
    },
    ready: cardReady,
    methods: {
        complete: complete,
        testFunc: test
    }
});

Vue.component('congrats', {
    template: '#congratsTpl',
    data: {
        choices: ['Nice One!', 'Good Job!', 'Feeling Good!']
    },
    computed: {
        msg: function(){
            var l = this.choices.length;
            var i = Math.floor(Math.random()*l);
            console.log(l, i);
            return this.choices[i];
        }
    },
    ready: function() {
        $(this.$el).animate({opacity: '1', marginTop: '20px'}, 300);
        this.$on('congratsFade', function(index, callback){
            if (index == this.index) {
                $(this.$el).animate({marginTop: '100%', opacity: 0}, 300).promise().done(function(){setTimeout(callback, 200);});
            }
        });
    }
});

// Init cards
function cardReady() {
    // Create tick lists
    var r = this.repeat;
    var d = this.done;
    var t = this;
    setTimeout(function() {
        t.$el.classList.remove('slideeClosed');
    }, 200);
    this.ticks = [];
    for (var j= 0; j < r; j++) {
        var b = (j < d) ? true : false;
        this.ticks.push(b);
    }
}

// Complete a task
function complete() {
    this.done++;
    this.ticks.$set(this.done-1, true);
    if (this.done == this.repeat) {
        this.$dispatch('replaceCard', this.$index);
    }
}