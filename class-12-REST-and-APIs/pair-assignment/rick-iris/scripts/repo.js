(function(module) {
  var repos = {};

  repos.all = [];
  var test = {};
  repos.requestRepos = function(callback) {
    // DONE(ish?): How would you like to fetch your repos? Don't forget to call the callback.
    // Need to make a call to the github repos, don't forget the callback .done()
    $.ajax({
      url: 'https://api.github.com/users/rstoner19/repos' +
    			'?per_page=5&sort=updated',
      type: 'GET',
      headers: { 'Authorization': 'token ' + githubToken },
      success: function(data, message, xhr) {

      }
    })
  .done(function(data){
    repos.all = data.map(function(ele) {
      if (ele.owner.login === 'rstoner19'){
        return ele;
      }
    });
  });
  };


  // DONE: Model method that filters the full collection for repos with a particular attribute.
  // You could use this to filter all repos that have a non-zero `forks_count`, `stargazers_count`, or `watchers_count`.
  repos.with = function(attr) {
    return repos.all.filter(function(repo) {
      return repo[attr];
    });
  };

  module.repos = repos;
})(window);
