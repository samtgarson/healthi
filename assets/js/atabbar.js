//Register Tab bar buttons
Vue.component('tab-done', {
    template: '#tabTpl',
    data: {
        icon: 't',
        text: 'done'
    },
    methods: {
        click: function() {
            app.$.View.$.cardref[app.$.View.currentGoal].complete();
            app.$.View.$.tabInfo.reset(); // Reset info state
            app.$.View.$.tabSkip.reset(); // Reset skip state
        },
        change: tabChange,
        reset: function() {
            if (this.text == 'cancel') {
                this.change(this, 't', 'done');
            }
        }
    }
});

// SKIP
Vue.component('tab-skip', {
    template: '#tabTpl',
    data: {
        icon: 's',
        text: 'skip'
    },
    methods: {
        click: function() {
            app.$.View.$.tabInfo.reset(); // Reset info state
            if (this.text=="skip") {
                this.change(this, 'b', 'cancel'); // Change text
                app.$.View.skipping = true; // open skip drawer
            } else {
                this.reset();
            }
            
        },
        change: tabChange,
        reset: function() {
            app.$.View.skipping = false;
            if (this.text == 'cancel') {
                this.change(this, 's', 'skip');
            }
        }
    }
});

// INFO
Vue.component('tab-info', {
    template: '#tabTpl',
    data: {
        icon: 'i',
        text: 'info'
    },
    methods: {
        click: function() {
            app.$.View.$.tabSkip.reset(); // Reset skip state

            this.change(this, (this.text=='cancel')?'i' : 'b', (this.text=='cancel')?'info' : 'cancel'); //Toggle text
            app.$.View.$.cardref[app.$.View.currentGoal].flip(); // Toggle info state
        },
        change: tabChange,
        reset: function() {
            app.$.View.$.cardref[app.$.View.currentGoal].flipped == false;
            if (this.text == 'cancel') {
                this.change(this, 'i', 'info');
            }
        }
    }
});

Vue.component('tab-comment', {
    template: '#tabTpl',
    data: {
        icon: 'c',
        text: 'comment'
    },
    methods: {
        click: function() {
            // app.$.View.$.cardref[app.$.View.currentGoal].flip();
        },
        change: tabChange,
        reset: function() {
            if (this.text == 'cancel') {
                this.change(this, 'c', 'comment');
            }
        }
    }
});

// Register Skipper component
Vue.component('skipper', {
    template: '#skipTpl',
    replace: true,
    methods: {
        skip: function() {
            app.$.View.$.cardref[app.$.View.currentGoal].skip(); // Skip Card
            app.$.View.$.tabSkip.reset();
        }
    }
});

// Change tab icon
function tabChange(tab, newIcon, newText) {
    $(tab.$el).animate({'textIndent': '40px'}, 150, 'easeOutCubic', function(){
        tab.icon = newIcon;
        tab.text = newText;
        $(tab.$el).css('textIndent', '-50px').promise().done(function(){
            $(tab.$el).animate({'textIndent': '0px'}, 150, 'easeInQuad');
        });
    });
}
// Define references