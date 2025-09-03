
export async function signup(first_name, last_name, email, password) {


    await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
        }),
    }).then((response) => {
        return response.json();
    }).then((data) => {
        console.log({ data });
    }).catch((e) => {
        console.log({ e });
    })
}


export async function login(email, password) {
    
    let result = "";

    await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password

        })
    }).then((response) => {
        if (!response.ok) {
            throw new Error("cant login");
        }
        return response.json();
    }).then((data) => {
        result = data;
        console.log({ data });
        
    });
    
    return result;
}


export async function Logout(userID,token) {
        
    await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            token:token
        },
        body: JSON.stringify({
            userID:userID,
        })
    }
    )
   

}