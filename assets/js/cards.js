// Register Card template
Vue.component('card', {
    template: '#cardTpl',
    data: {
        ticks: []
    },
    ready: cardReady,
    methods: {
        complete: complete,
        testFunc: test
    }
});

// Init cards
function cardReady() {
    // Create tick lists
    var r = this.repeat;
    var d = this.done;
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