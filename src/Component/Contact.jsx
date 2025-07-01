import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
const Contact = () => {
    const sendMail = (e) => {
        e.preventDefault()
        let params = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
           
        }
        emailjs.send(import.meta.env.VITE_SERVICE_ID,import.meta.env.VITE_TEMPLATE_ID,params,import.meta.env.VITE_PUBLIC_ID).then(Swal.fire({
  title: "Email Sent !!!",
  showClass: {
    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
  },
  hideClass: {
    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
  }
}))
    }
    return (
        <section
            id="contact"
            className="w-11/12 mx-auto max-w-7xl py-16 md:py-20 text-gray-300"
        >
            {/* Badge */}
            <motion.button
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: false, amount: 0.2 }}
                className="flex items-center gap-2 border text-gray-500 border-gray-500 px-6 py-2 rounded-full mb-8 hover:bg-green-600 hover:text-white transition"
            >
                <FaEnvelope /> CONTACT
            </motion.button>

            {/* Headline */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: false, amount: 0.2 }}
                className="text-4xl text-gray-800 md:text-5xl font-light mb-2"
            >
                Let’s Work <span className="text-[#1b9c85] font-bold">Together!</span>
            </motion.h2>

            {/* Email link */}
            <motion.a
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: false, amount: 0.2 }}
                href="mailto:rahmanshahrintarin@gmail.com"
                className="block text-xl text-gray-600 mb-10"
            >
                rahmanshahrintarin@gmail.com
            </motion.a>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: false, amount: 0.2 }}
                    className="border border-gray-800 rounded-xl p-6 md:p-8  to-[#111]"
                >
                    <h3 className="text-xl text-gray-800  font-bold mb-4">Contact Information</h3>
                    <div className="space-y-4 text-gray-600">
                        <p className="flex items-center gap-3">
                            <FaEnvelope className="text-[#1b9c85]" />
                            <span>
                                <strong>Email:</strong>{' '}
                                <a
                                    href="mailto:rahmanshahrintarin@gmail.com"
                                    className="text-[#1b9c85] underline"
                                >
                                    rahmanshahrintarin@gmail.com
                                </a>
                            </span>
                        </p>
                        <p className="flex text-gray-800  items-center gap-3">
                            <FaPhone className="text-[#1b9c85]" />
                            <span>
                                <strong>Phone:</strong> +8801619599417
                            </span>
                        </p>
                        <p className="flex items-center gap-3">
                            <FaWhatsapp className="text-[#1b9c85]" />
                            <span>
                                <strong>WhatsApp:</strong> +8801619599417
                            </span>
                        </p>
                        <p className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-[#1b9c85]" />
                            <span>
                                <strong>Address:</strong> Sylhet, Bangladesh
                            </span>
                        </p>
                    </div>
                    <img className='mt-4' src="https://i.ibb.co/hF8KBThZ/contact-a5363edb.png" alt="" />
                </motion.div>

                {/* Right: Form */}
                <motion.form
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: false, amount: 0.2 }}

                    onSubmit={sendMail}
                    className="border border-gray-800 rounded-xl p-6 md:p-8 to-[#111] space-y-6"
                >
                    <div className="grid text-gray-800  grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block mb-2 font-semibold">
                                FULL NAME<span className="text-red-500">*</span>
                            </label>
                            <input id='name'
                                type="text"
                                placeholder="Your full name"
                                className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-800 focus:border-green-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">
                                EMAIL<span className="text-red-500">*</span>
                            </label>
                            <input id='email'
                                type="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-800 focus:border-green-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">
                                PHONE (OPTIONAL)
                            </label>
                            <input
                                type="number"
                                id='number'
                                placeholder="Your phone number"
                                className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-600 focus:border-green-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold">
                                YOUR BUDGET (OPTIONAL)
                            </label>
                            <input
                                id='budget'
                                type="text"
                                placeholder="A range budget for your project"
                                className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-600 focus:border-green-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">MESSAGE</label>
                        <textarea id='message'
                            rows="5"
                            placeholder="Write your message here..."
                            className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-600 focus:border-[#1b9c85]focus:outline-none"
                        ></textarea>
                    </div>

                    <button 
                        type="submit"
                        className="w-full cursor-pointer bg-[#1b9c85] text-black font-semibold py-3 rounded-full hover:bg-green-600 transition"
                    >
                        SEND MESSAGE
                    </button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;