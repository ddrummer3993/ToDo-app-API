export function checkTask(req, res, next) {
    const task = req.body.task;
    console.log(task);
    console.log(isValidTask(task))

    if (!isValidTask(task)) {
      return res
        .status(400)
        .send({
          error:
            "Task block is required and have to be of valid text",
        });
    }
  
    next();
  }
  
  export function isValidTask(field) {
    if (!field || typeof field !== "string" || field.length == 0) {
      return false;
    }
  
    return true;
  }