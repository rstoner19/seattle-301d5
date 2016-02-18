(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    console.log(ctx.articles)
    articleView.index(ctx.articles);
  };

  // COMMENT:
    /*

    This starts out by creating a method on the artilcesController object called loadById.  The function takes in the parameters ctx and next.  Ctx allows us to share the info between the routes.

    The var articleData is declared as a function that takes in a parameter 'article' which is assigned to the ctx.artcles variable, which is passed into articleData.

    The next(); will bring up the next callback defined in the page.js function "page" -- the one which maps the path after the loadbyId method to the callback, which is articlesController.index.  articlesController.index is a method on the articlesController object.  It takes in the context(ctx) and next parameter and passes it into articleView.index, which takes in the ctx.articles defined in the articleData function.  articleView.index then displays this data on the MOD.

    After this the Article.findWhere is ran which takes in the information that has been provided and finds any articles matching those parameters.  The inputs are field, value, callback, which then goes through SQL commands that match the field and value match the data in the table.

    */
  articlesController.loadById = function(ctx, next) {
    console.log(ctx);
    var articleData = function(article) {
      ctx.articles = article;
      next();
    };

    Article.findWhere('id', ctx.params.id, articleData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*
  The loadByAuthor is a method on articlesController.  It is executed once someone sorts by author which calls the page.js and manages our application state. The next will allow us to call the next state on routes.js.

  Much like loadById, the authorData function is declared to assign/equate the variable ctx.articles to articlesByAuthor, sanitizing the syntax so it can be  passed into the authorData function (ctx.articles by itself wouldn't be accepted) , given by author selected.

  The next(); will bring up the next callback defined in the page.js function "page" -- the one (articlesController. index, again)which maps the path after the loadbyAuthor function has been called. Again, articlesController.index is a method on the articlesController object.  It takes in the context and next parameter and passes it into articleView.index, which takes in the ctx.articles defined in the articleData function.  articleView.index then displays this data on the MOD.

  After this the Article.findWhere is run which takes in the information that has been provided and finds any articles matching those parameters.  The inputs are field, value, callback, which then goes through SQL commands that match the field and value match the data in the table based on the authorName.  This also replaces a + with a space to make sure the data matches.  Then calls the authorData function.
  */
  articlesController.loadByAuthor = function(ctx, next) {
    console.log(ctx);
    var authorData = function(articlesByAuthor) {
      ctx.articles = articlesByAuthor;
      next();
    };

    Article.findWhere('author', ctx.params.authorName.replace('+', ' '), authorData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*
  The loadByCategory is a method on articlesController.  It is executed once someone sorts by category which calls the page.js and manages our application state. The next will allow us to call the next state on routes.js.

  Much like loadById, the categoryData function passes the data to ctx.articles, given by category selected.

  The next will bring up the next callback defined in routes.js, which is articlesController.index.  articlesController.index is a method on the articlesController object.  It takes in the context and next parameter and passes it into articleView.index, which takes in the ctx.articles defined in the articleData function.  articleView.index then displays this data on the MOD.

  After this the Article.findWhere is ran which takes in the information that has been provided and finds any articles matching those parameters.  The inputs are field, value, callback, which then goes through SQL commands that match the field and value match the data in the table based on the categoryName.  Then calls the categoryData function.
  */
  articlesController.loadByCategory = function(ctx, next) {
    var categoryData = function(articlesInCategory) {
      ctx.articles = articlesInCategory;
      next();
    };

    Article.findWhere('category', ctx.params.categoryName, categoryData);
  };

  // COMMENT: What does this method do?  What is it's execution path?
  /*
  The loadAll is a method on articlesController.  It is executed as soon as someone visits the home page (What we'd consider "index.html") whic calls the page.js and manages our application state. The next will allow us to call the next state on routes.js.

  It then sets ctx.articles to the Article.all array which is the data pulled in from the JSON files.

  The next will bring up the next callback defined in routes.js, which is articlesController.index.  articlesController.index is a method on the articlesController object.  It takes in the context and next parameter and passes it into articleView.index, which takes in the ctx.articles defined in the articleData function.  articleView.index then displays this data on the MOD.

  The if and else statement is where it ensures that data has been pulled into the Article.all.  If Article.all does have data it sets ctx.articles equal to the Article.all array, then calls next (again, articlesController.index).  If Article.all does not have data, as signfied by an empty arry, it runs the fetchall function where it pulls the data from the JSON file.
  */
  articlesController.loadAll = function(ctx, next) {
    var articleData = function(allArticles) {
      ctx.articles = Article.all;
      next();
    };

    if (Article.all.length) {
      ctx.articles = Article.all;
      next();
    } else {
      Article.fetchAll(articleData);
    }
  };


  module.articlesController = articlesController;
})(window);
