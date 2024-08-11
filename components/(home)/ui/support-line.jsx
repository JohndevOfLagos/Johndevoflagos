"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useFlutterwave } from 'flutterwave-react-v3';
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { Icon } from '@iconify/react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css'; // Corrected import path
import { db, collection, addDoc, getDoc, doc } from '../../../firebase/firebase'; // Adjust the path as necessary

import { BeatLoader } from 'react-spinners';

import emailjs from '@emailjs/browser';


export default function SupportLine({ scrollToSupport }) {


    const { register, handleSubmit, watch, formState: { errors, isValid }, setValue } = useForm({
        mode: "onChange",
        defaultValues: {
            number: '',
            name: '',
            email: '',
            msg: '',
        }
    });



    const [coffeeCount, setCoffeeCount] = useState(1); // State to track the number of coffees
    const [activeButton, setActiveButton] = useState(1); // State to track the active button
    const [loading, setLoading] = useState(false); // State to manage loading state
    const [nairaToDollarRate, setNairaToDollarRate] = useState(null);
    const coffeePrice = 0.31;
    const formRef = useRef();

    const [recentSupporters, setRecentSupporters] = useState([]);

    useEffect(() => {
        fetchConversionRate(); // Fetch conversion rate when the component mounts
    }, []);

    useEffect(() => {

        fetchRecentSupporters(); // Fetch recent supporters when the component mounts

    }, []);





    const fetchRecentSupporters = async () => {
        try {
            const querySnapshot = await getDoc(collection(db, "buymeacoffeedb"));
            const supporters = querySnapshot.docs.map(doc => doc.data().name).filter(name => name !== null);
            console.log('Recent Supporters:', supporters);
            setRecentSupporters(supporters);
        } catch (error) {
            console.error('Error fetching recent supporters:', error);
        }
    };




    console.log(recentSupporters)

    const fetchConversionRate = async () => {
        try {
            const docRef = doc(db, 'settings', 'convertRate'); // Adjust collection and document IDs as needed
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                console.log('Document data:', data);
                if (data.nairaToDollarRate !== undefined) {
                    setNairaToDollarRate(data.nairaToDollarRate);
                } else {
                    console.error('nairaToDollarRate field is missing in the document!');
                }
            } else {
                console.error('No such document!');
            }
        } catch (error) {
            console.error('Error fetching conversion rate:', error);
        }
    };

    console.log('Naira to Dollar Rate:', nairaToDollarRate); // Log rate to check if it’s being set correctly

    // Use nairaToDollarRate in your calculations


    const amountInNGN = nairaToDollarRate
        ? coffeeCount * coffeePrice * nairaToDollarRate
        : coffeeCount * coffeePrice * 1580; // Default rate if conversion rate is not yet fetched

        const name = watch('name');
        const email = watch('email');

    const oneTimePaymentConfig  = {
        public_key: 'FLWPUBK_TEST-ed64febe2c25d945e3f809eee114ea81-X',
        tx_ref: Date.now(),
        amount: amountInNGN,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: email,
            phone_number: '070********',
            name: name,
        },
        customizations: {
            title: 'Buy me a Coffee',
            description: 'Buy a for Support John Adewunmi',
            logo: "/images/logo/favicon.png"
        },
    };

    const subscriptionConfig = {
        public_key: 'FLWPUBK_TEST-ed64febe2c25d945e3f809eee114ea81-X',
        tx_ref: Date.now(),
        amount: amountInNGN, // Subscription amount
        currency: 'NGN',
        payment_options: 'card',
        payment_plan: 67833, // Subscription plan ID
        customer: {
            email: email,
            phone_number: '070********',
            name: name,
        },
        meta: { consumer_id: "buymeacoffee-monthly", consumer_mac: "93u84-345uy4ur-43578" },
        customizations: {
            title: 'Buy me a Coffee',
            description: 'Buy a for Support John Adewunmi',
            logo: "/images/logo/favicon.png"
        },
    };





    const handleFlutterwavePayment = useFlutterwave(oneTimePaymentConfig);
    const handleFlutterwaveSubscription = useFlutterwave(subscriptionConfig);


    const onSubmitSubscription = async (data) => {
        if (coffeeCount <= 0) {
            alert("Please enter a valid coffee amount.");
            return; // Prevent form submission
        }
    
        setLoading(true); // Start loading
    
        try {
            // Submit to Firebase
            await addDoc(collection(db, 'buymeacoffeedb'), {
                name: data.name,
                message: data.msg,
                amount: coffeeCount * coffeePrice,
                reference: subscriptionConfig.tx_ref,
                createdAt: new Date(),
            });
    
            // Wait for 4 seconds
            await new Promise(resolve => setTimeout(resolve, 4000));
    
            // Trigger Flutterwave Subscription Payment
            handleFlutterwaveSubscription({
                callback: async (response) => {
                    console.log('Flutterwave response:', response);
                    if (response.status === 'successful') {
                        console.log('Sending email...');
                        await emailjs.send('service_lokqrdu', 'template_johndevoflagos', {
                            name: data.name,
                            email: data.email,
                            message: data.msg,
                            amount: coffeeCount * coffeePrice,
                            reference: response.tx_ref,
                            createdAt: new Date(),
                        }, '81XXHhwnOCjL1Dm61');
    
                        // Fetch recent supporters after successful payment
                        fetchRecentSupporters();
                    }
                },
                onClose: () => {
                    setLoading(false); // End loading if payment is closed
    
                    // Reset form inputs and selections
                    setCoffeeCount(1); // Reset coffee count
                    setActiveButton(1); // Reset button selection
                    setValue("number", 1); // Reset input field value
                    setValue("name", '');
                    setValue("msg", '');
    
                    window.location.reload(); // Refresh the page
                    setTimeout(() => {
                        scrollToSupport();
                    }, 100); // Wait a bit for the page to reload
                },
            });
    
        } catch (error) {
            console.error('Error handling form submission:', error);
        } finally {
            setLoading(false); // End loading in case of success or error
        }
    };


    const onSubmit = async (data) => {
        if (coffeeCount <= 0) {
            alert("Please enter a valid coffee amount.");
            return; // Prevent form submission
        }
    
        setLoading(true); // Start loading
    
        try {
            // Submit to Firebase
            await addDoc(collection(db, 'buymeacoffeedb'), {
                name: data.name,
                message: data.msg,
                amount: coffeeCount * coffeePrice,
                reference: oneTimePaymentConfig.tx_ref,
                createdAt: new Date(),
            });
    
            // Wait for 4 seconds
            await new Promise(resolve => setTimeout(resolve, 4000));
    
            // Trigger Flutterwave Payment
            handleFlutterwavePayment({
                callback: async (response) => {
                    console.log('Flutterwave response:', response);
                    if (response.status === 'successful') {
                        console.log('Sending email...');
                        await emailjs.send('service_lokqrdu', 'template_johndevoflagos', {
                            name: data.name,
                            email: data.email,
                            message: data.msg,
                            amount: coffeeCount * coffeePrice,
                            reference: response.tx_ref,
                            createdAt: new Date(),
                        }, '81XXHhwnOCjL1Dm61');
    
                        // Fetch recent supporters after successful payment
                        fetchRecentSupporters();
                    }
                },
                onClose: () => {
                    console.log('Flutterwave payment closed'); // Log to check if this executes
                    setLoading(false); // End loading if payment is closed
    
                    // Reset form inputs and selections
                    setCoffeeCount(1); // Reset coffee count
                    setActiveButton(1); // Reset button selection
                    setValue("number", 1); // Reset input field value
                    setValue("name", '');
                    setValue("msg", '');
    
                    window.location.reload(); // Refresh the page
                    setTimeout(() => {
                        scrollToSupport();
                    }, 100); // Wait a bit for the page to reload
                },
            });
    
        } catch (error) {
            console.error('Error handling form submission:', error);
        } finally {
            setLoading(false); // End loading in case of success or error
        }
    };
        

    



    const handleCoffeeButtonClick = (count) => {
        setCoffeeCount(count);
        setActiveButton(count);
        setValue("number", count);
    };



    const handleInputChange = (e) => {
        const value = e.target.value;
        const numericValue = parseInt(value, 10);

        if (!isNaN(numericValue) && numericValue > 0) {
            setCoffeeCount(numericValue); // Update coffeeCount state
        } else if (value === '') {
            setCoffeeCount(''); // Allow clearing the input
        }

        setValue("number", value); // Update form value
    };




    return (
        <div className="support-gap">
            <div className="support-bg border-radius5   custom-col-1 ">
                <div className='recent-supporters'>
                    <h6 className="recent-supporters-head text-white mb-4">
                        Recent supporters

                    </h6>

                    <div className="recent-supporters-inner">

                        <ul className='recent-supporters-list'>


                                {recentSupporters.map((supporter, index) => (
                                    <li key={index} className="recent-supporters-list-item text-white">
                                        <aside>
                                            <Icon icon="cib:buy-me-a-coffee" />
                                            <span>{supporter}<small className='ml-2'>bought a coffee.</small></span>
                                        </aside>
                                        <button className='recent-supporters-share-btn border-radius5'>
                                            <Icon icon="ic:baseline-more-horiz" />
                                        </button>
                                    </li>
                                ))}
                      

                        </ul>
                    </div>


                </div>
            </div>

            <div className="support-bg border-radius5  custom-col-2">
                <h6 className='d-flex justify-content-start align-items-center mb-4 text-white'>
                    Buy a coffee for John Adewunmi
                    <OverlayTrigger
                        placement="right"
                        overlay={
                            <Tooltip id="tooltip-right" className='custom-tooltip'>
                                "It's a friendly metaphor, not real coffee. Each "coffee" is £3 and you can buy as many you like."
                            </Tooltip>
                        }
                    >
                        <button
                            className='d-flex border-0 bg-transparent justify-content-center align-items-center text-white'
                        >
                            <Icon icon="octicon:question-24" />
                        </button>
                    </OverlayTrigger>
                </h6>
                <Tabs>
                    <TabList>
                        <Tab>One-time</Tab>
                        <Tab>Monthly</Tab>
                    </TabList>

                    <TabPanel>
                        <form action="POST" ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                            <div className="support-info pt-20">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr6 mb-12"
                                        data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration={2000}>
                                        <div className="coffeeSelect d-flex w-100 justify-content-between align-items-center border-radius5 openS-font-family pl-15 pt-6 pb-6 pr-20 ">
                                            <div className='coffeeSelect-cost d-flex align-items-center text-white'>
                                                <span className='justify-content-center d-flex align-items-center multiply'>
                                                    <Image
                                                        height={60}
                                                        width={60}
                                                        src="/images/buymecoffee/coffee-img-3.png"
                                                        alt='buymecofee'

                                                    /><Icon icon="mdi:multiply-bold" className='mt-10' /></span>
                                            </div>
                                            <div className='coffeeselectbtn d-flex justify-content-center align-items-center '>
                                                {[1, 3, 5].map((count) => (
                                                    <button key={count} type='button'
                                                        className={`coffeebtn d-flex justify-content-center align-items-center theme-border ${activeButton === count ? 'active' : ''}`}
                                                        onClick={() => handleCoffeeButtonClick(count)}>
                                                        {count}
                                                    </button>
                                                ))}
                                                <input
                                                    type="number"
                                                    className='coffeeselectinput justify-content-center align-items-center theme-border pl-10 pt-10 pb-10 pr-10 form-color text-dark'
                                                    {...register("number", {
                                                        required: "Number is required",
                                                        valueAsNumber: true,
                                                        validate: value => !isNaN(value) || "Please enter a valid number"
                                                    })}
                                                    value={coffeeCount}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="row">
                                    <div
                                        className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr6 mb-12"
                                        data-aos="fade-up"
                                        data-aos-anchor-placement="top-bottom"
                                        data-aos-duration={2000}
                                    >


                                        <input
                                            className="name w-100 theme-border pl-20 pt-10 pr-10 pb-10 form-color border-radius5 openS-font-family"
                                            type="text"
                                            name="user_name"
                                            id="inputName"
                                            placeholder="Name or @yoursocial"
                                            {...register("name", {
                                                required: "Name is required",
                                            })}
                                        />
                                        {errors.name && (
                                            <span className="ui-error text-white">
                                                {errors.name.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div
                                        className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr6 mb-12"
                                        data-aos="fade-up"
                                        data-aos-anchor-placement="top-bottom"
                                        data-aos-duration={2000}
                                    >


                                        <input
                                            className="name w-100 theme-border pl-20 pt-10 pr-10 pb-10 form-color border-radius5 openS-font-family"
                                            type="text"
                                            name="user_email"
                                            id="inputEmail"
                                            placeholder="Email"
                                            {...register("email", {
                                                required: "Email is required",
                                            })}
                                        />
                                        {errors.email && (
                                            <span className="ui-error text-white">
                                                {errors.email.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="row ">
                                    <div
                                        className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr6 mb-12"
                                        data-aos="fade-up"
                                        data-aos-anchor-placement="top-bottom"
                                        data-aos-duration={2000}
                                    >
                                        <textarea
                                            className="massage w-100 theme-border pl-20 pt-15 pr-10 primary-color border-radius5 openS-font-family"
                                            name="message"
                                            id="msg"
                                            placeholder="Say something nice..."
                                            {...register("msg", {
                                                required: "Message is required",
                                                minLength: {
                                                    message: "Minimum length is 10",
                                                    value: 10,
                                                },
                                            })}
                                        />
                                        {errors.msg && (
                                            <span className="ui-error text-white">
                                                {errors.msg.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="row">
                                    <div
                                        className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr6 mb-12"
                                        data-aos="fade-up"
                                        data-aos-anchor-placement="top-bottom"
                                        data-aos-duration={2000}
                                    >
                                        {loading ? (

                                            <button
                                                type="submit"
                                                className="buymeacoffe-btn  w-100 justify-content-center position-relative over-hidden text-white d-flex theme-bg white-text text-uppercase"
                                            >


                                                <div className="spinner">
                                                    <BeatLoader color="#ffffff" loading />
                                                </div>

                                            </button>

                                        ) : (


                                            <button
                                                type="submit"
                                                className="buymeacoffe-btn w-100 justify-content-center position-relative over-hidden text-white d-flex theme-bg white-text text-uppercase"

                                            >

                                                <>
                                                    Support ${(coffeeCount && coffeePrice) ? (parseFloat(coffeeCount * coffeePrice).toFixed(2)) : '0.00'}
                                                </>

                                            </button>

                                        )}

                                    </div>
                                </div>


                                <div
                                    className=" w-100 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  "
                                    data-aos="fade-up"
                                    data-aos-anchor-placement="top-bottom"
                                    data-aos-duration={2000}
                                >
                                    <footer className='text-white'>
                                        <span className='d-flex justify-content-center align-items-center mt-3'><small>No sign up required</small></span>
                                        {/* <div className="underline"></div> */}
                                        <span className='d-flex justify-content-center align-items-center mt-3'><strong className='mr-2'>0 coffees</strong> recieved of 200 coffees</span>
                                    </footer>

                                </div>

                            </div>

                        </form>
                    </TabPanel>
                    <TabPanel>
                    <form action="POST" ref={formRef} onSubmit={handleSubmit(onSubmitSubscription)}>
                            <div className="support-info pt-20">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr6 mb-12"
                                        data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration={2000}>
                                        <div className="coffeeSelect d-flex w-100 justify-content-between align-items-center border-radius5 openS-font-family pl-15 pt-6 pb-6 pr-20 ">
                                            <div className='coffeeSelect-cost d-flex align-items-center text-white'>
                                                <span className='justify-content-center d-flex align-items-center multiply'>
                                                    <Image
                                                        height={60}
                                                        width={60}
                                                        src="/images/buymecoffee/coffee-img-3.png"
                                                        alt='buymecofee'

                                                    /><Icon icon="mdi:multiply-bold" className='mt-10' /></span>
                                            </div>
                                            <div className='coffeeselectbtn d-flex justify-content-center align-items-center '>
                                                {[1, 3, 5].map((count) => (
                                                    <button key={count} type='button'
                                                        className={`coffeebtn d-flex justify-content-center align-items-center theme-border ${activeButton === count ? 'active' : ''}`}
                                                        onClick={() => handleCoffeeButtonClick(count)}>
                                                        {count}
                                                    </button>
                                                ))}
                                                <input
                                                    type="number"
                                                    className='coffeeselectinput justify-content-center align-items-center theme-border pl-10 pt-10 pb-10 pr-10 form-color text-dark'
                                                    {...register("number", {
                                                        required: "Number is required",
                                                        valueAsNumber: true,
                                                        validate: value => !isNaN(value) || "Please enter a valid number"
                                                    })}
                                                    value={coffeeCount}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="row">
                                    <div
                                        className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr6 mb-12"
                                        data-aos="fade-up"
                                        data-aos-anchor-placement="top-bottom"
                                        data-aos-duration={2000}
                                    >


                                        <input
                                            className="name w-100 theme-border pl-20 pt-10 pr-10 pb-10 form-color border-radius5 openS-font-family"
                                            type="text"
                                            name="user_name"
                                            id="inputName"
                                            placeholder="Name or @yoursocial"
                                            {...register("name", {
                                                required: "Name is required",
                                            })}
                                        />
                                        {errors.name && (
                                            <span className="ui-error text-white">
                                                {errors.name.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="row">
                                    <div
                                        className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr6 mb-12"
                                        data-aos="fade-up"
                                        data-aos-anchor-placement="top-bottom"
                                        data-aos-duration={2000}
                                    >


                                        <input
                                            className="name w-100 theme-border pl-20 pt-10 pr-10 pb-10 form-color border-radius5 openS-font-family"
                                            type="text"
                                            name="user_email"
                                            id="inputEmail"
                                            placeholder="Email"
                                            {...register("email", {
                                                required: "Email is required",
                                            })}
                                        />
                                        {errors.email && (
                                            <span className="ui-error text-white">
                                                {errors.email.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="row ">
                                    <div
                                        className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr6 mb-12"
                                        data-aos="fade-up"
                                        data-aos-anchor-placement="top-bottom"
                                        data-aos-duration={2000}
                                    >
                                        <textarea
                                            className="massage w-100 theme-border pl-20 pt-15 pr-10 primary-color border-radius5 openS-font-family"
                                            name="message"
                                            id="msg"
                                            placeholder="Say something nice..."
                                            {...register("msg", {
                                                required: "Message is required",
                                                minLength: {
                                                    message: "Minimum length is 10",
                                                    value: 10,
                                                },
                                            })}
                                        />
                                        {errors.msg && (
                                            <span className="ui-error text-white">
                                                {errors.msg.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="row">
                                    <div
                                        className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 pr6 mb-12"
                                        data-aos="fade-up"
                                        data-aos-anchor-placement="top-bottom"
                                        data-aos-duration={2000}
                                    >
                                        {loading ? (

                                            <button
                                                type="submit"
                                                className="buymeacoffe-btn  w-100 justify-content-center position-relative over-hidden text-white d-flex theme-bg white-text text-uppercase"
                                            >


                                                <div className="spinner">
                                                    <BeatLoader color="#ffffff" loading />
                                                </div>

                                            </button>

                                        ) : (


                                            <button
                                                type="submit"
                                                className="buymeacoffe-btn w-100 justify-content-center position-relative over-hidden text-white d-flex theme-bg white-text text-uppercase"

                                            >

                                                <>
                                                    Support ${(coffeeCount && coffeePrice) ? (parseFloat(coffeeCount * coffeePrice).toFixed(2)) : '0.00'}
                                                </>

                                            </button>

                                        )}

                                    </div>
                                </div>


                                <div
                                    className=" w-100 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  "
                                    data-aos="fade-up"
                                    data-aos-anchor-placement="top-bottom"
                                    data-aos-duration={2000}
                                >
                                    <footer className='text-white'>
                                        <span className='d-flex justify-content-center align-items-center mt-3'><small>No sign up required</small></span>
                                        {/* <div className="underline"></div> */}
                                        <span className='d-flex justify-content-center align-items-center mt-3'><strong className='mr-2'>0 coffees</strong> recieved of 200 coffees</span>
                                    </footer>

                                </div>

                            </div>

                        </form>
                    </TabPanel>
                </Tabs>
            </div >
        </div>
    );
}
