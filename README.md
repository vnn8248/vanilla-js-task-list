# vanilla-js-task-list
Vanilla JS task list using Materialize CSS and persisting data in local storage. This was a "just for fun" quick project to practice DOM manipulation and simple event handling. 

## Front end
A simple form with Materialize CSS and a Font Awesome remove icon. 

## Features
Adding tasks - Task creation is handled step-by-step and validation was added when the input is left blank. If the user leaves the New Task input blank and clicks "Add Task", then an alert will fire.
Saving tasks - Tasks will persist in local storage on the browser via a key-value pair of "Tasks: [...task items]" 
Removing tasks - To remove a task, click on the Trashcan icon. The task will be removed from local storage.
Clear tasks - To clear all tasks, click the "CLEAR TASKS" button. This event will clear all tasks from local storage.
Filter tasks - The filter event fires on "keyup". The task items that do not have matching characters with the input will have a display of none. 

Known bug - The logic does not currently check for duplicate inputs. 
