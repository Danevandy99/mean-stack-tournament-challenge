/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Bracket from '../api/bracket/bracket.model';

Thing.find({}).removeAsync()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' +
             'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' +
             'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
             'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
             'tests alongside code. Automatic injection of scripts and ' +
             'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
             'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
             'payload, minifies your scripts/css/images, and rewrites asset ' +
             'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
             'and openshift subgenerators'
    });
  });

User.find({}).removeAsync()
  .then(() => {
    User.createAsync({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test',
      brackets: [{"bracket":[["1 North Carolina","16 Mount St. Mary's/N. C. Central","8 Texas A&M","9 Georgetown","5 Utah","12 Tulsa/Marquette","4 Michigan St.","13 Iona","6 Wisconsin","11 Rhode Island","3 Oklahoma","14 Yale","7 Cincinnati","10 Louisville","2 Villanova","15 Lehigh","1 Maryland","16 High Point","8 NC St.","9 San Diego St.","5 Oregon","12 BYU","4 Butler","13 UAB","6 Connecticut","11 Davidson/Iowa","3 Iowa St.","14 South Dakota St.","7 Notre Dame","10 Texas","2 Arizona","15 New Mexico St.","1 Kentucky","16 Chattanooga/Texas Southern","8 Xavier","9 Miami","5 Michigan","12 Central Michigan","4 California","13 UC Irvine","6 Purdue","11 Valparaiso","3 Wichita St.","14 Hofstra","7 West Virginia","10 UCLA","2 Duke","15 Louisiana Lafayette","1 Kansas","16 Montana","8 Dayton","9 Florida St.","5 Vanderbilt","12 Stephen F. Austin","4 Indiana","13 Belmont","6 LSU","11 Providence","3 Gonzaga","14 Stony Brook","7 Baylor","10 Boise St.","2 Virgina","15 North Florida"],["1 North Carolina","8 Texas A&M","12 Tulsa/Marquette","4 Michigan St.","6 Wisconsin","14 Yale","7 Cincinnati","15 Lehigh","1 Maryland","8 NC St.","12 BYU","13 UAB","11 Davidson/Iowa","14 South Dakota St.","10 Texas","2 Arizona","1 Kentucky","9 Miami","5 Michigan","13 UC Irvine","11 Valparaiso","14 Hofstra","7 West Virginia","15 Louisiana Lafayette","1 Kansas","8 Dayton","12 Stephen F. Austin","4 Indiana","6 LSU","3 Gonzaga","10 Boise St.","2 Virgina"],["1 North Carolina","12 Tulsa/Marquette","6 Wisconsin","7 Cincinnati","1 Maryland","12 BYU","14 South Dakota St.","10 Texas","1 Kentucky","5 Michigan","11 Valparaiso","15 Louisiana Lafayette","1 Kansas","12 Stephen F. Austin","6 LSU","10 Boise St."],["1 North Carolina","7 Cincinnati","12 BYU","14 South Dakota St.","1 Kentucky","11 Valparaiso","12 Stephen F. Austin","6 LSU"],["1 North Carolina","12 BYU","1 Kentucky","6 LSU"],["12 BYU","1 Kentucky"],["1 Kentucky"]],"owner":"Admin","tieBreaker":"156","pickedChampion":["1 Kentucky"],"pickPercentage":100,"potentialPoints":192,"score":0,"name":"Deja Vanderbilt"},
                  {"bracket":[["1 North Carolina","16 Mount St. Mary's/N. C. Central","8 Texas A&M","9 Georgetown","5 Utah","12 Tulsa/Marquette","4 Michigan St.","13 Iona","6 Wisconsin","11 Rhode Island","3 Oklahoma","14 Yale","7 Cincinnati","10 Louisville","2 Villanova","15 Lehigh","1 Maryland","16 High Point","8 NC St.","9 San Diego St.","5 Oregon","12 BYU","4 Butler","13 UAB","6 Connecticut","11 Davidson/Iowa","3 Iowa St.","14 South Dakota St.","7 Notre Dame","10 Texas","2 Arizona","15 New Mexico St.","1 Kentucky","16 Chattanooga/Texas Southern","8 Xavier","9 Miami","5 Michigan","12 Central Michigan","4 California","13 UC Irvine","6 Purdue","11 Valparaiso","3 Wichita St.","14 Hofstra","7 West Virginia","10 UCLA","2 Duke","15 Louisiana Lafayette","1 Kansas","16 Montana","8 Dayton","9 Florida St.","5 Vanderbilt","12 Stephen F. Austin","4 Indiana","13 Belmont","6 LSU","11 Providence","3 Gonzaga","14 Stony Brook","7 Baylor","10 Boise St.","2 Virgina","15 North Florida"],["1 North Carolina","9 Georgetown","12 Tulsa/Marquette","13 Iona","6 Wisconsin","3 Oklahoma","10 Louisville","2 Villanova","1 Maryland","8 NC St.","5 Oregon","4 Butler","6 Connecticut","3 Iowa St.","7 Notre Dame","2 Arizona","1 Kentucky","8 Xavier","5 Michigan","4 California","6 Purdue","3 Wichita St.","7 West Virginia","2 Duke","1 Kansas","8 Dayton","5 Vanderbilt","4 Indiana","6 LSU","3 Gonzaga","7 Baylor","15 North Florida"],["1 North Carolina","12 Tulsa/Marquette","3 Oklahoma","10 Louisville","1 Maryland","5 Oregon","3 Iowa St.","2 Arizona","8 Xavier","4 California","3 Wichita St.","7 West Virginia","8 Dayton","5 Vanderbilt","6 LSU","7 Baylor"],["1 North Carolina","3 Oklahoma","1 Maryland","3 Iowa St.","8 Xavier","7 West Virginia","8 Dayton","7 Baylor"],["3 Oklahoma","3 Iowa St.","8 Xavier","7 Baylor"],["3 Oklahoma","8 Xavier"],["3 Oklahoma"]],"owner":"Admin","tieBreaker":"164","pickedChampion":["3 Oklahoma"],"pickPercentage":100,"potentialPoints":192,"score":0,"name":"Drake Vanderbilt"},
                  {"bracket":[["1 North Carolina","16 Mount St. Mary's/N. C. Central","8 Texas A&M","9 Georgetown","5 Utah","12 Tulsa/Marquette","4 Michigan St.","13 Iona","6 Wisconsin","11 Rhode Island","3 Oklahoma","14 Yale","7 Cincinnati","10 Louisville","2 Villanova","15 Lehigh","1 Maryland","16 High Point","8 NC St.","9 San Diego St.","5 Oregon","12 BYU","4 Butler","13 UAB","6 Connecticut","11 Davidson/Iowa","3 Iowa St.","14 South Dakota St.","7 Notre Dame","10 Texas","2 Arizona","15 New Mexico St.","1 Kentucky","16 Chattanooga/Texas Southern","8 Xavier","9 Miami","5 Michigan","12 Central Michigan","4 California","13 UC Irvine","6 Purdue","11 Valparaiso","3 Wichita St.","14 Hofstra","7 West Virginia","10 UCLA","2 Duke","15 Louisiana Lafayette","1 Kansas","16 Montana","8 Dayton","9 Florida St.","5 Vanderbilt","12 Stephen F. Austin","4 Indiana","13 Belmont","6 LSU","11 Providence","3 Gonzaga","14 Stony Brook","7 Baylor","10 Boise St.","2 Virgina","15 North Florida"],["1 North Carolina","9 Georgetown","5 Utah","4 Michigan St.","11 Rhode Island","14 Yale","10 Louisville","15 Lehigh","1 Maryland","8 NC St.","5 Oregon","4 Butler","6 Connecticut","3 Iowa St.","10 Texas","2 Arizona","16 Chattanooga/Texas Southern","8 Xavier","5 Michigan","4 California","6 Purdue","14 Hofstra","7 West Virginia","15 Louisiana Lafayette","1 Kansas","9 Florida St.","5 Vanderbilt","4 Indiana","6 LSU","14 Stony Brook","7 Baylor","2 Virgina"],["1 North Carolina","5 Utah","11 Rhode Island","10 Louisville","1 Maryland","5 Oregon","3 Iowa St.","10 Texas","16 Chattanooga/Texas Southern","5 Michigan","6 Purdue","7 West Virginia","1 Kansas","4 Indiana","6 LSU","7 Baylor"],["1 North Carolina","10 Louisville","1 Maryland","3 Iowa St.","16 Chattanooga/Texas Southern","7 West Virginia","1 Kansas","6 LSU"],["1 North Carolina","1 Maryland","7 West Virginia","1 Kansas"],["1 North Carolina","7 West Virginia"],["1 North Carolina"]],"owner":"Admin","tieBreaker":"128","pickedChampion":["1 North Carolina"],"pickPercentage":100,"potentialPoints":192,"score":0,"name":"Dacey Vanderbilt"}]
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin',
      brackets: [{"bracket":[["1 North Carolina","16 Mount St. Mary's/N. C. Central","8 Texas A&M","9 Georgetown","5 Utah","12 Tulsa/Marquette","4 Michigan St.","13 Iona","6 Wisconsin","11 Rhode Island","3 Oklahoma","14 Yale","7 Cincinnati","10 Louisville","2 Villanova","15 Lehigh","1 Maryland","16 High Point","8 NC St.","9 San Diego St.","5 Oregon","12 BYU","4 Butler","13 UAB","6 Connecticut","11 Davidson/Iowa","3 Iowa St.","14 South Dakota St.","7 Notre Dame","10 Texas","2 Arizona","15 New Mexico St.","1 Kentucky","16 Chattanooga/Texas Southern","8 Xavier","9 Miami","5 Michigan","12 Central Michigan","4 California","13 UC Irvine","6 Purdue","11 Valparaiso","3 Wichita St.","14 Hofstra","7 West Virginia","10 UCLA","2 Duke","15 Louisiana Lafayette","1 Kansas","16 Montana","8 Dayton","9 Florida St.","5 Vanderbilt","12 Stephen F. Austin","4 Indiana","13 Belmont","6 LSU","11 Providence","3 Gonzaga","14 Stony Brook","7 Baylor","10 Boise St.","2 Virgina","15 North Florida"],["1 North Carolina","9 Georgetown","5 Utah","4 Michigan St.","11 Rhode Island","14 Yale","10 Louisville","15 Lehigh","1 Maryland","8 NC St.","5 Oregon","4 Butler","6 Connecticut","3 Iowa St.","10 Texas","2 Arizona","16 Chattanooga/Texas Southern","8 Xavier","5 Michigan","4 California","6 Purdue","14 Hofstra","7 West Virginia","15 Louisiana Lafayette","1 Kansas","9 Florida St.","5 Vanderbilt","4 Indiana","6 LSU","14 Stony Brook","7 Baylor","2 Virgina"],["1 North Carolina","5 Utah","11 Rhode Island","10 Louisville","1 Maryland","5 Oregon","3 Iowa St.","10 Texas","16 Chattanooga/Texas Southern","5 Michigan","6 Purdue","7 West Virginia","1 Kansas","4 Indiana","6 LSU","7 Baylor"],["1 North Carolina","10 Louisville","1 Maryland","3 Iowa St.","16 Chattanooga/Texas Southern","7 West Virginia","1 Kansas","6 LSU"],["1 North Carolina","1 Maryland","7 West Virginia","1 Kansas"],["1 North Carolina","7 West Virginia"],["1 North Carolina"]],"owner":"Admin","tieBreaker":"128","pickedChampion":["1 North Carolina"],"pickPercentage":100,"potentialPoints":192,"score":0,"name":"Dara Vanderbilt"},
                 {"bracket":[["1 North Carolina","16 Mount St. Mary's/N. C. Central","8 Texas A&M","9 Georgetown","5 Utah","12 Tulsa/Marquette","4 Michigan St.","13 Iona","6 Wisconsin","11 Rhode Island","3 Oklahoma","14 Yale","7 Cincinnati","10 Louisville","2 Villanova","15 Lehigh","1 Maryland","16 High Point","8 NC St.","9 San Diego St.","5 Oregon","12 BYU","4 Butler","13 UAB","6 Connecticut","11 Davidson/Iowa","3 Iowa St.","14 South Dakota St.","7 Notre Dame","10 Texas","2 Arizona","15 New Mexico St.","1 Kentucky","16 Chattanooga/Texas Southern","8 Xavier","9 Miami","5 Michigan","12 Central Michigan","4 California","13 UC Irvine","6 Purdue","11 Valparaiso","3 Wichita St.","14 Hofstra","7 West Virginia","10 UCLA","2 Duke","15 Louisiana Lafayette","1 Kansas","16 Montana","8 Dayton","9 Florida St.","5 Vanderbilt","12 Stephen F. Austin","4 Indiana","13 Belmont","6 LSU","11 Providence","3 Gonzaga","14 Stony Brook","7 Baylor","10 Boise St.","2 Virgina","15 North Florida"],["1 North Carolina","8 Texas A&M","12 Tulsa/Marquette","4 Michigan St.","6 Wisconsin","3 Oklahoma","7 Cincinnati","2 Villanova","1 Maryland","8 NC St.","5 Oregon","4 Butler","6 Connecticut","3 Iowa St.","7 Notre Dame","2 Arizona","1 Kentucky","9 Miami","5 Michigan","4 California","6 Purdue","3 Wichita St.","7 West Virginia","2 Duke","1 Kansas","8 Dayton","12 Stephen F. Austin","4 Indiana","6 LSU","3 Gonzaga","7 Baylor","2 Virgina"],["1 North Carolina","12 Tulsa/Marquette","6 Wisconsin","7 Cincinnati","1 Maryland","5 Oregon","3 Iowa St.","7 Notre Dame","1 Kentucky","5 Michigan","3 Wichita St.","2 Duke","1 Kansas","12 Stephen F. Austin","6 LSU","7 Baylor"],["1 North Carolina","7 Cincinnati","1 Maryland","3 Iowa St.","1 Kentucky","2 Duke","1 Kansas","6 LSU"],["1 North Carolina","1 Maryland","1 Kentucky","1 Kansas"],["1 North Carolina","1 Kentucky"],["1 North Carolina"]],"owner":"Admin","tieBreaker":"158","pickedChampion":["1 North Carolina"],"pickPercentage":100,"potentialPoints":192,"score":0,"name":"Dane Vanderbilt"}]
    })
    .then(() => {
      console.log('finished populating users');
    });
  });

Bracket.find({}).removeAsync();
