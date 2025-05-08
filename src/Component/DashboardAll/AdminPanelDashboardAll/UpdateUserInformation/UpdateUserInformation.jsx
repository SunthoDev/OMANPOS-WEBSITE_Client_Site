import React, { useContext, useState } from 'react';
import "./UpdateUserInformation.css"
import { useLoaderData } from 'react-router-dom';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import moment from 'moment';


const UpdateUserInformation = () => {

    let UserData = useLoaderData()
    // console.log(UserData)



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

        let {
            TransactionNumberUP, PaymentIDUP, TotalPaymentUP, TransactionDateUP,

            DocumentTypeUP, ApplicantNameUP, EmailIdUP, PhoneNumberUP,

            VerifierNameUP, VerificationStatusUP, VerificationDateTimeUP

        } = data

        let allInfo = {

            TransactionNumberUP, PaymentIDUP, TotalPaymentUP, TransactionDateUP,

            DocumentTypeUP, ApplicantNameUP, EmailIdUP, PhoneNumberUP,

            VerifierNameUP, VerificationStatusUP, VerificationDateTimeUP
        }

        // console.log(allInfo)

        // Update User Information From Database 
        // ==========================
        fetch(`https://server.docswallat.com/AdminUpdateUserInformation/${UserData?._id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(allInfo)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.modifiedCount > 0) {
                    reset()
                    setLoadingLogin(false)
                    setSuccess("User Information Update Successfully")
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User Information Update Successfully",
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
                    <h2 className="text-[48px]">DOCSWALLET UPDATE USER DATA</h2>
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
                            <span>{UserData?.TransactionNumber}</span>
                            <input type="text" name='TransactionNumberUP'
                                {...register("TransactionNumberUP")}
                               defaultValue={UserData?.TransactionNumber} placeholder="Transaction Number" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>

                    {/* Payment ID */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Payment ID</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>{UserData?.PaymentID}</span>
                            <input type="Number" name='PaymentIDUP'
                                {...register("PaymentIDUP")}
                                defaultValue={UserData?.PaymentID} placeholder="Payment ID" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Total Payment */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Total Payment</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>{UserData?.TotalPayment}</span>
                            <input type="text" name='TotalPaymentUP'
                                {...register("TotalPaymentUP")}
                                defaultValue={UserData?.TotalPayment}  placeholder="Total Payment" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Transaction Date */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Transaction Date</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>{UserData?.TransactionDate}</span>
                            <input type="text" name='TransactionDateUP'
                                {...register("TransactionDateUP")}
                                defaultValue={UserData?.TransactionDate}  placeholder="Transaction Date" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Document Type */}
                    {/* =========================== */}
                    <div className=" form-control">
                    <label className="label">
                            <span className="ToyName label-text">Document Type</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>{UserData?.DocumentType}</span>
                            <select className="select select-accent w-full " name='DocumentTypeUP'
                                {...register("DocumentTypeUP")}
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
                            <span>{UserData?.ApplicantName}</span>
                            <input type="text" name='ApplicantNameUP'
                                {...register("ApplicantNameUP")}
                                defaultValue={UserData?.ApplicantName}  placeholder="Applicant Name" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Email Id */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Email Id</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>{UserData?.EmailId}</span>
                            <input type="text" name='EmailIdUP'
                                {...register("EmailIdUP")}
                                defaultValue={UserData?.EmailId} placeholder="Email Id" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Phone Number */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Phone Number</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>{UserData?.PhoneNumber}</span>
                            <input type="text" name='PhoneNumberUP'
                                {...register("PhoneNumberUP")}
                                defaultValue={UserData?.PhoneNumber} placeholder="Phone Number" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Verifier Name */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Verifier Name</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>{UserData?.VerifierName}</span>
                            <input type="text" name='VerifierNameUP'
                                {...register("VerifierNameUP")}
                                defaultValue={UserData?.VerifierName} placeholder="Verifier Name" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Verification Status */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Verification Status</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>{UserData?.VerificationStatus}</span>
                            <input type="text" name='VerificationStatusUP'
                                {...register("VerificationStatusUP")}
                                defaultValue={UserData?.VerificationStatus}  placeholder="Verification Status" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Verification Date & Time */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Verification Date & Time</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>{UserData?.VerificationDateTime}</span>
                            <input type="text" name='VerificationDateTimeUP'
                                {...register("VerificationDateTimeUP")}
                                defaultValue={UserData?.VerificationDateTime}  placeholder="Verification Date & Time" className="input input-bordered input-accent w-full " />
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

export default UpdateUserInformation;