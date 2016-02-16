(function(module) {
  var aboutController = {};

  aboutController.index = function() {
    // console.log('yep');
    $('#about').show().siblings().hide();
    repos.requestRepos(repoView.index);
    // ****** Remember how we used page.js  USE THE repoView.index
    // TODO: Call a function to load all the data.
    // Pass a view function as a callback, so the view will render after the data is loaded.
  };

  module.aboutController = aboutController;
})(window);
