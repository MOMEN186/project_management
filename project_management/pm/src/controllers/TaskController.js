import { formatDate } from "./dateController";

export async function getTasks(userID,token) {

  console.log({userID,token})
  const response = await fetch("http://localhost:8080/tasks", {
    method: "GET", // Corrected to lowercase
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "token": token,
      "user_id": userID,
    },
  });

  const data = await response.json();
  return data;
}

export async function deleteTask(id,token) {

  let responseStatus = 0;
  await fetch("http://localhost:8080/tasks", {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "token": token,
    },
    body: JSON.stringify({
      id:id
    }),
  }).then((response) => {
    console.log({response})
    if (!response.ok) {
      throw new Error("error");
    }
    responseStatus = 200;
  });
  console.log({responseStatus})
  return responseStatus;
 
}

export async function createTask(taskDetails,token) {
  await  fetch("http://localhost:8080/tasks/", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "token":token,
    },
    body: JSON.stringify({
      title: taskDetails.title,
      description: taskDetails.description,
      start_date: formatDate(),
      end_date: taskDetails.tday,
      status: taskDetails.status,
      project_id: taskDetails.project_id,
      assignee_id:taskDetails.assignee_id,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // console.log({ response });
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.log({ e });
    });
}


export async function updateTask(taskDetails,token) {
  await fetch("http://localhost:8080/tasks/", {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "token":token,
      },
      body: JSON.stringify({
        title: taskDetails.title,
        description: taskDetails.description,
        end_date: taskDetails.tday,
        status: taskDetails.status,
        id: taskDetails.id,
        project_id:taskDetails.projectId
        
      }),
  });
  
}


export async function getTaskByID(id,token) {
  
 const result= await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "token":token,
      },
  
  });

  const data = result.json();
  return data;

}