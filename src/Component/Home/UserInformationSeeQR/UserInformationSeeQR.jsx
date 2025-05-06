import { useState, useEffect } from "react";
import "./UserInformationSeeQR.css"
import logoOne from "../../../assets/logo.png"
import logoTwo from "../../../assets/logo-two.png"
import { Link, useLoaderData, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import useRole from "../../../Hook/useRole";
import PdfViewer from "./PdfViewer/PdfViewer";

// ===============================
import { Document, Page, pdfjs } from "react-pdf";
// import PDF from "../../../../public/2.pdf";
import PDF from '/2.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js';


const UserInformationSeeQR = () => {


    let [seeModalOne, setSeeModalOne] = useState(false)

    let closeAlertButtonOneSee = () => {
        setSeeModalOne(false)
    }
    let handleSeeOriginalDocument = () => {
        setSeeModalOne(true)
    }



    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };






    const [roles] = useRole()
    const ad = roles?.role === "admin"

    // =====================================================================================
    // We are received data from use params | 1st come component after load all data start
    // =====================================================================================

    // const [searchParams] = useSearchParams();
    // const id = searchParams.get("q");

    const { id } = useParams();
    // console.log(id)

    // React Query হুক দিয়ে ডেটা ফেচ করা
    const { data: dataUser = null, error, isLoading, isError, refetch } = useQuery({
        queryKey: ['UserMAINInfo', id], // ক্যাশ কিওয়ারি
        queryFn: async () => {
            if (!id) return;

            const response = await fetch(`http://localhost:5000/UserMAINInfo/${id}?nocache=${Date.now()}`);
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            return response.json();
        },
        enabled: !!id, // যদি id না থাকে, ডেটা ফেচ হবে না
        refetchOnWindowFocus: true, // ব্রাউজার উইন্ডোতে ফিরে আসলে ডেটা রিফেচ হবে
        refetchOnMount: true, // কম্পোনেন্ট মাউন্ট হলে ডেটা রিফেচ হবে
        // cacheTime: 5 * 60 * 1000, // ক্যাশের মেয়াদ ৫ মিনিট
        cacheTime: 30 * 24 * 60 * 60 * 1000, // **১ মাস (৩০ দিন)**
        retry: 3, // ফেইল হলে ৩ বার রিকোয়েস্ট ট্রাই করবে
    });

    // =====================================================================================
    // We are received data from use params | 1st come component after load all data End
    // =====================================================================================

    // ==============================================
    // Pre Loading Before Data is Loading Start
    // ==============================================
    if (isLoading) {
        return (
            <div className="LoadingParent">
                <div class="preloader" >
                    <div class="spinner">
                        <div class="dot1"></div>
                        <div class="dot2"></div>
                    </div>
                </div>
            </div>
        );
    }
    // ==============================================
    // Pre Loading Before Data is Loading Start
    // ==============================================


    const pdfUrl = `http://localhost:5000/files/${dataUser?.originalPDF}`;

    // console.log(pdfUrl)


    return (
        <div className="bg-[#F5F7FA]">
            <div className="UserInformationSeeQRParent md:ml-[17%] md:mr-[17%] bg-white pb-[52px] pt-[52px] relative">
                <div className="vertical-text"> Powered by VFS Global </div>
                {
                    ad &&
                    <Link to="/dashboard">
                        <div className="AdminPanelButton">Admin</div>
                    </Link>
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
                            <td className="right w-[60%]">{dataUser?.TransactionNumber ? dataUser?.TransactionNumber : "VN204389"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Payment ID</td>
                            <td className="right w-[60%]" >{dataUser?.PaymentID ? dataUser?.PaymentID : "202509925854166"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Total Payment</td>
                            <td className="right w-[60%]" >{dataUser?.TotalPayment ? dataUser?.TotalPayment : "OMR 20.50"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Transaction Date</td>
                            <td className="right w-[60%]" >{dataUser?.TransactionDate ? dataUser?.TransactionDate : "OMR 09 Apr 2025"}</td>
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
                            <td className="left w-[26%]">Document Type</td>
                            <td className="right w-[60%]">{dataUser?.DocumentType ? dataUser?.DocumentType : "Civil Document- ID Card Driving license birth certificate passport"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Applicant Name</td>
                            <td className="right w-[60%]" >{dataUser?.ApplicantName ? dataUser?.ApplicantName : "HARUN OR RASHID"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Email Id</td>
                            <td className="right w-[60%]">{dataUser?.EmailId ? dataUser?.EmailId : "taufeeqsalem@hotmail.com"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Phone Number</td>
                            <td className="right w-[60%]" >{dataUser?.PhoneNumber ? dataUser?.PhoneNumber : "92158980"}</td>
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
                            <td className="left w-[26%]">Verifier Name</td>
                            <td className="right w-[60%]">{dataUser?.VerifierName ? dataUser?.VerifierName : "Foreign Ministry - Oman"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Verification Status</td>
                            <td className="right w-[60%]" >{dataUser?.VerificationStatus ? dataUser?.VerificationStatus : "Approved"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Verification Date & Time</td>
                            <td className="right w-[60%]">{dataUser?.VerificationDateTime ? dataUser?.VerificationDateTime : "2025-04-09 11:19:47"}</td>
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
                            <td className="left w-[26%]">Original Document</td>
                            <td className="right w-[60%]">
                                <button className="DocumentView">View Document</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Attested Document</td>
                            <td className="right w-[60%]" >

                                {/* <button onClick={() => document.getElementById('my_modal_4').showModal()} className="DocumentView">View Document</button> */}

                                <button onClick={handleSeeOriginalDocument} className="DocumentView">View Document</button>

                            </td>
                        </tr>
                    </table>

                </div>
            </div>



            {/* ========================================================================================= */}
            {/* Original Document PDF Add Start*/}
            {/* ========================================================================================= */}

            <div className={`alertContainerTwo bg-[#F5F7FA] h-[100vh w-full  ${seeModalOne === true && "showAlertJs"}`} >
                <div className="ModalTwo w-full">
                    <div className="popInfo">

                        <div style={{
                            width: '942px',
                            margin: '0 auto', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', overflowY: "auto"
                        }}  >

                            <Document
                                file={pdfUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={(err) => {
                                    console.error("PDF Load Error:", err.message);
                                }}
                            >
                                {Array.from(new Array(numPages), (el, index) => (
                                    <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        width={900}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                    />
                                ))}
                            </Document>
                        </div>

                        {/* <PdfViewer /> */}
                    </div>
                    <button onClick={closeAlertButtonOneSee} className="removeAlertBtn"><i className="fa fa-times-circle" aria-hidden="true"></i></button>
                </div>
            </div>

            {/* ========================================================================================= */}
            {/* Original Document PDF Add End*/}
            {/* ========================================================================================= */}

        </div >
    );
};

export default UserInformationSeeQR;


{/* <iframe
                            src={`http://localhost:5000/files/${dataUser?.originalPDF}#toolbar=0`}
                            title="PDF Preview"
                            className="w-full h-full bg-white"
                            style={{
                                border: "none",
                                backgroundColor: "white",
                            }}
                        ></iframe> */}
{/* <iframe
                            src={`http://localhost:5000/files/${dataUser?.originalPDF}#toolbar=0&view=FitH`}
                            title="PDF Preview"
                            className="w-full h-full bg-white"
                            style={{
                                border: "none",
                                backgroundColor: "white",
                            }}
                        ></iframe> */}


//     <iframe
//     src={`http://localhost:5000/files/${dataUser?.originalPDF}#toolbar=0`}
//     title="PDF Preview"
//     style={{
//         width: '100%',
//         height: '100%',
//         border: 'none',
//         backgroundColor: 'white', // PDF এর ব্যাকগ্রাউন্ড সাদ
//     }}
// />




                            {/* <Document
                                file={PDF}
                                onLoadSuccess={onDocumentLoadSuccess}
                                onLoadError={(err) => {
                                    console.error("PDF Load Error:", err.message);
                                }}
                            >
                                {numPages &&
                                    Array.from({ length: numPages }, (_, i) => (
                                        <Page
                                            key={`page_${i + 1}`}
                                            pageNumber={i + 1}
                                            width={900}
                                            renderTextLayer={false}
                                            renderAnnotationLayer={false}
                                        />
                                    ))}
                            </Document> */}
