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
    "<div class='sn-component'>\n" +
    "<div class='panel static body-background-color body-text-color'>\n" +
    "<div class='content'>\n" +
    "<div class='panel-section'>\n" +
    "<div class='panel-row' id='main-content'>\n" +
    "<div class='panel-column meta body-text-color'>\n" +
    "<div class='title' ng-click='note.showId = !note.showId'>{{note.content.title}}</div>\n" +
    "<div class='created' ng-if='note.showId'>ID {{note.uuid}}</div>\n" +
    "<div class='created'>Created {{note.created_at}}</div>\n" +
    "<div class='created'>Updated {{note.updated_at}}</div>\n" +
    "</div>\n" +
    "<div class='panel-column info-sections body-text-color'>\n" +
    "<div class='section'>\n" +
    "<div class='title'>Words</div>\n" +
    "<div class='info-content'>{{wordCount}}</div>\n" +
    "</div>\n" +
    "<div class='section'>\n" +
    "<div class='title'>Paragraphs</div>\n" +
    "<div class='info-content'>{{paragraphCount}}</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "<div class='panel-column info-sections body-text-color'>\n" +
    "<div class='section'>\n" +
    "<div class='title'>Characters</div>\n" +
    "<div class='info-content'>{{characterCount}}</div>\n" +
    "</div>\n" +
    "<div class='section'>\n" +
    "<div class='title'>Read Time</div>\n" +
    "<div class='info-content'>{{readTime}}</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "<div class='panel-column button-group'>\n" +
    "<div class='button default element-background-color element-text-color' ng-click='buttonPressed(&#39;duplicate&#39;)'>\n" +
    "<div class='label'>Duplicate</div>\n" +
    "</div>\n" +
    "<div class='button default element-background-color element-text-color' ng-click='buttonPressed(&#39;copy&#39;)'>\n" +
    "<div class='label'>Copy to Clipboard</div>\n" +
    "</div>\n" +
    "<div class='button default element-background-color element-text-color' ng-click='buttonPressed(&#39;save&#39;)'>\n" +
    "<div class='label'>Save</div>\n" +
    "</div>\n" +
    "<div class='button default element-background-color element-text-color' ng-click='buttonPressed(&#39;email&#39;)'>\n" +
    "<div class='label'>Email</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "</div>\n" +
    "</div>\n"
  );

}]);
