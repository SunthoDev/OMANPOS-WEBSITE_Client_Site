import { useState, useEffect } from "react";
import "./UserInformationSeeQR.css"
import logoOne from "../../../assets/logo.png"
import logoTwo from "../../../assets/logo-two.png"
import { useLoaderData, useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import useRole from "../../../Hook/useRole";



const UserInformationSeeQR = () => {


    const [roles] = useRole()
    const ad = roles?.role === "admin"

    // =====================================================================================
    // We are received data from use params | 1st come component after load all data start
    // =====================================================================================

    // const [searchParams] = useSearchParams();
    // const id = searchParams.get("q");


    // React Query হুক দিয়ে ডেটা ফেচ করা
    // const { data: dataUser = null, error, isLoading, isError, refetch } = useQuery({
    //     queryKey: ['NPORSUserMAINInfo', id], // ক্যাশ কিওয়ারি
    //     queryFn: async () => {
    //         if (!id) return;

    //         const response = await fetch(`http://localhost:5000/NPORSUserMAINInfo/${id}?nocache=${Date.now()}`);
    //         if (!response.ok) {
    //             throw new Error(`Server error: ${response.status}`);
    //         }
    //         return response.json();
    //     },
    //     enabled: !!id, // যদি id না থাকে, ডেটা ফেচ হবে না
    //     refetchOnWindowFocus: true, // ব্রাউজার উইন্ডোতে ফিরে আসলে ডেটা রিফেচ হবে
    //     refetchOnMount: true, // কম্পোনেন্ট মাউন্ট হলে ডেটা রিফেচ হবে
    //     // cacheTime: 5 * 60 * 1000, // ক্যাশের মেয়াদ ৫ মিনিট
    //     cacheTime: 30 * 24 * 60 * 60 * 1000, // **১ মাস (৩০ দিন)**
    //     retry: 3, // ফেইল হলে ৩ বার রিকোয়েস্ট ট্রাই করবে
    // });

    // =====================================================================================
    // We are received data from use params | 1st come component after load all data End
    // =====================================================================================

    // ==============================================
    // Pre Loading Before Data is Loading Start
    // ==============================================
    // if (isLoading) {
    //     return (
    //         <div className="LoadingParent">
    //             <div class="preloader" >
    //                 <div class="spinner">
    //                     <div class="dot1"></div>
    //                     <div class="dot2"></div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
    // ==============================================
    // Pre Loading Before Data is Loading Start
    // ==============================================



    return (
        <div className="bg-[#F5F7FA]">
            <div className="UserInformationSeeQRParent md:ml-[17%] md:mr-[17%] bg-white pb-[52px] pt-[52px] relative">
                <div className="vertical-text"> Powered by VFS Global </div>
                {
                    ad &&
                    <div className="AdminPanelButton">Admin</div>
                }

                <div className="UserInformationSee">
                    {/* ======================== */}
                    {/* Header Logo Section */}
                    {/* ======================== */}
                    <div className=" flex justify-between items-center">
                        <div className="Image p-[10px] w-full md:w-[45%] flex justify-start">
                            <img className="w-[70%]" src={logoTwo} alt="image" />
                        </div>
                        <div className="Image p-[10px] w-full md:w-[45%] flex justify-end">
                            <img className="w-[50%]" src={logoOne} alt="image" />
                        </div>
                    </div>
                    {/* ======================== */}
                    {/* Heading Section */}
                    {/* ======================== */}
                    <h1>بيانات التصديق الرقمي</h1>
                    <h2>Digital Attestation Result</h2>

                    {/* ======================== */}
                    {/* One User Info */}
                    {/* ======================== */}

                    <table className="Heading mt-[14px] w-[25.8%] ml-[50px] mr-[50px]">
                        <tr><td>Transaction Details</td></tr>
                    </table>

                    <table className="UserData w-[86%] ml-[50px] mr-[50px] mb-[16px]">
                        <tr>
                            <td className="left w-[26%]">Transaction Number</td>
                            <td className="right w-[60%]">VN204389</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Payment ID</td>
                            <td className="right w-[60%]" >202509925854166</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Total Payment</td>
                            <td className="right w-[60%]" >OMR 20.50</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Transaction Date</td>
                            <td className="right w-[60%]" >09 Apr 2025</td>
                        </tr>
                    </table>

                    {/* ======================== */}
                    {/* Two User Info */}
                    {/* ======================== */}

                    <table className="Heading w-[25.8%] ml-[50px] mr-[50px]">
                        <tr><td>Candidate Details</td></tr>
                    </table>

                    <table className="UserData w-[86%] ml-[50px] mr-[50px] mb-[16px]">
                        <tr>
                            <td className="left w-[26%]">
                                Document Type</td>
                            <td className="right w-[60%]">Civil Document- ID Card Driving license birth certificate passport</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Applicant Name</td>
                            <td className="right w-[60%]" >	HARUN OR RASHID</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Email Id</td>
                            <td className="right w-[60%]">	taufeeqsalem@hotmail.com</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Phone Number</td>
                            <td className="right w-[60%]" >	92158980</td>
                        </tr>
                    </table>

                    {/* ======================== */}
                    {/* Three User Info */}
                    {/* ======================== */}

                    <table className="Heading w-[25.8%] ml-[50px] mr-[50px]">
                        <tr><td>Verification Details</td></tr>
                    </table>

                    <table className="UserData w-[86%] ml-[50px] mr-[50px] mb-[16px]">
                        <tr>
                            <td className="left w-[26%]">
                                Verifier Name</td>
                            <td className="right w-[60%]">Foreign Ministry - Oman</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Verification Status</td>
                            <td className="right w-[60%]" >	Approved</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Verification Date & Time</td>
                            <td className="right w-[60%]">2025-04-09 11:19:47</td>
                        </tr>
                    </table>

                    {/* ======================== */}
                    {/* Four User Info */}
                    {/* ======================== */}

                    <table className="Heading w-[25.8%] ml-[50px] mr-[50px]">
                        <tr><td>Document Details</td></tr>
                    </table>

                    <table className="UserData w-[86%] ml-[50px] mr-[50px] mb-[16px]">
                        <tr>
                            <td className="left w-[26%]">
                                Original Document</td>
                            <td className="right w-[60%]"><button className="DocumentView">View Document</button></td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Attested Document</td>
                            <td className="right w-[60%]" ><button className="DocumentView">View Document</button></td>
                        </tr>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default UserInformationSeeQR;