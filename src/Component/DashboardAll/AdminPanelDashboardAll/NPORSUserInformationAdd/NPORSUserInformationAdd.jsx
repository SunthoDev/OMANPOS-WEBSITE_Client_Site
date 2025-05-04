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
        let fromData = new FormData()
        fromData.append("image", data.UserImage[0])
        fetch(`https://api.imgbb.com/1/upload?key=bcc7bb34dc85d2c887a08b90dcfbe9ed`, {
            method: "POST",
            body: fromData
        })
            .then(res => res.json())
            .then(imageResponse => {
                if (imageResponse.success) {

                    console.log(imageResponse.secure_url);

                    let UserImageUrl = imageResponse.data.display_url
                    let date = moment().format("D/MM/YY , hh:mm A")

                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    let VerificationNo = '';
                    for (let i = 0; i < 8; i++) {
                        VerificationNo += characters.charAt(Math.floor(Math.random() * characters.length));
                    }
                    VerificationNo += '&t';

                    let {
                        UserName,RegistrationNo,Expiry,

                        CardCategoriesName,CardCategoriesDate,

                        OperatorCategoriesName,OperatorCategoriesDate,

                        Slinger,SlingerDate

                    } = data

                    let allInfo = {

                        UserImageUrl, UserName,RegistrationNo,Expiry,

                        CardCategoriesName,CardCategoriesDate,

                        OperatorCategoriesName,OperatorCategoriesDate,
                        
                        Slinger,SlingerDate,

                        VerificationNo,date
                    }

                    console.log(allInfo)

                    // save user Database 
                    // ==========================
                    fetch("http://localhost:5000/InsertNporsUserInfo", {
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

                } else {
                    setLoadingLogin(false)
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your Network Connection Lost, Try agin",
                        showConfirmButton: false,
                        timer: 1500
                    });
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
                    <h2 className="text-[48px]">NPORS DATA ENTRY</h2>
                </div>
            </div>


            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='AllToyData grid mx-4 md:mx-0 md:grid-cols-2 gap-8'>

                    {/* User Image */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">User Image</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Image</span>
                            <input type="file" name='UserImage'
                                {...register("UserImage", { required: true })}
                                className="file-input file-input-bordered w-full" />
                        </label>
                    </div>
                    {/* User Name */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">User Name</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Name</span>
                            <input type="text" name='UserName'
                                {...register("UserName", { required: true })}
                                placeholder="User name" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>

                    {/* Registration No */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Registration No</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Registration No</span>
                            <input type="Number" name='RegistrationNo'
                                {...register("RegistrationNo", { required: true })}
                                placeholder="Registration No" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* Expiry */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Expiry</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Expiry</span>
                            <input type="text" name='Expiry'
                                {...register("Expiry", { required: true })}
                                placeholder="Expiry" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>


                </div>

                {/* ================================================================= */}
                {/* NPORS  Card Categories */}
                {/* ================================================================= */}

                <h2 className="text-center text-[22px] py-[20px] text-black">
                    NPORS Card Categories</h2>

                <div className='AllToyData grid mx-4 md:mx-0 md:grid-cols-2 gap-8'>

                    {/* One Course Program */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Card Categories name</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Card Categories name</span>
                            <input type="text" name='CardCategoriesName'
                                {...register("CardCategoriesName")}
                                placeholder="Card Categories name" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* One Sub Category */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Card Categories Date</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Card Categories Date</span>
                            <input type="text" name='CardCategoriesDate'
                                {...register("CardCategoriesDate")}
                                placeholder="Card Categories Date" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>

                </div>

                {/* ================================================================= */}
                {/* NPORS  Operator  Categories */}
                {/* ================================================================= */}

                <h2 className="text-center text-[22px] py-[20px] text-black">NPORS Operator Categories</h2>

                <div className='AllToyData grid mx-4 md:mx-0 md:grid-cols-2 gap-8'>

                    {/* One Course Program */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Operator Categories name</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Operator Categories name</span>
                            <input type="text" name='OperatorCategoriesName'
                                {...register("OperatorCategoriesName")}
                                placeholder="Operator Categories name" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>
                    {/* One Sub Category */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Operator Categories Date</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Operator Categories Date</span>
                            <input type="text" name='OperatorCategoriesDate'
                                {...register("OperatorCategoriesDate")}
                                placeholder="Operator Categories Date" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>

                </div>

                {/* ================================================================= */}
                {/* Slinger/Signaller required */}
                {/* ================================================================= */}

                <h2 className="text-center text-[22px] py-[20px] text-black">Slinger/Signaller required</h2>

                <div className='AllToyData grid mx-4 md:mx-0 md:grid-cols-2 gap-8'>

                    {/* Slinger/Signaller */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Slinger/Signaller</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Slinger/Signaller</span>
                            <input type="text" name='Slinger'
                                {...register("Slinger", { required: true })}
                                placeholder="Slinger" className="input input-bordered input-accent w-full " />
                        </label>
                    </div>

                    {/* Slinger / Date */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">Slinger Date</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Slinger Date</span>
                            <input type="text" name='SlingerDate'
                                {...register("SlingerDate", { required: true })}
                                placeholder="Slinger Date" className="input input-bordered input-accent w-full " />
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