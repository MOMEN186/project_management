import { formatDate } from "./dateController";

export async function getTasks(token) {

  const response = await fetch("http://localhost:8080/tasks", {
    method: "GET", // Corrected to lowercase
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "token": token
    },
  });

  const data = await response.json();
  return data;
}

export async function deleteTask(task_id,token) {
  const id = JSON.stringify({ id: task_id });

  await fetch("http://localhost:8080/tasks", {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: id,
  });

 
}

export async function createTask(project_id, title, description, tday, status,token) {
  
  await  fetch("http://localhost:8080/tasks/", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "token":token,
    },
    body: JSON.stringify({
      title: title,
      description: description,
      start_date: formatDate(),
      end_date: tday,
      status: status,
      project_id: project_id,
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


export async function updateTask(project_id,title,description,tday,status,id,token) {
  await fetch("http://localhost:8080/tasks/", {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "token":token,
      },
      body: JSON.stringify({
        title: title,
        description: description,
        end_date: tday,
        status: status,
        id: id,
        project_id
        
      }),
  });
  
}