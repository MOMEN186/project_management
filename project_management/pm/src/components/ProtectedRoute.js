import { Navigate } from "react-router-dom";

export default function ProtectedRoute({element:component,redirectTo,condition}){
console.log({condition})
    return condition ? component : <Navigate to={redirectTo} />


}