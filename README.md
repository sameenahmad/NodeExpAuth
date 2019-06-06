# NodeExpAuth
Here I've created back-end of a <strong> Movie Review Application </strong> which requests user to login/register to submit a movie review. I have used <i>JSON Web tokens</i> to create a session everytime user sign-in and verify token before user can access the /posts path. The user is given authentication failure if they try to access the /posts path without logging-in. Since, I haven't incorporated the front part of the project yet so I'll go on explaining what each route in the code does.

# Code
The Application is hosted on port 8000 and uses three routes for it's operation. 
<ol>
<li>http://localhost:8000/api/register:</li>
<p> Just like any other Application on internet a register route takes 4 enteries from the user <strong> name, email, password, confirm password</strong>. Once the User gets registered, It is saved successfully to the DB and now the user can signin to submit the review.</p>
<li> http://localhost:8000/api/signin: </li>
<p>In case user already exists, they can signin with their credentials to proceed to submit-review portal.</p>
<li> http://localhost:8000/api/posts: </li>
<p>This is the page that renders once user has logged in with valid credentials. I have used Mongoose Models do define entry types in the review form. For instance, a user can only rate a movie between 1-5. It has other fields like <strong> movie, review and rating </strong> for users to enter their review. Again, the reviews are saved to the database.</p>
</ol>
Since, this was my first project with node.js I have kept it really simple and limited to an aunthentication based application. It can further be enhanced to a platform like <strong> IMDB </strong> where people can see other users' review or use movies API which lets user to select a movie from the drop down using AJAX type ahead.

 

CHEERS!! :sunglasses:
