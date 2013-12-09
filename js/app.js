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
          "slide:number": "slide"
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
        template     : null,
        i : 1,

        events : {
            "keyup" : "changeSlide"
            //for alternative file load use method "open"
        },

        initialize : function(){
            this.home = new HomeModel({
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

            router.on("route:slide", function(number) {
                var slide = this.home.set("slide", number);
                this.i = number;
                this.result = this.home.fetch(this.home.attributes.slide);

                this.result.done(function(data) {
                    this.render(data, this.home.attributes.slide);
                }.bind(this));
                this.result.error(function(){
                    console.log("Slides end");
                    if (number < 1) {
                        number = 1;
                    } else {
                        number--;
                    }
                    location.hash = "slide" + number;
                }.bind(this));
            }.bind(this));

            //get all files from slides folder
            $.ajax({
                type: "GET",
                url: "http://localhost:1337/getfiles",
                dataType: "jsonp",
                jsonpCallback: "_testcb",
                success: function (data) {
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        console.log(data[i]);
                    }
                }
            });


            //this.template = _.template('<%= name %>');
        },

        changeSlide : function (e) {
            if (e.keyCode === 39 || e.keyCode === 37){
                console.log(e.keyCode);
                if (e.keyCode === 39) {
                    var slide = this.home.set("slide", ++this.i);
                } else if (e.keyCode === 37) {
                    var slide = this.home.set("slide", --this.i);
                }

                location.hash = "slide" + slide.attributes.slide;
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

            //we set the content to our main DOM of the view
            this.$el.html(data);

            return this;
        }
    });

    var router = new Router();
    var test = new HomeView();
    $('#main').append(test.el);

    Backbone.history.start();
 
});
