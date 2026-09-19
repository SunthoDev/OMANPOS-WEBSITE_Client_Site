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
        for (let i = 0; i < 24; i++) {
            VerificationNo += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        // Append the static suffix
        VerificationNo += '%3D%3D';
        // console.log(VerificationNo);



        let {
            TransactionNumber, PaymentID, TotalPayment, TransactionDate,

            DocumentType, ApplicantName, EmailId, PhoneNumber,

            VerifierName, VerificationStatus, VerificationDateTime,

            VerifyBy, VerifyAt, ApproverName, // <-- Added new fields
        } = data

        let allInfo = {

            TransactionNumber, PaymentID, TotalPayment, TransactionDate,

            DocumentType, ApplicantName, EmailId, PhoneNumber,

            VerifierName, VerificationStatus, VerificationDateTime,

            VerifyBy, VerifyAt, ApproverName, // <-- Added new fields

            date, VerificationNo
        }

        // console.log(allInfo)

        // save user Database 
        // ==========================
        fetch("https://server.docswellet.com/InsertUserInfo", {
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
                            <select
                                {...register("DocumentType", { required: true })}
                                className="select select-accent w-full "
                                name='DocumentType'
                            >
                                <option>Marriage certificate</option>
                                <option>Attestation of Police clerance</option>
                                <option>Civil Document- ID Card Driving license birth certificate passport</option>
                                <option>Trade agencies /original</option>
                                <option>Duplicate copy trade agencies</option>
                                <option>Trade contracts /original</option>
                                <option>Duplicate copy trade contracts</option>
                                <option>Certificate of origin /original</option>
                                <option>Trade invoice From (1) to $10,000</option>
                                <option>Trade invoice From $10,000 to $50,000</option>
                                <option>Trade invoice From $50,000 to $100,000</option>
                                <option>Trade invoice Above from $100,000</option>
                                <option>Marriage certificate</option>
                                <option>Divorce certificate</option>
                                <option>Declaration of freedom from a wife</option>
                                <option>Other commercial Document</option>
                                <option>Commercial registration</option>
                                <option>Chamber of commerce and industry membership</option>
                                <option>Cargo manifest</option>
                                <option>Closing accounts of companies</option>
                                <option>Plans of companies’ projects</option>
                                <option>Certificate of military equipment utilization</option>
                                <option>Certificate of analysis of nutrients in foods</option>
                                <option>Replacement of Lost Documents Commercial</option>
                                <option>An employment certificate</option>
                                <option>Civil Contracts - Other Statutory Agencies (Original Copy)</option>
                                <option>Civil contracts - other regular agency - true copy</option>
                                <option>Civil contracts - academic certificate - original copy</option>
                                <option>Death certificate for Omanis who died outside the Sultanate</option>
                                <option>Attestation of Death certificate</option>
                                <option>Attestation of experience certificate</option>
                                <option>Educational certificates (Omani students abroad) - Original</option>
                                <option>Educational certificates (Omani students abroad) - Copy</option>
                                <option>Medical certificates abroad - original</option>
                                <option>Medical certificates abroad - true copy</option>
                                <option>Replace lost civil documents</option>
                                <option>Apostille (Civil Documents Only)</option>
                                <option>Laboure clearances</option>
                                <option>Attestation of Police clearance</option>
                                <option>Civil Document - ID, License, Birth, Passport</option>
                                <option>Education Certificate Original Copy</option>
                                <option>Medical Report</option>
                                <option>Diplomatic Delegation Category within Oman</option>
                                <option>Social Security Category for Civil document Only</option>
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
                                defaultValue="Foreign Ministry - Oman" className="input input-bordered input-accent w-full " />
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
                                defaultValue="Approved" className="input input-bordered input-accent w-full " />
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
                    {/* ======================================================= */}
                    {/* === ADDED NEW FIELDS START HERE ======================== */}
                    {/* ======================================================= */}
                    {/* Verify By */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Verify By</span>
                        </label>
                        <label className="w-full input-group">
                            <span>Verify By</span>
                            <input type="text" name='VerifyBy'
                                {...register("VerifyBy", { required: true })}
                                placeholder="e.g., Salah 1" className="w-full input input-bordered input-accent " />
                        </label>
                    </div>

                    {/* Verify At */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Verify At</span>
                        </label>
                        <label className="w-full input-group">
                            <span>Verify At</span>
                            <input type="text" name='VerifyAt'
                                {...register("VerifyAt", { required: true })}
                                placeholder="e.g., Salalah" className="w-full input input-bordered input-accent " />
                        </label>
                    </div>

                    {/* Approver Name */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Approver Name</span>
                        </label>
                        <label className="w-full input-group">
                            <span>Approver Name</span>
                            <input type="text" name='ApproverName'
                                {...register("ApproverName", { required: true })}
                                placeholder="Approver's Name" className="w-full input input-bordered input-accent " />
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


