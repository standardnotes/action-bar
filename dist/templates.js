angular.module('app').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directives/tag_cell.html',
    "<li>\r" +
    "\n" +
    "<div class='self' draggable='true' drop='onDrop' ng-class='{&#39;selected&#39; : tag.selected}' ng-click='selectTag()' tag-id='tag.uuid'>\r" +
    "\n" +
    "{{tag.displayTitle}}\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</li>\r" +
    "\n" +
    "<li ng-if='tag.children'>\r" +
    "\n" +
    "<ul>\r" +
    "\n" +
    "<div change-parent='changeParent()' class='tag-cell' ng-repeat='child in tag.children' on-select='onSelect()' tag='child'></div>\r" +
    "\n" +
    "</ul>\r" +
    "\n" +
    "</li>\r" +
    "\n"
  );


  $templateCache.put('directives/tag_tree.html',
    "<div ng-if='tag'>\r" +
    "\n" +
    "<div class='self' draggable='true' drop='onDrop' is-draggable='!tag.master' ng-class='{&#39;selected&#39; : tag.selected}' ng-click='selectTag()' tag-id='tag.uuid'>\r" +
    "\n" +
    "<div class='info'>\r" +
    "\n" +
    "<div class='circle' ng-class='circleClassForTag(tag)'></div>\r" +
    "\n" +
    "<div class='title'>\r" +
    "\n" +
    "{{tag.displayTitle}}\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div ng-repeat='child in tag.children'>\r" +
    "\n" +
    "<div change-parent='changeParent()' class='tag-tree' on-select='onSelect()' tag='child'></div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('home.html',
    "<div class='sn-component'>\r" +
    "\n" +
    "<div class='panel static body-background-color body-text-color'>\r" +
    "\n" +
    "<div class='content' id='panel-content'>\r" +
    "\n" +
    "<div class='panel-section'>\r" +
    "\n" +
    "<div class='panel-row' id='main-content'>\r" +
    "\n" +
    "<div class='panel-column meta body-text-color'>\r" +
    "\n" +
    "<div class='title' ng-click='note.showId = !note.showId'>{{note.content.title}}</div>\r" +
    "\n" +
    "<div class='created' ng-if='note.showId'>ID {{note.uuid}}</div>\r" +
    "\n" +
    "<div class='created'>Created {{createdAt}}</div>\r" +
    "\n" +
    "<div class='created'>Updated {{updatedAt}}</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class='panel-column info-sections body-text-color'>\r" +
    "\n" +
    "<div class='section'>\r" +
    "\n" +
    "<div class='title'>Words</div>\r" +
    "\n" +
    "<div class='info-content'>{{wordCount}}</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class='section'>\r" +
    "\n" +
    "<div class='title'>Paragraphs</div>\r" +
    "\n" +
    "<div class='info-content'>{{paragraphCount}}</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class='panel-column info-sections body-text-color'>\r" +
    "\n" +
    "<div class='section'>\r" +
    "\n" +
    "<div class='title'>Characters</div>\r" +
    "\n" +
    "<div class='info-content'>{{characterCount}}</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class='section'>\r" +
    "\n" +
    "<div class='title'>Read Time</div>\r" +
    "\n" +
    "<div class='info-content'>{{readTime}}</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class='panel-column segmented-buttons'>\r" +
    "\n" +
    "<div class='button default element-background-color element-text-color' ng-click='buttonPressed(&#39;date&#39;)' title='Copy the current date to the clipboard'>\r" +
    "\n" +
    "<div class='label'>{{copiedDate ? \"Copied to Clipboard\" : \"Copy Date\"}}</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class='button default element-background-color element-text-color' ng-click='buttonPressed(&#39;duplicate&#39;)' title='Create a copy of the note'>\r" +
    "\n" +
    "<div class='label'>Duplicate</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class='button default element-background-color element-text-color' ng-click='buttonPressed(&#39;copy&#39;)' title='Copy the note&#39;s text to the clipboard'>\r" +
    "\n" +
    "<div class='label'>{{copyText || \"Copy\"}}</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class='button default element-background-color element-text-color' ng-click='buttonPressed(&#39;save&#39;)' title='Save the note as a file'>\r" +
    "\n" +
    "<div class='label'>Save</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<div class='button default element-background-color element-text-color' ng-click='buttonPressed(&#39;email&#39;)' title='Start a new email with the note&#39;s text'>\r" +
    "\n" +
    "<div class='label'>Email</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );

}]);
