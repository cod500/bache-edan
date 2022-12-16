jQuery(document).ready(function() {
    // Stateful record display
    try {
      if (
        Drupal.settings.edan_search.mini_fields &&
        Drupal.settings.edan_search.mini_fields.length > 0 &&
        Drupal.settings.edan_search.mini_fields[0] != ''
      ) {
        // Set state & add button
        jQuery('li.edan-search-result')
          .addClass('mini')
          // .prepend('<span class="edan-search-mini-toggle button">Expand</span>');
          .prepend('<span class="edan-search-mini-view button">View Record</span>');
  
        // Add mini modifier to DLs
        jQuery.each(Drupal.settings.edan_search.mini_fields, function(key, fld) {
          jQuery('dl.edan-search-' + fld).addClass('mini');
        });
  
        // Add button event
      //jQuery('span.edan-search-mini-toggle').click(function(ev) {
        jQuery('span.edan-search-mini-view').click(function(ev) {
          ev.preventDefault();
          var me = jQuery(this);
          // var txt = me.text();
          // if (txt == 'Expand') {
          //   me.text('Collapse');
          //   me.parents('li.edan-search-result').addClass('active');
          // } else {
          //   me.text('Expand');
          //   me.parents('li.edan-search-result').removeClass('active');
          // }
          //Link button to record
          var recordLink = me.next('.edan-row').find('.title a').attr('href');
          window.location.href = recordLink;
        });
  
        
        $(this).wrap('<a href="'+recordLink+'"></a>');
  
      }
    } catch (err) {
    }
  
    jQuery('.slide a').click(function(e) {
      var parent = jQuery(this).parent();
      var href_id = parent.attr("id");
      if(href_id) {
  
        jQuery('.slides .slide').removeClass('active');
        jQuery(this).parent().addClass('active');
  
        // First hide all images
        jQuery('.collection-image').removeClass('hidden').removeClass('active');
        jQuery('.collection-image').addClass('hidden');
        // Then show the selected one
        var target_div = "#collection-image-"+href_id;
        console.log("Looking for " + target_div);
        jQuery(target_div).removeClass('hidden').addClass('active');
  
        // #collection-image-npg_NPG.68.38-0
        // #edanmdm-npg_NPG.68.38-0
        // #edanmdm-npg_NPG.68.38-0-actions
  
        target_div = "#" + href_id + "-actions";
        console.log("Looking for " + target_div);
        var target_actions = jQuery(target_div);
        console.log(target_actions);
  
        // First hide everything
        jQuery('.media-usage-actions').removeClass('active');
        jQuery('.media-usage-actions').removeClass('hidden');
        jQuery('.media-usage-actions').addClass('hidden');
  
        jQuery('.popups .popup').removeClass('hidden');
        jQuery('.popups .popup').addClass('hidden');
  
        // Then show the usage actions for this image
        if(target_actions) {
          target_actions.addClass('active');
          target_actions.removeClass('hidden');
        }
  
      }
  
    });
  
    jQuery('.media-usage-actions .action-item').click(function(e) {
      var classes = jQuery(this).attr("class");
      var div_type = classes.replace("action-item","").trim();
      var popup = jQuery(this).parent().find(".popup."+div_type);
  
      // Then show the selected one
      if(popup && popup.hasClass("hidden")) {
        // First hide all popups
        jQuery(this).parent().find(".popup").removeClass("hidden").addClass("hidden");
        popup.removeClass("hidden");
      }
      else {
        jQuery(this).parent().find(".popup").removeClass("hidden").addClass("hidden");
      }
    });
    (function ($) {
    //function to sort items based on alphabetical or frequency button
      function sortUsingNestedText(parent, childSelector, keySelector) {
        var items = parent.children(childSelector).sort(function(a, b) {
            var vA = $(keySelector, a).text();
            var vB = $(keySelector, b).text();
            vA = vA.replace(/[^a-zA-Z 0-9]+/g, '');
            vB = vB.replace(/[^a-zA-Z 0-9]+/g, '');
            
            //sorting for frequency vs alphabetical 
            if($.isNumeric(vA)){
              vA=parseInt(vA);
              vB=parseInt(vB); 
              return (vA > vB) ? -1 : (vA < vB) ? 1 : 0;
            }else{
              return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
            }
        });
        
        //if statement for writing to page for modal popup table or left column facets
        if(parent.attr('id') === undefined){
          parent.children('tr.culture-table-header').after(items);
        }else{
          parent.children('.si-tab-wrapper').after(items);
        }
      }
      //setting sortkey based on element class
      $('.sAlpha').data("sortKey", "strong.facet-title");
      $('.sFreq').data("sortKey", "span.facet-count");
      $('.sModalAlpha').data("sortKey", "strong.facet-title");
      $('.sModalFreq').data("sortKey", "span.facet-count");
  
      //event for left facet column
      $(".si-tab-wrapper>a.btn").click(function() {
        $(this).removeClass("btn-alt");
        $(this).siblings().addClass("btn-alt");
        var facetId = $(this).parent().parent().attr('id');
        sortUsingNestedText($('#'+facetId), "li.facet", $(this).data("sortKey"));
      });
  
      //event for modal popup
      $(".alpha-filter>.sort-buttons>a.btn").click(function() {
        $(this).removeClass("btn-alt");
        $(this).siblings().addClass("btn-alt");
        var facetTableId = $(this).parent().parent().parent().find("table").attr('id');
        //console.log($(this).parent().parent().parent().find("table").attr('id'));
        //console.log($(this)[ 0 ]);
        sortUsingNestedText($(this).parent().parent().parent().find('table>tbody'), "tr.facet-tr", $(this).data("sortKey"));
  
        switch (facetTableId) {
          case 'culture-table':
            jQuery(culturetf.Mod.paging.btnFirstCont).trigger('click');
            break;
          case 'topic-table':
            jQuery(topictf.Mod.paging.btnFirstCont).trigger('click');
            break;
          case 'date-table':
             jQuery(datetf.Mod.paging.btnFirstCont).trigger('click');
            break;
          case 'object_type-table':
            jQuery(object_typetf.Mod.paging.btnFirstCont).trigger('click');
            break;
          case 'set_name-table':
            jQuery(set_nametf.Mod.paging.btnFirstCont).trigger('click');
            break;
          case 'name-table':
            jQuery(nametf.Mod.paging.btnFirstCont).trigger('click');
            break;
          default:
            jQuery(tf.Mod.paging.btnFirstCont).trigger('click');
        }      
      });
    })(jQuery);
    // Facet hiding
    // jQuery('ul.facets').hide();
    // jQuery('a.category').click(function(ev) {
    //   ev.preventDefault();
    //   console.log(jQuery(this).parent('li').siblings('li'));
    //   jQuery(this).parent('li').siblings('li').removeClass('exand');
    //   jQuery(this).parent('li').toggleClass('expand');
    //   jQuery(this).toggleClass('expand');
    //   // var tar = jQuery(this).attr('href').split('#')[1];
    //   // jQuery('ul.facets:not(#facet-' + tar + ')').hide();
    //   // jQuery('#facet-' + tar).toggle();
    // });
  });;
  !function(s,p,h){function a(t,e){return typeof t===e}function r(t){var e,n=b.className,i=y._config.classPrefix||"";E&&(n=n.baseVal),y._config.enableJSClass&&(e=new RegExp("(^|\\s)"+i+"no-js(\\s|$)"),n=n.replace(e,"$1"+i+"js$2")),y._config.enableClasses&&(n+=" "+i+t.join(" "+i),E?b.className.baseVal=n:b.className=n)}function f(t){return"function"!=typeof p.createElement?p.createElement(t):E?p.createElementNS.call(p,"http://www.w3.org/2000/svg",t):p.createElement.apply(p,arguments)}function g(t){return t.replace(/([a-z])-([a-z])/g,function(t,e,n){return e+n.toUpperCase()}).replace(/^-/,"")}function l(t,e){if("object"==typeof t)for(var n in t)x(t,n)&&l(n,t[n]);else{var i=(t=t.toLowerCase()).split("."),o=y[i[0]];if(2==i.length&&(o=o[i[1]]),void 0!==o)return y;e="function"==typeof e?e():e,1==i.length?y[i[0]]=e:(!y[i[0]]||y[i[0]]instanceof Boolean||(y[i[0]]=new Boolean(y[i[0]])),y[i[0]][i[1]]=e),r([(e&&0!=e?"":"no-")+i.join("-")]),y._trigger(t,e)}return y}function c(t,e,n){var i;for(var o in t)if(t[o]in e)return!1===n?t[o]:a(i=e[t[o]],"function")?function(t,e){return function(){return t.apply(e,arguments)}}(i,n||e):i;return!1}function o(t){return t.replace(/([A-Z])/g,function(t,e){return"-"+e.toLowerCase()}).replace(/^ms-/,"-ms-")}function u(t,e,n,i){var o,r,s,a,l,c="modernizr",u=f("div"),d=((l=p.body)||((l=f(E?"svg":"body")).fake=!0),l);if(parseInt(n,10))for(;n--;)(s=f("div")).id=i?i[n]:c+(n+1),u.appendChild(s);return(o=f("style")).type="text/css",o.id="s"+c,(d.fake?d:u).appendChild(o),d.appendChild(u),o.styleSheet?o.styleSheet.cssText=t:o.appendChild(p.createTextNode(t)),u.id=c,d.fake&&(d.style.background="",d.style.overflow="hidden",a=b.style.overflow,b.style.overflow="hidden",b.appendChild(d)),r=e(u,t),d.fake?(d.parentNode.removeChild(d),b.style.overflow=a,b.offsetHeight):u.parentNode.removeChild(u),!!r}function m(t,e){var n=t.length;if("CSS"in s&&"supports"in s.CSS){for(;n--;)if(s.CSS.supports(o(t[n]),e))return!0;return!1}if("CSSSupportsRule"in s){for(var i=[];n--;)i.push("("+o(t[n])+":"+e+")");return u("@supports ("+(i=i.join(" or "))+") { #modernizr { position: absolute; } }",function(t){return"absolute"==(e=t,n=null,i="position","getComputedStyle"in s?(o=getComputedStyle.call(s,e,n),r=s.console,null!==o?i&&(o=o.getPropertyValue(i)):r&&r[r.error?"error":"log"].call(r,"getComputedStyle returning null, its possible modernizr test results are inaccurate")):o=!n&&e.currentStyle&&e.currentStyle[i],o);var e,n,i,o,r})}return h}function i(t,e,n,i,o){var r=t.charAt(0).toUpperCase()+t.slice(1),s=(t+" "+S.join(r+" ")+r).split(" ");return a(e,"string")||void 0===e?function(t,e,n,i){function o(){s&&(delete B.style,delete B.modElem)}if(i=void 0!==i&&i,void 0!==n){var r=m(t,n);if(void 0!==r)return r}for(var s,a,l,c,u,d=["modernizr","tspan","samp"];!B.style&&d.length;)s=!0,B.modElem=f(d.shift()),B.style=B.modElem.style;for(l=t.length,a=0;a<l;a++)if(c=t[a],u=B.style[c],~(""+c).indexOf("-")&&(c=g(c)),B.style[c]!==h){if(i||void 0===n)return o(),"pfx"!=e||c;try{B.style[c]=n}catch(t){}if(B.style[c]!=u)return o(),"pfx"!=e||c}return o(),!1}(s,e,i,o):c(s=(t+" "+k.join(r+" ")+r).split(" "),e,n)}function t(t,e,n){return i(t,h,h,e,n)}var d=[],v=[],e={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(t,e){var n=this;setTimeout(function(){e(n[t])},0)},addTest:function(t,e,n){v.push({name:t,fn:e,options:n})},addAsyncTest:function(t){v.push({name:null,fn:t})}},y=function(){};y.prototype=e,y=new y;var b=p.documentElement,E="svg"===b.nodeName.toLowerCase(),A=e._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];e._prefixes=A,y.addTest("cssgradients",function(){for(var t,e="background-image:",n="",i=0,o=A.length-1;i<o;i++)t=0===i?"to ":"",n+=e+A[i]+"linear-gradient("+t+"left top, #9f9, white);";y._config.usePrefixes&&(n+=e+"-webkit-gradient(linear,left top,right bottom,from(#9f9),to(white));");var r=f("a").style;return r.cssText=n,-1<(""+r.backgroundImage).indexOf("gradient")}),y.addTest("multiplebgs",function(){var t=f("a").style;return t.cssText="background:url(https://),url(https://),red url(https://)",/(url\s*\(.*?){3}/.test(t.background)}),y.addTest("rgba",function(){var t=f("a").style;return t.cssText="background-color:rgba(150,255,150,.5)",-1<(""+t.backgroundColor).indexOf("rgba")});var x,n,w={}.toString;y.addTest("svgclippaths",function(){return!!p.createElementNS&&/SVGClipPath/.test(w.call(p.createElementNS("http://www.w3.org/2000/svg","clipPath")))}),x=void 0===(n={}.hasOwnProperty)||void 0===n.call?function(t,e){return e in t&&void 0===t.constructor.prototype[e]}:function(t,e){return n.call(t,e)},e._l={},e.on=function(t,e){this._l[t]||(this._l[t]=[]),this._l[t].push(e),y.hasOwnProperty(t)&&setTimeout(function(){y._trigger(t,y[t])},0)},e._trigger=function(t,e){var n;this._l[t]&&(n=this._l[t],setTimeout(function(){for(var t=0;t<n.length;t++)(0,n[t])(e)},0),delete this._l[t])},y._q.push(function(){e.addTest=l}),y.addTest("svgasimg",p.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image","1.1"));var C="Moz O ms Webkit",S=e._config.usePrefixes?C.split(" "):[];e._cssomPrefixes=S;function T(t){var e,n=A.length,i=s.CSSRule;if(void 0===i)return h;if(!t)return!1;if((e=(t=t.replace(/^@/,"")).replace(/-/g,"_").toUpperCase()+"_RULE")in i)return"@"+t;for(var o=0;o<n;o++){var r=A[o];if(r.toUpperCase()+"_"+e in i)return"@-"+r.toLowerCase()+"-"+t}return!1}e.atRule=T;var k=e._config.usePrefixes?C.toLowerCase().split(" "):[];e._domPrefixes=k;var I={elem:f("modernizr")};y._q.push(function(){delete I.elem});var B={style:I.elem.style};y._q.unshift(function(){delete B.style}),e.testAllProps=i;var L=e.prefixed=function(t,e,n){return 0===t.indexOf("@")?T(t):(-1!=t.indexOf("-")&&(t=g(t)),e?i(t,e,n):i(t,"pfx"))};y.addTest("backgroundblendmode",L("backgroundBlendMode","text")),e.testAllProps=t,y.addTest("cssgridlegacy",t("grid-columns","10px",!0)),y.addTest("cssgrid",t("grid-template-rows","none",!0)),y.addTest("flexbox",t("flexBasis","1px",!0)),function(){var t,e,n,i,o,r;for(var s in v)if(v.hasOwnProperty(s)){if(t=[],(e=v[s]).name&&(t.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(n=0;n<e.options.aliases.length;n++)t.push(e.options.aliases[n].toLowerCase());for(i=a(e.fn,"function")?e.fn():e.fn,o=0;o<t.length;o++)1===(r=t[o].split(".")).length?y[r[0]]=i:(!y[r[0]]||y[r[0]]instanceof Boolean||(y[r[0]]=new Boolean(y[r[0]])),y[r[0]][r[1]]=i),d.push((i?"":"no-")+r.join("-"))}}(),r(d),delete e.addTest,delete e.addAsyncTest;for(var _=0;_<y._q.length;_++)y._q[_]();s.Modernizr=y}(window,document),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}(this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var n=this._events=this._events||{},i=n[t]=n[t]||[];return-1==i.indexOf(e)&&i.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var n=this._onceEvents=this._onceEvents||{};return(n[t]=n[t]||[])[e]=!0,this}},e.off=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){var i=n.indexOf(e);return-1!=i&&n.splice(i,1),this}},e.emitEvent=function(t,e){var n=this._events&&this._events[t];if(n&&n.length){var i=0,o=n[i];e=e||[];for(var r=this._onceEvents&&this._onceEvents[t];o;){var s=r&&r[o];s&&(this.off(t,o),delete r[o]),o.apply(this,e),o=n[i+=s?0:1]}return this}},t}),function(e,n){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(t){return n(e,t)}):"object"==typeof module&&module.exports?module.exports=n(e,require("ev-emitter")):e.imagesLoaded=n(e,e.EvEmitter)}(window,function(e,t){function i(t,e){for(var n in e)t[n]=e[n];return t}function o(t,e,n){return this instanceof o?("string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=function(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var n=0;n<t.length;n++)e.push(t[n]);else e.push(t);return e}(t),this.options=i({},this.options),"function"==typeof e?n=e:i(this.options,e),n&&this.on("always",n),this.getImages(),s&&(this.jqDeferred=new s.Deferred),void setTimeout(function(){this.check()}.bind(this))):new o(t,e,n)}function n(t){this.img=t}function r(t,e){this.url=t,this.element=e,this.img=new Image}var s=e.jQuery,a=e.console;(o.prototype=Object.create(t.prototype)).options={},o.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},o.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),!0===this.options.background&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&l[e]){for(var n=t.querySelectorAll("img"),i=0;i<n.length;i++){var o=n[i];this.addImage(o)}if("string"==typeof this.options.background)for(var r=t.querySelectorAll(this.options.background),i=0;i<r.length;i++){var s=r[i];this.addElementBackgroundImages(s)}}};var l={1:!0,9:!0,11:!0};return o.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var n=/url\((['"])?(.*?)\1\)/gi,i=n.exec(e.backgroundImage);null!==i;){var o=i&&i[2];o&&this.addBackground(o,t),i=n.exec(e.backgroundImage)}},o.prototype.addImage=function(t){var e=new n(t);this.images.push(e)},o.prototype.addBackground=function(t,e){var n=new r(t,e);this.images.push(n)},o.prototype.check=function(){function e(t,e,n){setTimeout(function(){i.progress(t,e,n)})}var i=this;return this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?void this.images.forEach(function(t){t.once("progress",e),t.check()}):void this.complete()},o.prototype.progress=function(t,e,n){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&a&&a.log("progress: "+n,t,e)},o.prototype.complete=function(){var t,e=this.hasAnyBroken?"fail":"done";this.isComplete=!0,this.emitEvent(e,[this]),this.emitEvent("always",[this]),this.jqDeferred&&(t=this.hasAnyBroken?"reject":"resolve",this.jqDeferred[t](this))},(n.prototype=Object.create(t.prototype)).check=function(){return this.getIsImageComplete()?void this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),void(this.proxyImage.src=this.img.src))},n.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},n.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},n.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},n.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},n.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},n.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},(r.prototype=Object.create(n.prototype)).check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},r.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},r.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},(o.makeJQueryPlugin=function(t){(t=t||e.jQuery)&&((s=t).fn.imagesLoaded=function(t,e){return new o(this,t,e).jqDeferred.promise(s(this))})})(),o}),function(c,u,d){"use strict";u.infinitescroll=function(t,e,n){this.element=u(n),this._create(t,e)||(this.failed=!0)},u.infinitescroll.defaults={loading:{finished:d,finishedMsg:"<em>Congratulations, you've reached the end of the internet.</em>",img:"data:image/gif;base64,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",msg:null,msgText:"<em>Loading the next set of posts...</em>",selector:null,speed:"fast",start:d},state:{isDuringAjax:!1,isInvalidPage:!1,isDestroyed:!1,isDone:!1,isPaused:!1,isBeyondMaxPage:!1,currPage:1},debug:!1,behavior:d,binder:u(c),nextSelector:"div.navigation a:first",navSelector:"div.navigation",contentSelector:null,extraScrollPx:150,itemSelector:"div.post",animate:!1,pathParse:d,dataType:"html",appendCallback:!0,bufferPx:40,errorCallback:function(){},infid:0,pixelsFromNavToBottom:d,path:d,prefill:!1,maxPage:d},u.infinitescroll.prototype={_binding:function(t){var e=this,n=e.options;if(n.v="2.0b2.120520",n.behavior&&this["_binding_"+n.behavior]!==d)this["_binding_"+n.behavior].call(this);else{if("bind"!==t&&"unbind"!==t)return this._debug("Binding value  "+t+" not valid"),!1;"unbind"===t?this.options.binder.unbind("smartscroll.infscr."+e.options.infid):this.options.binder[t]("smartscroll.infscr."+e.options.infid,function(){e.scroll()}),this._debug("Binding",t)}},_create:function(t,i){var o=u.extend(!0,{},u.infinitescroll.defaults,t);this.options=o;var r=u(c);if(!this._validate(t))return!1;var e=u(o.nextSelector).attr("href");if(!e)return this._debug("Navigation selector not found"),!1;o.path=o.path||this._determinepath(e),o.contentSelector=o.contentSelector||this.element,o.loading.selector=o.loading.selector||o.contentSelector,o.loading.msg=o.loading.msg||u('<div id="infscr-loading"><img alt="Loading..." src="'+o.loading.img+'" /><div>'+o.loading.msgText+"</div></div>"),(new Image).src=o.loading.img,o.pixelsFromNavToBottom===d&&(o.pixelsFromNavToBottom=u(document).height()-u(o.navSelector).offset().top,this._debug("pixelsFromNavToBottom: "+o.pixelsFromNavToBottom));var n=this;return o.loading.start=o.loading.start||function(){u(o.navSelector).hide(),o.loading.msg.appendTo(o.loading.selector).show(o.loading.speed,u.proxy(function(){this.beginAjax(o)},n))},o.loading.finished=o.loading.finished||function(){o.state.isBeyondMaxPage||o.loading.msg.fadeOut(o.loading.speed)},o.callback=function(t,e,n){o.behavior&&t["_callback_"+o.behavior]!==d&&t["_callback_"+o.behavior].call(u(o.contentSelector)[0],e,n),i&&i.call(u(o.contentSelector)[0],e,o,n),o.prefill&&r.bind("resize.infinite-scroll",t._prefill)},t.debug&&(!Function.prototype.bind||"object"!=typeof console&&"function"!=typeof console||"object"!=typeof console.log||["log","info","warn","error","assert","dir","clear","profile","profileEnd"].forEach(function(t){console[t]=this.call(console[t],console)},Function.prototype.bind)),this._setup(),o.prefill&&this._prefill(),!0},_prefill:function(){function t(){return e.options.contentSelector.height()<=n.height()}var e=this,n=u(c);this._prefill=function(){t()&&e.scroll(),n.bind("resize.infinite-scroll",function(){t()&&(n.unbind("resize.infinite-scroll"),e.scroll())})},this._prefill()},_debug:function(){!0===this.options.debug&&("undefined"!=typeof console&&"function"==typeof console.log?1===Array.prototype.slice.call(arguments).length&&"string"==typeof Array.prototype.slice.call(arguments)[0]?console.log(Array.prototype.slice.call(arguments).toString()):console.log(Array.prototype.slice.call(arguments)):Function.prototype.bind||"undefined"==typeof console||"object"!=typeof console.log||Function.prototype.call.call(console.log,console,Array.prototype.slice.call(arguments)))},_determinepath:function(t){var e=this.options;if(e.behavior&&this["_determinepath_"+e.behavior]!==d)return this["_determinepath_"+e.behavior].call(this,t);if(e.pathParse)return this._debug("pathParse manual"),e.pathParse(t,this.options.state.currPage+1);if(t.match(/^(.*?)\b2\b(.*?$)/))t=t.match(/^(.*?)\b2\b(.*?$)/).slice(1);else if(t.match(/^(.*?)2(.*?$)/)){if(t.match(/^(.*?page=)2(\/.*|$)/))return t=t.match(/^(.*?page=)2(\/.*|$)/).slice(1);t=t.match(/^(.*?)2(.*?$)/).slice(1)}else{if(t.match(/^(.*?page=)1(\/.*|$)/))return t=t.match(/^(.*?page=)1(\/.*|$)/).slice(1);this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com."),e.state.isInvalidPage=!0}return this._debug("determinePath",t),t},_error:function(t){var e=this.options;e.behavior&&this["_error_"+e.behavior]!==d?this["_error_"+e.behavior].call(this,t):("destroy"!==t&&"end"!==t&&(t="unknown"),this._debug("Error",t),"end"!==t&&!e.state.isBeyondMaxPage||this._showdonemsg(),e.state.isDone=!0,e.state.currPage=1,e.state.isPaused=!1,e.state.isBeyondMaxPage=!1,this._binding("unbind"))},_loadcallback:function(t,e,n){var i,o,r=this.options,s=this.options.callback,a=r.state.isDone?"done":r.appendCallback?"append":"no-append";if(r.behavior&&this["_loadcallback_"+r.behavior]!==d)this["_loadcallback_"+r.behavior].call(this,t,e);else{switch(a){case"done":return this._showdonemsg(),!1;case"no-append":"html"===r.dataType&&(e=u(e="<div>"+e+"</div>").find(r.itemSelector));break;case"append":var l=t.children();if(0===l.length)return this._error("end");for(i=document.createDocumentFragment();t[0].firstChild;)i.appendChild(t[0].firstChild);this._debug("contentSelector",u(r.contentSelector)[0]),u(r.contentSelector)[0].appendChild(i),e=l.get()}r.loading.finished.call(u(r.contentSelector)[0],r),r.animate&&(o=u(c).scrollTop()+u(r.loading.msg).height()+r.extraScrollPx+"px",u("html,body").animate({scrollTop:o},800,function(){r.state.isDuringAjax=!1})),r.animate||(r.state.isDuringAjax=!1),s(this,e,n),r.prefill&&this._prefill()}},_nearbottom:function(){var t=this.options,e=0+u(document).height()-t.binder.scrollTop()-u(c).height();return t.behavior&&this["_nearbottom_"+t.behavior]!==d?this["_nearbottom_"+t.behavior].call(this):(this._debug("math:",e,t.pixelsFromNavToBottom),e-t.bufferPx<t.pixelsFromNavToBottom)},_pausing:function(t){var e=this.options;if(!e.behavior||this["_pausing_"+e.behavior]===d){switch("pause"!==t&&"resume"!==t&&null!==t&&this._debug("Invalid argument. Toggling pause value instead"),t=!t||"pause"!==t&&"resume"!==t?"toggle":t){case"pause":e.state.isPaused=!0;break;case"resume":e.state.isPaused=!1;break;case"toggle":e.state.isPaused=!e.state.isPaused}return this._debug("Paused",e.state.isPaused),!1}this["_pausing_"+e.behavior].call(this,t)},_setup:function(){var t=this.options;if(!t.behavior||this["_setup_"+t.behavior]===d)return this._binding("bind"),!1;this["_setup_"+t.behavior].call(this)},_showdonemsg:function(){var t=this.options;t.behavior&&this["_showdonemsg_"+t.behavior]!==d?this["_showdonemsg_"+t.behavior].call(this):(t.loading.msg.find("img").hide().parent().find("div").html(t.loading.finishedMsg).animate({opacity:1},2e3,function(){u(this).parent().fadeOut(t.loading.speed)}),t.errorCallback.call(u(t.contentSelector)[0],"done"))},_validate:function(t){for(var e in t)if(e.indexOf&&-1<e.indexOf("Selector")&&0===u(t[e]).length)return this._debug("Your "+e+" found no elements."),!1;return!0},bind:function(){this._binding("bind")},destroy:function(){return this.options.state.isDestroyed=!0,this.options.loading.finished(),this._error("destroy")},pause:function(){this._pausing("pause")},resume:function(){this._pausing("resume")},beginAjax:function(o){var r,s,t,a,l=this,e=o.path;if(o.state.currPage++,o.maxPage!=d&&o.state.currPage>o.maxPage)return o.state.isBeyondMaxPage=!0,void this.destroy();switch(r=u(o.contentSelector).is("table, tbody")?u("<tbody/>"):u("<div/>"),s="function"==typeof e?e(o.state.currPage):e.join(o.state.currPage),l._debug("heading into ajax",s),t="html"===o.dataType||"json"===o.dataType?o.dataType:"html+callback",o.appendCallback&&"html"===o.dataType&&(t+="+callback"),t){case"html+callback":l._debug("Using HTML via .load() method"),r.load(s+" "+o.itemSelector,d,function(t){l._loadcallback(r,t,s)});break;case"html":l._debug("Using "+t.toUpperCase()+" via $.ajax() method"),u.ajax({url:s,dataType:o.dataType,complete:function(t,e){(a=void 0!==t.isResolved?t.isResolved():"success"===e||"notmodified"===e)?l._loadcallback(r,t.responseText,s):l._error("end")}});break;case"json":l._debug("Using "+t.toUpperCase()+" via $.ajax() method"),u.ajax({dataType:"json",type:"GET",url:s,success:function(t,e,n){var i;a=void 0!==n.isResolved?n.isResolved():"success"===e||"notmodified"===e,o.appendCallback?o.template!==d?(i=o.template(t),r.append(i),a?l._loadcallback(r,i):l._error("end")):(l._debug("template must be defined."),l._error("end")):a?l._loadcallback(r,t,s):l._error("end")},error:function(){l._debug("JSON ajax request failed."),l._error("end")}})}},retrieve:function(t){t=t||null;var e=this.options;if(e.behavior&&this["retrieve_"+e.behavior]!==d)this["retrieve_"+e.behavior].call(this,t);else{if(e.state.isDestroyed)return this._debug("Instance is destroyed"),!1;e.state.isDuringAjax=!0,e.loading.start.call(u(e.contentSelector)[0],e)}},scroll:function(){var t=this.options,e=t.state;t.behavior&&this["scroll_"+t.behavior]!==d?this["scroll_"+t.behavior].call(this):e.isDuringAjax||e.isInvalidPage||e.isDone||e.isDestroyed||e.isPaused||this._nearbottom()&&this.retrieve()},toggle:function(){this._pausing()},unbind:function(){this._binding("unbind")},update:function(t){u.isPlainObject(t)&&(this.options=u.extend(!0,this.options,t))}},u.fn.infinitescroll=function(e,n){switch(typeof e){case"string":var i=Array.prototype.slice.call(arguments,1);this.each(function(){var t=u.data(this,"infinitescroll");return!!t&&(!(!u.isFunction(t[e])||"_"===e.charAt(0))&&void t[e].apply(t,i))});break;case"object":this.each(function(){var t=u.data(this,"infinitescroll");t?t.update(e):(t=new u.infinitescroll(e,n,this)).failed||u.data(this,"infinitescroll",t)})}return this};var o,t=u.event;t.special.smartscroll={setup:function(){u(this).bind("scroll",t.special.smartscroll.handler)},teardown:function(){u(this).unbind("scroll",t.special.smartscroll.handler)},handler:function(t,e){var n=this,i=arguments;t.type="smartscroll",o&&clearTimeout(o),o=setTimeout(function(){u(n).trigger("smartscroll",i)},"execAsap"===e?0:100)}},u.fn.smartscroll=function(t){return t?this.bind("smartscroll",t):this.trigger("smartscroll",["execAsap"])}}(window,jQuery),function(d){function p(t){return parseFloat(t)||0}function h(t){var e={byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof t?d.extend(e,t):("boolean"==typeof t?e.byRow=t:"remove"===t&&(e.remove=!0),e)}var i=-1,o=-1,f=d.fn.matchHeight=function(t){var e=h(t);if(e.remove){var n=this;return this.css(e.property,""),d.each(f._groups,function(t,e){e.elements=e.elements.not(n)}),this}return this.length<=1&&!e.target||(f._groups.push({elements:this,options:e}),f._apply(this,e)),this};f._groups=[],f._throttle=80,f._maintainScroll=!1,f._beforeUpdate=null,f._afterUpdate=null,f._apply=function(t,e){var n,i,o,r=h(e),s=d(t),a=[s],l=d(window).scrollTop(),c=d("html").outerHeight(!0),u=s.parents().filter(":hidden");return u.each(function(){var t=d(this);t.data("style-cache",t.attr("style"))}),u.css("display","block"),r.byRow&&!r.target&&(s.each(function(){var t=d(this),e="inline-block"===t.css("display")?"inline-block":"block";t.data("style-cache",t.attr("style")),t.css({display:e,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px"})}),n=d(s),i=null,o=[],n.each(function(){var t=d(this),e=t.offset().top-p(t.css("margin-top")),n=0<o.length?o[o.length-1]:null;null!==n&&Math.floor(Math.abs(i-e))<=1?o[o.length-1]=n.add(t):o.push(t),i=e}),a=o,s.each(function(){var t=d(this);t.attr("style",t.data("style-cache")||"")})),d.each(a,function(t,e){var n=d(e),i=0;if(r.target)i=r.target.outerHeight(!1);else{if(r.byRow&&n.length<=1)return void n.css(r.property,"");n.each(function(){var t=d(this),e={display:"inline-block"===t.css("display")?"inline-block":"block"};e[r.property]="",t.css(e),t.outerHeight(!1)>i&&(i=t.outerHeight(!1)),t.css("display","")})}n.each(function(){var t=d(this),e=0;r.target&&t.is(r.target)||("border-box"!==t.css("box-sizing")&&(e+=p(t.css("border-top-width"))+p(t.css("border-bottom-width")),e+=p(t.css("padding-top"))+p(t.css("padding-bottom"))),t.css(r.property,i-e))})}),u.each(function(){var t=d(this);t.attr("style",t.data("style-cache")||null)}),f._maintainScroll&&d(window).scrollTop(l/c*d("html").outerHeight(!0)),this},f._applyDataApi=function(){var n={};d("[data-match-height], [data-mh]").each(function(){var t=d(this),e=t.attr("data-mh")||t.attr("data-match-height");e in n?n[e]=n[e].add(t):n[e]=t}),d.each(n,function(){this.matchHeight(!0)})};function r(t){f._beforeUpdate&&f._beforeUpdate(t,f._groups),d.each(f._groups,function(){f._apply(this.elements,this.options)}),f._afterUpdate&&f._afterUpdate(t,f._groups)}f._update=function(t,e){if(e&&"resize"===e.type){var n=d(window).width();if(n===i)return;i=n}t?-1===o&&(o=setTimeout(function(){r(e),o=-1},f._throttle)):r(e)},d(f._applyDataApi),d(window).bind("load",function(t){f._update(!1,t)}),d(window).bind("resize orientationchange",function(t){f._update(!0,t)})}(jQuery),function(h){function f(t){return t&&h.inArray(t,["es_US","en_CA","fr_CA","en_GB","en_AU"])<0&&(t="en_US"),t}function n(t){return t&&(t=f(t),luminateExtend.sessionVars.set("locale",t)),t}function l(t,e){return(t?luminateExtend.global.path.secure+"S":luminateExtend.global.path.nonsecure)+"PageServer"+(luminateExtend.global.routingId&&""!==luminateExtend.global.routingId?";"+luminateExtend.global.routingId:"")+"?pagename=luminateExtend_server&pgwrap=n"+(e?"&"+e:"")}function c(t,r){var e,n,i,s,o,a;t.responseFilter&&t.responseFilter.array&&t.responseFilter.filter&&luminateExtend.utils.stringToObj(t.responseFilter.array,r)&&(i=t.responseFilter.filter.split("==")[0].split("!=")[0].replace(/^\s+|\s+$/g,""),-1!==t.responseFilter.filter.indexOf("!=")?(e="nequal",n=t.responseFilter.filter.split("!=")[1]):-1!==t.responseFilter.filter.indexOf("==")&&(e="equal",n=t.responseFilter.filter.split("==")[1]),e&&n&&(n=n.replace(/^\s+|\s+$/g,""),o=!(s=[]),h.each(luminateExtend.utils.ensureArray(luminateExtend.utils.stringToObj(t.responseFilter.array,r)),function(){"nequal"===e&&this[i]===n||"equal"===e&&this[i]!==n?o=!0:s.push(this)}),o&&(a=t.responseFilter.array.split("."),h.each(r,function(o,t){o===a[0]&&h.each(t,function(i,t){i===a[1]&&(2===a.length?r[o][i]=s:h.each(t,function(n,t){n===a[2]&&(3===a.length?r[o][i][n]=s:h.each(t,function(t,e){t===a[3]&&4===a.length&&(r[o][i][n][t]=s)}))}))})}))));var l=h.noop;t.callback&&("function"==typeof t.callback?l=t.callback:t.callback.error&&r.errorResponse?l=t.callback.error:t.callback.success&&!r.errorResponse&&(l=t.callback.success));var c,u=-1!==t.data.indexOf("&method=login")&&-1===t.data.indexOf("&method=loginTest"),d=-1!==t.data.indexOf("&method=logout");u||d?(c={callback:function(){l(r)},useCache:!1,useHTTPS:t.useHTTPS},u&&r.loginResponse&&r.loginResponse.nonce&&(c.nonce="NONCE_TOKEN="+r.loginResponse.nonce),luminateExtend.api.getAuth(c)):l(r)}window.luminateExtend=function(t){luminateExtend.init(t||{})},luminateExtend.library={version:"1.7.1"},luminateExtend.global={update:function(t,e){t&&(t.length?e&&("locale"===t&&(e=n(e)),luminateExtend.global[t]=e):(t.locale&&(t.locale=n(t.locale)),luminateExtend.global=h.extend(luminateExtend.global,t)))}},luminateExtend.init=function(t){var e=h.extend({apiCommon:{},auth:{type:"auth"},path:{}},t||{});return e.locale&&(e.locale=f(e.locale)),e.supportsCORS=!1,!window.XMLHttpRequest||"withCredentials"in new XMLHttpRequest&&(e.supportsCORS=!0),luminateExtend.global=h.extend(luminateExtend.global,e),luminateExtend},luminateExtend.api=function(t){luminateExtend.api.request(t||{})},luminateExtend.api.bind=function(t){return 0<h(t=t||"form.luminateApi").length&&h(t).each(function(){"form"===this.nodeName.toLowerCase()&&h(this).bind("submit",function(t){t.cancelBubble=!0,t.returnValue=!1,t.stopPropagation&&(t.stopPropagation(),t.preventDefault()),h(this).attr("id")||h(this).attr("id","luminateApi-"+(new Date).getTime());var e,n=h(this).attr("action"),i=n.split("?"),o=h(this).data("luminateapi"),r=-1!==i[0].indexOf("/site/")?i[0].split("/site/")[1]:i[0],s=h(this).attr("enctype"),a=1<i.length?i[1]:"",l="#"+h(this).attr("id"),c=!1,u=!1;o&&(o.callback&&(e=luminateExtend.utils.stringToObj(o.callback)),o.requiresAuth&&"true"===o.requiresAuth&&(c=!0),(0===n.indexOf("https:")||"https:"===window.location.protocol&&-1===n.indexOf("http"))&&(u=!0)),luminateExtend.api.request({api:r,callback:e,contentType:s,data:a,form:l,requiresAuth:c,useHTTPS:u})})}),luminateExtend},luminateExtend.api.getAuth=function(t){var r,e=h.extend({useCache:!0,useHTTPS:!1},t||{});luminateExtend.api.getAuthLoad?(luminateExtend.api.getAuthLoad=!1,e.useCache&&luminateExtend.global.auth.type&&luminateExtend.global.auth.token?(luminateExtend.api.getAuthLoad=!0,e.callback&&e.callback()):(r=function(t){luminateExtend.global.update(t),luminateExtend.api.getAuthLoad=!0,e.callback&&e.callback()},luminateExtend.global.supportsCORS?h.ajax({url:(e.useHTTPS?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"CRConsAPI",data:"luminateExtend="+luminateExtend.library.version+(e.nonce&&""!==e.nonce?"&"+e.nonce:"")+"&api_key="+luminateExtend.global.apiKey+"&method=getLoginUrl&response_format=json&v=1.0",xhrFields:{withCredentials:!0},dataType:"json",success:function(t){var e=t.getLoginUrlResponse,n=e.url,i=e.routing_id,o=e.JSESSIONID;i||-1===n.indexOf("CRConsAPI;jsessionid=")||(i=n.split("CRConsAPI;jsessionid=")[1].split("?")[0]),r({auth:{type:"auth",token:e.token},routingId:i?"jsessionid="+i:"",sessionCookie:o?"JSESSIONID="+o:""})}}):h.ajax({url:l(e.useHTTPS,"action=getAuth&callback=?"),dataType:"jsonp",success:r}))):setTimeout(function(){luminateExtend.api.getAuth(e)},1e3)},luminateExtend.api.getAuthLoad=!0;function a(t){var i,e,n,o,r,s,a=h.extend({contentType:"application/x-www-form-urlencoded",data:"",requiresAuth:!1,useHTTPS:null},t||{});0<=h.inArray(a.api.toLowerCase(),["addressbook","advocacy","connect","cons","content","datasync","donation","email","group","orgevent","recurring","survey","teamraiser"])&&(a.api="CR"+a.api.charAt(0).toUpperCase()+a.api.slice(1).toLowerCase()+"API",a.api=a.api.replace("Addressbook","AddressBook").replace("Datasync","DataSync").replace("Orgevent","OrgEvent")),luminateExtend.global.path.nonsecure&&luminateExtend.global.path.secure&&luminateExtend.global.apiKey&&a.api&&("multipart/form-data"===a.contentType.split(";")[0]?a.contentType="multipart/form-data":a.contentType="application/x-www-form-urlencoded",a.contentType+="; charset=UTF-8",a.data="luminateExtend="+luminateExtend.library.version+(""===a.data?"":"&"+a.data),a.form&&0<h(a.form).length&&(a.data+="&"+h(a.form).eq(0).serialize()),-1===a.data.indexOf("&api_key=")&&(a.data+="&api_key="+luminateExtend.global.apiKey),luminateExtend.global.apiCommon.centerId&&-1===a.data.indexOf("&center_id=")&&(a.data+="&center_id="+luminateExtend.global.apiCommon.centerId),luminateExtend.global.apiCommon.categoryId&&-1===a.data.indexOf("&list_category_id=")&&(a.data+="&list_category_id="+luminateExtend.global.apiCommon.categoryId),-1!==a.data.indexOf("&response_format=xml")?a.data=a.data.replace(/&response_format=xml/g,"&response_format=json"):-1===a.data.indexOf("&response_format=")&&(a.data+="&response_format=json"),luminateExtend.global.apiCommon.source&&-1===a.data.indexOf("&source=")&&(a.data+="&source="+luminateExtend.global.apiCommon.source),luminateExtend.global.apiCommon.subSource&&-1===a.data.indexOf("&sub_source=")&&(a.data+="&sub_source="+luminateExtend.global.apiCommon.subSource),-1===a.data.indexOf("&suppress_response_codes=")&&(a.data+="&suppress_response_codes=true"),luminateExtend.global.locale&&-1===a.data.indexOf("&s_locale=")&&(a.data+="&s_locale="+luminateExtend.global.locale),-1===a.data.indexOf("&v=")&&(a.data+="&v=1.0"),i="http://",e=luminateExtend.global.path.nonsecure.split("http://")[1],"CRDonationAPI"===a.api||"CRTeamraiserAPI"===a.api||"CRConnectAPI"!==a.api&&("https:"===window.location.protocol&&null==a.useHTTPS||1==a.useHTTPS)?a.useHTTPS=!0:a.useHTTPS=!1,a.useHTTPS&&(i="https://",e=luminateExtend.global.path.secure.split("https://")[1]),i+=e+a.api,r=o=n=!1,window.location.protocol===i.split("//")[0]&&document.domain===e.split("/")[0]?o=n=!0:luminateExtend.global.supportsCORS?o=!0:"postMessage"in window&&(r=!0),o?s=function(){luminateExtend.global.routingId&&""!==luminateExtend.global.routingId&&(i+=";"+luminateExtend.global.routingId),a.requiresAuth&&-1===a.data.indexOf("&"+luminateExtend.global.auth.type+"=")&&(a.data+="&"+luminateExtend.global.auth.type+"="+luminateExtend.global.auth.token),luminateExtend.global.sessionCookie&&""!==luminateExtend.global.sessionCookie&&(a.data+="&"+luminateExtend.global.sessionCookie),a.data+="&ts="+(new Date).getTime(),h.ajax({url:i,data:a.data,xhrFields:{withCredentials:!0},contentType:a.contentType,dataType:"json",type:"POST",success:function(t){c(a,t)}})}:r&&(s=function(){var t=(new Date).getTime(),e="luminateApiPostMessage"+t,n=l(a.useHTTPS,"action=postMessage");luminateExtend.global.routingId&&""!==luminateExtend.global.routingId&&(i+=";"+luminateExtend.global.routingId),a.requiresAuth&&-1===a.data.indexOf("&"+luminateExtend.global.auth.type+"=")&&(a.data+="&"+luminateExtend.global.auth.type+"="+luminateExtend.global.auth.token),luminateExtend.global.sessionCookie&&""!==luminateExtend.global.sessionCookie&&(a.data+="&"+luminateExtend.global.sessionCookie),a.data+="&ts="+t,luminateExtend.api.request.postMessageEventHandler||(luminateExtend.api.request.postMessageEventHandler={},luminateExtend.api.request.postMessageEventHandler.handler=function(t){var e,n,i;-1===luminateExtend.global.path.nonsecure.indexOf(t.origin)&&-1===luminateExtend.global.path.secure.indexOf(t.origin)||(n=(e=h.parseJSON(t.data)).postMessageFrameId,i=h.parseJSON(decodeURIComponent(e.response)),luminateExtend.api.request.postMessageEventHandler[n]&&luminateExtend.api.request.postMessageEventHandler[n](n,i))},void 0!==window.addEventListener?window.addEventListener("message",luminateExtend.api.request.postMessageEventHandler.handler,!1):void 0!==window.attachEvent&&window.attachEvent("onmessage",luminateExtend.api.request.postMessageEventHandler.handler)),luminateExtend.api.request.postMessageEventHandler[e]=function(t,e){c(a,e),h("#"+t).remove(),delete luminateExtend.api.request.postMessageEventHandler[t]},h("body").append('<iframe style="position: absolute; top: 0; left: -999em;" name="'+e+'" id="'+e+'"></iframe>'),h("#"+e).bind("load",function(){var t='{"postMessageFrameId": "'+h(this).attr("id")+'", "requestUrl": "'+i+'", "requestContentType": "'+a.contentType+'", "requestData": "'+a.data+'"}',e=i.split("/site/")[0].split("/admin/")[0];document.getElementById(h(this).attr("id")).contentWindow.postMessage(t,e)}),h("#"+e).attr("src",n)}),a.requiresAuth||!o&&!n&&!luminateExtend.global.sessionCookie?luminateExtend.api.getAuth({callback:s,useHTTPS:a.useHTTPS}):s())}luminateExtend.api.request=function(r){var s;h.isArray(r)?(r.reverse(),s=[],h.each(r,function(t){var e,n,i,o=h.extend({async:!0},this);o.async||t===r.length-1?s.push(o):(n=r[t+1]).callback&&"function"!=typeof n.callback?(e=n.callback.success||h.noop,n.callback.success=function(t){e(t),a(o)}):(i=(n=r[t+1]).callback||h.noop,n.callback={success:function(t){i(t),a(o)},error:function(t){i(t)}})}),s.reverse(),h.each(s,function(){a(this)})):a(r)},luminateExtend.sessionVars={set:function(t,e,n){var i={};n&&(i.callback=n),t&&(i.data="s_"+t+"="+(e||""),luminateExtend.utils.ping(i))}},luminateExtend.tags=function(t,e){luminateExtend.tags.parse(t,e)},luminateExtend.tags.parse=function(t,i){luminateExtend.widgets?luminateExtend.widgets(t,i):(t=t&&"all"!==t?luminateExtend.utils.ensureArray(t):["cons"],i=i||"body",h.each(t,function(t,e){var n;"cons"!==e||0<(n=h(i).find(document.getElementsByTagName("luminate:cons"))).length&&luminateExtend.api.request({api:"cons",callback:function(t){n.each(function(){t.getConsResponse?h(this).replaceWith(luminateExtend.utils.stringToObj(h(this).attr("field"),t.getConsResponse)):h(this).remove()})},data:"method=getUser",requiresAuth:!0})}))},luminateExtend.utils={ensureArray:function(t){return h.isArray(t)?t:t?[t]:[]},stringToObj:function(t,e){var n=e||window;if(t)for(var i=t.split("."),o=0;o<i.length;o++){if(o<i.length-1&&!n[i[o]])return{};n=n[i[o]]}return n},ping:function(t){var e=h.extend({data:null},t||{}),n="luminatePing"+(new Date).getTime();h("body").append('<img style="position: absolute; left: -999em; top: 0;" id="'+n+'" />'),h("#"+n).bind("load",function(){h(this).remove(),e.callback&&e.callback()}),h("#"+n).attr("src",("https:"===window.location.protocol?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"EstablishSession"+(luminateExtend.global.routingId&&""!==luminateExtend.global.routingId?";"+luminateExtend.global.routingId:"")+"?"+(null==e.data?"":e.data+"&")+"NEXTURL="+encodeURIComponent(("https:"===window.location.protocol?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"PixelServer"))},simpleDateFormat:function(t,e,r){var n,i;r=r||luminateExtend.global.locale,r=f(r),e=e||(0<=h.inArray(r,["en_CA","fr_CA","en_GB","en_AU"])?"d/M/yy":"M/d/yy"),(t=t||new Date)instanceof Date||(n=t.split("T")[0].split("-"),i=1<t.split("T").length?t.split("T")[1].split(".")[0].split("Z")[0].split("-")[0].split(":"):["00","00","00"],t=new Date(n[0],n[1]-1,n[2],i[0],i[1],i[2]));function s(t){return 0===(t=""+t).indexOf("0")&&"0"!==t?t.substring(1):t}function a(t){return t=Number(t),isNaN(t)?"00":(t<10?"0":"")+t}var l={month:a(t.getMonth()+1),date:a(t.getDate()),year:a(t.getFullYear()),day:t.getDay(),hour24:t.getHours(),hour12:t.getHours(),minutes:a(t.getMinutes()),ampm:"AM"};11<l.hour24&&(l.ampm="PM"),l.hour24=a(l.hour24),0===l.hour12&&(l.hour12=12),12<l.hour12&&(l.hour12=l.hour12-12),l.hour12=a(l.hour12);function o(t){function e(t,e,n){for(var i,o,r=1;r<t.length;r++){isNaN(t[r].substring(0,1))||(i=t[r].substring(0,2),t[r]=t[r].substring(2),isNaN(i.substring(1))&&(t[r]=i.substring(1)+t[r],i=i.substring(0,1)),23<(i=Number(i))&&(i=23),o="+"===n?i:0-i,"kk"===e||"k"===e?24<(o=Number(l.hour24)+o)?o-=24:o<0&&(o+=24):(24<(o=Number(l.hour12)+o)?o-=24:o<0&&(o+=24),12<o&&(o-=12)),o=""+o,"kk"!==e&&"hh"!==e||(o=a(o)),("h"===e&&0===o||"hh"===e&&"00"===o)&&(o="12"),t[r]=o+t[r])}return t.join("")}-1!==(i=t.replace(/yy+(?=y)/g,"yy").replace(/MMM+(?=M)/g,"MMM").replace(/d+(?=d)/g,"d").replace(/EEE+(?=E)/g,"EEE").replace(/a+(?=a)/g,"").replace(/k+(?=k)/g,"k").replace(/h+(?=h)/g,"h").replace(/m+(?=m)/g,"m").replace(/yyy/g,l.year).replace(/yy/g,l.year.substring(2)).replace(/y/g,l.year).replace(/dd/g,l.date).replace(/d/g,s(l.date))).indexOf("k+")&&(i=e((i=e(i.split("kk+"),"kk","+")).split("k+"),"k","+")),-1!==i.indexOf("k-")&&(i=e((i=e(i.split("kk-"),"kk","-")).split("k-"),"k","-")),-1!==(i=i.replace(/kk/g,l.hour24).replace(/k/g,s(l.hour24))).indexOf("h+")&&(i=e((i=e(i.split("hh+"),"hh","+")).split("h+"),"h","+")),-1!==i.indexOf("h-")&&(i=e((i=e(i.split("hh-"),"hh","-")).split("h-"),"h","-")),i=(i=(i=i.replace(/hh/g,l.hour12<12&&l.hour12.indexOf&&0!==l.hour12.indexOf("0")?"0"+l.hour12:l.hour12).replace(/h/g,s(l.hour12))).replace(/mm/g,l.minutes).replace(/m/g,s(l.minutes))).replace(/a/g,"A");var n="fr_CA"===r?["janvier","f&#233;vrier","mars","avril","mai","juin","juillet","ao&#251;t","septembre","octobre","novembre","d&#233;cembre"]:"es_US"===r?["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]:["January","February","march","april","may","June","July","august","September","October","November","December"],i=i.replace(/MMMM/g,n[Number(l.month)-1]).replace(/MMM/g,n[Number(l.month)-1].substring(0,3)).replace(/MM/g,l.month).replace(/M/g,s(l.month)).replace(/march/g,"March").replace(/may/g,"May").replace(/Mayo/g,"mayo"),o="fr_CA"===r?["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"]:"es_US"===r?["domingo","lunes","martes","mi&eacute;rcoles","jueves","viernes","s&aacute;bado"]:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return(i=i.replace(/EEEE/g,o[l.day]).replace(/EEE/g,o[l.day].substring(0,3)).replace(/EE/g,o[l.day].substring(0,3)).replace(/E/g,o[l.day].substring(0,3))).replace(/A/g,l.ampm).replace(/april/g,"April").replace(/august/g,"August")}if(-1===e.indexOf("'"))return o(e);var c=e.replace(/\'+(?=\')/g,"''").split("''");if(1===c.length){c=e.split("'");for(var u=0;u<c.length;u++)u%2==0&&(c[u]=o(c[u]));return c.join("")}for(u=0;u<c.length;u++){for(var d=c[u].split("'"),p=0;p<d.length;p++)p%2==0&&(d[p]=o(d[p]));c[u]=d.join("")}return c.join("'")}}}("undefined"==typeof jQuery&&"function"==typeof Zepto?Zepto:jQuery),function(t){var d=Array.prototype.slice;function e(){}function n(c){if(c){var u="undefined"==typeof console?e:function(t){console.error(t)};return c.bridget=function(t,e){var n,a,l;(n=e).prototype.option||(n.prototype.option=function(t){c.isPlainObject(t)&&(this.options=c.extend(!0,this.options,t))}),a=t,l=e,c.fn[a]=function(e){if("string"!=typeof e)return this.each(function(){var t=c.data(this,a);t?(t.option(e),t._init()):(t=new l(this,e),c.data(this,a,t))});for(var t=d.call(arguments,1),n=0,i=this.length;n<i;n++){var o=this[n],r=c.data(o,a);if(r)if(c.isFunction(r[e])&&"_"!==e.charAt(0)){var s=r[e].apply(r,t);if(void 0!==s)return s}else u("no such method '"+e+"' for "+a+" instance");else u("cannot call methods on "+a+" prior to initialization; attempted to call '"+e+"'")}return this}},c.bridget}}"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],n):"object"==typeof exports?n(require("jquery")):n(t.jQuery)}(window),function(n){var t=document.documentElement,e=function(){};function i(t){var e=n.event;return e.target=e.target||e.srcElement||t,e}t.addEventListener?e=function(t,e,n){t.addEventListener(e,n,!1)}:t.attachEvent&&(e=function(e,t,n){e[t+n]=n.handleEvent?function(){var t=i(e);n.handleEvent.call(n,t)}:function(){var t=i(e);n.call(e,t)},e.attachEvent("on"+t,e[t+n])});var o=function(){};t.removeEventListener?o=function(t,e,n){t.removeEventListener(e,n,!1)}:t.detachEvent&&(o=function(e,n,i){e.detachEvent("on"+n,e[n+i]);try{delete e[n+i]}catch(t){e[n+i]=void 0}});var r={bind:e,unbind:o};"function"==typeof define&&define.amd?define("eventie/eventie",r):"object"==typeof exports?module.exports=r:n.eventie=r}(window),function(){function t(){}var e=t.prototype,n=this,i=n.EventEmitter;function r(t,e){for(var n=t.length;n--;)if(t[n].listener===e)return n;return-1}function o(t){return function(){return this[t].apply(this,arguments)}}e.getListeners=function(t){var e,n,i=this._getEvents();if(t instanceof RegExp)for(n in e={},i)i.hasOwnProperty(n)&&t.test(n)&&(e[n]=i[n]);else e=i[t]||(i[t]=[]);return e},e.flattenListeners=function(t){for(var e=[],n=0;n<t.length;n+=1)e.push(t[n].listener);return e},e.getListenersAsObject=function(t){var e,n=this.getListeners(t);return n instanceof Array&&((e={})[t]=n),e||n},e.addListener=function(t,e){var n,i=this.getListenersAsObject(t),o="object"==typeof e;for(n in i)i.hasOwnProperty(n)&&-1===r(i[n],e)&&i[n].push(o?e:{listener:e,once:!1});return this},e.on=o("addListener"),e.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},e.once=o("addOnceListener"),e.defineEvent=function(t){return this.getListeners(t),this},e.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},e.removeListener=function(t,e){var n,i,o=this.getListenersAsObject(t);for(i in o)o.hasOwnProperty(i)&&-1!==(n=r(o[i],e))&&o[i].splice(n,1);return this},e.off=o("removeListener"),e.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},e.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},e.manipulateListeners=function(t,e,n){var i,o,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(i=n.length;i--;)r.call(this,e,n[i]);else for(i in e)e.hasOwnProperty(i)&&(o=e[i])&&("function"==typeof o?r.call(this,i,o):s.call(this,i,o));return this},e.removeEvent=function(t){var e,n=typeof t,i=this._getEvents();if("string"==n)delete i[t];else if(t instanceof RegExp)for(e in i)i.hasOwnProperty(e)&&t.test(e)&&delete i[e];else delete this._events;return this},e.removeAllListeners=o("removeEvent"),e.emitEvent=function(t,e){var n,i,o,r=this.getListenersAsObject(t);for(o in r)if(r.hasOwnProperty(o))for(i=r[o].length;i--;)!0===(n=r[o][i]).once&&this.removeListener(t,n.listener),n.listener.apply(this,e||[])===this._getOnceReturnValue()&&this.removeListener(t,n.listener);return this},e.trigger=o("emitEvent"),e.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},e.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},e._getOnceReturnValue=function(){return!this.hasOwnProperty("_onceReturnValue")||this._onceReturnValue},e._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return n.EventEmitter=i,t},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:n.EventEmitter=t}.call(this),function(t){var o="Webkit Moz ms Ms O".split(" "),r=document.documentElement.style;function e(t){if(t){if("string"==typeof r[t])return t;var e;t=t.charAt(0).toUpperCase()+t.slice(1);for(var n=0,i=o.length;n<i;n++)if(e=o[n]+t,"string"==typeof r[e])return e}}"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):"object"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(I){function B(t){var e=parseFloat(t);return-1===t.indexOf("%")&&!isNaN(e)&&e}var L="undefined"==typeof console?function(){}:function(t){console.error(t)},_=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];function t(w){var C,S,T,k=!1;return function(t){var e,n,i,o,r;if(k||(k=!0,e=I.getComputedStyle,n=e?function(t){return e(t,null)}:function(t){return t.currentStyle},C=function(t){var e=n(t);return e||L("Style returned "+e+". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),e},(S=w("boxSizing"))&&((i=document.createElement("div")).style.width="200px",i.style.padding="1px 2px 3px 4px",i.style.borderStyle="solid",i.style.borderWidth="1px 2px 3px 4px",i.style[S]="border-box",(o=document.body||document.documentElement).appendChild(i),r=C(i),T=200===B(r.width),o.removeChild(i))),"string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var s=C(t);if("none"===s.display)return function(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,n=_.length;e<n;e++){t[_[e]]=0}return t}();var a={};a.width=t.offsetWidth,a.height=t.offsetHeight;for(var l=a.isBorderBox=!(!S||!s[S]||"border-box"!==s[S]),c=0,u=_.length;c<u;c++){var d=_[c],p=function(t,e){if(I.getComputedStyle||-1===e.indexOf("%"))return e;var n=t.style,i=n.left,o=t.runtimeStyle,r=o&&o.left;r&&(o.left=t.currentStyle.left);n.left=e,e=n.pixelLeft,n.left=i,r&&(o.left=r);return e}(t,p=s[d]),h=parseFloat(p);a[d]=isNaN(h)?0:h}var f=a.paddingLeft+a.paddingRight,g=a.paddingTop+a.paddingBottom,m=a.marginLeft+a.marginRight,v=a.marginTop+a.marginBottom,y=a.borderLeftWidth+a.borderRightWidth,b=a.borderTopWidth+a.borderBottomWidth,E=l&&T,A=B(s.width);!1!==A&&(a.width=A+(E?0:f+y));var x=B(s.height);return!1!==x&&(a.height=x+(E?0:g+b)),a.innerWidth=a.width-(f+y),a.innerHeight=a.height-(g+b),a.outerWidth=a.width+m,a.outerHeight=a.height+v,a}}}"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],t):"object"==typeof exports?module.exports=t(require("desandro-get-style-property")):I.getSize=t(I.getStyleProperty)}(window),function(e){var n=e.document,i=[];function o(t){"function"==typeof t&&(o.isReady?t():i.push(t))}function r(t){var e="readystatechange"===t.type&&"complete"!==n.readyState;o.isReady||e||s()}function s(){o.isReady=!0;for(var t=0,e=i.length;t<e;t++){(0,i[t])()}}function t(t){return"complete"===n.readyState?s():(t.bind(n,"DOMContentLoaded",r),t.bind(n,"readystatechange",r),t.bind(e,"load",r)),o}o.isReady=!1,"function"==typeof define&&define.amd?define("doc-ready/doc-ready",["eventie/eventie"],t):"object"==typeof exports?module.exports=t(require("eventie")):e.docReady=t(e.eventie)}(window),function(o){var t,n=function(){if(o.matches)return"matches";if(o.matchesSelector)return"matchesSelector";for(var t=["webkit","moz","ms","o"],e=0,n=t.length;e<n;e++){var i=t[e]+"MatchesSelector";if(o[i])return i}}();function i(t,e){return t[n](e)}function r(t){t.parentNode||document.createDocumentFragment().appendChild(t)}t=n?i(document.createElement("div"),"div")?i:function(t,e){return r(t),i(t,e)}:function(t,e){r(t);for(var n=t.parentNode.querySelectorAll(e),i=0,o=n.length;i<o;i++)if(n[i]===t)return!0;return!1},"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return t}):"object"==typeof exports?module.exports=t:window.matchesSelector=t}(Element.prototype),function(n,i){"function"==typeof define&&define.amd?define("fizzy-ui-utils/utils",["doc-ready/doc-ready","matches-selector/matches-selector"],function(t,e){return i(n,t,e)}):"object"==typeof exports?module.exports=i(n,require("doc-ready"),require("desandro-matches-selector")):n.fizzyUIUtils=i(n,n.docReady,n.matchesSelector)}(window,function(p,t,c){var n,h={extend:function(t,e){for(var n in e)t[n]=e[n];return t},modulo:function(t,e){return(t%e+e)%e}},e=Object.prototype.toString;h.isArray=function(t){return"[object Array]"==e.call(t)},h.makeArray=function(t){var e=[];if(h.isArray(t))e=t;else if(t&&"number"==typeof t.length)for(var n=0,i=t.length;n<i;n++)e.push(t[n]);else e.push(t);return e},h.indexOf=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var n=0,i=t.length;n<i;n++)if(t[n]===e)return n;return-1},h.removeFrom=function(t,e){var n=h.indexOf(t,e);-1!=n&&t.splice(n,1)},h.isElement="function"==typeof HTMLElement||"object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1==t.nodeType&&"string"==typeof t.nodeName},h.setText=function(t,e){t[n=n||(void 0!==document.documentElement.textContent?"textContent":"innerText")]=e},h.getParent=function(t,e){for(;t!=document.body;)if(t=t.parentNode,c(t,e))return t},h.getQueryElement=function(t){return"string"==typeof t?document.querySelector(t):t},h.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},h.filterFindElements=function(t,e){for(var n=[],i=0,o=(t=h.makeArray(t)).length;i<o;i++){var r=t[i];if(h.isElement(r))if(e){c(r,e)&&n.push(r);for(var s=r.querySelectorAll(e),a=0,l=s.length;a<l;a++)n.push(s[a])}else n.push(r)}return n},h.debounceMethod=function(t,e,i){var o=t.prototype[e],r=e+"Timeout";t.prototype[e]=function(){var t=this[r];t&&clearTimeout(t);var e=arguments,n=this;this[r]=setTimeout(function(){o.apply(n,e),delete n[r]},i||100)}},h.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,n){return e+"-"+n}).toLowerCase()};var f=p.console;return h.htmlInit=function(u,d){t(function(){for(var t=h.toDashed(d),e=document.querySelectorAll(".js-"+t),n="data-"+t+"-options",i=0,o=e.length;i<o;i++){var r,s=e[i],a=s.getAttribute(n);try{r=a&&JSON.parse(a)}catch(t){f&&f.error("Error parsing "+n+" on "+s.nodeName.toLowerCase()+(s.id?"#"+s.id:"")+": "+t);continue}var l=new u(s,r),c=p.jQuery;c&&c.data(s,d,l)}})},h}),function(o,r){"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property","fizzy-ui-utils/utils"],function(t,e,n,i){return r(o,t,e,n,i)}):"object"==typeof exports?module.exports=r(o,require("wolfy87-eventemitter"),require("get-size"),require("desandro-get-style-property"),require("fizzy-ui-utils")):(o.Outlayer={},o.Outlayer.Item=r(o,o.EventEmitter,o.getSize,o.getStyleProperty,o.fizzyUIUtils))}(window,function(t,e,n,r,i){var o=t.getComputedStyle,c=o?function(t){return o(t,null)}:function(t){return t.currentStyle};var s=r("transition"),a=r("transform"),l=s&&a,u=!!r("perspective"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[s],p=["transform","transition","transitionDuration","transitionProperty"],h=function(){for(var t={},e=0,n=p.length;e<n;e++){var i=p[e],o=r(i);o&&o!==i&&(t[i]=o)}return t}();function f(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}i.extend(f.prototype,e.prototype),f.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},f.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},f.prototype.getSize=function(){this.size=n(this.element)},f.prototype.css=function(t){var e=this.element.style;for(var n in t){e[h[n]||n]=t[n]}},f.prototype.getPosition=function(){var t=c(this.element),e=this.layout.options,n=e.isOriginLeft,i=e.isOriginTop,o=t[n?"left":"right"],r=t[i?"top":"bottom"],s=this.layout.size,a=-1!=o.indexOf("%")?parseFloat(o)/100*s.width:parseInt(o,10),l=-1!=r.indexOf("%")?parseFloat(r)/100*s.height:parseInt(r,10),a=isNaN(a)?0:a,l=isNaN(l)?0:l;a-=n?s.paddingLeft:s.paddingRight,l-=i?s.paddingTop:s.paddingBottom,this.position.x=a,this.position.y=l},f.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,n={},i=e.isOriginLeft?"paddingLeft":"paddingRight",o=e.isOriginLeft?"left":"right",r=e.isOriginLeft?"right":"left",s=this.position.x+t[i];n[o]=this.getXValue(s),n[r]="";var a=e.isOriginTop?"paddingTop":"paddingBottom",l=e.isOriginTop?"top":"bottom",c=e.isOriginTop?"bottom":"top",u=this.position.y+t[a];n[l]=this.getYValue(u),n[c]="",this.css(n),this.emitEvent("layout",[this])},f.prototype.getXValue=function(t){var e=this.layout.options;return e.percentPosition&&!e.isHorizontal?t/this.layout.size.width*100+"%":t+"px"},f.prototype.getYValue=function(t){var e=this.layout.options;return e.percentPosition&&e.isHorizontal?t/this.layout.size.height*100+"%":t+"px"},f.prototype._transitionTo=function(t,e){this.getPosition();var n,i,o,r=this.position.x,s=this.position.y,a=parseInt(t,10),l=parseInt(e,10),c=a===this.position.x&&l===this.position.y;this.setPosition(t,e),!c||this.isTransitioning?(n=t-r,i=e-s,(o={}).transform=this.getTranslate(n,i),this.transition({to:o,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})):this.layoutPosition()},f.prototype.getTranslate=function(t,e){var n=this.layout.options;return t=n.isOriginLeft?t:-t,e=n.isOriginTop?e:-e,u?"translate3d("+t+"px, "+e+"px, 0)":"translate("+t+"px, "+e+"px)"},f.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},f.prototype.moveTo=l?f.prototype._transitionTo:f.prototype.goTo,f.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},f.prototype._nonTransition=function(t){for(var e in this.css(t.to),t.isCleaning&&this._removeStyles(t.to),t.onTransitionEnd)t.onTransitionEnd[e].call(this)},f.prototype._transition=function(t){if(parseFloat(this.layout.options.transitionDuration)){var e=this._transn;for(var n in t.onTransitionEnd)e.onEnd[n]=t.onTransitionEnd[n];for(n in t.to)e.ingProperties[n]=!0,t.isCleaning&&(e.clean[n]=!0);t.from&&(this.css(t.from),this.element.offsetHeight),this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0}else this._nonTransition(t)};var g="opacity,"+(h.transform||"transform").replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()});f.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:g,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(d,this,!1))},f.prototype.transition=f.prototype[s?"_transition":"_nonTransition"],f.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},f.prototype.onotransitionend=function(t){this.ontransitionend(t)};var m={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};f.prototype.ontransitionend=function(t){var e,n;t.target===this.element&&(e=this._transn,n=m[t.propertyName]||t.propertyName,delete e.ingProperties[n],function(t){for(var e in t)return;return 1}(e.ingProperties)&&this.disableTransition(),n in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[n]),n in e.onEnd&&(e.onEnd[n].call(this),delete e.onEnd[n]),this.emitEvent("transitionEnd",[this]))},f.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(d,this,!1),this.isTransitioning=!1},f.prototype._removeStyles=function(t){var e={};for(var n in t)e[n]="";this.css(e)};var v={transitionProperty:"",transitionDuration:""};return f.prototype.removeTransitionStyles=function(){this.css(v)},f.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.css({display:""}),this.emitEvent("remove",[this])},f.prototype.remove=function(){var t;s&&parseFloat(this.layout.options.transitionDuration)?((t=this).once("transitionEnd",function(){t.removeElem()}),this.hide()):this.removeElem()},f.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options,e={};e[this.getHideRevealTransitionEndProperty("visibleStyle")]=this.onRevealTransitionEnd,this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0,onTransitionEnd:e})},f.prototype.onRevealTransitionEnd=function(){this.isHidden||this.emitEvent("reveal")},f.prototype.getHideRevealTransitionEndProperty=function(t){var e=this.layout.options[t];if(e.opacity)return"opacity";for(var n in e)return n},f.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options,e={};e[this.getHideRevealTransitionEndProperty("hiddenStyle")]=this.onHideTransitionEnd,this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:e})},f.prototype.onHideTransitionEnd=function(){this.isHidden&&(this.css({display:"none"}),this.emitEvent("hide"))},f.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},f}),function(r,s){"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","eventEmitter/EventEmitter","get-size/get-size","fizzy-ui-utils/utils","./item"],function(t,e,n,i,o){return s(r,t,e,n,i,o)}):"object"==typeof exports?module.exports=s(r,require("eventie"),require("wolfy87-eventemitter"),require("get-size"),require("fizzy-ui-utils"),require("./item")):r.Outlayer=s(r,r.eventie,r.EventEmitter,r.getSize,r.fizzyUIUtils,r.Outlayer.Item)}(window,function(t,e,n,o,s,i){function r(){}var a=t.console,l=t.jQuery,c=0,u={};function d(t,e){var n,i=s.getQueryElement(t);i?(this.element=i,l&&(this.$element=l(this.element)),this.options=s.extend({},this.constructor.defaults),this.option(e),n=++c,this.element.outlayerGUID=n,(u[n]=this)._create(),this.options.isInitLayout&&this.layout()):a&&a.error("Bad element for "+this.constructor.namespace+": "+(i||t))}return d.namespace="outlayer",d.Item=i,d.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},s.extend(d.prototype,n.prototype),d.prototype.option=function(t){s.extend(this.options,t)},d.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),s.extend(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},d.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},d.prototype._itemize=function(t){for(var e=this._filterFindItemElements(t),n=this.constructor.Item,i=[],o=0,r=e.length;o<r;o++){var s=new n(e[o],this);i.push(s)}return i},d.prototype._filterFindItemElements=function(t){return s.filterFindElements(t,this.options.itemSelector)},d.prototype.getItemElements=function(){for(var t=[],e=0,n=this.items.length;e<n;e++)t.push(this.items[e].element);return t},d.prototype._init=d.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},d.prototype._resetLayout=function(){this.getSize()},d.prototype.getSize=function(){this.size=o(this.element)},d.prototype._getMeasurement=function(t,e){var n,i=this.options[t];i?("string"==typeof i?n=this.element.querySelector(i):s.isElement(i)&&(n=i),this[t]=n?o(n)[e]:i):this[t]=0},d.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},d.prototype._getItemsForLayout=function(t){for(var e=[],n=0,i=t.length;n<i;n++){var o=t[n];o.isIgnored||e.push(o)}return e},d.prototype._layoutItems=function(t,e){if(this._emitCompleteOnItems("layout",t),t&&t.length){for(var n=[],i=0,o=t.length;i<o;i++){var r=t[i],s=this._getItemLayoutPosition(r);s.item=r,s.isInstant=e||r.isLayoutInstant,n.push(s)}this._processLayoutQueue(n)}},d.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},d.prototype._processLayoutQueue=function(t){for(var e=0,n=t.length;e<n;e++){var i=t[e];this._positionItem(i.item,i.x,i.y,i.isInstant)}},d.prototype._positionItem=function(t,e,n,i){i?t.goTo(e,n):t.moveTo(e,n)},d.prototype._postLayout=function(){this.resizeContainer()},d.prototype.resizeContainer=function(){var t;!this.options.isResizingContainer||(t=this._getContainerSize())&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))},d.prototype._getContainerSize=r,d.prototype._setContainerMeasure=function(t,e){var n;void 0!==t&&((n=this.size).isBorderBox&&(t+=e?n.paddingLeft+n.paddingRight+n.borderLeftWidth+n.borderRightWidth:n.paddingBottom+n.paddingTop+n.borderTopWidth+n.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px")},d.prototype._emitCompleteOnItems=function(t,e){var n=this;function i(){n.dispatchEvent(t+"Complete",null,[e])}var o=e.length;if(e&&o)for(var r=0,s=0,a=e.length;s<a;s++){e[s].once(t,l)}else i();function l(){++r===o&&i()}},d.prototype.dispatchEvent=function(t,e,n){var i,o=e?[e].concat(n):n;this.emitEvent(t,o),l&&(this.$element=this.$element||l(this.element),e?((i=l.Event(e)).type=t,this.$element.trigger(i,n)):this.$element.trigger(t,n))},d.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},d.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},d.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,n=t.length;e<n;e++){var i=t[e];this.ignore(i)}}},d.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,n=t.length;e<n;e++){var i=t[e];s.removeFrom(this.stamps,i),this.unignore(i)}},d.prototype._find=function(t){if(t)return"string"==typeof t&&(t=this.element.querySelectorAll(t)),t=s.makeArray(t)},d.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;t<e;t++){var n=this.stamps[t];this._manageStamp(n)}}},d.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},d.prototype._manageStamp=r,d.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),n=this._boundingRect,i=o(t);return{left:e.left-n.left-i.marginLeft,top:e.top-n.top-i.marginTop,right:n.right-e.right-i.marginRight,bottom:n.bottom-e.bottom-i.marginBottom}},d.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},d.prototype.bindResize=function(){this.isResizeBound||(e.bind(t,"resize",this),this.isResizeBound=!0)},d.prototype.unbindResize=function(){this.isResizeBound&&e.unbind(t,"resize",this),this.isResizeBound=!1},d.prototype.onresize=function(){this.resizeTimeout&&clearTimeout(this.resizeTimeout);var t=this;this.resizeTimeout=setTimeout(function(){t.resize(),delete t.resizeTimeout},100)},d.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},d.prototype.needsResizeLayout=function(){var t=o(this.element);return this.size&&t&&t.innerWidth!==this.size.innerWidth},d.prototype.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},d.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},d.prototype.prepended=function(t){var e,n=this._itemize(t);n.length&&(e=this.items.slice(0),this.items=n.concat(e),this._resetLayout(),this._manageStamps(),this.layoutItems(n,!0),this.reveal(n),this.layoutItems(e))},d.prototype.reveal=function(t){this._emitCompleteOnItems("reveal",t);for(var e=t&&t.length,n=0;e&&n<e;n++){t[n].reveal()}},d.prototype.hide=function(t){this._emitCompleteOnItems("hide",t);for(var e=t&&t.length,n=0;e&&n<e;n++){t[n].hide()}},d.prototype.revealItemElements=function(t){var e=this.getItems(t);this.reveal(e)},d.prototype.hideItemElements=function(t){var e=this.getItems(t);this.hide(e)},d.prototype.getItem=function(t){for(var e=0,n=this.items.length;e<n;e++){var i=this.items[e];if(i.element===t)return i}},d.prototype.getItems=function(t){for(var e=[],n=0,i=(t=s.makeArray(t)).length;n<i;n++){var o=t[n],r=this.getItem(o);r&&e.push(r)}return e},d.prototype.remove=function(t){var e=this.getItems(t);if(this._emitCompleteOnItems("remove",e),e&&e.length)for(var n=0,i=e.length;n<i;n++){var o=e[n];o.remove(),s.removeFrom(this.items,o)}},d.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,n=this.items.length;e<n;e++){this.items[e].destroy()}this.unbindResize();var i=this.element.outlayerGUID;delete u[i],delete this.element.outlayerGUID,l&&l.removeData(this.element,this.constructor.namespace)},d.data=function(t){var e=(t=s.getQueryElement(t))&&t.outlayerGUID;return e&&u[e]},d.create=function(t,e){function n(){d.apply(this,arguments)}return Object.create?n.prototype=Object.create(d.prototype):s.extend(n.prototype,d.prototype),(n.prototype.constructor=n).defaults=s.extend({},d.defaults),s.extend(n.defaults,e),n.prototype.settings={},n.namespace=t,n.data=d.data,(n.Item=function(){i.apply(this,arguments)}).prototype=new i,s.htmlInit(n,t),l&&l.bridget&&l.bridget(t,n),n},d.Item=i,d}),function(t,e){"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","fizzy-ui-utils/utils"],e):"object"==typeof exports?module.exports=e(require("outlayer"),require("get-size"),require("fizzy-ui-utils")):t.Masonry=e(t.Outlayer,t.getSize,t.fizzyUIUtils)}(window,function(t,c,u){var e=t.create("masonry");return e.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var t=this.cols;for(this.colYs=[];t--;)this.colYs.push(0);this.maxY=0},e.prototype.measureColumns=function(){var t,e;this.getContainerWidth(),this.columnWidth||(e=(t=this.items[0])&&t.element,this.columnWidth=e&&c(e).outerWidth||this.containerWidth);var n=this.columnWidth+=this.gutter,i=this.containerWidth+this.gutter,o=i/n,r=n-i%n,o=Math[r&&r<1?"round":"floor"](o);this.cols=Math.max(o,1)},e.prototype.getContainerWidth=function(){var t=this.options.isFitWidth?this.element.parentNode:this.element,e=c(t);this.containerWidth=e&&e.innerWidth},e.prototype._getItemLayoutPosition=function(t){t.getSize();for(var e=t.size.outerWidth%this.columnWidth,n=Math[e&&e<1?"round":"ceil"](t.size.outerWidth/this.columnWidth),n=Math.min(n,this.cols),i=this._getColGroup(n),o=Math.min.apply(Math,i),r=u.indexOf(i,o),s={x:this.columnWidth*r,y:o},a=o+t.size.outerHeight,l=this.cols+1-i.length,c=0;c<l;c++)this.colYs[r+c]=a;return s},e.prototype._getColGroup=function(t){if(t<2)return this.colYs;for(var e=[],n=this.cols+1-t,i=0;i<n;i++){var o=this.colYs.slice(i,i+t);e[i]=Math.max.apply(Math,o)}return e},e.prototype._manageStamp=function(t){var e=c(t),n=this._getElementOffset(t),i=this.options.isOriginLeft?n.left:n.right,o=i+e.outerWidth,r=Math.floor(i/this.columnWidth),r=Math.max(0,r),s=Math.floor(o/this.columnWidth);s-=o%this.columnWidth?0:1,s=Math.min(this.cols-1,s);for(var a=(this.options.isOriginTop?n.top:n.bottom)+e.outerHeight,l=r;l<=s;l++)this.colYs[l]=Math.max(a,this.colYs[l])},e.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t},e.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},e.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!==this.containerWidth},e}),function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof exports?module.exports=e():t.ScrollMagic=e()}(this,function(){"use strict";function L(){}L.version="2.0.2",L.Controller=function(t){function e(){var t;v&&p&&(h=c.scrollPos(),t=R.type.Array(p)?p:d.slice(0),f===s&&t.reverse(),t.forEach(function(t){t.update(!0)}),0===t.length&&u.loglevel,p=!1)}function i(){n=R.rAF(e)}var n,o,r="FORWARD",s="REVERSE",a="PAUSED",l=C.defaults,c=this,u=R.extend({},l,t),d=[],p=!1,h=0,f=a,g=!0,m=0,v=!0,y=function(){0<u.refreshInterval&&(o=window.setTimeout(x,u.refreshInterval))},b=function(){return u.vertical?R.get.scrollTop(u.container):R.get.scrollLeft(u.container)},E=function(t){u.vertical?g?window.scrollTo(R.get.scrollLeft(),t):u.container.scrollTop=t:g?window.scrollTo(t,R.get.scrollTop()):u.container.scrollLeft=t},A=function(t){var e,n;"resize"==t.type?(m=u.vertical?R.get.height(u.container):R.get.width(u.container),f=a):(e=h,0!=(n=(h=c.scrollPos())-e)&&(f=0<n?r:s)),p||(p=!0,i())},x=function(){if(!g&&m!=(u.vertical?R.get.height(u.container):R.get.width(u.container))){var e;try{e=new Event("resize",{bubbles:!1,cancelable:!1})}catch(t){(e=document.createEvent("Event")).initEvent("resize",!1,!1)}u.container.dispatchEvent(e)}d.forEach(function(t){t.refresh()}),y()};this._options=u;function w(t){if(t.length<=1)return t;var e=t.slice(0);return e.sort(function(t,e){return t.scrollOffset()>e.scrollOffset()?1:-1}),e}return this.addScene=function(t){if(R.type.Array(t))t.forEach(function(t){c.addScene(t)});else if(t instanceof L.Scene)if(t.controller()!==c)t.addTo(c);else if(d.indexOf(t)<0)for(var e in d.push(t),d=w(d),t.on("shift.controller_sort",function(){d=w(d)}),u.globalSceneOptions)t[e]&&t[e].call(t,u.globalSceneOptions[e]);return c},this.removeScene=function(t){var e;return R.type.Array(t)?t.forEach(function(t){c.removeScene(t)}):-1<(e=d.indexOf(t))&&(t.off("shift.controller_sort"),d.splice(e,1),t.remove()),c},this.updateScene=function(t,e){return R.type.Array(t)?t.forEach(function(t){c.updateScene(t,e)}):e?t.update(!0):!0!==p&&t instanceof L.Scene&&(-1==(p=p||[]).indexOf(t)&&p.push(t),p=w(p),i()),c},this.update=function(t){return A({type:"resize"}),t&&e(),c},this.scrollTo=function(t){var e,n,i,o;return R.type.Number(t)?E.call(u.container,t):t instanceof L.Scene?t.controller()===c?c.scrollTo(t.scrollOffset()):log(2,"scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.",t):R.type.Function(t)?E=t:(e=R.get.elements(t)[0])?(n=u.vertical?"top":"left",i=R.get.offset(u.container),o=R.get.offset(e),g||(i[n]-=c.scrollPos()),c.scrollTo(o[n]-i[n])):log(2,"scrollTo(): The supplied argument is invalid. Scroll cancelled.",t),c},this.scrollPos=function(t){return arguments.length?(R.type.Function(t)&&(b=t),c):b.call(c)},this.info=function(t){var e={size:m,vertical:u.vertical,scrollPos:h,scrollDirection:f,container:u.container,isDocument:g};return arguments.length?void 0!==e[t]?e[t]:void 0:e},this.loglevel=function(t){return arguments.length?(u.loglevel!=t&&(u.loglevel=t),c):u.loglevel},this.enabled=function(t){return arguments.length?(v!=t&&(v=!!t,c.updateScene(d,!0)),c):v},this.destroy=function(t){window.clearTimeout(o);for(var e=d.length;e--;)d[e].destroy(t);return u.container.removeEventListener("resize",A),u.container.removeEventListener("scroll",A),R.cAF(n),null},function(){for(var t in u)l.hasOwnProperty(t)||delete u[t];if(u.container=R.get.elements(u.container)[0],!u.container)throw"ScrollMagic.Controller init failed.";(g=u.container===window||u.container===document.body||!document.body.contains(u.container))&&(u.container=window),m=u.vertical?R.get.height(u.container):R.get.width(u.container),u.container.addEventListener("resize",A),u.container.addEventListener("scroll",A),u.refreshInterval=parseInt(u.refreshInterval)||l.refreshInterval,y()}(),c};var C={defaults:{container:window,vertical:!0,globalSceneOptions:{},loglevel:2,refreshInterval:100}};L.Controller.addOption=function(t,e){C.defaults[t]=e},L.Controller.extend=function(t){var e=this;L.Controller=function(){return e.apply(this,arguments),this.$super=R.extend({},this),t.apply(this,arguments)||this},R.extend(L.Controller,e),L.Controller.prototype=e.prototype,L.Controller.prototype.constructor=L.Controller},L.Scene=function(t){var n,l,u="data-scrollmagic-pin-spacer",i=_.defaults,d=this,c=R.extend({},i,t),p="BEFORE",h=0,s={start:0,end:0},f=0,o=!0;this.addTo=function(t){return t instanceof L.Controller&&l!=t&&(l&&l.removeScene(d),l=t,v(),e(!0),a(!0),r(),l.info("container").addEventListener("resize",g),t.addScene(d),d.trigger("add",{controller:l}),d.update()),d},this.enabled=function(t){return arguments.length?(o!=t&&(o=!!t,d.update(!0)),d):o},this.remove=function(){var t;return l&&(l.info("container").removeEventListener("resize",g),t=l,l=void 0,t.removeScene(d),d.trigger("remove")),d},this.destroy=function(t){return d.trigger("destroy",{reset:t}),d.remove(),d.off("*.*"),null},this.update=function(t){var e,n;return l&&(t?l.enabled()&&o?(e=l.info("scrollPos"),n=0<c.duration?(e-s.start)/(s.end-s.start):e>=s.start?1:0,d.trigger("update",{startPos:s.start,endPos:s.end,scrollPos:e}),d.progress(n)):E&&"DURING"===p&&T(!0):l.updateScene(d,!1)),d},this.refresh=function(){return e(),a(),d},this.progress=function(t){if(arguments.length){var e,n,i,o=!1,r=p,s=l?l.info("scrollDirection"):"PAUSED",a=c.reverse||h<=t;return 0===c.duration?(o=h!=t,p=0===(h=t<1&&a?0:1)?"BEFORE":"DURING"):t<=0&&"BEFORE"!==p&&a?(p="BEFORE",o=!(h=0)):0<t&&t<1&&a?(h=t,p="DURING",o=!0):1<=t&&"AFTER"!==p?(h=1,p="AFTER",o=!0):"DURING"!==p||a||T(),o&&(e={progress:h,state:p,scrollDirection:s},i=function(t){d.trigger(t,e)},(n=p!=r)&&"DURING"!==r&&(i("enter"),i("BEFORE"===r?"start":"end")),i("progress"),n&&"DURING"!==p&&(i("BEFORE"===p?"start":"end"),i("leave"))),d}return h};var r=function(){s={start:f+c.offset},l&&c.triggerElement&&(s.start-=l.info("size")*c.triggerHook),s.end=s.start+c.duration},e=function(t){var e;!n||y(e="duration",n.call(d))&&!t&&(d.trigger("change",{what:e,newval:c[e]}),d.trigger("shift",{reason:e}))},a=function(t){var e=0,n=c.triggerElement;if(l&&n){for(var i=l.info(),o=R.get.offset(i.container),r=i.vertical?"top":"left";n.parentNode.hasAttribute(u);)n=n.parentNode;var s=R.get.offset(n);i.isDocument||(o[r]-=l.scrollPos()),e=s[r]-o[r]}var a=e!=f;f=e,a&&!t&&d.trigger("shift",{reason:"triggerElementPosition"})},g=function(){0<c.triggerHook&&d.trigger("shift",{reason:"containerResize"})},m=R.extend(_.validate,{duration:function(e){var t;if(R.type.String(e)&&e.match(/^(\.|\d)*\d+%$/)&&(t=parseFloat(e)/100,e=function(){return l?l.info("size")*t:0}),R.type.Function(e)){n=e;try{e=parseFloat(n())}catch(t){e=-1}}if(e=parseFloat(e),!R.type.Number(e)||e<0)throw n=n&&void 0,0;return e}}),v=function(t){(t=arguments.length?[t]:Object.keys(m)).forEach(function(e){var n;if(m[e])try{n=m[e](c[e])}catch(t){n=i[e]}finally{c[e]=n}})},y=function(t,e){var n=!1,i=c[t];return c[t]!=e&&(c[t]=e,v(t),n=i!=c[t]),n},b=function(e){d[e]||(d[e]=function(t){return arguments.length?("duration"===e&&(n=void 0),y(e,t)&&(d.trigger("change",{what:e,newval:c[e]}),-1<_.shifts.indexOf(e)&&d.trigger("shift",{reason:e})),d):c[e]})};this.controller=function(){return l},this.state=function(){return p},this.scrollOffset=function(){return s.start},this.triggerPosition=function(){var t=c.offset;return l&&(t+=c.triggerElement?f:l.info("size")*d.triggerHook()),t};var E,A,x={};this.on=function(t,o){return R.type.Function(o)&&(t=t.trim().split(" ")).forEach(function(t){var e=t.split("."),n=e[0],i=e[1];"*"!=n&&(x[n]||(x[n]=[]),x[n].push({namespace:i||"",callback:o}))}),d},this.off=function(t,r){return t&&(t=t.trim().split(" ")).forEach(function(t){var e=t.split("."),n=e[0],o=e[1]||"";("*"===n?Object.keys(x):[n]).forEach(function(t){for(var e=x[t]||[],n=e.length;n--;){var i=e[n];!i||o!==i.namespace&&"*"!==o||r&&r!=i.callback||e.splice(n,1)}e.length||delete x[t]})}),d},this.trigger=function(t,e){var n,i,o,r;return t&&(n=t.trim().split("."),i=n[0],o=n[1],(r=x[i])&&r.forEach(function(t){o&&o!==t.namespace||t.callback.call(d,new L.Event(i,t.namespace,d,e))})),d},d.on("shift.internal",function(t){var e="duration"===t.reason;("AFTER"===p&&e||"DURING"===p&&0===c.duration)&&T(),e&&k()}).on("progress.internal",function(){T()}).on("add.internal",function(){k()}).on("destroy.internal",function(t){d.removePin(t.reset)});function w(){l&&E&&"DURING"===p&&!l.info("isDocument")&&T()}function C(){l&&E&&"DURING"===p&&((A.relSize.width||A.relSize.autoFullWidth)&&R.get.width(window)!=R.get.width(A.spacer.parentNode)||A.relSize.height&&R.get.height(window)!=R.get.height(A.spacer.parentNode))&&k()}function S(t){l&&E&&"DURING"===p&&!l.info("isDocument")&&(t.preventDefault(),l.scrollTo(l.info("scrollPos")-(t[l.info("vertical")?"wheelDeltaY":"wheelDeltaX"]/3||30*-t.detail)))}var T=function(t){var e,n,i,o,r;E&&l&&(e=l.info(),t||"DURING"!==p?(n={position:A.inFlow?"relative":"absolute",top:0,left:0},i=R.css(E,"position")!=n.position,A.pushFollowers?0<c.duration&&("AFTER"===p&&0===parseFloat(R.css(A.spacer,"padding-top"))||"BEFORE"===p&&0===parseFloat(R.css(A.spacer,"padding-bottom")))&&(i=!0):n[e.vertical?"top":"left"]=c.duration*h,R.css(E,n),i&&k()):("fixed"!=R.css(E,"position")&&(R.css(E,{position:"fixed"}),k()),o=R.get.offset(A.spacer,!0),r=c.reverse||0===c.duration?e.scrollPos-s.start:Math.round(h*c.duration*10)/10,o[e.vertical?"top":"left"]+=r,R.css(E,{top:o.top,left:o.left})))},k=function(){var t,e,n,i,o;E&&l&&A.inFlow&&(t="DURING"===p,e=l.info("vertical"),n=A.spacer.children[0],i=R.isMarginCollapseType(R.css(A.spacer,"display")),o={},A.relSize.width||A.relSize.autoFullWidth?t?R.css(E,{width:R.get.width(A.spacer)}):R.css(E,{width:"100%"}):(o["min-width"]=R.get.width(e?E:n,!0,!0),o.width=t?o["min-width"]:"auto"),A.relSize.height?t?R.css(E,{height:R.get.height(A.spacer)-c.duration}):R.css(E,{height:"100%"}):(o["min-height"]=R.get.height(e?n:E,!0,!i),o.height=t?o["min-height"]:"auto"),A.pushFollowers&&(o["padding"+(e?"Top":"Left")]=c.duration*h,o["padding"+(e?"Bottom":"Right")]=c.duration*(1-h)),R.css(A.spacer,o))};this.setPin=function(t,e){if(e=R.extend({},{pushFollowers:!0,spacerClass:"scrollmagic-pin-spacer"},e),!(t=R.get.elements(t)[0]))return d;if("fixed"===R.css(t,"position"))return d;if(E){if(E===t)return d;d.removePin()}var n=(E=t).parentNode.style.display,i=["top","left","bottom","right","margin","marginLeft","marginRight","marginTop","marginBottom"];E.parentNode.style.display="none";var o="absolute"!=R.css(E,"position"),r=R.css(E,i.concat(["display"])),s=R.css(E,["width","height"]);E.parentNode.style.display=n,!o&&e.pushFollowers&&(e.pushFollowers=!1);var a,l=E.parentNode.insertBefore(document.createElement("div"),E),c=R.extend(r,{position:o?"relative":"absolute",boxSizing:"content-box",mozBoxSizing:"content-box",webkitBoxSizing:"content-box"});return o||R.extend(c,R.css(E,["width","height"])),R.css(l,c),l.setAttribute(u,""),R.addClass(l,e.spacerClass),A={spacer:l,relSize:{width:"%"===s.width.slice(-1),height:"%"===s.height.slice(-1),autoFullWidth:"auto"===s.width&&o&&R.isMarginCollapseType(r.display)},pushFollowers:e.pushFollowers,inFlow:o},E.___origStyle||(E.___origStyle={},a=E.style,i.concat(["width","height","position","boxSizing","mozBoxSizing","webkitBoxSizing"]).forEach(function(t){E.___origStyle[t]=a[t]||""})),A.relSize.width&&R.css(l,{width:s.width}),A.relSize.height&&R.css(l,{height:s.height}),l.appendChild(E),R.css(E,{position:o?"relative":"absolute",margin:"auto",top:"auto",left:"auto",bottom:"auto",right:"auto"}),(A.relSize.width||A.relSize.autoFullWidth)&&R.css(E,{boxSizing:"border-box",mozBoxSizing:"border-box",webkitBoxSizing:"border-box"}),window.addEventListener("scroll",w),window.addEventListener("resize",w),window.addEventListener("resize",C),E.addEventListener("mousewheel",S),E.addEventListener("DOMMouseScroll",S),T(),d},this.removePin=function(t){var e,n;return E&&("DURING"===p&&T(!0),!t&&l||((e=A.spacer.children[0]).hasAttribute(u)&&(n=A.spacer.style,margins={},["margin","marginLeft","marginRight","marginTop","marginBottom"].forEach(function(t){margins[t]=n[t]||""}),R.css(e,margins)),A.spacer.parentNode.insertBefore(e,A.spacer),A.spacer.parentNode.removeChild(A.spacer),E.parentNode.hasAttribute(u)||(R.css(E,E.___origStyle),delete E.___origStyle)),window.removeEventListener("scroll",w),window.removeEventListener("resize",w),window.removeEventListener("resize",C),E.removeEventListener("mousewheel",S),E.removeEventListener("DOMMouseScroll",S),E=void 0),d};var I,B=[];return d.on("destroy.internal",function(t){d.removeClassToggle(t.reset)}),this.setClassToggle=function(t,e){var n=R.get.elements(t);return 0!==n.length&&R.type.String(e)&&(0<B.length&&d.removeClassToggle(),I=e,B=n,d.on("enter.internal_class leave.internal_class",function(t){var e="enter"===t.type?R.addClass:R.removeClass;B.forEach(function(t){e(t,I)})})),d},this.removeClassToggle=function(t){return t&&B.forEach(function(t){R.removeClass(t,I)}),d.off("start.internal_class end.internal_class"),I=void 0,B=[],d},function(){for(var t in c)i.hasOwnProperty(t)||delete c[t];for(var e in i)b(e);v(),d.on("change.internal",function(t){"loglevel"!==t.what&&"tweenChanges"!==t.what&&("triggerElement"===t.what?a():"reverse"===t.what&&d.update())}).on("shift.internal",function(){r(),d.update()})}(),d};var _={defaults:{duration:0,offset:0,triggerElement:void 0,triggerHook:.5,reverse:!0,loglevel:2},validate:{offset:function(t){if(t=parseFloat(t),!R.type.Number(t))throw 0;return t},triggerElement:function(t){if(t=t||void 0){var e=R.get.elements(t)[0];if(!e)throw 0;t=e}return t},triggerHook:function(t){var e={onCenter:.5,onEnter:1,onLeave:0};if(R.type.Number(t))t=Math.max(0,Math.min(parseFloat(t),1));else{if(!(t in e))throw 0;t=e[t]}return t},reverse:function(t){return!!t}},shifts:["duration","offset","triggerHook"]};L.Scene.addOption=function(t,e,n,i){t in _.defaults||(_.defaults[t]=e,_.validate[t]=n,i&&_.shifts.push(t))},L.Scene.extend=function(t){var e=this;L.Scene=function(){return e.apply(this,arguments),this.$super=R.extend({},this),t.apply(this,arguments)||this},R.extend(L.Scene,e),L.Scene.prototype=e.prototype,L.Scene.prototype.constructor=L.Scene},L.Event=function(t,e,n,i){for(var o in i=i||{})this[o]=i[o];return this.type=t,this.target=this.currentTarget=n,this.namespace=e||"",this.timeStamp=this.timestamp=Date.now(),this};var R=L._util=function(s){function a(t){return parseFloat(t)||0}function l(t){return t.currentStyle?t.currentStyle:s.getComputedStyle(t)}function i(t,e,n,i){if((e=e===document?s:e)===s)i=!1;else if(!d.DomElement(e))return 0;t=t.charAt(0).toUpperCase()+t.substr(1).toLowerCase();var o,r=(n?e["offset"+t]||e["outer"+t]:e["client"+t]||e["inner"+t])||0;return n&&i&&(o=l(e),r+="Height"===t?a(o.marginTop)+a(o.marginBottom):a(o.marginLeft)+a(o.marginRight)),r}function c(t){return t.replace(/^[^a-z]+([a-z])/g,"$1").replace(/-([a-z])/g,function(t){return t[1].toUpperCase()})}var t={};t.extend=function(t){for(t=t||{},u=1;u<arguments.length;u++)if(arguments[u])for(var e in arguments[u])arguments[u].hasOwnProperty(e)&&(t[e]=arguments[u][e]);return t},t.isMarginCollapseType=function(t){return-1<["block","flex","list-item","table","-webkit-box"].indexOf(t)};for(var o=0,e=["ms","moz","webkit","o"],n=s.requestAnimationFrame,r=s.cancelAnimationFrame,u=0;!n&&u<e.length;++u)n=s[e[u]+"RequestAnimationFrame"],r=s[e[u]+"CancelAnimationFrame"]||s[e[u]+"CancelRequestAnimationFrame"];n=n||function(t){var e=(new Date).getTime(),n=Math.max(0,16-(e-o)),i=s.setTimeout(function(){t(e+n)},n);return o=e+n,i},r=r||function(t){s.clearTimeout(t)},t.rAF=n.bind(s),t.cAF=r.bind(s);var d=t.type=function(t){return Object.prototype.toString.call(t).replace(/^\[object (.+)\]$/,"$1").toLowerCase()};d.String=function(t){return"string"===d(t)},d.Function=function(t){return"function"===d(t)},d.Array=function(t){return Array.isArray(t)},d.Number=function(t){return!d.Array(t)&&0<=t-parseFloat(t)+1},d.DomElement=function(t){return"object"==typeof HTMLElement?t instanceof HTMLElement:t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName};var p=t.get={};return p.elements=function(t){var e=[];if(d.String(t))try{t=document.querySelectorAll(t)}catch(t){return e}if("nodelist"===d(t)||d.Array(t))for(var n=0,i=e.length=t.length;n<i;n++){var o=t[n];e[n]=d.DomElement(o)?o:p.elements(o)}else!d.DomElement(t)&&t!==document&&t!==s||(e=[t]);return e},p.scrollTop=function(t){return t&&"number"==typeof t.scrollTop?t.scrollTop:s.pageYOffset||0},p.scrollLeft=function(t){return t&&"number"==typeof t.scrollLeft?t.scrollLeft:s.pageXOffset||0},p.width=function(t,e,n){return i("width",t,e,n)},p.height=function(t,e,n){return i("height",t,e,n)},p.offset=function(t,e){var n,i={top:0,left:0};return t&&t.getBoundingClientRect&&(n=t.getBoundingClientRect(),i.top=n.top,i.left=n.left,e||(i.top+=p.scrollTop(),i.left+=p.scrollLeft())),i},t.addClass=function(t,e){e&&(t.classList?t.classList.add(e):t.className+=" "+e)},t.removeClass=function(t,e){e&&(t.classList?t.classList.remove(e):t.className=t.className.replace(RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," "))},t.css=function(t,e){if(d.String(e))return l(t)[c(e)];if(d.Array(e)){var n={},i=l(t);return e.forEach(function(t){n[t]=i[c(t)]}),n}for(var o in e){var r=e[o];r==parseFloat(r)&&(r+="px"),t.style[c(o)]=r}},t}(window||{});return L}),function(o){"use strict";function t(t,e){Window.prototype[t]=HTMLDocument.prototype[t]=Element.prototype[t]=e}var r,n,i,s;function a(t){return new RegExp("(^|\\s+)"+t+"(\\s+|$)")}function e(t,e){(n(t,e)?s:i)(t,e)}!o.addEventListener&&o.Element&&(r=[],t("addEventListener",function(t,e){var n=this;r.unshift({__listener:function(t){t.currentTarget=n,t.pageX=t.clientX+document.documentElement.scrollLeft,t.pageY=t.clientY+document.documentElement.scrollTop,t.preventDefault=function(){t.returnValue=!1},t.relatedTarget=t.fromElement||null,t.stopPropagation=function(){t.cancelBubble=!0},t.relatedTarget=t.fromElement||null,t.target=t.srcElement||n,t.timeStamp=+new Date,e.call(n,t)},listener:e,target:n,type:t}),this.attachEvent("on"+t,r[0].__listener)}),t("removeEventListener",function(t,e){for(var n=0,i=r.length;n<i;++n)if(r[n].target==this&&r[n].type==t&&r[n].listener==e)return this.detachEvent("on"+t,r.splice(n,1)[0].__listener)}),t("dispatchEvent",function(e){try{return this.fireEvent("on"+e.type,e)}catch(t){for(var n=0,i=r.length;n<i;++n)r[n].target==this&&r[n].type==e.type&&r[n].call(this,e)}})),s="classList"in document.documentElement?(n=function(t,e){return t.classList.contains(e)},i=function(t,e){t.classList.add(e)},function(t,e){t.classList.remove(e)}):(n=function(t,e){return a(e).test(t.className)},i=function(t,e){n(t,e)||(t.className=t.className+" "+e)},function(t,e){t.className=t.className.replace(a(e)," ")});var l={hasClass:n,addClass:i,removeClass:s,toggleClass:e,has:n,add:i,remove:s,toggle:e};function c(t,e){this.el=t,this.inputEl=t.querySelector("form input.form-text"),this._initEvents()}"function"==typeof define&&define.amd?define(l):"object"==typeof exports?module.exports=l:o.classie=l,String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),c.prototype={_initEvents:function(){function t(t){t.stopPropagation(),e.inputEl.value=e.inputEl.value.trim(),l.has(e.el,"sb-search-open")?l.has(e.el,"sb-search-open")&&/^\s*$/.test(e.inputEl.value)&&(t.preventDefault(),e.close()):(t.preventDefault(),e.open())}var e=this;this.el.addEventListener("click",t),this.el.addEventListener("touchstart",t),this.inputEl.addEventListener("click",function(t){t.stopPropagation()}),this.inputEl.addEventListener("touchstart",function(t){t.stopPropagation()})},open:function(){var t,e,n=this;l.add(this.el,"sb-search-open"),e=!1,t=navigator.userAgent||navigator.vendor||o.opera,(/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4)))&&(e=!0),e||this.inputEl.focus();var i=function(t){n.close(),this.removeEventListener("click",i),this.removeEventListener("touchstart",i)};document.addEventListener("click",i),document.addEventListener("touchstart",i)},close:function(){this.inputEl.blur(),l.remove(this.el,"sb-search-open")}},o.UISearch=c}(window);;
  /*! lightgallery - v1.6.12 - 2019-02-19
  * http://sachinchoolur.github.io/lightGallery/
  * Copyright (c) 2019 Sachin N; Licensed GPLv3 */
  !function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(a){return b(a)}):"object"==typeof module&&module.exports?module.exports=b(require("jquery")):b(a.jQuery)}(this,function(a){!function(){"use strict";function b(b,d){if(this.el=b,this.$el=a(b),this.s=a.extend({},c,d),this.s.dynamic&&"undefined"!==this.s.dynamicEl&&this.s.dynamicEl.constructor===Array&&!this.s.dynamicEl.length)throw"When using dynamic mode, you must also define dynamicEl as an Array.";return this.modules={},this.lGalleryOn=!1,this.lgBusy=!1,this.hideBartimeout=!1,this.isTouch="ontouchstart"in document.documentElement,this.s.slideEndAnimatoin&&(this.s.hideControlOnEnd=!1),this.s.dynamic?this.$items=this.s.dynamicEl:"this"===this.s.selector?this.$items=this.$el:""!==this.s.selector?this.s.selectWithin?this.$items=a(this.s.selectWithin).find(this.s.selector):this.$items=this.$el.find(a(this.s.selector)):this.$items=this.$el.children(),this.$slide="",this.$outer="",this.init(),this}var c={mode:"lg-slide",cssEasing:"ease",easing:"linear",speed:600,height:"100%",width:"100%",addClass:"",startClass:"lg-start-zoom",backdropDuration:150,hideBarsDelay:6e3,useLeft:!1,closable:!0,loop:!0,escKey:!0,keyPress:!0,controls:!0,slideEndAnimatoin:!0,hideControlOnEnd:!1,mousewheel:!0,getCaptionFromTitleOrAlt:!0,appendSubHtmlTo:".lg-sub-html",subHtmlSelectorRelative:!1,preload:1,showAfterLoad:!0,selector:"",selectWithin:"",nextHtml:"",prevHtml:"",index:!1,iframeMaxWidth:"100%",download:!0,counter:!0,appendCounterTo:".lg-toolbar",swipeThreshold:50,enableSwipe:!0,enableDrag:!0,dynamic:!1,dynamicEl:[],galleryId:1};b.prototype.init=function(){var b=this;b.s.preload>b.$items.length&&(b.s.preload=b.$items.length);var c=window.location.hash;c.indexOf("lg="+this.s.galleryId)>0&&(b.index=parseInt(c.split("&slide=")[1],10),a("body").addClass("lg-from-hash"),a("body").hasClass("lg-on")||(setTimeout(function(){b.build(b.index)}),a("body").addClass("lg-on"))),b.s.dynamic?(b.$el.trigger("onBeforeOpen.lg"),b.index=b.s.index||0,a("body").hasClass("lg-on")||setTimeout(function(){b.build(b.index),a("body").addClass("lg-on")})):b.$items.on("click.lgcustom",function(c){try{c.preventDefault(),c.preventDefault()}catch(a){c.returnValue=!1}b.$el.trigger("onBeforeOpen.lg"),b.index=b.s.index||b.$items.index(this),a("body").hasClass("lg-on")||(b.build(b.index),a("body").addClass("lg-on"))})},b.prototype.build=function(b){var c=this;c.structure(),a.each(a.fn.lightGallery.modules,function(b){c.modules[b]=new a.fn.lightGallery.modules[b](c.el)}),c.slide(b,!1,!1,!1),c.s.keyPress&&c.keyPress(),c.$items.length>1?(c.arrow(),setTimeout(function(){c.enableDrag(),c.enableSwipe()},50),c.s.mousewheel&&c.mousewheel()):c.$slide.on("click.lg",function(){c.$el.trigger("onSlideClick.lg")}),c.counter(),c.closeGallery(),c.$el.trigger("onAfterOpen.lg"),c.$outer.on("mousemove.lg click.lg touchstart.lg",function(){c.$outer.removeClass("lg-hide-items"),clearTimeout(c.hideBartimeout),c.hideBartimeout=setTimeout(function(){c.$outer.addClass("lg-hide-items")},c.s.hideBarsDelay)}),c.$outer.trigger("mousemove.lg")},b.prototype.structure=function(){var b,c="",d="",e=0,f="",g=this;for(a("body").append('<div class="lg-backdrop"></div>'),a(".lg-backdrop").css("transition-duration",this.s.backdropDuration+"ms"),e=0;e<this.$items.length;e++)c+='<div class="lg-item"></div>';if(this.s.controls&&this.$items.length>1&&(d='<div class="lg-actions"><button class="lg-prev lg-icon">'+this.s.prevHtml+'</button><button class="lg-next lg-icon">'+this.s.nextHtml+"</button></div>"),".lg-sub-html"===this.s.appendSubHtmlTo&&(f='<div class="lg-sub-html"></div>'),b='<div class="lg-outer '+this.s.addClass+" "+this.s.startClass+'"><div class="lg" style="width:'+this.s.width+"; height:"+this.s.height+'"><div class="lg-inner">'+c+'</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>'+d+f+"</div></div>",a("body").append(b),this.$outer=a(".lg-outer"),this.$slide=this.$outer.find(".lg-item"),this.s.useLeft?(this.$outer.addClass("lg-use-left"),this.s.mode="lg-slide"):this.$outer.addClass("lg-use-css3"),g.setTop(),a(window).on("resize.lg orientationchange.lg",function(){setTimeout(function(){g.setTop()},100)}),this.$slide.eq(this.index).addClass("lg-current"),this.doCss()?this.$outer.addClass("lg-css3"):(this.$outer.addClass("lg-css"),this.s.speed=0),this.$outer.addClass(this.s.mode),this.s.enableDrag&&this.$items.length>1&&this.$outer.addClass("lg-grab"),this.s.showAfterLoad&&this.$outer.addClass("lg-show-after-load"),this.doCss()){var h=this.$outer.find(".lg-inner");h.css("transition-timing-function",this.s.cssEasing),h.css("transition-duration",this.s.speed+"ms")}setTimeout(function(){a(".lg-backdrop").addClass("in")}),setTimeout(function(){g.$outer.addClass("lg-visible")},this.s.backdropDuration),this.s.download&&this.$outer.find(".lg-toolbar").append('<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'),this.prevScrollTop=a(window).scrollTop()},b.prototype.setTop=function(){if("100%"!==this.s.height){var b=a(window).height(),c=(b-parseInt(this.s.height,10))/2,d=this.$outer.find(".lg");b>=parseInt(this.s.height,10)?d.css("top",c+"px"):d.css("top","0px")}},b.prototype.doCss=function(){return!!function(){var a=["transition","MozTransition","WebkitTransition","OTransition","msTransition","KhtmlTransition"],b=document.documentElement,c=0;for(c=0;c<a.length;c++)if(a[c]in b.style)return!0}()},b.prototype.isVideo=function(a,b){var c;if(c=this.s.dynamic?this.s.dynamicEl[b].html:this.$items.eq(b).attr("data-html"),!a)return c?{html5:!0}:(console.error("lightGallery :- data-src is not pvovided on slide item "+(b+1)+". Please make sure the selector property is properly configured. More info - http://sachinchoolur.github.io/lightGallery/demos/html-markup.html"),!1);var d=a.match(/\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i),e=a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),f=a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),g=a.match(/\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i);return d?{youtube:d}:e?{vimeo:e}:f?{dailymotion:f}:g?{vk:g}:void 0},b.prototype.counter=function(){this.s.counter&&a(this.s.appendCounterTo).append('<div id="lg-counter"><span id="lg-counter-current">'+(parseInt(this.index,10)+1)+'</span> / <span id="lg-counter-all">'+this.$items.length+"</span></div>")},b.prototype.addHtml=function(b){var c,d,e=null;if(this.s.dynamic?this.s.dynamicEl[b].subHtmlUrl?c=this.s.dynamicEl[b].subHtmlUrl:e=this.s.dynamicEl[b].subHtml:(d=this.$items.eq(b),d.attr("data-sub-html-url")?c=d.attr("data-sub-html-url"):(e=d.attr("data-sub-html"),this.s.getCaptionFromTitleOrAlt&&!e&&(e=d.attr("title")||d.find("img").first().attr("alt")))),!c)if(void 0!==e&&null!==e){var f=e.substring(0,1);"."!==f&&"#"!==f||(e=this.s.subHtmlSelectorRelative&&!this.s.dynamic?d.find(e).html():a(e).html())}else e="";".lg-sub-html"===this.s.appendSubHtmlTo?c?this.$outer.find(this.s.appendSubHtmlTo).load(c):this.$outer.find(this.s.appendSubHtmlTo).html(e):c?this.$slide.eq(b).load(c):this.$slide.eq(b).append(e),void 0!==e&&null!==e&&(""===e?this.$outer.find(this.s.appendSubHtmlTo).addClass("lg-empty-html"):this.$outer.find(this.s.appendSubHtmlTo).removeClass("lg-empty-html")),this.$el.trigger("onAfterAppendSubHtml.lg",[b])},b.prototype.preload=function(a){var b=1,c=1;for(b=1;b<=this.s.preload&&!(b>=this.$items.length-a);b++)this.loadContent(a+b,!1,0);for(c=1;c<=this.s.preload&&!(a-c<0);c++)this.loadContent(a-c,!1,0)},b.prototype.loadContent=function(b,c,d){var e,f,g,h,i,j,k=this,l=!1,m=function(b){for(var c=[],d=[],e=0;e<b.length;e++){var g=b[e].split(" ");""===g[0]&&g.splice(0,1),d.push(g[0]),c.push(g[1])}for(var h=a(window).width(),i=0;i<c.length;i++)if(parseInt(c[i],10)>h){f=d[i];break}};if(k.s.dynamic){if(k.s.dynamicEl[b].poster&&(l=!0,g=k.s.dynamicEl[b].poster),j=k.s.dynamicEl[b].html,f=k.s.dynamicEl[b].src,k.s.dynamicEl[b].responsive){m(k.s.dynamicEl[b].responsive.split(","))}h=k.s.dynamicEl[b].srcset,i=k.s.dynamicEl[b].sizes}else{if(k.$items.eq(b).attr("data-poster")&&(l=!0,g=k.$items.eq(b).attr("data-poster")),j=k.$items.eq(b).attr("data-html"),f=k.$items.eq(b).attr("href")||k.$items.eq(b).attr("data-src"),k.$items.eq(b).attr("data-responsive")){m(k.$items.eq(b).attr("data-responsive").split(","))}h=k.$items.eq(b).attr("data-srcset"),i=k.$items.eq(b).attr("data-sizes")}var n=!1;k.s.dynamic?k.s.dynamicEl[b].iframe&&(n=!0):"true"===k.$items.eq(b).attr("data-iframe")&&(n=!0);var o=k.isVideo(f,b);if(!k.$slide.eq(b).hasClass("lg-loaded")){if(n)k.$slide.eq(b).prepend('<div class="lg-video-cont lg-has-iframe" style="max-width:'+k.s.iframeMaxWidth+'"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="'+f+'"  allowfullscreen="true"></iframe></div></div>');else if(l){var p="";p=o&&o.youtube?"lg-has-youtube":o&&o.vimeo?"lg-has-vimeo":"lg-has-html5",k.$slide.eq(b).prepend('<div class="lg-video-cont '+p+' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="'+g+'" /></div></div>')}else o?(k.$slide.eq(b).prepend('<div class="lg-video-cont "><div class="lg-video"></div></div>'),k.$el.trigger("hasVideo.lg",[b,f,j])):k.$slide.eq(b).prepend('<div class="lg-img-wrap"><img class="lg-object lg-image" src="'+f+'" /></div>');if(k.$el.trigger("onAferAppendSlide.lg",[b]),e=k.$slide.eq(b).find(".lg-object"),i&&e.attr("sizes",i),h){e.attr("srcset",h);try{picturefill({elements:[e[0]]})}catch(a){console.warn("lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document.")}}".lg-sub-html"!==this.s.appendSubHtmlTo&&k.addHtml(b),k.$slide.eq(b).addClass("lg-loaded")}k.$slide.eq(b).find(".lg-object").on("load.lg error.lg",function(){var c=0;d&&!a("body").hasClass("lg-from-hash")&&(c=d),setTimeout(function(){k.$slide.eq(b).addClass("lg-complete"),k.$el.trigger("onSlideItemLoad.lg",[b,d||0])},c)}),o&&o.html5&&!l&&k.$slide.eq(b).addClass("lg-complete"),!0===c&&(k.$slide.eq(b).hasClass("lg-complete")?k.preload(b):k.$slide.eq(b).find(".lg-object").on("load.lg error.lg",function(){k.preload(b)}))},b.prototype.slide=function(b,c,d,e){var f=this.$outer.find(".lg-current").index(),g=this;if(!g.lGalleryOn||f!==b){var h=this.$slide.length,i=g.lGalleryOn?this.s.speed:0;if(!g.lgBusy){if(this.s.download){var j;j=g.s.dynamic?!1!==g.s.dynamicEl[b].downloadUrl&&(g.s.dynamicEl[b].downloadUrl||g.s.dynamicEl[b].src):"false"!==g.$items.eq(b).attr("data-download-url")&&(g.$items.eq(b).attr("data-download-url")||g.$items.eq(b).attr("href")||g.$items.eq(b).attr("data-src")),j?(a("#lg-download").attr("href",j),g.$outer.removeClass("lg-hide-download")):g.$outer.addClass("lg-hide-download")}if(this.$el.trigger("onBeforeSlide.lg",[f,b,c,d]),g.lgBusy=!0,clearTimeout(g.hideBartimeout),".lg-sub-html"===this.s.appendSubHtmlTo&&setTimeout(function(){g.addHtml(b)},i),this.arrowDisable(b),e||(b<f?e="prev":b>f&&(e="next")),c){this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide");var k,l;h>2?(k=b-1,l=b+1,0===b&&f===h-1?(l=0,k=h-1):b===h-1&&0===f&&(l=0,k=h-1)):(k=0,l=1),"prev"===e?g.$slide.eq(l).addClass("lg-next-slide"):g.$slide.eq(k).addClass("lg-prev-slide"),g.$slide.eq(b).addClass("lg-current")}else g.$outer.addClass("lg-no-trans"),this.$slide.removeClass("lg-prev-slide lg-next-slide"),"prev"===e?(this.$slide.eq(b).addClass("lg-prev-slide"),this.$slide.eq(f).addClass("lg-next-slide")):(this.$slide.eq(b).addClass("lg-next-slide"),this.$slide.eq(f).addClass("lg-prev-slide")),setTimeout(function(){g.$slide.removeClass("lg-current"),g.$slide.eq(b).addClass("lg-current"),g.$outer.removeClass("lg-no-trans")},50);g.lGalleryOn?(setTimeout(function(){g.loadContent(b,!0,0)},this.s.speed+50),setTimeout(function(){g.lgBusy=!1,g.$el.trigger("onAfterSlide.lg",[f,b,c,d])},this.s.speed)):(g.loadContent(b,!0,g.s.backdropDuration),g.lgBusy=!1,g.$el.trigger("onAfterSlide.lg",[f,b,c,d])),g.lGalleryOn=!0,this.s.counter&&a("#lg-counter-current").text(b+1)}g.index=b}},b.prototype.goToNextSlide=function(a){var b=this,c=b.s.loop;a&&b.$slide.length<3&&(c=!1),b.lgBusy||(b.index+1<b.$slide.length?(b.index++,b.$el.trigger("onBeforeNextSlide.lg",[b.index]),b.slide(b.index,a,!1,"next")):c?(b.index=0,b.$el.trigger("onBeforeNextSlide.lg",[b.index]),b.slide(b.index,a,!1,"next")):b.s.slideEndAnimatoin&&!a&&(b.$outer.addClass("lg-right-end"),setTimeout(function(){b.$outer.removeClass("lg-right-end")},400)))},b.prototype.goToPrevSlide=function(a){var b=this,c=b.s.loop;a&&b.$slide.length<3&&(c=!1),b.lgBusy||(b.index>0?(b.index--,b.$el.trigger("onBeforePrevSlide.lg",[b.index,a]),b.slide(b.index,a,!1,"prev")):c?(b.index=b.$items.length-1,b.$el.trigger("onBeforePrevSlide.lg",[b.index,a]),b.slide(b.index,a,!1,"prev")):b.s.slideEndAnimatoin&&!a&&(b.$outer.addClass("lg-left-end"),setTimeout(function(){b.$outer.removeClass("lg-left-end")},400)))},b.prototype.keyPress=function(){var b=this;this.$items.length>1&&a(window).on("keyup.lg",function(a){b.$items.length>1&&(37===a.keyCode&&(a.preventDefault(),b.goToPrevSlide()),39===a.keyCode&&(a.preventDefault(),b.goToNextSlide()))}),a(window).on("keydown.lg",function(a){!0===b.s.escKey&&27===a.keyCode&&(a.preventDefault(),b.$outer.hasClass("lg-thumb-open")?b.$outer.removeClass("lg-thumb-open"):b.destroy())})},b.prototype.arrow=function(){var a=this;this.$outer.find(".lg-prev").on("click.lg",function(){a.goToPrevSlide()}),this.$outer.find(".lg-next").on("click.lg",function(){a.goToNextSlide()})},b.prototype.arrowDisable=function(a){!this.s.loop&&this.s.hideControlOnEnd&&(a+1<this.$slide.length?this.$outer.find(".lg-next").removeAttr("disabled").removeClass("disabled"):this.$outer.find(".lg-next").attr("disabled","disabled").addClass("disabled"),a>0?this.$outer.find(".lg-prev").removeAttr("disabled").removeClass("disabled"):this.$outer.find(".lg-prev").attr("disabled","disabled").addClass("disabled"))},b.prototype.setTranslate=function(a,b,c){this.s.useLeft?a.css("left",b):a.css({transform:"translate3d("+b+"px, "+c+"px, 0px)"})},b.prototype.touchMove=function(b,c){var d=c-b;Math.abs(d)>15&&(this.$outer.addClass("lg-dragging"),this.setTranslate(this.$slide.eq(this.index),d,0),this.setTranslate(a(".lg-prev-slide"),-this.$slide.eq(this.index).width()+d,0),this.setTranslate(a(".lg-next-slide"),this.$slide.eq(this.index).width()+d,0))},b.prototype.touchEnd=function(a){var b=this;"lg-slide"!==b.s.mode&&b.$outer.addClass("lg-slide"),this.$slide.not(".lg-current, .lg-prev-slide, .lg-next-slide").css("opacity","0"),setTimeout(function(){b.$outer.removeClass("lg-dragging"),a<0&&Math.abs(a)>b.s.swipeThreshold?b.goToNextSlide(!0):a>0&&Math.abs(a)>b.s.swipeThreshold?b.goToPrevSlide(!0):Math.abs(a)<5&&b.$el.trigger("onSlideClick.lg"),b.$slide.removeAttr("style")}),setTimeout(function(){b.$outer.hasClass("lg-dragging")||"lg-slide"===b.s.mode||b.$outer.removeClass("lg-slide")},b.s.speed+100)},b.prototype.enableSwipe=function(){var a=this,b=0,c=0,d=!1;a.s.enableSwipe&&a.doCss()&&(a.$slide.on("touchstart.lg",function(c){a.$outer.hasClass("lg-zoomed")||a.lgBusy||(c.preventDefault(),a.manageSwipeClass(),b=c.originalEvent.targetTouches[0].pageX)}),a.$slide.on("touchmove.lg",function(e){a.$outer.hasClass("lg-zoomed")||(e.preventDefault(),c=e.originalEvent.targetTouches[0].pageX,a.touchMove(b,c),d=!0)}),a.$slide.on("touchend.lg",function(){a.$outer.hasClass("lg-zoomed")||(d?(d=!1,a.touchEnd(c-b)):a.$el.trigger("onSlideClick.lg"))}))},b.prototype.enableDrag=function(){var b=this,c=0,d=0,e=!1,f=!1;b.s.enableDrag&&b.doCss()&&(b.$slide.on("mousedown.lg",function(d){b.$outer.hasClass("lg-zoomed")||b.lgBusy||a(d.target).text().trim()||(d.preventDefault(),b.manageSwipeClass(),c=d.pageX,e=!0,b.$outer.scrollLeft+=1,b.$outer.scrollLeft-=1,b.$outer.removeClass("lg-grab").addClass("lg-grabbing"),b.$el.trigger("onDragstart.lg"))}),a(window).on("mousemove.lg",function(a){e&&(f=!0,d=a.pageX,b.touchMove(c,d),b.$el.trigger("onDragmove.lg"))}),a(window).on("mouseup.lg",function(g){f?(f=!1,b.touchEnd(d-c),b.$el.trigger("onDragend.lg")):(a(g.target).hasClass("lg-object")||a(g.target).hasClass("lg-video-play"))&&b.$el.trigger("onSlideClick.lg"),e&&(e=!1,b.$outer.removeClass("lg-grabbing").addClass("lg-grab"))}))},b.prototype.manageSwipeClass=function(){var a=this.index+1,b=this.index-1;this.s.loop&&this.$slide.length>2&&(0===this.index?b=this.$slide.length-1:this.index===this.$slide.length-1&&(a=0)),this.$slide.removeClass("lg-next-slide lg-prev-slide"),b>-1&&this.$slide.eq(b).addClass("lg-prev-slide"),this.$slide.eq(a).addClass("lg-next-slide")},b.prototype.mousewheel=function(){var a=this;a.$outer.on("mousewheel.lg",function(b){b.deltaY&&(b.deltaY>0?a.goToPrevSlide():a.goToNextSlide(),b.preventDefault())})},b.prototype.closeGallery=function(){var b=this,c=!1;this.$outer.find(".lg-close").on("click.lg",function(){jQuery('.site-navbar').css('z-index', 1);; b.destroy()}),b.s.closable&&(b.$outer.on("mousedown.lg",function(b){c=!!(a(b.target).is(".lg-outer")||a(b.target).is(".lg-item ")||a(b.target).is(".lg-img-wrap"))}),b.$outer.on("mousemove.lg",function(){c=!1}),b.$outer.on("mouseup.lg",function(d){(a(d.target).is(".lg-outer")||a(d.target).is(".lg-item ")||a(d.target).is(".lg-img-wrap")&&c)&&(b.$outer.hasClass("lg-dragging")||b.destroy())}))},b.prototype.destroy=function(b){var c=this;b||(c.$el.trigger("onBeforeClose.lg"),a(window).scrollTop(c.prevScrollTop)),b&&(c.s.dynamic||this.$items.off("click.lg click.lgcustom"),a.removeData(c.el,"lightGallery")),this.$el.off(".lg.tm"),a.each(a.fn.lightGallery.modules,function(a){c.modules[a]&&c.modules[a].destroy()}),this.lGalleryOn=!1,clearTimeout(c.hideBartimeout),this.hideBartimeout=!1,a(window).off(".lg"),a("body").removeClass("lg-on lg-from-hash"),c.$outer&&c.$outer.removeClass("lg-visible"),a(".lg-backdrop").removeClass("in"),setTimeout(function(){c.$outer&&c.$outer.remove(),a(".lg-backdrop").remove(),b||c.$el.trigger("onCloseAfter.lg")},c.s.backdropDuration+50)},a.fn.lightGallery=function(c){return this.each(function(){if(a.data(this,"lightGallery"))try{a(this).data("lightGallery").init()}catch(a){console.error("lightGallery has not initiated properly")}else a.data(this,"lightGallery",new b(this,c))})},a.fn.lightGallery.modules={}}()});;
  (function ($) {
    if (!Drupal.si_npg) {
      Drupal.si_npg = {};
    }
    var win = $(window);
    Drupal.si_npg.splitList = function(list, num_cols, listItem, wrapper) {
      //listItem = 'li',
      wrapper = (typeof wrapper !== 'undefined') ?  wrapper : '<ul ></ul>';
      listClass = 'sub-list';
      list.each(function() {
        var items_per_col = new Array(),
          items = $(this).find(listItem),
          min_items_per_col = Math.floor(items.length / num_cols),
          difference = items.length - (min_items_per_col * num_cols);
  
        for (var i = 0; i < num_cols; i++) {
          items_per_col[i] = i < difference ?  min_items_per_col + 1 : min_items_per_col;
        }
        for (var i = 0; i < num_cols; i++) {
          var subClass = 'list-' + i,
            $last = i == num_cols - 1 ? ' last' : '';
          $(this).append($(wrapper).addClass(listClass +' ' + subClass + $last));
          for (var j = 0; j < items_per_col[i]; j++) {
            var pointer = 0;
            for (var k = 0; k < i; k++) {
              pointer += items_per_col[k];
            }
            $(this).find('.' + subClass).last().append(items[j + pointer]);
          }
        }
        var $class = $(this).attr('class') + ' split-columns cols-' + num_cols;
        $(this).replaceWith(function () {
          return $('<div/>', {
            class: $class,
            html: this.innerHTML
          });
        });
      });
    };
  
    Drupal.behaviors.si_npg = {
      attach: function (context, settings) {
  
        var siNPG = siNPG || {},
          edanSummary = $('.result-summary', context);
          toggleBtns = $('.toggle-btns', context);
          searchResults = $('.search-results', context);
        //console.log(settings);
        siNPG = {
          init : function() {
            this.menuInit();
            this.pageInit();
          },
          setLayout: function () {
            var viewport = ($( window ).width());
  
            this.masonInit(viewport);
            this.cloneMenu(viewport);
  
            // if (viewport < 980) {
            //   var contentPad = $('header', context).height();
            //   $('.content-wrapper').css('padding-top', contentPad + 'px');
            // }
          },
          masonInit : function(viewport) {
            var $grid = $('.masonry-grid', context);
            if (viewport > 720) {
              $grid.once('masonry', function () {
                //see edan-custom-search-results.preprocess.inc for siMasonry settings
                var gridW = typeof settings.siMasonry !== 'undefined' ? settings.siMasonry.size : 327;
                if (($grid).hasClass('featured-portraits')){gridW = 194}
                
                // for Masonry Image Gallery paragraph types (see exhibit, page, podcast CTs)
                if (($grid).hasClass('masonry-gallery')){gridW = 240}
                if (($grid).hasClass('wide')){gridW = 242}
                
                //Masonry + ImagesLoaded
                $grid.imagesLoaded(function () {
                  $grid.masonry({
                    // selector for entry content
                    itemSelector: '.grid-item',
                    isFitWidth: true,
                    columnWidth: gridW,
                    horizontalOrder: $(this).hasClass('view-grid') ? !1 : !0
                   // percentPosition: true
                  });
                })
                  .progress(function (instance, image) {
                    var $image = $(image.img);
                    if (image.isLoaded) {
                      $image.addClass('complete');
                    }
                  });
              });//grid.once
            }//viewport>720
            
            $('#view-all-images').click(function() {
              $('#view-all-images').css({
                  'display': 'none'
              });
              $('.content').css({
                  'display': 'none'
              });
        $('.masonry-alt-back').css({
          'display': 'block'
        });
              $('.paragraphs-item-masonry-image-gallery-alt .grid-item').css({
                  'display': 'block'
              });
              $grid.masonry('destroy');
              $grid.masonry('reloadItems');
               $('html,body').animate({
                  scrollTop: $(".paragraphs-item-masonry-image-gallery-alt").offset().top-100},
              'slow');
            });
        $('.masonry-alt-back').click(function() {
          $('.content').css({
            'display': 'block'
          });
          $('.masonry-alt-back').css({
            'display': 'none'
          });
          $('#view-all-images').css({
            'display': 'inline-block'
          });
          $('.paragraphs-item-masonry-image-gallery-alt .grid-item').css({
            'display': 'none'
          });
          $('.paragraphs-item-masonry-image-gallery-alt .grid-item:nth-of-type(-n+4)').css({
            'display': 'block'
          });
        });
  
            // put masonry grid in light gallery
            var lgFigures = $('.masonry-gallery');
            lgFigures.lightGallery({
              selector: '.lg-figure',
              thumbnail:false,
              share: false,
              subHtmlSelectorRelative: true
            });//lightgallery
            
          },
          pageInit : function() {
           // $('body', context).addClass('js');
            // if($('.record-media .thumbnail', context).length) {
            //   $('.record-media .thumbnail').colorbox({
            //     scalePhotos: true,
            //     maxWidth: '100%',
            //     photo: true
            //   });
            // }
  
            // Added by ghalusa, 2016-09-16
            // Hide the 'Related Object Groups' button.
            // TODO: Remove when we can hide the button using the admin interface (currently not working).
            // /admin/config/search/edan-search
            $( "ul.tabs.primary li:nth-child(3)" ).hide();
  
            if ($('.marquee', context).length != 0) {
              $('.marquee').marquee({
                //speed in milliseconds of the marquee
                duration: 10000,
                //gap in pixels between the tickers
                gap: 32,
                //time in milliseconds before the marquee will start animating
                delayBeforeStart: 0,
                //'left' or 'right'
                direction: 'left',
                // pauseOnHover: true,
                //true or false - should the marquee be duplicated to show an effect of continues flow
                duplicated: true
              });
            }
  
            if ($('.edan-search-form', context).length) {
              $('.edan-search-form .form-text', context).focus(function () {
                $(this, context).parents('.edan-search-form').addClass('active');
              }).blur(function(){
                $(this, context).parents('.edan-search-form').removeClass("active");
              });
            }
  
            if (edanSummary.length) {
  
              // Edan toggle button
              toggleBtns.append('<p class="toggle-view"><a href="#" class="list-btn fa fa-th-list"><span class="sr-only">List View</span></a><a href="#" class="grid-btn fa fa-th-large"><span class="sr-only">Grid View</span></a></p>');
  
              // Added by hpham, 2017-02-01
              // Set the initial view based on setting set by theme.
  
              var defaultViewDisplayClass = settings['siEdan']['view'] !== 'undefined' ? settings['siEdan']['view'] : 'list-view',
                defaultBtn = defaultViewDisplayClass === 'list-view' ? 'list-btn' : 'grid-btn';
  
              // toggleBtns.find('.toggle-view a').parents('.edan-search').removeClass('list-view').removeClass('grid-view').addClass(defaultViewDisplayClass);
             
             //** Comment this for now, using only Masonry Grid  **//
              // $(searchResults).removeClass('list-view').removeClass('grid-view').addClass(defaultViewDisplayClass);
             /***/
  
              toggleBtns.find('.'+ defaultBtn).addClass('active');
              // On click handler.
              $("a", toggleBtns).click(function(e) {
                // this affects *every* link contained in the edan-results-summary div
                // we need to drop out of this function if the link isn't specifically the grid or list button.
                var $this = $(this);
                var current_view = $this.hasClass('list-btn') ? 'list-view' : '';
                //console.log(current_view);
                if(current_view == '' && $this.hasClass('grid-btn')) {
                  current_view = (current_view == '' && $this.hasClass('grid-btn')) ? 'grid-view' : '';
                }
  
                if(current_view == '') {
                  return;
                }
  
                // Remove the 'active' class from both expand/collapse toggle buttons.
                $this.parent('.toggle-view').children('a').removeClass('active');
                $this.addClass('active');
                e.preventDefault();
                e.stopPropagation();
                //$('.edan-search-wrapper', context).removeClass('list-view').removeClass('grid-view').addClass(current_view);
                $(searchResults).removeClass('list-view').removeClass('grid-view').addClass(current_view);
  
  
                // Added by ghalusa, 2016-09-16
                if(current_view === 'grid-view') {
                  // In grid view...
                  // Remove all 'active' elements.
                  $('.search-results').removeClass('active');
                  // Set the class of the grid button to 'active'.
                  //$this.parent('.toggle-view').children('a.grid-btn').addClass('active');
                } else {
                  // In list view...
                  // Set the text of all expand/collapse toggle buttons to 'Expand'.
                  $('.edan-search-mini-toggle').text('Expand');
                  // Set the class of list button to 'active'.
                  //$this.parent('.toggle-view').children('a.list-btn').addClass('active');
                }
  
                //$this.parents('.edan-search').removeClass('list-view').removeClass('grid-view').addClass(current_view);
                // $('.edan-search.grid-view .edan-search-result', context).matchHeight();
                // $('.edan-search.list-view .edan-search-result', context).css('height', 'auto');
  
              }); //toggleBtns click
            }
  
            $('.hover-text a').on("touchstart", function (e) {
              "use strict"; //satisfy the code inspectors
              var link = $(this); //preselect the link
              if (link.hasClass('hover')) {
                return true;
              } else {
                link.addClass("hover");
                $('.hover-text a').not(this).removeClass("hover");
                e.preventDefault();
                return false; //extra, and to make sure the function has consistent return points
              }
            });
  
            Drupal.si_npg.splitList($('.split-list', context), 2, 'li');
            $('.front #edit-edan-local').prop('checked', true);
            //Drupal.si_npg.pullQuote(context);
  
            if($('.edan-search-facets', context).length) {
              $('.root-facet-list .category', context).click(function(){
                $(this).toggleClass('expand').parent('li').toggleClass('expand').children('.facets');
              });
            }
  
            $('.content-wrapper', context).once('imagesLoaded', function () {
              $(this).imagesLoaded().progress(function (instance, image) {
                var $image = $(image.img);
  
                if (image.isLoaded) {
                  $image.addClass('complete');
                }
                else {
                  $(image.img).addClass('hide').parents('.node--teaser').removeClass('has-media');
                  $(image.img).addClass('hide').parents('.edan-search-result').removeClass('has-media');
                }
              });
            });
            this.masonInit();
            this.shareIcons();
          },
                  menuInit: function () {
            if (typeof settings.superfish !== 'undefined') {
              $.each(settings.superfish || {}, function(index, options) {
                // Process all Superfish lists.
                $('#superfish-' + options.id, context).once('superfish', function() {
                  var list = $(this);
                  options.sf.onShow = function () {
                    $('.menuparent', $('#superfish-' + options.id, context)).attr('aria-expanded', false);
                    $('.sf-mega', $('#superfish-' + options.id, context)).attr('aria-expanded', false);
                    $(this).parent().attr('aria-expanded', true);
                    $(this).attr('aria-expanded', true);
                  };
                  options.sf.onHide = function () {
                    $(this).parent().attr('aria-expanded', false);
                    $(this).attr('aria-expanded', false);
                  };
                  // options.sf.onHandleTouch = function () {
                  //   return false;
                  // };
                  options.sf.cssArrows = options.sf.autoArrows;
  
                options.sf.popUpSelector = '.sf-mega';
                 // console.log(options.sf);
                  // Check if we are to apply the Supersubs plug-in to it.
                  if (options.plugins || false) {
                    if (options.plugins.supersubs || false) {
                      list.supersubs(options.plugins.supersubs);
                    }
                  }
  
                  // Apply Superfish to the list.
                  list.superfish(options.sf);
                //  list.children('li:first').superfish('show');
                  // Check if we are to apply any other plug-in to it.
                  if (options.plugins || false) {
                    if (options.plugins.touchscreen || false) {
                      options.plugins.touchscreen.popUpSelector = options.sf.popUpSelector;
                      list.sftouchscreen(options.plugins.touchscreen);
                    }
                    if (options.plugins.smallscreen || false) {
                      options.plugins.smallscreen.popUpSelector = options.sf.popUpSelector;
                      list.sfsmallscreen(options.plugins.smallscreen);
                    }
                    // if (options.plugins.automaticwidth || false) {
                    //   list.sfautomaticwidth();
                    // }
                    // if (options.plugins.supposition || false) {
                    //   list.supposition();
                    // }
                    // if (options.plugins.bgiframe || false) {
                    //   list.find('.sub-menu').bgIframe({opacity:false});
                    // }
                  }
                });
              });
            }
  
          },
          cloneMenu: function (viewport) {
            if ($('#superfish-1-accordion', context).length && viewport < 980) {
              $('#superfish-1-accordion', context).once('si-mobile-menu', function() {
                $('#block-menu-menu-secondary ul li', context).clone().addClass('secondary-links').appendTo('#superfish-1-accordion');
              });
            }
          },
          shareIcons: function () {
            if ($('.share-btn', context).length) {
              $('.share-btn', context).click(function (e) {
                var $this = $(this);
                $this.toggleClass('active');
                e.preventDefault();
                e.stopPropagation();
                $this.siblings('.social-media').toggleClass('active');
              });
            }
          }
        };
  
        siNPG.init();
  
        // Generic function that runs on window resize.
        function resizeStuff() {
          siNPG.setLayout();
        }
  
        // Runs function once on window resize.
        var TO = false;
        $(window).resize(function () {
          if (TO !== false) {
            clearTimeout(TO);
          }
  
          // 200 is time in miliseconds.
          TO = setTimeout(resizeStuff, 100);
        }).resize();
  
  
        // Added by felders, 2017-05-08
        // Add Enlarge Image button to Coloborx viewer on record pages
        if (typeof ($('.collection-image img').attr('src')) === 'undefined'){
          return;
        }
        else{
          var idsImgLink = ($('.collection-image img').attr('src'));
          if($('.page-object #cboxStaticEnlargement').length <= 0){
            $('.page-object #cboxContent').append('<a id="cboxStaticEnlargement" target="_blank" href="'+idsImgLink+'" class="viewer_open-enlarge">Open Enlarged Image</a>');
          }
        };
      }//attach
    };//drupal.behaviors
  
    Drupal.behaviors.podcasts = {
      attach: function(context, settings) {
        //Podcast Masonry Override
        $('.podcast-masonry').masonry({
          columnWidth: 100,
          itemSelector: '.grid-item',
          gutter: 0,
        });
      }
    };
  
    function unset_lightgallery_visibility() {
      var text_element = document.querySelector('.lg-text-button');
      var text_style = getComputedStyle(text_element);
      var text_visibility = text_style.display;
  
      // If the show/hide text button is showing,
      // reset visibility for images and text before changing the slide
      if(text_visibility == "block") {
        $('.lg-sub-html').css('visibility', '');
        $('.lg-sub-html').css('height', '');
        $('.lg-item.lg-current .lg-img-wrap img').css('visibility', '');
      }
    }
  
    Drupal.behaviors.lightgallery_exhibit = {
      attach: function(context, settings) {
          //set timeout to add translation button, if applicable, to initial item
          translation_button = '<a href=""  onclick="event.preventDefault()" id="translation_button" class="lg-icon"></a>';
          $('.paragraphs-item-image-lightbox').on('click', function(){
              setTimeout(function() {
                  if($('.lg-visible .translation_text').length){
                      $('#lg-download').before(translation_button);
                  }
                  //Add click event for translation text
                  $('#translation_button').on('click', function(e) {
                      if($('.lg-sub-html .original_text').css('visibility') == 'visible'){
                          $('.lg-sub-html .original_text').css('visibility', 'hidden');
                          $('.lg-sub-html .original_text').css('display', 'none');
                          $('.lg-sub-html .translation_text').css('visibility', 'visible');
                          $('.lg-sub-html .translation_text').css('display', 'inherit');
                      }else{
                          $('.lg-sub-html .translation_text').css('visibility', 'hidden');
                          $('.lg-sub-html .translation_text').css('display', 'none');
                          $('.lg-sub-html .original_text').css('visibility', 'visible');
                          $('.lg-sub-html .original_text').css('display', 'inherit');
                      }
  
                      e.preventDefault(); // prevents default
                      return false;
                  });
              }, 500);
          });  
          
  
        // When lightgallery is created, add a button users can click to view the text,
        // when viewing an exhibit slideshow on small screens.
        $('body').on('DOMNodeInserted', '.lg-sub-html', function () {
          if($('.lg-sub-html').length) {
            if($('.lg-text-button').length) {
              //console.log("Text button exists, removing it before re-adding");
              $('.lg-text-button').remove();
              $('#translation_button').remove();
            }
  
            text_button = '<div class="lg-text-button"><a href="" class="lg-view-text lg-icon"></a>';
            translation_button = '<a href="" onclick="event.preventDefault()" id="translation_button" class="lg-icon"></a>';
            
            //$('.lg-sub-html').after(text_button);
            $('#lg-download').before(text_button);
            
            if($('.lg-visible .translation_text').length){
                $('#lg-download').before(translation_button);
              }
            
  
            // Add click event for showing the text
            $('.lg-view-text').on('click', function(e) {
              var text_element = document.querySelector('.lg-sub-html');
              var text_style = getComputedStyle(text_element);
              var text_visibility = text_style.visibility;
              //console.log("text is " + text_visibility);
  
              if(text_visibility == "hidden") {
                // show it, and hide the image
                //console.log("hiding image, showing text");
                $('.lg-item.lg-current .lg-img-wrap img').css('visibility', 'hidden');
                $('.lg-sub-html').css('visibility', 'visible');
                $('.lg-sub-html').css('height', '100%');
              }
              else {
                $('.lg-sub-html').css('visibility', '');
                $('.lg-sub-html').css('height', '');
                $('.lg-item.lg-current .lg-img-wrap img').css('visibility', '');
              }
  
              e.preventDefault(); // prevents default
              return false;
            });
            
            //Add click event for translation text
            $('#translation_button').on('click', function(e) {
              if($('.lg-sub-html .original_text').css('visibility') == 'visible'){
                  $('.lg-sub-html .original_text').css('visibility', 'hidden');
                  $('.lg-sub-html .original_text').css('display', 'none');
                  $('.lg-sub-html .translation_text').css('visibility', 'visible');
                  $('.lg-sub-html .translation_text').css('display', 'inherit');
              }else{
                  $('.lg-sub-html .translation_text').css('visibility', 'hidden');
                  $('.lg-sub-html .translation_text').css('display', 'none');
                  $('.lg-sub-html .original_text').css('visibility', 'visible');
                  $('.lg-sub-html .original_text').css('display', 'inherit');
              }
  
              e.preventDefault(); // prevents default
              return false;
            });
  
            // Add click event to hide the text when the user clicks the text
            $('.lg-sub-html').on('click', function(e) {
              unset_lightgallery_visibility();
            });
  
            // Unset the visibility customizations, when user switches to a different slide
            $('.lg-next, .lg-prev').on('click', function(e) {
              unset_lightgallery_visibility();
            });
  
            // Unset the visibility customizations when user resizes the window
            $( window ).resize(function() {
              unset_lightgallery_visibility();
            });
          }
          if($(".lg-sub-html>div").hasClass("lg-alt-containter")){
              $("html, body").scrollTop(0);
              $(".lg").addClass("lg-alt");
              
              $('.lg-backdrop').css({
                  'display': 'none'
              });
              if(!$( ".lg-alt>header" ).hasClass( "header" )){
                  $( ".header" ).clone(true,true).insertBefore( ".lg-inner" );
                  $(this).find('.lg-alt-title').insertAfter( ".lg-close" );
                  var item= $(this);
                  $('.lg-next, .lg-prev').on('click', function(){
                  setTimeout(function() {
                      $('.lg-toolbar').find('.lg-alt-title').remove();
                      item.find('.lg-alt-title').insertAfter( ".lg-close" );
                  }, 600);
                  }); 
              }
              
              
               
              $('.lg-outer').css({
                  //'paddingTop': '280px',
                  'overflowY': "auto",
                  'zIndex': "30"
              });
              $('body').css({
                  'overflowY': 'hidden'
              });
              $('.lg-close').on('click', function(e) {
                  $('body').css({
                      'overflowY': 'auto'
                  });
              });
              $( ".lg-close" ).empty();
              
              $( ".lg-close" ).append("<svg aria-hidden='true' focusable='false' data-prefix='fas' data-icon='arrow-alt-circle-left' class='svg-inline--fa fa-arrow-alt-circle-left fa-w-16' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='currentColor' d='M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm116-292H256v-70.9c0-10.7-13-16.1-20.5-8.5L121.2 247.5c-4.7 4.7-4.7 12.2 0 16.9l114.3 114.9c7.6 7.6 20.5 2.2 20.5-8.5V300h116c6.6 0 12-5.4 12-12v-64c0-6.6-5.4-12-12-12z'></path></svg> <span>Back</span>");
          }
        });
        
      }
    };
  
    Drupal.behaviors.masonry_grid_list = {
      attach: function(context, settings) {
  
        // Provide switcher functionality for grid/list view for masonry grid
        // Deprecated 6/1/2020 but kept in case we need to revert.
        $('.masonry-grid-list-buttons .view-style').click(function(e) {
           if($(this).hasClass("btn-active")) {
             // do nothing
           }
           else {
             var rel = $(this).attr("rel");
             if(rel == "list-view") {
               // Add grid-list class to masonry-grid
               $('.masonry-grid').addClass("grid-list");
             }
             else {
               // Remove grid-list class
               $('.masonry-grid').removeClass("grid-list");
               // Trigger window resize so that the masonry grid does its thing
               $(window).resize();
             }
             $(this).parent().find('button.view-style').removeClass('btn-active');
             $(this).addClass("btn-active");
           }
        });
      }
    };
  
  })(jQuery);
  ;
  /* NPG Accessibility Fixes
   * Scripts to patch forms and other elements for accessiblility
   */
  
  jQuery(function($) {
  
  /* Insert asterisk on required fieldset items */
  
  $("fieldset.required legend").each(function(){
      $(this).append(" <span title='This field is required.' class='form-required'>*</span>");
  });
  
  /* Remove invisible labels */
  
  $("span.form-required").parent(".element-invisible").remove();
  
  /* Sidebar Navigation Keyboard accessibility */
  
  $('#block-system-main-menu li').each(function(){
       var $link = $(this);
       $(".active-trail").addClass("on"); //keep active menu open
           $link.keyup(function() {
               $link.addClass('active-trail');
          $('#block-system-main-menu li').not(this).not(".on").removeClass('active-trail');
         });
   });
  
  /* Remove empty node headings from webform pages (replace this, PHP method not working for now) */
  
  $('.node--webform .node__title:empty').parent("header").append("<!-- Empty, H2 removed by JS for WCAG -->");
  $('.node--webform .node__title:empty').remove();
  
  //ensure this loads AFTER the slideshow
  $(window).load(function(){
      /* Add link and tab functionality to slideshow pause button */
       $(".flex-pauseplay a").attr("href", "#").click(function(event){
                 event.preventDefault();
             });
      });
  
  /* ****** */
  /* Below added by FelderS for Redesign Sept 2018 */
  /* ****** */
  
  /* Lanauge Dropdon / Icons */
  /* Add label 'for' attribute' */
   $('label.dd-selected-text', '#lang-dropdown-select-language').attr('for', 'dd-selected-value');
  
  /* Add lang flag image alt text */
  
   $('img.dd-selected-image', '#lang-dropdown-select-language').attr('alt', $('label.dd-selected-text', '#lang-dropdown-select-language').text());
  
  /* Orphaned webform labels */
  /* labels for divs, converted to headings */
  /* labels without 'for' attr, convert to headings */
  
  var label, labelFor;
  $('.webform-component label').each(function (){
      label = $(this);
      labelFor = '#' + $(this).attr('for');
  
      if ($(labelFor).is('div')){
          var labelText = $(label).html();
          $(label).after('<h6 class="label-replaced-heading"><strong>' + labelText + '</strong></h6>');
          $(label).remove();
      }
  
      if (!$(label).attr('for')){
          var labelText = $(label).html();
          var labelClasses = $(label).attr('class');
          $(label).after('<h6 class="label-replaced-heading ' + labelClasses + '"><strong>' + labelText + '</strong></h6>');
          $(label).remove();
      }
  });
  
  });/*jquery*/;
  /**
   * Image modal for online exhibitions. Mostly taken from the viewimage.js file, but genericized. Sorry to future me.
   */
  jQuery(document).ready(function($) {
      if ($('.paragraphs-item-modal-image').length) {
          var windowWidth = $(window).width(),
              windowHeight = $(window).height() - 60;
          $('.modal-image-preview').on('click', function(event){
              event.preventDefault();
              var thisModal = $(this).find(".modal-image-modal"),
                  thisImage = $(this).find("img").clone();
              var clone = thisModal.clone(true,true)
              clone.appendTo('body').find(".modal-image-image").css("height",windowHeight).append(thisImage).delay(100).queue(function() {
                  clone.addClass("shown").dequeue(); 
              });
          });
          $('.modal-image-modal').on('click', function(event) {
              $(this).removeClass("shown").delay(100).queue(function() {
                  $(this).remove().dequeue();
              });
          });
          //Also hiding modal on escape keypress.
          $(document).on('keydown', function(event) {
              if (event.key == "Escape") {
                  $('body > .modal-image-modal').removeClass("shown").delay(100).queue(function() {
                      $(this).remove().dequeue();
                  });
              }
          });
      }
  });;
  /**
   * Adds translations, flexible heights, and slide-count to online exhibition buttons.
   */
  jQuery(document).ready(function($) {
      if ($(".node-type-online-exhibition")) {
          //Translations
          function getCurrentNodeId() {
              var $body = $('body.page-node');
              if ( ! $body.length )
                return false;
              var bodyClasses = $body.attr('class').split(/\s+/);
              for ( i in bodyClasses ) {
                var c = bodyClasses[i];
                if ( c.length > 10 && c.substring(0, 10) === "page-node-" )
                  return parseInt(c.substring(10), 10);
              }
              return false;
          }
          var nodeId = getCurrentNodeId();
          if (nodeId) {
              var enLink = "/node/" + nodeId,
                  esLink = "/es/node/" + nodeId;
              $(".slick__extras").append("<a href='" + enLink + "' class='en-button'>ENG</a> <a href='" + esLink + "' class='es-button'>ESP</a>");
          }
  
          //Slide Count
          if ($(".slick-track .slick__slide").length) {
              var maxSlides = $(".slick-track .slick__slide").length;
              $(".slick_total").text(maxSlides);
          }
          $(".slick__slider").on("afterChange", function(event, slick, currentSlide){
              $(".slick_current").text(currentSlide + 1);
          });
      }
  });;