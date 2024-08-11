"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function SupportPopModal() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const { supportMeInfo } = useSelector((state) => state.support);

    if (!supportMeInfo) return null;


    return (
        <div
            className="modal fade"
            id="support-pop-modal"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="support-pop-modal"
            aria-hidden="true"
        >
            <div className="modal-dialog-centered justify-content-center" role="document">
                <div className="modal-content support-pop-modal-content">
                    <div className="close-icon float-right pt-10 pr-10">
                        <button
                            type="button"
                            className="close d-inline-block"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">
                                <i className="fa fa-times" />
                            </span>
                        </button>
                    </div>
                    <div className="modal-content border-0 align-items-center pl-30 pr-30">
                        <div className="modal-header border-0 flex-column align-items-center">
                            <h5>Support <strong>John Adewunmi</strong></h5>
                            <span className="modal-support-amount">
                                You’ll be charged $3
                            </span>
                        </div>

                        <div
                            className="w-100"
                            data-aos="fade-up"
                            data-aos-anchor-placement="top-bottom"
                            data-aos-duration={2500}
                        >
                            <form action="" className="recent-supporters-form">
                                <input
                                    className="email w-100 theme-border  pt-10 pb-10 form-color border-radius5 openS-font-family"
                                    type="email"
                                    name="user_email"
                                    id="inputEmail"
                                    placeholder="Email"
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

                                <button className="flutterwave-payment-btn border-radius5">
                                    Pay
                                </button>
                            </form>
                        </div>
                    </div>



                    <div class="modal-footer border-0">
                        <small className="recent-supporters-max">
                            Payment secured by  <span>Flutterwave</span>. You’ll be taken to a thank you page after the payment. Terms and Privacy.
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}
