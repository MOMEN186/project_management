import { formatDate } from "./dateController";


export async function getProjects(token) {
    console.log({token});
    const result = await fetch("http://localhost:8080/projects", {
    method: "GET",
    headers: {
      Accept: "*/*",
        'Content-Type': "application/json",
        "token":token,
    },

  });
        
        
   const data = await result.json();
    return data.result;

}



export async function createProject(title,description,tday,token) {
    

    console.log({title,description,tday,token});
    let responseStatus = 0;


    await fetch("http://localhost:8080/projects/", {
        method: "POST",
        headers: {
            Accept: "*/*",
            'Content-Type': "application/json",
            "token":token,
          },
        body: JSON.stringify({
            title: title,
            description: description,
            creation_date: formatDate(),
            end_date: tday,
           
      })

    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        responseStatus = 200;
       return response.json();
    }).then((data) => {
        console.log({ data });
    }).catch((e) => {
        console.log({ e });
    })
    return responseStatus;

}


export async function UpdateProject(id,title,description,tday,token){


    console.log("in updateproject",{ id,title,description, tday });
    await fetch("http://localhost:8080/projects", {
        method: "PUT",
        headers: {
            Accept: "*/*",
            'Content-Type': "application/json",
            "token":token,
        },
        body: JSON.stringify({
            title: title,
            description: description,
            end_date: tday,
            id: id,
          
        })

    }).then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    }).then((data) => {
        console.log({ data });
    }).catch((e) => {
        console.log({ e });
    });

}

 export async function deleteProject(id,token) {
     let responseStatus = 0;
     await fetch("http://localhost:8080/projects", {
         method: "DELETE",
         headers: {
             Accept: "*/*",
             'Content-Type': "application/json",
             "token": token,
         },
         body: JSON.stringify({
             id:id,
         })
     }).then((response) => {
         if (!response.ok) {
             throw new Error("Error ");

         }
         responseStatus = 200;
     });
     return responseStatus;
     
     
}