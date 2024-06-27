'use client';
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDataById } from "@/lib/helper";

const Font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});



const Candidate = () => {
  const [candidateData, setCandidateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const param = useParams();

  useEffect(() => {
    const getCandidate = async () => {
      setLoading(true);
      const res = await fetchDataById("/form/id/", param.id);
      setCandidateData(res);
      setLoading(false);
      console.log(res);
    };

    getCandidate();
  }, [param.id]);

  if (loading) {
    return (
      <div className="w-full p-4 bg-gray-50 flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (!candidateData) {
    return (
      <div className="w-full p-4 bg-gray-50 flex justify-center items-center h-screen">
        <div className="text-gray-600">No candidate data found.</div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col gap-y-4">
          <div className="text-center">
            <h1 className={cn("text-2xl font-bold", Font.className)}>
              {candidateData.fullName}
            </h1>
            <p className="text-gray-600">{candidateData.summary}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-800"><strong>Email:</strong> {candidateData.email}</p>
                <p className="text-gray-800"><strong>Phone Number:</strong> {candidateData.phoneNumber}</p>
                <p className="text-gray-800"><strong>LinkedIn:</strong> <a href={candidateData.linkedInProfileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{candidateData.linkedInProfileUrl}</a></p>
              </div>
              <div>
                <p className="text-gray-800"><strong>Years of Experience:</strong> {candidateData.yearsOfExperience}</p>
                <p className="text-gray-800"><strong>Certifications:</strong> {candidateData.certifications}</p>
                <p className="text-gray-800"><strong>Foreign Languages Spoken:</strong> {candidateData.foreignLanguagesSpoken}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
            {candidateData.workExperience?.map((work) => (
              <div key={work._id} className="mb-4 border-b pb-4">
                <h3 className="text-lg font-semibold">{work.jobTitle} at {work.companyName}</h3>
                <p className="text-gray-600">{work.location}</p>
                <p className="text-gray-600"><strong>Period:</strong> {work.startedDate} - {work.endDate}</p>
                <p className="text-gray-600"><strong>Key Achievements:</strong> {work.keyAchievements}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Education</h2>
            {candidateData.education?.map((edu) => (
              <div key={edu._id} className="mb-4 border-b pb-4">
                <h3 className="text-lg font-semibold">{edu.degree} in {edu.major}</h3>
                <p className="text-gray-600">{edu.institutionName}</p>
                <p className="text-gray-600"><strong>Year of Graduation:</strong> {edu.yearOfGraduation}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Projects</h2>
            {candidateData.projects?.map((project) => (
              <div key={project._id} className="mb-4 border-b pb-4">
                <h3 className="text-lg font-semibold">{project.projectName}</h3>
                <p className="text-gray-600"><strong>Description:</strong> {project.description}</p>
                <p className="text-gray-600"><strong>Duration:</strong> {project.duration}</p>
                <p className="text-gray-600"><strong>Technologies:</strong> {project.technologies}</p>
                <p className="text-gray-600"><strong>Roles and Responsibilities:</strong> {project.rolesAndResponsibilities}</p>
                <p className="text-gray-600"><strong>GitHub Repo:</strong> <a href={project.githubRepoLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{project.githubRepoLink}</a></p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold">Backend Languages</h3>
                {candidateData.skills.backendLanguages?.map((skill) => (
                  <p key={skill._id} className="text-gray-600"><strong>{skill.name}:</strong> {skill.proficiency}/5</p>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Frontend Languages</h3>
                {candidateData.skills.frontendLanguages?.map((skill) => (
                  <p key={skill._id} className="text-gray-600"><strong>{skill.name}:</strong> {skill.proficiency}/5</p>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Databases</h3>
                {candidateData.skills.databases?.map((skill) => (
                  <p key={skill._id} className="text-gray-600"><strong>{skill.name}:</strong> {skill.proficiency}/5</p>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Cloud Technologies</h3>
                {candidateData.skills.cloudTechnologies?.map((skill) => (
                  <p key={skill._id} className="text-gray-600"><strong>{skill.name}:</strong> {skill.proficiency}/5</p>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-semibold">Soft Skills</h3>
                {candidateData.skills.softSkills?.map((skill) => (
                  <p key={skill._id} className="text-gray-600"><strong>{skill.name}:</strong> {skill.proficiency}/5</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Additional Information</h2>
            <p className="text-gray-600"><strong>Awards and Recognition:</strong> {candidateData.awardsAndRecognition}</p>
            <p className="text-gray-600"><strong>Certifications:</strong> {candidateData.certifications}</p>
            <p className="text-gray-600"><strong>Volunteer Work:</strong> {candidateData.volunteerWork}</p>
            <p className="text-gray-600"><strong>Publications:</strong> {candidateData.publications}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidate;
