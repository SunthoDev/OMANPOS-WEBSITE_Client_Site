import { useState, useEffect } from "react";
import "./UserInformationSeeQR.css"
import logoOne from "../../../assets/logo.png"
import logoTwo from "../../../assets/logo-two.png"
import { Link, useLoaderData, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import useRole from "../../../Hook/useRole";
import PdfViewerLoading from "./PdfViewerLoading/PdfViewerLoading";
import QRCode from "react-qr-code";
import { FadeLoader } from "react-spinners";

// ===============================
import { Document, Page, pdfjs } from "react-pdf";
// import PDF from "../../../../public/2.pdf";
import PDF from '/2.pdf';
import LoadingComponent from "../../Shaired/LoadingComponent/LoadingComponent";

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.6.172/pdf.worker.min.js';


const UserInformationSeeQR = () => {

    // ============================================
    // Modal One of original Document
    // ============================================
    let [seeModalOne, setSeeModalOne] = useState(false)
    let [loadingPDF, setLoadingPDF] = useState(false);


    let closeAlertButtonOneSee = () => {
        setSeeModalOne(false)
    }
    let handleSeeOriginalDocument = () => {
        // setSeeModalOne(true)
        setLoadingPDF(true);

        // 2 সেকেন্ড পরে:
        setTimeout(() => {
            setLoadingPDF(false);
            setSeeModalOne(true);
        }, 2000);

    };

    // When the modal will be open that body scrollbar will be off
    useEffect(() => {
        if (seeModalOne) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [seeModalOne]);

    // ============================================
    // Modal Two of Attested Document
    // ============================================
    let [seeModalTwo, setSeeModalTwo] = useState(false)

    let closeAlertButtonTwoSee = () => {
        setSeeModalTwo(false)
    }
    let handleSeeAttestedDocument = () => {
        // setSeeModalTwo(true)
        setLoadingPDF(true);

        // 2 সেকেন্ড পরে:
        setTimeout(() => {
            setLoadingPDF(false);
            setSeeModalTwo(true);
        }, 2000);
    }

    // When the modal will be open that body scrollbar will be off
    useEffect(() => {
        if (seeModalTwo) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [seeModalTwo]);

    // ====================================================
    // PDF Preview Options
    // ====================================================

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

    // React Query হুক দিয়ে ডেটা ফেচ করা
    const { data: dataUser = null, error, isError, isLoading, refetch } = useQuery({
        queryKey: ['UserMAINInfo', id], // ক্যাশ কিওয়ারি
        queryFn: async () => {
            if (!id) return;

            const response = await fetch(`https://server.docswellet.com/UserMAINInfo/${id}?nocache=${Date.now()}`);
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
    //  If Data Is not found. It will be redirect in google
    // ========================================================
    useEffect(() => {
        if (id && !isLoading) {
            if (id && !dataUser || isError) {
                window.location.href = "https://www.google.com";
            }
        }
    }, [dataUser, isError, isLoading, id]);



    // ==============================================
    // Pre Loading Before Data is Loading Start
    // ==============================================
    if (isLoading) {
        return (
            <LoadingComponent></LoadingComponent>
        );
    }
    // ==============================================
    // Pre Loading Before Data is Loading Start
    // ==============================================

    // PDF all Url Find
    // ==============================================
    const pdfUrlOriginal = `https://server.docswellet.com/files/${dataUser?.originalPDF}`;
    const pdfUrlAttested = `https://server.docswellet.com/files/${dataUser?.attestedPDF}`;

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

                    <div className="div w-[70%] mx-auto">
                        <h1 className="block md:hidden text-right leading-[40px]">بيانات  التصديق <br />الرقمي</h1>
                        <h1 className="hidden md:block text-center">بيانات التصديق الرقمي</h1>


                        <h2 className="block md:hidden text-left pt-[12px] leading-[40px]">Digital Attestation Result</h2>
                        <h2 className="hidden md:block text-center">Digital Attestation Result</h2>
                    </div>

                    {/* ======================== */}
                    {/* One User Info */}
                    {/* ======================== */}

                    <table className="Heading mt-[16px] md:mt-[14px] w-[25.8%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px]">
                        <tr><td className="leading-[20px] md:leading-[0px]">Transaction Details</td></tr>
                    </table>

                    <table className="UserData w-[86%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px] mb-[16px]">
                        <tr>
                            <td className="left w-[26%]">Transaction Number</td>
                            <td className="right leading-[20px] md:leading-[23px] w-[60%]">{dataUser?.TransactionNumber ? dataUser?.TransactionNumber : "VN204389"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Payment ID</td>
                            <td className="right leading-[20px] md:leading-[23px] w-[60%]" >{dataUser?.PaymentID ? dataUser?.PaymentID : "202509925854166"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Total Payment</td>
                            <td className="right leading-[20px] md:leading-[23px] w-[60%]" >{dataUser?.TotalPayment ? dataUser?.TotalPayment : "OMR 20.50"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Transaction Date</td>
                            <td className="right leading-[20px] md:leading-[23px] w-[60%]" >{dataUser?.TransactionDate ? dataUser?.TransactionDate : "OMR 09 Apr 2025"}</td>
                        </tr>
                    </table>

                    {/* ======================== */}
                    {/* Two User Info */}
                    {/* ======================== */}

                    <table className="Heading w-[25.8%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px]">
                        <tr><td className="leading-[20px] md:leading-[0px]">Candidate Details</td></tr>
                    </table>

                    <table className="UserData w-[86%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px] mb-[16px]">
                        <tr>
                            <td className="left w-[26%]">Document Type</td>
                            <td className="right leading-[20px] md:leading-[23px] w-[60%]">{dataUser?.DocumentType ? dataUser?.DocumentType : "Civil Document- ID Card Driving license birth certificate passport"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Applicant Name</td>
                            <td className="right leading-[20px] md:leading-[23px] w-[60%]" >{dataUser?.ApplicantName ? dataUser?.ApplicantName : "HARUN OR RASHID"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Email Id</td>
                            <td className="right leading-[20px] md:leading-[23px] w-[60%]">{dataUser?.EmailId ? dataUser?.EmailId : "taufeeqsalem@hotmail.com"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Phone Number</td>
                            <td className="right leading-[20px] md:leading-[23px] w-[60%]" >{dataUser?.PhoneNumber ? dataUser?.PhoneNumber : "92158980"}</td>
                        </tr>
                    </table>

                    {/* ======================== */}
                    {/* Three User Info */}
                    {/* ======================== */}

                    <table className="Heading w-[25.8%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px]">
                        <tr><td className="leading-[20px] md:leading-[0px]">Verification Details</td></tr>
                    </table>

                    <table className="UserData w-[86%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px] mb-[16px]">
                        <tr>
                            <td className="left w-[26%]">Verifier Name</td>
                            <td className="right leading-[20px] md:leading-[23px] w-[60%]">{dataUser?.VerifierName ? dataUser?.VerifierName : "Foreign Ministry - Oman"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Verification Status</td>
                            <td className="right leading-[20px] md:leading-[23px] w-[60%]" >{dataUser?.VerificationStatus ? dataUser?.VerificationStatus : "Approved"}</td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Verification Date & Time</td>
                            <td className="right leading-[20px] md:leading-[23px] w-[60%]">{dataUser?.VerificationDateTime ? dataUser?.VerificationDateTime : "2025-04-09 11:19:47"}</td>
                        </tr>
                    </table>

                    {/* ======================== */}
                    {/* Four User Info */}
                    {/* ======================== */}

                    <table className="Heading w-[25.8%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px]">
                        <tr><td className="leading-[20px] md:leading-[0px]">Document Details</td></tr>
                    </table>

                    <table className="UserData w-[86%] ml-[10px] md:ml-[50px] mr-[10px] md:mr-[50px] mb-[16px]">
                        <tr>
                            <td className="left w-[26%]">Original Document</td>
                            <td className="right leading-[20px] md:leading-[23px] w-[60%]">
                                <button disabled={!dataUser?.originalPDF} onClick={handleSeeOriginalDocument} className="DocumentView">View Document</button>
                            </td>
                        </tr>
                        <tr>
                            <td className="left w-[26%]">Attested Document</td>
                            <td className="right leading-[20px] md:leading-[23px] w-[60%]" >
                                <button disabled={!dataUser?.attestedPDF} onClick={handleSeeAttestedDocument} className="DocumentView">View Document</button>
                            </td>
                        </tr>
                    </table>

                </div>
            </div>

            {/* ========================================================================================= */}
            {/* Original Document PDF Add Start*/}
            {/* ========================================================================================= */}
            {
                loadingPDF ? <PdfViewerLoading></PdfViewerLoading> :

                    <div className={`alertContainerTwo bg-[#F5F7FA] w-full  ${seeModalOne === true && "showAlertJs"}`} >
                        <div className="bg-[#F5F7FA] w-full md:w-[960px] mx-auto max-h-[100vh] overflow-y-auto overflow-x-hidden">
                            <div className="mx-auto  bg-white flex justify-center items-center ">

                                <Document
                                    file={pdfUrlOriginal}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    onLoadError={(err) => {
                                        console.error("PDF Load Error:", err.message);
                                    }}
                                    loading={
                                        <div className=" h-screen flex justify-center items-center">
                                            <div className="w-screen h-screen flex items-center justify-center">
                                                <div className="bar-spinner">
                                                    {[...Array(12)].map((_, i) => (
                                                        <div key={i} className="bar" style={{ transform: `rotate(${i * 30}deg)` }}></div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                >
                                    {Array.from(new Array(numPages), (el, index) => (
                                        <div key={`page_wrapper_${index}`}
                                            style={{
                                                ppaddingBottom: "32px",
                                                borderBottom: "10px solid #F5F7FA", // ⬅️ নিচে ১০px red border
                                            }}
                                        >

                                            <Page
                                                key={`page_${index + 1}`}
                                                pageNumber={index + 1}
                                                width={window.innerWidth < 768 ? window.innerWidth - 32 : 960}
                                                // scale={2}
                                                // width={
                                                //     window.innerWidth < 768
                                                //         ? window.innerWidth * 0.95
                                                //         : 958
                                                // }
                                                renderTextLayer={false}
                                                renderAnnotationLayer={false}
                                                loading={null}
                                            />

                                        </div>
                                    ))}
                                </Document>
                            </div>
                        </div>
                    </div>
            }

            {/* ========================================================================================= */}
            {/* Attested Document PDF Add Start*/}
            {/* ========================================================================================= */}
            {
                loadingPDF ? <PdfViewerLoading></PdfViewerLoading> :

                    <div className={`alertContainerTwo bg-[#F5F7FA] w-full ${seeModalTwo === true && "showAlertJs"}`} >
                        <div className="bg-[#F5F7FA] w-full md:w-[960px] mx-auto max-h-[100vh] overflow-y-auto overflow-x-hidden">
                            <div className="mx-auto bg-white flex justify-center items-center">

                                <Document
                                    file={pdfUrlAttested}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                    onLoadError={(err) => {
                                        console.error("PDF Load Error:", err.message);
                                    }}
                                    loading={
                                        <div className="h-screen flex justify-center items-center">
                                            <div className="w-screen h-screen flex items-center justify-center">
                                                <div className="bar-spinner">
                                                    {[...Array(12)].map((_, i) => (
                                                        <div key={i} className="bar" style={{ transform: `rotate(${i * 30}deg)` }}></div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    }
                                >
                                    {Array.from(new Array(numPages), (el, index) => (
                                        <div key={`page_wrapper_${index}`}

                                            className="PDFMainParent"
                                            style={{
                                                // display: 'flex',
                                                // flexDirection: 'column',
                                                // alignItems: 'left',

                                                width: 960,              // White page কে 960px রাখছি
                                                maxWidth: "100%",        // responsive: small screens এ ফিট হব

                                                borderBottom: "10px solid #F5F7FA", // ⬅️ নিচে ১০px red border
                                            }}
                                        >
                                            <div className="w-[100%] flex justify-center items-center">
                                                <Page
                                                    key={`page_${index + 1}`}
                                                    pageNumber={index + 1}
                                                    width={window.innerWidth < 768 ? window.innerWidth - 120 : 640}
                                                    renderTextLayer={false}
                                                    renderAnnotationLayer={false}
                                                    loading={null}
                                                />
                                            </div>


                                            <div className="wrapper">
                                                <div className="PDFStatementParent ">
                                                    <div className="PDFStatement relative ml-auto mr-[26px] mt-[14px]">
                                                        <div className="LeftLogo">
                                                            <img className="w-[116px]" src="https://i.ibb.co/v496myfT/logo.png" alt="logo" />
                                                        </div>
                                                        <div className="TopHead">
                                                            <p class="text-center text-white">
                                                                تصادق على صحة توقيع المسؤول والختم
                                                                <br />
                                                                دون تحمل الوزارة أية مسؤولية فيما يختص بمحتويات الوثيقة
                                                            </p>
                                                        </div>

                                                        <div className="overflow-x-auto mt-[20px] ml-[60px]">
                                                            <table className="min-w-full bg-white borde border-gray-30 shadow-md rounded-lg text-black">

                                                                <tr className="border-bb border-gray-20 hover:bg-gray-50">
                                                                    <td className="bg-red-20 text-left w-[18%] py-[1px] px-[1px] align-top text-black ">e-Verify No</td>
                                                                    <td className="bg-green-20 text-left w-[40% py-[1px] px-[1px] align-top text-black ">VN184177</td>
                                                                    <td className="bg-blue-20 text-left w-[22% py-[1px] px-[1px] align-top text-black ">رقم التصديق</td>
                                                                </tr>

                                                                <tr className="border-bb border-gray-20 hover:bg-gray-50">
                                                                    <td className="bg-red-20 text-left w-[18%] py-[1px] px-[1px] align-top text-black ">Verify By</td>
                                                                    <td className="bg-green-20 text-left w-[40% py-[1px] px-[1px] align-top text-black ">Salah 1</td>
                                                                    <td className="bg-blue-20 text-left w-[22% py-[1px] px-[1px] align-top text-black ">تم التحقق من قبل</td>
                                                                </tr>

                                                                <tr className="border-bb border-gray-20 hover:bg-gray-50">
                                                                    <td className="bg-red-20 text-left w-[18%] py-[1px] px-[1px] align-top text-black ">Verify at</td>
                                                                    <td className="bg-green-20 text-left w-[40% py-[1px] px-[1px] align-top text-black ">Salalah</td>
                                                                    <td className="bg-blue-20 text-left w-[22% py-[1px] px-[1px] align-top text-black ">تم التحقق في</td>
                                                                </tr>

                                                                <tr className="border-bb border-gray-20 hover:bg-gray-50">
                                                                    <td className="bg-red-20 text-left w-[18%] py-[1px] px-[1px] align-top text-black ">Applicant Name</td>
                                                                    <td className="bg-green-20 text-left w-[40% py-[1px] px-[1px] align-top text-black ">alimtyaz alimtyaz</td>
                                                                    <td className="bg-blue-20 text-left w-[22% py-[1px] px-[1px] align-top text-black ">اسم العميل</td>
                                                                </tr>

                                                                <tr className="border-bb border-gray-20 hover:bg-gray-50">
                                                                    <td className="bg-red-20 text-left w-[18%] py-[1px] px-[1px] align-top text-black ">Document Name</td>
                                                                    <td className="bg-green-20 text-left w-[40% py-[1px] px-[1px] align-top text-black ">Attestation of Police Clerance</td>
                                                                    <td className="bg-blue-20 text-left w-[22% py-[1px] px-[1px] align-top text-black ">اسم الوثيقة</td>
                                                                </tr>

                                                                <tr className="border-bb border-gray-20 hover:bg-gray-50">
                                                                    <td className="bg-red-20 text-left w-[18%] py-[1px] px-[1px] align-top text-black ">Date of Attestation</td>
                                                                    <td className="bg-green-20 text-left w-[40% py-[1px] px-[1px] align-top text-black ">2025-02-26 11:24:10</td>
                                                                    <td className="bg-blue-20 text-left w-[22% py-[1px] px-[1px] align-top text-black ">تاريخ التصديق</td>
                                                                </tr>

                                                                <tr className="hover:bg-gray-50">
                                                                    <td className="bg-red-20 text-left w-[18%] py-[1px] px-[1px] align-top text-black ">Approver Name</td>
                                                                    <td className="bg-green-20 text-left w-[40% py-[1px] px-[1px] align-top text-black ">Sumaiyaa Al Balushi</td>
                                                                    <td className="bg-blue-20 text-left w-[22% py-[1px] px-[1px] align-top text-black ">نعت المصادقة من قبل</td>
                                                                </tr>
                                                            </table>
                                                        </div>

                                                    </div>
                                                </div>

                                                <div className="QrCodeParent mt-[-10px]">
                                                    <div className="QrCode flex items-center justify-end mr-[14px]">
                                                        <div className="Left">
                                                            <div className="helwo bg-[#535353] h-[2px] w-[480px] ml-auto"></div>
                                                            <p className="text-right">VN00380129 : بالرقم تصديق</p>
                                                            <p className="text-right">تم إنجاز المعاملة إلكترونيا و للتأكد من صحة المعاملة يمكنك مسح الباركود</p>
                                                        </div>
                                                        <div className="QR w-[84px] nd:w-[0px]">
                                                            <QRCode
                                                                size={80}
                                                                bgColor="white"
                                                                fgColor="black"
                                                                value="https://omanpost.docswallat.com/User/&/page/preview/"
                                                                style={{ height: "auto", maxWidth: "100%", width: "78px" }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>




                                        </div>
                                    ))}
                                </Document>

                            </div>
                        </div>
                    </div>
            }
            {
                seeModalOne &&
                <button onClick={closeAlertButtonOneSee} className="removeAlertBtnSeePDF">Close/
                    <span>اغلاق</span>
                </button>
            }
            {
                seeModalTwo &&
                <button onClick={closeAlertButtonTwoSee} className="removeAlertBtnSeePDF">Close/
                    <span>اغلاق</span>
                </button>
            }

        </div >
    );
};

export default UserInformationSeeQR;


{/* <iframe
                            src={`https://server.docswellet.com/files/${dataUser?.originalPDF}#toolbar=0`}
                            title="PDF Preview"
                            className="w-full h-full bg-white"
                            style={{
                                border: "none",
                                backgroundColor: "white",
                            }}
                        ></iframe> */}
{/* <iframe
                            src={`https://server.docswellet.com/files/${dataUser?.originalPDF}#toolbar=0&view=FitH`}
                            title="PDF Preview"
                            className="w-full h-full bg-white"
                            style={{
                                border: "none",
                                backgroundColor: "white",
                            }}
                        ></iframe> */}
