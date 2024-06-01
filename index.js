const express = require('express');
const bodyParser = require('body-parser');
const Parse = require('parse/node');

Parse.initialize('0bQ3mjMpdqmK6CRnrR1AoUbvynRIMK7EL4Digzp1','5Afi2g69Wtp7wDLFaXjmYF0mcfgLIizPvYuQnPxU','WP02lTdNyKNq7VTJmUKe0Emc7kfLu7cWvhQvJhdw');
Parse.serverURL = 'https://parseapi.back4app.com/';

const app = express();
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
  
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Missing Required fields' });
    }
  
    const user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);
  
    try {
      await user.signUp();
  
      res.status(201).json({
        username: user.get('username'),
        // password: user.get('password'), 
        email: user.get('email')
      });
    } catch (error) {
      console.error('Error while signing up user:', error);
      res.status(500).json({ error: 'Error while signing up user: ' + error.message });
    }
  });
  

  //login apis

app.post('/login', async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
       const user = await Parse.User.logIn(username,password,email);
       res.status(200).json({
        username:user.get('username'),
        email:user.get('email'),
       })

    } catch (error) {
      console.error('Error while login user:', error);
      res.status(500).json({ error: 'Error while signing up user: ' + error.message });
    }
  });

  app.get("/log",(req,res)=>{
    return res.send(`login browser`)
})

//forget apis
app.post('/forget', async (req, res) => {
  const { email } = req.body; 

  if(!email){
    res.response(400).json({message : 'email is required for forget password'})
  }
  try {
     await Parse.User.requestPasswordReset(email);
     res.status(200).json({ message: 'Password reset request sent successfully' });
  } 

  catch (error) {
    console.error('Error shwoing while requesting password reset:', error);
    res.status(500).json({ error: 'Error while requesting password reset: ' + error.message });
  }
});
app.get("/forg",(req,res)=>{
  return res.send(`forget browser`)
})

// this request for handle GET request to /register 
app.get('/register', (req, res) => {
    res.send('Register endpoint. Use POST method to register.');
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is sucessfully running on port ${PORT}`);
});


//return with opject id
// Define a route for user registration (POST)
// app.post('/register', async (req, res) => {
//     const { username, password, email } = req.body;

//     // Create a new Parse User object
//     const user = new Parse.User();
//     user.set('username', username);
//     user.set('password', password);
//     user.set('email', email);

//     try {
//         // Save the user to the database
//         const result = await user.signUp();
//         res.json(result);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(400).json({ error: error.message });
//     }
// });


