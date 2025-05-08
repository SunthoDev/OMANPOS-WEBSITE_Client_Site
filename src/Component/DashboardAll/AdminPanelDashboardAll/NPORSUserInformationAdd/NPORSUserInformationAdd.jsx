import React, { useContext, useState } from 'react';
import "./NPORSUserInformationAdd.css"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import moment from 'moment';

const NPORSUserInformationAdd = () => {

    let [loadingLogin, setLoadingLogin] = useState(false)
    let [success, setSuccess] = useState("")
    let [error, setError] = useState("")

    // =======================================================

    // =======================================================
    // Student Admission all Information Send Database start
    // =======================================================
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    let onSubmit = (data) => {

        setLoadingLogin(true)
        setError("")
        setSuccess("")

        let date = moment().format("D/MM/YY , hh:mm A")

        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let VerificationNo = '';
        // Generate 20 characters (without the static suffix)
        for (let i = 0; i < 20; i++) {
            VerificationNo += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        // Append the static suffix
        VerificationNo += '%3D%3D';
        // console.log(VerificationNo);



        let {
            TransactionNumber, PaymentID, TotalPayment, TransactionDate,

            DocumentType, ApplicantName, EmailId, PhoneNumber,

            VerifierName, VerificationStatus, VerificationDateTime
        } = data

        let allInfo = {

            TransactionNumber, PaymentID, TotalPayment, TransactionDate,

            DocumentType, ApplicantName, EmailId, PhoneNumber,

            VerifierName, VerificationStatus, VerificationDateTime,

            date, VerificationNo
        }

        // console.log(allInfo)

        // save user Database 
        // ==========================
        fetch("https://server.docswallat.com/InsertUserInfo", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(allInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.insertedId) {
                    reset()
                    setLoadingLogin(false)
                    setSuccess("User Information Add Successfully")
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User Information Add Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    // =======================================================
    // Student Admission all Information Send Database End
    // =======================================================



    return (
        <div className='md:mx-20 mb-10'>

            <div className="welcomeBanner mx-4 md:mx-0">
                <div className="overlay ">
                    <h2 className="text-[48px]">DOCSWALLET DATA ENTRY</h2>
                </div>
            </div>


            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='AllToyData grid mx-4 md:mx-0 md:grid-cols-2 gap-8'>

                    {/* Transaction Number */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Transaction Number</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Transaction Number</span>
                            <input type="text" name='TransactionNumber'
                                {...register("TransactionNumber", { required: true })}
                                placeholder="Transaction Number" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>

                    {/* Payment ID */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Payment ID</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Payment ID</span>
                            <input type="Number" name='PaymentID'
                                {...register("PaymentID", { required: true })}
                                placeholder="Payment ID" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Total Payment */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Total Payment</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Total Payment</span>
                            <input type="text" name='TotalPayment'
                                {...register("TotalPayment", { required: true })}
                                placeholder="Total Payment" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Transaction Date */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Transaction Date</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Transaction Date</span>
                            <input type="text" name='TransactionDate'
                                {...register("TransactionDate", { required: true })}
                                placeholder="Transaction Date" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Document Type */}
                    {/* =========================== */}
                    <div className=" form-control">
                    <label className="label">
                            <span className="ToyName label-text">Document Type</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Document Type</span>
                            <select className="select select-accent w-full " name='DocumentType'
                                {...register("DocumentType", { required: true })}
                            >
                                <option>Attestation of Police clerance</option>
                                <option>Civil Document- ID Card Driving license birth certificate passport</option>
                                <option>Marriage certificate</option>
                            </select>
                        </label>
                    </div>
                    {/* Applicant Name */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Applicant Name</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Applicant Name</span>
                            <input type="text" name='ApplicantName'
                                {...register("ApplicantName", { required: true })}
                                placeholder="Applicant Name" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Email Id */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Email Id</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Email Id</span>
                            <input type="text" name='EmailId'
                                {...register("EmailId", { required: true })}
                                placeholder="Email Id" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Phone Number */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Phone Number</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Phone Number</span>
                            <input type="text" name='PhoneNumber'
                                {...register("PhoneNumber", { required: true })}
                                placeholder="Phone Number" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Verifier Name */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Verifier Name</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Verifier Name</span>
                            <input type="text" name='VerifierName'
                                {...register("VerifierName", { required: true })}
                                placeholder="Verifier Name" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Verification Status */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Verification Status</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Verification Status</span>
                            <input type="text" name='VerificationStatus'
                                {...register("VerificationStatus", { required: true })}
                                placeholder="Verification Status" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Verification Date & Time */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Verification Date & Time</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Verification Date & Time</span>
                            <input type="text" name='VerificationDateTime'
                                {...register("VerificationDateTime", { required: true })}
                                placeholder="Verification Date & Time" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>

                </div>

                {/* ============================ */}
                <h3 className='text-[#22afa3] text-[26px] font-[500] py-[6px]'>{success}</h3>
                <h3 className='text-[#f93333] text-[15px] font-[500] py-[6px]'>{error}</h3>
                {/* ============================ */}

                <button disabled={loadingLogin} type="submit" className="btn text-white bg-[#1E8F85] w-full mt-8">{loadingLogin ? "Loading..." : "Add User Information"}</button>

            </form>

        </div>
    );
};

export default NPORSUserInformationAdd;