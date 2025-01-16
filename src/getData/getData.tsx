import { jwtDecode } from "jwt-decode";

export async function getData(token:string) {
    const decoded:any = jwtDecode(token);

    console.log(decoded);
    
    const response = await fetch(`https://homolog.kaindev.com.br/jc-atacados/api/users/${decoded.id}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        });
    const data = await response.json();

    return data;
}