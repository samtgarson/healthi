// Register Card template
Vue.component('card', {
    template: '#cardTpl',
    data: {
        ticks: [],
        skipped: false,
        flipped: false
    },
    computed: {
        completed: function() {
            if (this.skipped) return true;
            else return (this.done >= this.repeat);
        }
    },
    ready: cardReady,
    methods: {
        complete: complete,
        skip: skip,
        flip: flip,
        testFunc: test
    }
});

// Register completion message
Vue.component('congrats', {
    template: '#congratsTpl',
    data: {
        choices: ['Nice One!', 'Good Job!', 'Feeling Good!']
    },
    computed: {
        skipped: function() {
            return this.$parent.skipped; // Get the skipped boolean
        },
        msg: function(){
            if (this.skipped) return 'Skipped';
            else { // Return random congrats message
                var l = this.choices.length;
                var i = Math.floor(Math.random()*l);
                return this.choices[i];
            }
        },
        icon: function () { // Return icon
            if (this.skipped) return 'T';
            else return 'T';
        }
    },
    ready: function() {
        var e = this.$el;
        setTimeout(function(){
            $(e)
                .children('div.subject')
                .animate({opacity: 1, marginTop: '0px'}, 200, 'easeOutQuint'); // Fade in Message
        }, 500);
        this.$on('congratsFade', function(index, callback){
            if (index == this.index) {
                $(this.$el)
                    .children('div.subject')
                    .animate({marginTop: '50px', opacity: 0}, 200, 'easeInQuint') // Fade out Message
                    .promise().done(function(){
                        setTimeout(callback, 200); // Insert new goal
                    });
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
    this.flipped = false;
    this.done++;
    this.ticks.$set(this.done-1, true);
    if (this.done == this.repeat) {
        this.$dispatch('replaceCard', this.$index);
    }
}

// Flip a card
function flip() {
    this.flipped = !this.flipped;
}

// Skip a task
function skip() {

    //Reset tab button
    // var skipTab = app.$.View.$.tabSkip;
    // skipTab.change(skipTab, 's', 'skip');
    this.flipped = false;
    this.$parent.skipping = true;
    // this.skipped = true;
    // this.$dispatch('replaceCard', this.$index);
}