# Steam-Blog

# wireframe and user stories
![wireframe](/images/home.png)
![wireframe](/images/game.png)
![wireframe](/images/bloglist.png)
![wireframe](/images/blogpost.png)


mvp user stories

- as a user i will land on the welcome page and see  a row of games on sale/most popular/other

- as a user i can login and register 

- as a user if i click on one of the games i will see more detailed info about the game and reviews from Steam

- as a user i will be able to  post/edit/delete comments on the website

- as a user i will be able to search for a specific game in the Steam Library

- as a user i will be able to add games on my personal wishlist 


- as a user i can go back home any time clicking the "home" tab



Stretch goals user stories

- as a user i can click on the "blog" tab on the top of the screen and be redirected to the blog area where i ll see a list of posts the creator or moderators made

- as a user i can click on any post and see it in full and leave a comment at the bottom of it

- as a user i can login with my steam account

- as a user i can search for other users on steam

- as a user i can modify my profile with images or post images with the comments 

- as a user i will receive an email if one of the games i have in my wishlist is on sale



Models

- Comments.js:
  -URL 
  -Strings


- user.js:
  -Strings
  -URL
  -wishlist array ( filled with game ids )

ROUTES

GET/Index working with API to show games images and titles
ID to get more info of a specific game 
POST creating new comments on the game id or blog
PUT posting the comments
DELETE delete the comment
EDIT edit the comment


A lot of this depends on the API working correctly and the implementation of BOOTSTRAP to deliver a good looking product.
i ve obtained  a steam api already and saw documentation on how to work with it
