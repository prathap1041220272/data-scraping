var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var port = process.env.PORT || 4201;

app.get('/scrape', function(req, res){

console.log('Magic happens on port 8081');
  url = 'http://www.imdb.com/title/tt0468569/';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      $('.title_wrapper').filter(function(){
        var data = $(this);
        title = data.children().first().text().trim();
        release = data.children().last().children().last().text().trim();

        json.title = title;
        json.release = release;
      })

      $('.ratingValue').filter(function(){
        var data = $(this);
        rating = data.text().trim();

        json.rating = rating;
      })
    }

    fs.writeFile('output.json', JSON.stringify(json, null, 10), function(err){
      console.log('File successfully written! - Check your project directory for the output.json file');
    })

    res.send('Check your console!')
  })
})

app.listen(port,()=>{
console.log(`server started at port ${port}`);
  
})
exports = module.exports = app;