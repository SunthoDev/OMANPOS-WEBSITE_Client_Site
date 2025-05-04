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
            UserNameUP, RegistrationNoUP, ExpiryUP,

            CardCategoriesNameUP, CardCategoriesDateUP,

            OperatorCategoriesNameUP, OperatorCategoriesDateUP,

            SlingerUP, SlingerDateUP,

        } = data

        let allInfo = {

            UserNameUP, RegistrationNoUP, ExpiryUP,

            CardCategoriesNameUP, CardCategoriesDateUP,

            OperatorCategoriesNameUP, OperatorCategoriesDateUP,

            SlingerUP, SlingerDateUP,

        }

        // console.log(allInfo)

        // Update User Information From Database 
        // ==========================
        fetch(`http://localhost:5000/AdminUpdateUserInformation/${UserData?._id}`, {
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
                    <h2 className="text-[48px]">NPORS DATA UPDATE</h2>
                </div>
            </div>


            <form onSubmit={handleSubmit(onSubmit)}>

                <div className='AllToyData grid mx-4 md:mx-0 md:grid-cols-2 gap-8'>

                    {/* User Name */}
                    {/* =========================== */}
                    <div className=" form-control">
                        <label className="label">
                            <span className="ToyName label-text">User Name</span>
                        </label>
                        <label className=" input-group w-full">
                            <span>Name</span>
                            <input type="text" name='UserNameUP'
                                {...register("UserNameUP")}
                                defaultValue={UserData?.UserName} className="input input-bordered input-accent w-full " />
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
                            <input type="text" name='RegistrationNoUP'
                                {...register("RegistrationNoUP")}
                                defaultValue={UserData?.RegistrationNo} className="input input-bordered input-accent w-full " />
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
                            <input type="text" name='ExpiryUP'
                                {...register("ExpiryUP")}
                                defaultValue={UserData?.Expiry} className="input input-bordered input-accent w-full " />
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
                            <input type="text" name='CardCategoriesNameUP'
                                {...register("CardCategoriesNameUP")}
                                defaultValue={UserData?.CardCategoriesName} className="input input-bordered input-accent w-full " />
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
                            <input type="text" name='CardCategoriesDateUP'
                                {...register("CardCategoriesDateUP")}
                                defaultValue={UserData?.CardCategoriesDate} className="input input-bordered input-accent w-full " />
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
                            <input type="text" name='OperatorCategoriesNameUP'
                                {...register("OperatorCategoriesNameUP")}
                                defaultValue={UserData?.OperatorCategoriesName} className="input input-bordered input-accent w-full " />
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
                            <input type="text" name='OperatorCategoriesDateUP'
                                {...register("OperatorCategoriesDateUP")}
                                defaultValue={UserData?.OperatorCategoriesDate} className="input input-bordered input-accent w-full " />
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
                            <input type="text" name='SlingerUP'
                                {...register("SlingerUP")}
                                defaultValue={UserData?.Slinger} className="input input-bordered input-accent w-full " />
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
                            <input type="text" name='SlingerDateUP'
                                {...register("SlingerDateUP")}
                                defaultValue={UserData?.SlingerDate} className="input input-bordered input-accent w-full " />
                        </label>
                    </div>

                </div>

                {/* ============================ */}
                <h3 className='text-[#22afa3] text-[26px] font-[500] py-[6px]'>{success}</h3>
                <h3 className='text-[#f93333] text-[15px] font-[500] py-[6px]'>{error}</h3>
                {/* ============================ */}

                <button disabled={loadingLogin} type="submit" className="btn text-white bg-[#1E8F85] w-full mt-8">{loadingLogin ? "Loading..." : "Update Information"}</button>

            </form>

        </div>
    );
};

export default UpdateUserInformation;