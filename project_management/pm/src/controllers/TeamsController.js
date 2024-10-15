import { formatDate } from "./dateController";

export async function getTeams(userID, token) {
  const response = await fetch("http://localhost:8080/teams", {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: token,
      user_id: userID,
    },
  });

  const data = await response.json();
  return data.result;
}

export async function createTeam(teamDetails, token) {
  console.log("in create team", { teamDetails, token });
  const response = await fetch("http://localhost:8080/teams", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      team_name: teamDetails.title,
      creation_date: formatDate(),
      admin_id: teamDetails.admin_id,
      participants: teamDetails.participants,
    }),
  });
  const data = response.json();
  return data;
}

export async function updateTeam(teamDetails, token) {
  console.log("in update team", { teamDetails, token });

  const response = await fetch("http://localhost:8080/teams", {
    method: "PUT",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: token,
    },
    body: JSON.stringify({
      team_name: teamDetails.title,
      admin_id: teamDetails.admin_id,
      participants: teamDetails.participants,
      id: teamDetails.id,
    }),
  });
  const data = await response.ok;

  return data;
}

export async function getAllUsers(team_id, token) {
  const response = await fetch("http://localhost:8080/teams/users", {
    method: "GET", // Corrected to lowercase
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: token,
      team_id: team_id,
    },
  });
  const data = await response.json();
  console.log("getAllUsers", data);
  return data;
}

export async function getTeamMembers(id, token) {
  const response = await fetch(`http://localhost:8080/teams/members/${id}`, {
    method: "GET", // Corrected to lowercase
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      token: token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getTeamByID(id, token) {
  console.log({id,token})
  const result = await fetch(`http://localhost:8080/teams/team/${id}`, {
    method: "GET", // Corrected to lowercase
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      "token": token,
    },
  });

  const data = await result.json();
  console.log({ data });
  return data;
};

export async function deleteTeam(id, token) {}
