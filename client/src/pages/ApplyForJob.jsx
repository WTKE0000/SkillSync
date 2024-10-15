import { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiRequest, handleFileUpload, uploadVideoToS3 } from "../utils";
import { CustomButton, Loading } from "../components";

const ApplyForJob = () => {
  const { jobId } = useParams();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [resume, setResume] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState(null);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Upload the file and get the URL
      const resumeUrl = resume ? await uploadVideoToS3(resume) : null;

      const applicationData = {
        jobId,
        coverLetter: data.coverLetter,
        resumeUrl,
      };

      console.log("Application Data:", applicationData);

      // Uncomment this section to actually submit the data
      const res = await apiRequest({
        url: "/applications/apply",
        method: "POST",
        data: applicationData,
      });

      if (res.status === "success") {
        setApplicationStatus("Application submitted successfully.");
      } else {
        setApplicationStatus("Failed to submit application.");
      }
      setApplicationStatus("Application data logged successfully (replace with actual request).");
    } catch (error) {
      console.error("Error during application:", error);
      setApplicationStatus("An error occurred during the application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 bg-[#f7fdfd] px-5'>
      <div className='w-full h-fit md:w-2/3 2xl:w-2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
        <h1 className='text-gray-500 font-semibold text-2xl mb-4'>Apply for Job</h1>
        <form className='w-full mt-2 flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col'>
            <label className='text-gray-600 text-sm mb-1'>Cover Letter</label>
            <textarea
              className='rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
              rows={4}
              {...register("coverLetter", { required: "Cover letter is required." })}
            />
            {errors.coverLetter && (
              <span role='alert' className='text-xs text-red-500 mt-0.5'>
                {errors.coverLetter.message}
              </span>
            )}
          </div>
          <div className='flex flex-col'>
            <label className='text-gray-600 text-sm mb-1'>Resume</label>
            <input
              type="file"
              onChange={(e) => setResume(e.target.files[0])}
              className='rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
              required
              accept=".pdf"
            />
          </div>
          <div className='mt-2'>
            {isSubmitting ? (
              <Loading />
            ) : (
              <CustomButton
                type='submit'
                containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none'
                title='Apply'
              />
            )}
          </div>
        </form>
        {applicationStatus && <p className='text-gray-600 mt-4'>{applicationStatus}</p>}
      </div>
    </div>
  );
};

export default ApplyForJob;
