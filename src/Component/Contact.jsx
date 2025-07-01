import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaHome } from 'react-icons/fa';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
const Contact = () => {
    const sendMail = (e) => {
        e.preventDefault()
        let params = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,

        }
        emailjs.send(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, params, import.meta.env.VITE_PUBLIC_ID).then(Swal.fire({
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
    <section className="w-11/12 max-w-7xl pt-5 mx-auto pb-16 md:pb-20">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-2 text-gray-900">Contact</h2>
      <p className="text-center mb-10 text-gray-600">
        If you have any doubt or confusion, feel free to send your message
      </p>

      <div className="grid grid-cols-1  md:grid-cols-2 gap-8 items-center">
        {/* Contact Form */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
          <form onSubmit={sendMail} className="space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-800">Name</label>
              <input
                type="text"
                id='name'
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[#1b9c85] focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-800">Email</label>
              <input
                type="email"
                id='email'
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[#1b9c85] focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-800">Subject</label>
              <input
                type="text"
                id='subject'
                placeholder="Subject"
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[#1b9c85] focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-800">Message</label>
              <textarea
                rows="5"
                id='message'
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:border-[#1b9c85] focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit" on
              className="w-full bg-[#1b9c85] text-white font-semibold py-3 rounded-md hover:bg-[#158e76] transition"
            >
              Send Email
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Contact Info</h3>
          <div className="space-y-4 text-gray-700">
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#1b9c85]" />
              <span><strong>Location:</strong> Sylhet, Bangladesh</span>
            </p>
            <p className="flex items-center gap-3">
              <FaHome className="text-[#1b9c85]" />
              <span><strong>Address:</strong> Beanibazar,Sylhet</span>
            </p>
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#1b9c85]" />
              <span><strong>Phone:</strong> +8801619599417</span>
            </p>
            <p className="flex items-center gap-3">
              <FaWhatsapp className="text-[#1b9c85]" />
              <span><strong>WhatsApp:</strong> +8801619599417</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
