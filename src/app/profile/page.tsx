'use server'

import { getData } from "@/getData/getData";
import Image from "next/image";
import { FaPhone } from "react-icons/fa";
import { cookies } from "next/headers";

export default async function Profile() {
    const token = (await cookies()).get('token')
    const data = await getData(token!.value);

    return (
        <>
            <div className="container mt-10">
               
                <div className="flex flex-col gap-2">
                    <Image className="max-w-40 w-full rounded-full aspect-square" src="/images/user.jpg" width={300} height={300} alt="imagem do usuário" />
                    <div className="flex flex-col gap-3">
                        <div>
                            <h2 className="text-xl font-bold mt-3">{!data.data.distributor ? data.data.seller.name : data.data.distributor.name}</h2>
                            {data.data.roles.map((role:any, idx:number) => (
                                <h3 key={idx} className="text-green-400 font-bold">{role === 'ROLE_DISTRIBUTOR' ? 'Distribuidor' : 'Vendedor'} </h3>
                            ))}
                        </div>
                        <button className="bg-green-600 max-w-44 w-full p-3 rounded-sm font-bold h-8 flex justify-center items-center transition-all duration-500 hover:bg-green-900">Editar perfil</button>
                        <div className="flex items-center gap-3">
                            <FaPhone className="text-zinc-300" />
                            <h6>{data.data.phone}</h6>
                        </div>
                    </div>
                </div>
        
            </div>
        </>
    )
}