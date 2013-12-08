require.config({
  baseUrl: "./js/",
  paths: {
    jquery: 'lib/jquery-1.8.2',
    underscore: 'lib/underscore-1.4.2',
    backbone: 'lib/backbone-0.9.2'
  },
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    }
  }
});

require([
    'jquery',
    'backbone'
    ], function($, Backbone ) {

    var Router = Backbone.Router.extend({
        routes: {
          "": "main"
        },

        main: function(){

        }
    });

    var HomeModel = Backbone.Model.extend({
       sync : function(method, model, options) {
            return $.ajax({
                url: "/slides/slide" + model.attributes.slide + ".html",
                success : options.success,
                error : options.error
            });
       }
    });
   //Backbone code - begin
    var HomeView = Backbone.View.extend({
        id         : "hello-world-id",
        tagName     : "div",
        className     : "hello-world",
        template     : null,
        i : 1,

        events : {
            "keyup" : "changeSlide"
            //for alternative file load use method "open"
        },

        initialize : function(){
            this.home = new HomeModel({
                name: 'world',
                id : 1,
                slide : 1
            });
            //alterntive file load
            //this.open();
            this.result = this.home.fetch(this.home.attributes.slide);

            this.result.done(function(data) {
                this.render(data, this.home.attributes.slide);
            }.bind(this));

            $('body').on({
                'keyup': this.changeSlide.bind(this)
            });

            this.template = _.template('<%= name %>');

            //this.home.on("change", this.render, this);

        },

        changeSlide : function (e) {
            if (e.keyCode === 39 || e.keyCode === 37){
                console.log(e.keyCode);
                if (e.keyCode === 39) {
                    var slide = this.home.set("slide", ++this.i);
                } else if (e.keyCode === 37) {
                    var slide = this.home.set("slide", --this.i);
                }

                this.result = this.home.fetch(slide);

                this.result.done(function(data) {
                    this.render(data, this.i);
                }.bind(this));

                this.result.error(function(){
                    console.log("Slides ended");
                    if (e.keyCode === 39) {
                        this.i--;
                        console.log(this.i);
                    } else if (e.keyCode === 37) {
                        this.i++;
                        console.log(this.i);
                    }
                }.bind(this));
            }
        },

        //alternative file load
        /*open : function() {
            var that = this;

            $.get( './slides/slide2.html', function (data) {
                template = _.template(data, {  });
                that.$el.html(template);
            }, 'html');
        },*/

        render : function(data, slide) {
            console.log(data);

            //location.hash = "slide" + slide;

            //we set the content to our main DOM of the view
            this.$el.html(data);

            return this;
        }
    });
    //Backbone code - end

    var test = new HomeView();
    $('#main').append(test.el);

    var router = new Router();
    Backbone.history.start();
 
});
