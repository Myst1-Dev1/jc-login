
export async function getData(token:string) {
    
    const response = await fetch('https://homolog.kaindev.com.br/jc-atacados/api/users/2', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        });
    const data = await response.json();

    return data;
}