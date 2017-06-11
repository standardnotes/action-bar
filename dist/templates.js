angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directives/tag_cell.html',
    "<li>\n" +
    "<div class='self' draggable='true' drop='onDrop' ng-class='{&#39;selected&#39; : tag.selected}' ng-click='selectTag()' tag-id='tag.uuid'>\n" +
    "{{tag.displayTitle}}\n" +
    "</div>\n" +
    "</li>\n" +
    "<li ng-if='tag.children'>\n" +
    "<ul>\n" +
    "<div change-parent='changeParent()' class='tag-cell' ng-repeat='child in tag.children' on-select='onSelect()' tag='child'></div>\n" +
    "</ul>\n" +
    "</li>\n"
  );


  $templateCache.put('directives/tag_tree.html',
    "<div ng-if='tag'>\n" +
    "<div class='self' draggable='true' drop='onDrop' is-draggable='!tag.master' ng-class='{&#39;selected&#39; : tag.selected}' ng-click='selectTag()' tag-id='tag.uuid'>\n" +
    "<div class='info'>\n" +
    "<div class='circle' ng-class='circleClassForTag(tag)'></div>\n" +
    "<div class='title'>\n" +
    "{{tag.displayTitle}}\n" +
    "</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "<div ng-repeat='child in tag.children'>\n" +
    "<div change-parent='changeParent()' class='tag-tree' on-select='onSelect()' tag='child'></div>\n" +
    "</div>\n" +
    "</div>\n"
  );


  $templateCache.put('home.html',
    "<div class='meta body-text-color'>\n" +
    "<div class='title'>{{note.content.title}}</div>\n" +
    "<div class='created'>Created {{note.created_at}}</div>\n" +
    "<div class='created'>Updated {{note.updated_at}}</div>\n" +
    "</div>\n" +
    "<div class='info-sections body-text-color'>\n" +
    "<div class='section'>\n" +
    "<div class='title'>Words</div>\n" +
    "<div class='content'>{{wordCount}}</div>\n" +
    "</div>\n" +
    "<div class='section'>\n" +
    "<div class='title'>Paragraphs</div>\n" +
    "<div class='content'>{{paragraphCount}}</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "<div class='info-sections body-text-color'>\n" +
    "<div class='section'>\n" +
    "<div class='title'>Characters</div>\n" +
    "<div class='content'>{{characterCount}}</div>\n" +
    "</div>\n" +
    "<div class='section'>\n" +
    "<div class='title'>Read Time</div>\n" +
    "<div class='content'>{{readTime}}</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "<div class='buttons'>\n" +
    "<button class='element-background-color element-text-color' ng-click='buttonPressed(&#39;duplicate&#39;)'>Duplicate</button>\n" +
    "<button class='element-background-color element-text-color' ng-click='buttonPressed(&#39;copy&#39;)'>Copy to Clipboard</button>\n" +
    "<button class='element-background-color element-text-color' ng-click='buttonPressed(&#39;save&#39;)'>Save</button>\n" +
    "<button class='element-background-color element-text-color' ng-click='buttonPressed(&#39;email&#39;)'>Email</button>\n" +
    "</div>\n"
  );

}]);
