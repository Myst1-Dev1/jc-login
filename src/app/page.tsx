'use client';

import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { FormEvent } from "react";

export default function Home() {
  const router = useRouter();

  async function handleSignIn(e: FormEvent | any) {
    e.preventDefault();
  
    try {
      const formData = new FormData(e.target);
      const formEntries = Object.fromEntries(formData.entries());
      const { username, password } = formEntries as { [key: string]: string };
  
      const response = await fetch('https://homolog.kaindev.com.br/jc-atacados/api/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      response
        .json()
        .then(data => {
          setCookie(undefined, 'token', data.token);

          router.push('/profile');
        })
        .catch(err => {
          console.error('Erro ao processar JSON:', err);
        });
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  }
  

  return (
    <div className="w-full h-screen flex justify-center items-center">
        <form onSubmit={handleSignIn} className="max-w-80 p-4 w-full rounded-lg bg-zinc-800 flex flex-col gap-3">
          <h1 className="text-2xl mb-3 font-bold text-center">Login</h1>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="email">Email</label>
            <input name="username" id="email" placeholder="john@gmail.com" type="text" className="w-full outline-none rounded-md p-3 border border-gray-400 bg-zinc-700" />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-bold" htmlFor="password">Senha</label>
            <input name="password" id="password" placeholder="*******" type="password" className="w-full outline-none rounded-md p-3 border border-gray-400 bg-zinc-700" />
          </div>
          <button type="submit" className="mt-4 p-3 rounded-md bg-green-500 w-full font-bold text-white transition-all duration-500 hover:bg-green-600">Entrar</button>
        </form>
    </div>
  );
}
