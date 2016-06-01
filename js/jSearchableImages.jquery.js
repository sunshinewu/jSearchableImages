
(function($) {
  $.fn.jSearchableImages = function($imgs,$searchBox) {
    var cache = [];

    // add all images to cache
    $imgs.each(function() {
      cache.push({
        imgElement: this,
        text: this.alt.trim().toLowerCase()
      });
    });

    //Set DOM elements transparency
    function setOpacity(node, opacity) {
      node = typeof node == "string" ? document.getElementById(node) : node;
      if (node.style.opacity != undefined) {
        //Compatible with Firefox\Chrome & new IE version
        node.style.opacity = opacity / 100;
      } else {
        //Compatible with old IE version
        node.style.filter = "alpha(opacity=" + opacity + ")";
      }
    }

    //FadeOut native implementation
    function fadeOut(elem, speed, opacity){
       speed = speed || 10;
       opacity = opacity || 0;
       var val = 100;
       (function() {
         setOpacity(elem, val);
         val -= 5;
         if (val >= opacity) {
           setTimeout(arguments.callee, speed);
         } else if (val < 0) {
           elem.style.display = 'none';
         }
       })();
     }

    //FadeIn native implementation
    function fadeIn(elem, speed, opacity) {
      speed = speed || 10;
      opacity = opacity || 100;
      elem.style.display = '';
      setOpacity(elem,0);
      var val = 0;
      (function() {
        setOpacity(elem,val);
        val += 5;
        if(val <= opacity) {
          setTimeout(arguments.callee, speed);
        } else {
           elem.style.display = '';
        }
      })()
    }


    function filter() {
      var query = this.value.trim().toLowerCase();
      cache.forEach(function(img) {
        var index = 0;
        if (query) {
          index = img.text.indexOf(query);
        }
        //animation style
        if (index === -1) {
           fadeOut(img.imgElement);
        } else {
           fadeIn(img.imgElement);
        }
        //  img.imgElement.style.display = index === -1 ? 'none' : '';  //no animation style
        });
    }

    if ('oninput' in $searchBox[0]) {
      $searchBox.on('input',filter);
    } else {
      $searchBox.on('keydown',filter);
    }

    return this;
  }

})(jQuery);
