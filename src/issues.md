1 - when on articles page after clicking a topic on the topics page, clicking the articles button should reset the state.topic to null and rerender the full list of articles, but instead does nothing. State is being passed from the navbar but it doesnt seem to update, possibly because the route is the same? 
2 - Structure of children grandchildren etc seems to be only one level. That's probably wrong.
3 - after filtering articles, cannot regenerate list of all articles. setting selection to original value returns an empty list.
4 - issues should be gitignored but it didnt work