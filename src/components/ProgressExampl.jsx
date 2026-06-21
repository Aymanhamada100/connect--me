import { useState } from "react";

export default function ProgressExample() {
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  const progress = (step / totalSteps) * 100;

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      <p className="text-center mr-90">Step {step} of {totalSteps}</p>

      {/* progress bar */}
      <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
        <div
          className="bg-blue-500 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* buttons للتجربة */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Prev
        </button>

        <button
          onClick={() => setStep(step + 1)}
          disabled={step === totalSteps}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>

    </div>
  );
}


import logo from "../assets/Frame 58.png";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UploadCV() {

  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);

  const totalSteps = 2;
  const progress = (step / totalSteps) * 100;

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {

    if (!file) {
      alert("Choose file first");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    try {

      const res = await axios.post(
        "https://connectmeweb.runasp.net/api/User/UploadCV",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#c4d2dffc] flex flex-col justify-center items-center">

      <div>
        <img src={logo} alt="" className="ml-15" />
        <p className="text-black text-[29px] font-medium">
          Let’s get your profile ready
        </p>
        <p className="text-[#7B7E7A] text-[21px] font-normal">
          This helps us find the right job for you
        </p>
      </div>

      <div>
        <div className="w-133 mt-10">

          <p className="text-center mr-90">
            Step {step} of {totalSteps}
          </p>

          {/* progress bar */}
          <div className="w-full bg-gray-300 h-3 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="w-133 h-149 bg-white rounded-[20px] mt-10">

            <p className="text-black text-[16px] font-medium pt-8 pl-8">
              Upload Your Resume
            </p>

            <p className="text-[#7B7E7A] text-[16px] font-normal pl-8">
              Upload your resume to help our AI get to know you better
            </p>

            {/* upload box */}
            <div className="w-122 h-62 shadow-md rounded-xl border-4 border-[#D9D9D9] mt-20 ml-5 flex flex-col justify-center items-center">

              <FiUploadCloud className="w-10 h-9 text-[#0A66C2]" />

              <p className="text-black text-[14px] font-medium">
                Drop your resume to get started
              </p>

              <p className="text-black text-[14px] font-light">
                Or click to select your file
              </p>

              <div className="mt-9">

                <input
                  type="file"
                  id="cvUpload"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <label
                  htmlFor="cvUpload"
                  className="bg-[#D9D9D9] px-4 py-2 rounded mt-3 text-black cursor-pointer inline-block"
                >
                  Choose File
                </label>

                {/* اسم الملف بعد الاختيار */}
                {file && (
                  <p className="text-green-600 mt-2 text-sm">
                    {file.name} uploaded
                  </p>
                )}

              </div>

            </div>

            <p className="text-black text-[14px] font-normal pt-10 pl-6">
              You can upload: PDF or TXT
            </p>

            <p className="text-black text-[14px] font-normal pl-6">
              Maximum file size: 5MB
            </p>

            <p className="text-black text-[14px] font-normal pl-6">
              We process your data locally, then securely share it with AI
            </p>

            <div className="w-120 ml-6 mt-5 border-b-4 border-[#D9D9D9]"></div>

          </div>

          {/* buttons */}
          <div className="flex justify-between mt-6">

            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className="px-4 py-2 bg-gray-400 text-white rounded"
            >
              Prev
            </button>

            <button
              onClick={async () => {

                if (!file) {
                  alert("Please upload your CV first");
                  return;
                }

                await uploadFile();
                navigate("/ProfileSetup");

              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}