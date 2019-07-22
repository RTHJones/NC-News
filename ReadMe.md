# Robin's N.C. News #

Hello, and welcome to Robin's N.C. News! Thank you for spending the time to look at my demonstration webapp. 

In order to go directly to the hosted webapp on your browser, please use the first link in the 'links' section at the bottom of this page. This will take you to the online version hosted by netlify. Various other links are included for accessing the GitHub repositories and hosted versions of the front and back end files. 

If you would prefer to run the app from a local machine using an editor such as VS Code, please follow the instructions in the next section below.

## Instructions for running Robin's N.C. News on a local machine ##

1. If desired, fork the repository to your own GitHub account.
2. Use the cd command in your terminal or command line interface to change to the directory into which you wish to copy the files.
3. Clone the repository to your machine: click the green 'Clone or download' button on the GitHub repository, and copy the link. With git installed, open a terminal, type `git clone ` (with a space after 'clone'!), then paste the link and press enter. 
4. Use the cd command to change directory to 'nc-news' by typing `cd nc-news` and pressing enter.
5. Open the project in your preferred editor. For VS Code, type `code .` and press enter.
6. Open a terminal in VS Code by holding ctrl and pressing 'j'
7. Check if you have node.js or npm installed by typing and entering `node -v` and `npm -v` respectively.
8. If node.js is not installed, go to your root directory then type and enter `sudo apt-get install nodejs` (from your Ubuntu user account with sudo privileges), or use the Windows installer at `nodejs.org` if using a Windows Operating System. 
9. NPM is installed automatically with node, but might be an outdated version. You can ensure that you have the latest version by typing and entering `npm install npm@latest -g`
10. Once node and npm are installed and up to date, type and enter `npm install react`
11. Type and enter `npm install @reach/router`
12. You should now be able to open the webapp in your browser by typing and entering `npm start` from the command line/terminal in the nc-news directory.

## User Guide ##

NB: When you first load the page, you will be automatically logged in as the user 'jessjelly'. This is so you can post articles, add comments to articles, vote on articles and comments, and test the delete function (this works only on articles and comments posted by the user who is currently logged in).

The website will initially load the homepage. It shows a title/header which is clickable and will return you to the homepage from anywhere on the site. The navbar is directly below the header, and contains a series of buttons which will take you to the homepage, the account management page labelled 'my account', a users page, topics page, a 'create topic' form, an articles page, or the article submission page. The navbar will also inform the user if they are logged in, and the username of the logged in user. The final button, 'Log Out', is visible only if the user is logged in. If no user is logged in, a clickable 'User not logged in' message is visible instead. This will take the user to the account management page.


### Account Management ###

Here the user may log in (if not already logged in) by entering a username. Alternatively, a new user can be created here by filling in a username, name, and optional URL for an avatar image - the user will automatically be logged in as the newly created username. A list of all users may be accessed by clicking the 'Show All Users' button, which will take the user to the same 'users' page as the navbar button. A search feature has been included to allow the user to check a specific username exists before attempting to log in as that user. The search box and results may be reset at any time by clicking the reset button.


### Users Page ###

The users list is clickable. Clicking here will take the user to the articles page, and will show articles written by the user selected. Users may be sorted by name or username, and the order of display can be reversed by checking the checkbox (in the sorting bar below the navbar). Results are paginated with a default setting of 5 users per page.


### Topics Page ###

The topics page shows a list of all topics on the site, along with a description and for some topics, a picture appropriate to the topic. The entries here are also clickable and will take the user to the articles page, showing articles on the selected topic.


### 'Create Topics' Page ###

Here a logged-in user can create a new topic. This topic will then appear in the topic page list, and the drop down filter boxes on the articles page, as well as being selectable when a user creates a new article.

### Articles Page ###

The articles page is accessible by clicking the newspaper image on the homepage, the articles button on the navbar, or by clicking on a user or topic on the appropriate page. There is an additional section to the navbar on the articles page, which enables the user to filter the list of articles by topic and author. These options will be pre-selected if the user has accessed the page from the topics list or users list. The articles may be sorted by age, article ID number (not shown on article), author (if selected, articles are sorted by author but are NOT filtered), vote count, and comment count. The sort order may be reversed by checking the 'Reverse Sort Order' checkbox. Articles may be filtered and sorted by any or all criteria simultaneously, i.e. it is simple and straightforward to search for grumpy19's highest or lowest voted article about football. The article list view does not allow voting or deletion of articles, nor does it show the article body. However the titles are clickable and will take the user to the single article display. At the bottom of the list is the page bar. This bar allows the user to move forward and backwards through the list of articles one page at a time. The number of articles displayed on the page can also be adjusted for preference, however doing so will return the user to page 1.

### Single Article Page ###

Here, a single article can be viewed. If the article was written by the logged in user, a red 'delete' button will be visible. This will delete the article permanently, then show a message confirming the delete. The message is clickable and will return the user to the articles view with all filters reset. 

A logged in user may vote articles up or down, and may add comments by using the box provided. If a comment is submitted, the list of comments will automatically be made visible with the new comment at the top. Otherwise, the list of all comments on the article can be viewed by clicking the speech bubble below the comment submission box. Individual comments can be voted up and down, and can be deleted if they were posted by the logged-in user. The comments can be hidden by clicking the speech bubble a second time.


### Article Submission ###

The user may submit a new article here (if the user is not logged in, a warning message will appear and the user will not be able to submit their article). A title and body must be entered, and a topic must be selected from the drop down menu. After this, the submit button will be enabled. Submitting an article will take the user to the Single Article Page, with their new article selected.

## Links ##

To use the hosted version of this webapp, please connect to: https://robins-nc-news.netlify.com

To access the public repository for the front-end files of this project please go to: https://github.com/RTHJones/NC-News

To connect to the hosted back-end project please use: https://robins-nc-news.herokuapp.com/api

Finally, the back end file repository can be found on GitHub at: https://github.com/RTHJones/ncnews