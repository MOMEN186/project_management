export const UploadImage = async (token, userId, formData, type) => {
  console.log({type})
  const response = await fetch(`http://localhost:8080/users/upload/${type}/${userId}`, {
    method: "POST",
    headers: {
      token: token,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
};

export const DeleteImage = async (token, userId, type) => {
  const response = await fetch(
    `http://localhost:8080/users/deleteimage/${userId}`,
    {
      method: "DELETE",
      headers: {
        token: token,
        type: type,
      },
    }
  );

  const data = await response.json();
  return data;
};

export const getImage = async (token, userId, type) => {
  const response = await fetch(
    `http://localhost:8080/users/getimage/${userId}`,
    {
      method: "GET",
      headers: {
        token: token,
        type: type,
      },
    }
  );

  const data = await response.json();
  console.log(data);
  return data;
};


export const updateUserInfo = async (token,userId,column,value) => {
  
  console.log(token,userId,column,value)
  await fetch(`http://localhost:8080/users/update/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      column: column,
      value:value
    })
  })


}

export const getUserInfo = async (token, userId)=>{
  console.log("in get userInfo",token,userId)
  const result=await fetch(`http://localhost:8080/users/${userId}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: token,
    },
  
  })

  const data = await result.json();
  console.log(data)
  return data;

}