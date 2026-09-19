import React, { useEffect, useState, useRef } from 'react';
import "./NPORSUserAllInformation.css"
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import NPORSUserData from './NPORSUserData/NPORSUserData';
import { useLoaderData, useLocation } from 'react-router-dom';
// import { PacmanLoader } from 'react-spinners';

const NPORSUserAllInformation = () => {

    // ================================
    // User Data Find
    // ================================
    // const { data: NPORSUserAllData = [] } = useQuery({
    //     queryKey: ["UserInfo"],
    //     queryFn: async () => {
    //         const res = await fetch("https://server.docswellet.com/UserInfo");
    //         return res.json();
    //     },
    // });

    // ======================================
    // user role Change Click Delete
    // ======================================
    let HandleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://server.docswellet.com/DeleteUserInformation/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Admin Delete User has been Success",
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                        console.log(data)

                        refetch()
                    })

            }

        });
    }


    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // User pagination Start
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    // ja page click korvo ay curent page state set hova and tar data oh set hova / are page num jahatu 0 thaka suru hova thi tar default value hova 0
    let [currentPage, setCurrentPage] = useState(0)

    // decide or per page item number 
    let [itemPerPage, setItemPerPage] = useState(80)

    // determine total number of users   
    const { totalUsers } = useLoaderData();
    // console.log(totalUsers)

    // calculate the total number of page 
    let totalPage = totalUsers ? Math.ceil(totalUsers / itemPerPage) : 0;

    // how to create every page button ,,  for total page so 
    let pageNumber = [...Array(totalPage).keys()]

    // use option per page koyta kore products dhakava 
    let option = [5, 10, 15, 20, 25, 30]
    function handleSelectChange(event) {
        setItemPerPage(parseInt(event.target.value))
        setCurrentPage(0)
    }

    // server all products data lode condition per page limete data lode
    const { data: NPORSUserAllData = [], refetch, error, isLoading } = useQuery({
        queryKey: ["UserAllDataPagination", currentPage, itemPerPage],
        queryFn: async () => {
            const response = await fetch(`https://server.docswellet.com/UserAllDataPagination?page=${currentPage}&limit=${itemPerPage}`);
            const data = await response.json();
            return data;
            // return data.reverse();
        },
    },);


    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    // User pagination End
    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx



    return (
        <div className='UserDataAdmin bg-white '>
            <h2 className="text-center text-black text-[24px] pb-[18px]">Total user data: ({totalUsers})</h2>

            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
            {/* pagination Button use Start */}
            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
            <div className="pagination">
                {/* <p>currentPage : {currentPage} item per page : {itemPerPage}</p> */}
                {/* page button create  */}
                {
                    pageNumber?.map(number => <button
                        key={number}
                        onClick={() => setCurrentPage(number)}

                        className={currentPage === number ? "selected" : ""}

                    >{number}</button>)
                }
            </div>
            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}
            {/* pagination Button use End */}
            {/* xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx */}

            <div className='userData bg-[#F6F6F6] rounded-[7px] mx-0 md:mx-6 my-8 px-4 py-8'>

                <h2 className="text-left text-black text-[24px] pb-[18px]">This page total Data: ({NPORSUserAllData?.length})</h2>

                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="text-[14px] font-[600] text-white">Name</th>
                                <th className="text-[14px] font-[600] text-white">Document Type</th>
                                <th className="text-[14px] font-[600] text-white">Pay Id</th>
                                <th className="text-[14px] font-[600] text-white">Status</th>
                                <th className="text-[14px] font-[600] text-white">QR Code</th>
                                <th className="text-[14px] font-[600] text-white">Role</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                NPORSUserAllData?.slice().reverse().map(NporsUserData => <NPORSUserData HandleDelete={HandleDelete} key={NporsUserData._id} NporsUserData={NporsUserData}></NPORSUserData>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NPORSUserAllInformation;