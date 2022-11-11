import React, { useState } from 'react';
import axios from 'axios';

interface ContactUsProps {
}
type tReview = {
    name: string;
    email: string;
    message: string;
};
const ContactUs: React.FunctionComponent<ContactUsProps> = (props) => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [notice, setNotice] = useState<boolean>(false);



    let makeSendRequest = () => {
        axios.post<tReview>(
            "https://email-sender-nine.vercel.app/bloodmail",
            { name, email, text: message }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then(
            (res) => {
                console.log(res);
                console.log(name, email, message);
                setName("");
                setEmail("");
                setMessage("");
                setNotice(true);
                setTimeout(() => {
                    setNotice(false)
                }, 3500);
            });
    }

    return (
        <div className='h-screen flex items-center justify-center text-center px-4'>
            <form className="w-full max-w-3xl">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4" htmlFor="grid-password">
                    Your Name
                </label>
                <input value={name} onChange={(e) => {
                    setName(e.target.value);
                }} className="appearance-none block w-full text-center bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-7 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" />


                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4" htmlFor="grid-password">
                    E-mail
                </label>
                <input value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} className="appearance-none block w-full bg-gray-200 text-center text-gray-700 border border-gray-200 rounded py-3 px-4 mb-7 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" />



                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-4" htmlFor="grid-password">
                    Message
                </label>
                <textarea value={message} onChange={(e) => {
                    setMessage(e.target.value);
                }} className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-7 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"></textarea>

                {notice ? <span className='mb-4'>Delivered Successfully</span> : null}
                <div className="flex items-center justify-center">
                    <button className="shadow bg-red-400 hover:bg-red-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" onClick={(e) => {
                        e.preventDefault();
                        makeSendRequest();
                    }}>
                        Send
                    </button>
                </div>
            </form>
        </div >
    );
};

export default ContactUs;
