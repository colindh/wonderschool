# Coding Challenge for Wonderschool #
This is Colin Hume's coding challenge for the Wonderschool application.
The three sections below outline the three parts of the challenge and where the resources for that part can be found.

## React UI ##
The code is located under the `src` folder.
Run `npm start` to host on port 3000.

## Database schema ##

```
create table tasks (
  id int auto_increment not null primary key,
  group varchar(256),
  task varchar(256),
  completedAt date
)
```
```
create table dependentTasks (
  id int auto_increment not null primary key,
  foreign key dependentTask references tasks(id),
  foreign key parentTask references tasks(id)
)
```

Dependencies as part of a separate table so we can query to get all tasks a task is dependent on or all tasks that depend on a task.

## API Documentation ##

Patch

/api/v1/{taskId}/markChecked

Endpoint to mark a task checked.
Returns 200 if successful,
404 if a task with the passed in id does not exist,
412 if the task has dependent tasks,
401 if no session or user info,
and 500 for server errors.

PATCH

/api/v1/{taskId}/uncheck

Endpoint to uncheck a task.
Returns 200 if successful,
404 if a task with the passed in id does not exist,
401 if no session or user info,
and 500 if unsuccessful.
