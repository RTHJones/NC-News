1 - when on articles page after clicking a topic on the topics page, clicking the articles button should reset the state.topic to null and rerender the full list of articles, but instead does nothing. State is being passed from the navbar but it doesnt seem to update, possibly because the route is the same? 
2 - Structure of children grandchildren etc seems to be only one level. That's probably wrong.
3 - after filtering articles, cannot regenerate list of all articles. setting selection to original value returns an empty list. Possibly is handlechange function? 
4 - issues should be gitignored but it didnt work
5 - "could not find a declaration file for @reach/router
6 - should i be using this.target.name rather than passing a hardcoded argument to handleChange? (Articles  page)
7 - users nested router not functioning for some reason. must have path or default prop? also need to pass props or state possibly, in order to recover and render user list, so need to change to class and add usedrs state to hold authors list OR MOVE STATE TO USERS NOT Account Manager