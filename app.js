// define required file
const express = require('express');
const app = express();

// create empty list for posts
let posts = [];

// set defaults
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// direct to index
app.get('/', (req, res) => res.render('index', { posts }));

// create post when info is given and button is clicked
app.post('/create', (req, res) => 
  {
  const { author, title, content } = req.body;
  posts.unshift(
    {
    id: Date.now().toString(),
    author,
    title,
    content,
    createdAt: new Date().toLocaleString()
  });
  res.redirect('/');
});

// redirect to edit for given post
app.route('/edit/:id')
  .get((req, res) => 
    {
    const post = posts.find(p => p.id === req.params.id);
    post ? res.render('edit', { post }) : res.redirect('/');
  })
  .post((req, res) => 
    {
    const index = posts.findIndex(p => p.id === req.params.id);
    if (index !== -1) Object.assign(posts[index], req.body);
    res.redirect('/');
  });

// remove certain post when clicked
app.post('/delete/:id', (req, res) => 
  {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect('/');
});

// define local port to host website
app.listen(3000, () =>
  console.log('Server running at http://localhost:3000')
);
