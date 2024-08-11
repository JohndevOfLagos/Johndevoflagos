"use client";
import React, { useRef } from 'react';
import { useForm } from "react-hook-form";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const formRef = useRef();

    const sendEmail = async (data) => {
        try {
            await emailjs.send('service_lokqrdu', 'template_johndevoflagos', {
                user_name: data.name,
                user_email: data.email,
                user_phone: data.phone_number,
                user_company: data.company,
                user_message: data.msg,
            }, '81XXHhwnOCjL1Dm61');

            console.log('SUCCESS!');
            toast.success('Email sent successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });

            formRef.current.reset(); // Reset the form using DOM API after successful submission
        } catch (error) {
            console.error('Failed to send email:', error);
            if (!navigator.onLine) {
                toast.error('Network error. Internet Disconnected', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            } else {
                toast.error('Failed to send email. Please check and correct your form information', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            }
        }
    };

    const onSubmit = (data) => {
        sendEmail(data); // Call sendEmail function to submit form via emailjs
    };


    return (
        <div className="contact-wrapper">
            <div className="contact-form mt-45">
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                    <div className="contact-info pt-20">
                        <div className="row">
                            <div
                                className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 pr6 mb-12"
                                data-aos="fade-up"
                                data-aos-anchor-placement="top-bottom"
                                data-aos-duration={2000}
                            >
                                <input
                                    className="name w-100 theme-border pl-20 pt-15 pb-15 pr-10 form-color border-radius5 openS-font-family"
                                    type="text"
                                    name="user_name"
                                    id="inputName"
                                    placeholder="Your Name"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                />
                                {errors.name && (
                                    <span className="ui-error">
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>

                            <div
                                className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 pl6 pr-12 mb-12"
                                data-aos="fade-up"
                                data-aos-anchor-placement="top-bottom"
                                data-aos-duration={2500}
                            >
                                <input
                                    className="email w-100 theme-border pl-20 pt-15 pb-15 pr-10 form-color border-radius5 openS-font-family"
                                    type="email"
                                    name="user_email"
                                    id="inputEmail"
                                    placeholder="Your Email"
                                    {...register("email", {
                                        required: "Email is required",
                                        validate: () => {
                                            const email = watch("email");
                                            return (
                                                email.includes("@") ||
                                                "Invalid email"
                                            );
                                        },
                                    })}
                                />{" "}
                                {errors.email && (
                                    <span className="ui-error">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            <div
                                className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 pr6 mb-12"
                                data-aos="fade-up"
                                data-aos-anchor-placement="top-bottom"
                                data-aos-duration={2000}
                            >
                                <input
                                    className="phone w-100 theme-border pl-20 pt-15 pb-15 pr-10 form-color border-radius5 openS-font-family"
                                    type="text"
                                    name="user_phone"  // Change the name attribute
                                    id="inputPhone"
                                    placeholder="Your Phone"
                                    {...register("phone_number", {  // Change the register name
                                        required: "Phone is required",
                                    })}
                                />
                                {errors.phone_number && (
                                    <span className="ui-error">
                                        {errors.phone_number.message}
                                    </span>
                                )}
                            </div>

                            <div
                                className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 pl6 pr-12 mb-12"
                                data-aos="fade-up"
                                data-aos-anchor-placement="top-bottom"
                                data-aos-duration={2500}
                            >
                                <input
                                    className="subject w-100 theme-border pl-20 pt-15 pb-15 pr-10 form-color border-radius5 openS-font-family"
                                    type="text"
                                    name="user_company"
                                    id="inputCompany"
                                    placeholder="Company"
                                    {...register("company", {
                                        required: "company or Subject is required",
                                    })}
                                />
                                {errors.subject && (
                                    <span className="ui-error">
                                        {errors.subject.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="row ">
                            <div
                                className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pl-12 pr-12 mb-12"
                                data-aos="fade-up"
                                data-aos-anchor-placement="top-bottom"
                                data-aos-duration={2000}
                            >
                                <textarea
                                    className="massage w-100 theme-border pl-20 pt-15 pr-10 primary-color border-radius5 openS-font-family"
                                    name="message"
                                    id="msg"
                                    placeholder="Start writing message here"
                                    {...register("msg", {
                                        required: "Message is required",
                                        minLength: {
                                            message: "Minimum length is 10",
                                            value: 10,
                                        },
                                    })}
                                />
                                {errors.msg && (
                                    <span className="ui-error">
                                        {errors.msg.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            className="btn position-relative over-hidden text-white d-inline-block theme-bg white-text text-uppercase"
                            type="submit"
                            name="submit"
                            data-aos="fade-up"
                            data-aos-anchor-placement="top-bottom"
                            data-aos-duration={2500}
                        >
                            Send Now
                        </button>
                    </div>
                </form>
                <p className="form-message mt-20" >
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition={Bounce}
                    />
                </p>
            </div>
        </div>
    );
}
