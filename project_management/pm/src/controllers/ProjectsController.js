import { formatDate } from "./dateController";

export async function getProjects(user,token) {
  console.log({ token,user });

  const result = await fetch("http://localhost:8080/projects", {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: token,
      user_id:user,
    },
  });

  const data = await result.json();
  console.log(data)
  return data;
}

export async function createProject(projectDetails, token) {
  console.log("in create project",{ projectDetails });
  let responseStatus = 0;

  await fetch("http://localhost:8080/projects/", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      title: projectDetails.title,
      description: projectDetails.description,
      creation_date: formatDate(),
      end_date: projectDetails.tday,
      manager_id:projectDetails.manager_id
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      responseStatus = 200;
      return response.json();
    })
    .then((data) => {
      console.log({ data });
    })
    .catch((e) => {
      console.log({ e });
    });
  return responseStatus;
}

export async function UpdateProject(projectDetails, token) {
  console.log("in updateproject", { projectDetails });
  await fetch("http://localhost:8080/projects", {
    method: "PUT",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      title: projectDetails.title,
      description:  projectDetails.description,
      end_date:  projectDetails.tday,
      id: projectDetails.id,
      manager_id:projectDetails.manager_id,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log({ data });
    })
    .catch((e) => {
      console.log({ e });
    });
}

export async function deleteProject(id, token) {
  let responseStatus = 0;
  await fetch("http://localhost:8080/projects", {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      id: id,
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error ");
    }
    responseStatus = 200;
  });
  return responseStatus;
}


export async function getProjectByID(id, token) {
  
  const result = await fetch(`http://localhost:8080/projects/${id}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: token,
    },
    
  });


  const data = result.json();
  return data;


}