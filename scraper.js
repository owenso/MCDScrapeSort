var request = require('request');
var cheerio = require('cheerio');

request('http://fastfoodnutrition.org/mcdonalds/chart', function (error, response, html) {

  var $ = cheerio.load(html);
  var result = [];
  $('tr').each(function(i, element){
      var title = $(this).children('.chart_row_name').children('a').text();
      var category = $(this).parents('.chart_outside').prev().prev().text();
      var calories = $(this).children('td').eq(1).text();
      var protein = $(this).children('td').eq(11).text();

      var score = protein/calories

      result.push({
        category:category,
        title:title,
        calories: calories,
        protein: protein,
        score: score
      });
    });

    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
  console.log(sortByKey(result,'score'));
});