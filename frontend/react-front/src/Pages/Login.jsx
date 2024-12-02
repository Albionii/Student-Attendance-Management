import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";


function Login() {
    return (
        <div className='LoginBackground flex justify-center items-center '>
            <div className='container h-svh flex justify-center items-center'>
                <div className='container h-full flex justify-center items-center'>
                    <form className="flex w-80  h-80 flex-col gap-4 bg-white bg-opacity-5 border border-spacing-1 p-10 rounded-xl">
                        <div>
                            <div className="mb-2 block">
                                <Label className='text-white' htmlFor="email1" value="Your email" />
                            </div>
                            <TextInput  id="email1" type="email" placeholder="name@flowbite.com" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label className='text-white' htmlFor="password1" value="Your password" />
                            </div>
                            <TextInput id="password1" type="password" placeholder='********' required />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label className='text-white' htmlFor="remember">Remember me</Label>
                        </div>
                        <Button className='bg-opacity-10 hover:text-black' type="submit">Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login



