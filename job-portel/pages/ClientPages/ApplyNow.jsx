import React, { useState } from "react";
import { UploadCloud } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { JobListbackend, SendingResumePath, SendResumeDetail } from "../../Api-fetch/apiDatas";
import { useEffect } from "react";
import { AILoader } from "../../components/clientComponents/aiLoader";

export const ApplyNow = () => {
  const [file, setFile] = useState(null);
  const params = useParams()
  console.log(params.applyId)
  const [applyjob,setApplyJob] = useState()
  const [load,setLoad] = useState(true)
  const [aiLoad,setAiLoad] = useState()
  
  const navigate = useNavigate()
 
  const [formData, setFormData] = useState({
    name: "",
    skills: [],
    email: "",
    phone: "",
    links: [],
    description: "",
  });

  const filterJobs = async() => {

     try {
    const res = await JobListbackend()
    console.log(res)
    const jobApply = res.filter((jobitem) => jobitem.id == params.applyId)
    setApplyJob(jobApply)

  } catch (error) {
    console.log(error)
  }
  finally{
    setLoad(false)
  }

  }
 useEffect(()  => {
    filterJobs()
 },[])

const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  setFile(selectedFile);
  console.log("asd",selectedFile)
  // FormData banake backend ko bhejo
  const formData = new FormData();
  formData.append("resume", selectedFile);
  console.log(formData)
  handleResume(formData); // formData bhejna hai

};

const handleDragOver = (e) => {
  e.preventDefault(); // default behavior rokna zaroori hai
};

const handleDrop = (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0]; // drag-drop se mila file
  setFile(file);
  console.log("file",file)

  const formData = new FormData();
 
  formData.append("resume", file);
  console.log(file)
  

  handleResume(formData); // correct usage
};

  const handleResume = async(file) => {

    console.log(file)
    setAiLoad(true)
   const resumeData = await SendingResumePath(file)
   console.log("resumeData",resumeData)
   if(resumeData){
    setFormData(resumeData)
    setAiLoad(false)
   }

  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    data.jobId = params.applyId
    console.log(data)
    SendResumeDetail(data)

    
  }

  const checkauthforapply = async() => {

    const data = await fetch("http://localhost:3000/checkapply",{
      method:'GET',
      credentials:'include'
    })
    console.log(data)

    if(!data.ok){
      alert("please login")
      navigate("/login")
    }
  }
  useEffect(() => {
    checkauthforapply()
  },[])

 
 
  
  

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Job Details Section */}
        <div className="lg:col-span-1 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Job Details
          </h2>
          <div className="space-y-3 text-gray-600">
            {
                load ? <h1>Loading...</h1>:(
                    <>
                    {
                         applyjob.map((job) => {
                    return(
                        <>
                        <p><span className="font-semibold text-gray-800">Job Title:</span> {job.title}</p>
            <p><span className="font-semibold text-gray-800">Company:</span> {job.company}</p>
            <p><span className="font-semibold text-gray-800">Location:</span> {job.location}</p>
            <p><span className="font-semibold text-gray-800">Salary:</span>{job.salaryMin}-{job.salaryMax}</p>
            <p><span className="font-semibold text-gray-800">Skills Required:</span> {job.requirements}</p>
            <p className="text-sm leading-relaxed">
              <span className="font-semibold text-gray-800">Description:</span>{" "}
              {job.description}
            </p>
                        </>
                    )
                })
                    }
                    </>
                )
               
            }
          </div>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Apply for this Job
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="w-full p-6 border-2 border-dashed border-gray-300 rounded-xl text-center cursor-pointer hover:border-indigo-500 transition"
            >
              <input
                type="file"
                id="resume"
                className="hidden"
                name="Resume"
                onChange={handleFileChange}
              />
              <label htmlFor="resume" className="cursor-pointer">
                <UploadCloud className="w-10 h-10 text-indigo-600 mx-auto mb-2" />
                <p className="text-gray-600">
                  {file ? file.name : "Drag & drop your resume or click to upload"}
                </p>
              </label>
            </div>
            {/* Candidate Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {

              aiLoad ? <AILoader/> : (<>
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  name="name"
                  placeholder="John Doe"
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  name="email"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="johndoe@example.com"
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="text"
                  value={formData.phone}
                  name="phone"
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">LinkedIn</label>
                <input
                  type="text"
                  value={formData.links}
                  name="links"
                   onChange={(e) =>
            setFormData({ ...formData, links: [e.target.value, formData.links[1] || ""] })
          }
                  placeholder="https://linkedin.com/in/johndoe"
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            

            {/* Portfolio & Cover Letter */}
          <div>
  <label className="block text-gray-700 mb-2">Skills</label>
  <input
    type="text"
    value={formData.skills || ""}
    name="skills"
    onChange={(e) =>
      setFormData({ ...formData, skills: e.target.value })
    }
    placeholder="e.g. React, Node.js, MySQL"
    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
  />
</div>

            <div>
              <label className="block text-gray-700 mb-2">Cover Letter</label>
              <textarea
                placeholder="Write a short cover letter..."
                value={formData.description}
                name="description"
               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="5"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              ></textarea>
            </div>

            {/* Resume Upload */}
            

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Submit Application
            </button>
              </>)
            }
            </div>
              
          </form>
        </div>
      </div>
    </div>
  );
}
