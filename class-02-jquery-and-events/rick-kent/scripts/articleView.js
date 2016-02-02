// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    if (!$(this).hasClass('template')) {
      // DONE: We need to take every author name from the page, and make it an option in the Author filter.
      //       To do so, Build an `option` DOM element that we can append to the author select box.
      //       Start by grabbing the author's name from `this` article element, and then use that bit of
      //       text to create the option tag (in a variable named `optionTag`),
      //       that we can append to the #author-filter select element.
      //       YAY, DOM manipulation!
      var val = $(this).find('address a').text();
      var optionTag = '<option value="' + val + '">' + val + '</option>';
      $('#author-filter').append(optionTag);
      console.log(optionTag);

      // DONE: Similar to the above, but...
      //       Avoid duplicates! We don't want to append the category name if the select
      //       already has this category as an option!
      val = $(this).attr('data-category');
      optionTag = '<option value="' + val + '">' + val + '</option>';
      if ($('#category-filter option[value="' + val + '"]').length === 0) {
        $('#category-filter').append(optionTag);
      }
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    // Done: Filter shown articles by data-author attribute
    if ($(this).val()) {
      $("article[data-author='" + $(this).val() + "']").fadeIn();
      $("article:not([data-author='" + $(this).val() + "'])").fadeOut();
    } else {
      // If nothing is selected show all articles
      $('article:not(.template)').fadeIn();
    }
    // Reset the value of the category filter
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    // Done - Filter shown articles by category
    if ($(this).val()) {
      $("article[data-category='" + $(this).val() + "']").fadeIn();
      $("article:not([data-category='" + $(this).val() + "'])").fadeOut();
    } else {
      // If nothing is selected show all articles
      $('article:not(.template)').fadeIn();
    }
    // Reset the value of the author filter
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {

  $('.main-nav').on('click', 'li.tab', function() {
    // Show only the section for the tab we clicked on
    $('section.tab-content').hide();
    $('section.tab-content#' + $(this).attr('data-content')).show();
  });

  // Let's now trigger a click on the first .tab element, to set up the page.
  $('.main-nav .tab:first').click();
};

articleView.setTeasers = function() {
  // Hide every element after the second in each article's content
  $('.article-body *:nth-of-type(n+2)').hide();
  $('.read-on').click(function(e) {
    // When read-on link is clicked, don't follow the link but instead toggle
    //   the view to hide this link and show everything in the article's content
    e.preventDefault();
    $(this).hide().siblings('.article-body').find('*').show();
  });
};


$(function(){
  // Done - On ready populate our filter boxes and attach all handles
  articleView.populateFilters();
  articleView.handleAuthorFilter();
  articleView.handleCategoryFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
});
