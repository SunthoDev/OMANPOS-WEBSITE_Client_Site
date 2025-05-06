import React from 'react';
import "./NPORSUserAllInformation.css"
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import NPORSUserData from './NPORSUserData/NPORSUserData';

const NPORSUserAllInformation = () => {

    // User Data Find
    // ================================

    const { data: NPORSUserAllData = [], refetch } = useQuery({
        queryKey: ["UserInfo"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/UserInfo");
            return res.json();
        },
    });


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

                fetch(`http://localhost:5000/DeleteUserInformation/${id}`, {
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

    return (
        <div className='UserDataAdmin bg-white '>

            <div className='userData bg-[#F6F6F6] rounded-[7px] mx-0 md:mx-6 my-8 px-4 py-8'>

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
                                NPORSUserAllData?.slice().reverse().map(NporsUserData => <NPORSUserData  HandleDelete={HandleDelete} key={NporsUserData._id} NporsUserData={NporsUserData}></NPORSUserData>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default NPORSUserAllInformation;