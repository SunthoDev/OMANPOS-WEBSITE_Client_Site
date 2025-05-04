import React from 'react';
import "./NPORSUserData.css"
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { TbBoxPadding } from 'react-icons/tb';
import download from "downloadjs"
import { toPng } from "html-to-image";

const NPORSUserData = ({ NporsUserData, HandleDelete }) => {
    // console.log(allUser)

    let {
        UserImageUrl, UserName, RegistrationNo, Expiry,

        CardCategoriesName, CardCategoriesDate,

        OperatorCategoriesName, OperatorCategoriesDate,

        Slinger, SlingerDate,

        VerificationNo, date, _id

    } = NporsUserData


    // ===================================================
    // Dynamic URL Start || and See User Information
    // ===================================================
    const navigate = useNavigate();

    const handleVerify = (id) => {
        navigate(`/qr/?q=${id}=BUCDTP`);
    };


    // ===================================================
    // Dynamic URL End
    // ===================================================

    // ===================================================
    // QR code download of png Start
    // ===================================================

    const QRDownload = () => {
        let node = document.getElementById("QRDownloader");

        if (!node) {
            console.log("Element not found!");
            return;
        }
        toPng(node)
            .then((dataURL) => {
                let link = document.createElement("a");
                link.href = dataURL;
                link.download = "qr-code.png";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch((error) => {
                console.log("Error in downloading QR Code:", error);
            });
    };

    // ===================================================
    // QR code download of png end
    // ===================================================


    function UpdateInformation (id){

        navigate(`/dashboard/UpdateUserInformation/${id}`)
    }



    return (
        <tr className='UserAllData'>

            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-16 w-16">
                            <img
                                src={UserImageUrl} />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <h3>Registration No: {RegistrationNo}</h3>
                <h3>Name: {UserName}</h3>
            </td>
            <td>
                <h3>Card Categories Name : </h3>
                <h3>{CardCategoriesName !== "" ? CardCategoriesName : "No Data Add"}</h3>
            </td>
            <td>
                <h3>Operator Categories Name : </h3>
                <h3>{OperatorCategoriesName !== "" ? OperatorCategoriesName : "No Data Add"}</h3>
            </td>
            <td>
                <h3>{VerificationNo}</h3>
            </td>
            <td>
                <div id='QRDownloader'>
                    <QRCode
                        size={140}
                        bgColor="white"
                        fgColor="black"
                        value={`https://www.nporrs.com/qr/?q=${VerificationNo}=BUCDTP`}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    />
                </div>
            </td>

            <td>
                <button onClick={QRDownload}>QR Download</button>
                <br />
                <button onClick={() => handleVerify(VerificationNo)}>See Info</button>
                <br />
                <button onClick={() => UpdateInformation(_id)}>Update Info</button>
                <br />
                <button onClick={() => HandleDelete(_id)}>Delete</button>
            </td>

        </tr>
    );
};

export default NPORSUserData;