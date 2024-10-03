import { formatDate } from "./dateController";


export async function getProjects() {
    
    const result = await fetch("http://localhost:8080/projects", {
    method: "GET",
    headers: {
      Accept: "*/*",
      'Content-Type':"application/json",
    },

  });
        
        
   const data = await result.json();
    return data.result;

}

export async function getProjectByID(id) {
    
    const result = await fetch(`http://localhost:8080/projects/${id}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
        'Content-Type': "application/json",
        
    },
      
  });
        
    
    const data = await result.json();
    // console.log(data.result[0]);  
    return data.result[0];

}


export async function createProject(title,description,tday) {
    

    console.log({title,description,tday});



    await fetch("http://localhost:8080/projects", {
        method: "POST",
        headers: {
            Accept: "*/*",
            'Content-Type':"application/json",
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
       return response.json();
    }).then((data) => {
        console.log({ data });
    }).catch((e) => {
        console.log({ e });
    })


}


export async function UpdateProject(id,title,description,tday){


    console.log("in updateproject",{ id,title,description, tday });
    await fetch("http://localhost:8080/projects", {
        method: "PUT",
        headers: {
            Accept: "*/*",
            'Content-Type': "application/json",
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