(function(module) {
  var articlesController = {};

  Article.createTable();  // Ensure the database table is properly initialized

  articlesController.index = function(ctx, next) {
    console.log(ctx.articles)
    articleView.index(ctx.articles);
  };

  // COMMENT:
    /*

    This starts out by creating a method on the object artlcesController called loadById.  The function takes in the parameters ctx and next.  Ctx allows us to share the info between the routes.

    The var artcleData is declared as a function that takes in a parameter 'article' which is assigned to ctx.artcles.  Which is then passed into articleData

    The next will bring up the next callback defined in routes.js, which is articlesController.index.  articlesController.index is a method on the articlesController object.  It takes in the context and next parameter and passes it into articleView.index, which takes in the ctx.articles defined in the articleData function.  articleView.index then displays this data on the MOD.

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

  Much like loadById, the authorData function passes the data to ctx.articles, given by author selected.

  The next will bring up the next callback defined in routes.js, which is articlesController.index.  articlesController.index is a method on the articlesController object.  It takes in the context and next parameter and passes it into articleView.index, which takes in the ctx.articles defined in the articleData function.  articleView.index then displays this data on the MOD.

  After this the Article.findWhere is ran which takes in the information that has been provided and finds any articles matching those parameters.  The inputs are field, value, callback, which then goes through SQL commands that match the field and value match the data in the table based on the authorName.  This also replaces a + with a space to make sure the data matches.  Then calls the authorData function.
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
  The loadAll is a method on articlesController.  It is executed as soon as someone visits the home page (index.html) whic calls the page.js and manages our application state. The next will allow us to call the next state on routes.js.

  It then sets ctx.articles to the Article.all array which is the data pulled in from the JSON files.

  The next will bring up the next callback defined in routes.js, which is articlesController.index.  articlesController.index is a method on the articlesController object.  It takes in the context and next parameter and passes it into articleView.index, which takes in the ctx.articles defined in the articleData function.  articleView.index then displays this data on the MOD.

  The if and else statement is where it ensures that data has been pulled into the Article.all.  If Article.all does have data it sets ctx.articles equal to the Article.all array.  Then calls next (see one paragraph above).  If Article.all does not have data, it runs the fetchall function where it pulls the data from the JSON.
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
