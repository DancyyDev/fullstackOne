module.exports = function (app, passport, db) {

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
        note: req.body.dailyNote 
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
  
  app.put("/edit", isLoggedIn, (req, res) => {
    db.collection('ratRecord').findOneAndUpdate(
        { 
          userID: req.user,
          date: req.body.date,
          name: req.body.name,
          note: req.body.note 
        },
        { $set: {
            userID: req.user,
            date: req.body.date,
            name: req.body.name,
            note: req.body.note
        }   
    },
    {
        sort: {_id: -1},  
        upsert: true
    }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
    })
  });  

// //////////////////////////
// Delete ///////////////////
// //////////////////////////

app.delete('/ratRecord', isLoggedIn, (req, res) => {
  db.collection('ratRecord').findOneAndDelete(
    {
      userID: req.user,
      date: req.body.date,
      name: req.body.name,
      note: req.body.note
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
