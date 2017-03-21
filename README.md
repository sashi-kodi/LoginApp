# LoginApp
LoginApp using jwt authentication
this App has been developed using jwt and Express. MongoDB is used as a Database to store user data
Angular JS is used at the front end
JsonWebToken  is a module which has methods like verify, sign which take payload and generate the jwt token.
Signup is a free unprotected route which will add a new user to the Users collection at database.
/Authenticate is a route that Angular JS sends login information to for validation.
After credentials are validated JWT token is created and sent back to Angular JS.
After reciveing the JWT token, Login controller saves the jwt inside $localStorage.
Next time when accessing a protected route like /api/buddies to get json data, JWT will be intercepted in the Request Header in the Authorization section
At Node JS, a middleware has been written to check the Request header for the jwt for protected routes.
When a user logs out, the jwt token is deleted from Local Storage
