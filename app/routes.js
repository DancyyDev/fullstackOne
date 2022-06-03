module.exports = function (app, passport, db) {
  const { ObjectId } = require('mongodb')

  app.get("/", (req, res) => {
    res.render("home.ejs");
  });

  app.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

  app.get("/index", isLoggedIn, function (req, res) {
    db.collection('ratRecord')
      .find()
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("index.ejs", {
          user : req.user,
          ratRecord: result,
        });
      });
  });

  app.post("/ratForm", isLoggedIn, (req, res) => {
    db.collection('ratRecord').insertOne(
      { 
        userID: req.user,
        date: req.body.date,
        name: req.body.name,
        note: req.body.note 
      },
      (err, result) => {
        if (err) return console.log(err);
        console.log("saved to the Rat colony record");
        res.redirect("/index");
      }
    )
  });

  // /////////////////////
  // edit path////////////
  // /////////////////////

  // app.get('/edit', isLoggedIn, (req, res) => {
  //   db.collection('ratRecord').find().toArray((err, result) => {
  //       if (err) return console.log(err)
  //       res.render('index.ejs', {ratRecord: result})
  //   })
  // })
  // using post becasue html form doesnt like put
  app.post("/edit", isLoggedIn, (req, res) => {
    db.collection('ratRecord').findOneAndUpdate(
        { 
          _id: ObjectId( req.body.msgId)
        },
        { $set: {
            date: req.body.date,
            name: req.body.name,
            note: req.body.note
        }   
    },
    {
        sort: {_id: -1},  
        upsert: true
    }, (err, result) => {
        if (err) return res.send(err) // If responding to fetch, redirect from serverside will not work
        res.redirect("/index")        //Just send back to browser for browser to work with
    })
  });  

// //////////////////////////
// Delete ///////////////////
// //////////////////////////

app.delete('/ratRecord-delete', isLoggedIn, (req, res) => {
  db.collection('ratRecord').findOneAndDelete(
    {
      _id: ObjectId( req.body._id)
      }, 
      (err, result) => {
    if (err) return res.send(500, err)
    res.send('Record deleted!')
  }) 
})

  // ////////////////////////
  // SIgn in and log in//////
  // ////////////////////////

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/index",
      failureRedirect: "/",
      failureFlash: true,
    })
  );

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/index",
      failureRedirect: "/",
      failureFlash: true,
    })
  );
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}
