export function checkRequiredFields(req, res, next) {
    const task = req.body;
  
    if (!isValidRequiredField(task)) {
      return res
        .status(400)
        .send({
          error:
            "Task block is required and have to be of valid text",
        });
    }
  
    next();
  }
  
  export function isValidRequiredField(field) {
    if (!field || typeof field !== "string" || field.length == 0) {
      return false;
    }
  
    return true;
  }