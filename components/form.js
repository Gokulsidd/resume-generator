"use client";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import Resume from './resume'; 
import { backend_base_url } from "@/lib/constants";

const SurveyForm = () => {
  const[formData, setFormData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast()


  // useEffect(() => {                               //  for prefill form data 
  //   axios.get(`${backend_base_url}/form`)
  //   .then((res) => {
  //     setFormData(res.data[0])
  //   })
  //   .catch ((error) => {
  //     console.log(error)
  //   })
  // },[])


 
  const initialValues = {
    fullName: formData.fullName || "",
    email: formData.email || "",
    phoneNumber: formData.phoneNumber ||"",
    linkedInProfileUrl: formData.linkedInProfileUrl ||"",
    summary: formData.summary ||"",
    yearsOfExperience: formData.yearsOfExperience ||"",
    workExperience: formData.workExperience || [
      {
        companyName: "",
        location: "",
        startedDate: "",
        endDate: "",
        jobTitle: "",
        keyAchievements: "",
      },
    ],
    education: formData.education || [
      {
        institutionName: "",
        degree: "",
        major: "",
        yearOfGraduation: "",
      },
    ],
    projects: formData.projects || [
      {
        projectName: "",
        description: "",
        duration: "",
        technologies: "",
        rolesAndResponsibilities: "",
        githubRepoLink: ""
      },
    ],
    skills: formData.skills || {
      backendLanguages: [{ name: "", proficiency: "" }],
      frontendLanguages: [{ name: "", proficiency: "" }],
      databases: [{ name: "", proficiency: "" }],
      cloudTechnologies: [{ name: "", proficiency: "" }],
      softSkills: [{ name: "", proficiency: "" }],
    },
    awardsAndRecognition: formData.awardsAndRecognition || "",
    certifications: formData.certifications || "",
    volunteerWork: formData.volunteerWork || "",
    foreignLanguagesSpoken: formData.foreignLanguagesSpoken || "",
    publications: formData.publications || "",
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      console.log(values)
      axios.post(`${backend_base_url}/form`, values)
      .then((res) => {
        toast({ title: res.data.message });
        setShowModal(true);
      });
    },
    enableReinitialize: true
  });
  

  const addWorkExperience = () => {
    const newExperience = {
      companyName: "",
      location: "",
      startedDate: "",
      endDate: "",
      jobTitle: "",
      keyAchievements: "",
    };
    formik.setFieldValue("workExperience", [...formik.values.workExperience, newExperience]);
  };

  const addEducation = () => {
    const newEducation = {
        institutionName: "",
        degree: "",
        major: "",
        yearOfGraduation: "",
      }
    
      formik.setFieldValue("education", [...formik.values.education, newEducation])
  }

  const addProject = () => {
    const newProject = {
      projectName: "",
      description: "",
      duration: "",
      technologies: "",
      rolesAndResponsibilities: "",
      githubRepoLink: ""
    }
    
      formik.setFieldValue("projects", [...formik.values.projects, newProject])
  }

  const addBackendSkill = () => {
    formik.setFieldValue("skills.backendLanguages", [
      ...formik.values.skills?.backendLanguages,
      { name: "", proficiency: "" },
    ]);
  };

  const addFrontendSkills = () => {
    formik.setFieldValue("skills.frontendLanguages", [
        ...formik.values.skills.frontendLanguages,
        { name: "", proficiency: "" },
    ])
  }
  
  const addDatabase = () => {
    formik.setFieldValue("skills.databases", [
        ...formik.values.skills.databases,
        { name: "", proficiency: "" },
    ])
  }

  const addCloudTechnologies = () => {
    formik.setFieldValue("skills.cloudTechnologies", [
        ...formik.values.skills.cloudTechnologies,
        { name: "", proficiency: "" },
    ])
  }

  const addSoftSkills = () => {
    formik.setFieldValue("skills.softSkills", [
        ...formik.values.skills.softSkills,
        { name: "", proficiency: "" },
    ])
  }

  const handleGeneratePdf = () => {
    const input = document.getElementById('resume');
    html2canvas(input, { allowTaint: true, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      let heightLeft = imgProps.height;
      let position = 0;
  
      // Add the first page
      const firstPageHeight = Math.min(heightLeft, pdfHeight);
      const firstPageWidth = (firstPageHeight * imgProps.width) / imgProps.height;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, firstPageHeight);
      heightLeft -= firstPageHeight;
      position -= firstPageHeight;
  
      // Add remaining pages
      // while (heightLeft > 0) {
      //   pdf.addPage();
      //   const pageHeight = Math.min(heightLeft, pdfHeight);
      //   const pageWidth = (pageHeight * imgProps.width) / imgProps.height;
      //   pdf.addImage(imgData, 'PNG', 0, position, pageWidth, pageHeight);
      //   heightLeft -= pageHeight;
      //   position -= pageHeight;
      // }
  
      pdf.save(`${formik.values.fullName}-resume.pdf`);
      setShowModal(false);
    });
  };

  

  return (
    <div className="w-full md:w-[650px] md:mdp-2">
      <div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-5 my-2" >
          <div className="p-6 flex flex-col gap-y-5 md:border border-gray-200 rounded-md md:shadow-md">
            <h1 className="text-[#444444] font-semibold text-[1.4rem]">
              Personal Information
            </h1>
            <div className="flex flex-col gap-y-1">
                <Label>Full Name</Label>
                <Input id="fullName" type="text" name="fullName" onChange={formik.handleChange} value={formik.values.fullName} />
            </div>
            <div className="flex flex-col gap-y-1">
                <Label>Email Address</Label>
                <Input id="emailAddress" type="email" name="emailAddress" onChange={formik.handleChange} value={formik.values.email} />
            </div>
            <div className="flex flex-col gap-y-1">
                <Label>Phone Number</Label>
                <Input id="phoneNumber" type="text" name="phoneNumber" onChange={formik.handleChange} value={formik.values.phoneNumber} />
            </div>
            <div className="flex flex-col gap-y-1">
                <Label>LinkedIn Profile URL</Label>
                <Input id="linkedInProfileUrl" type="text" name="linkedInProfileUrl" onChange={formik.handleChange} value={formik.values.linkedInProfileUrl} />
            </div>
            <div className="flex flex-col gap-y-1">
                <Label>Summary (within 100 characters)</Label>
                <Input id="summary" type="text" name="summary" onChange={formik.handleChange} value={formik.values.summary} />
            </div>
            <div className="flex flex-col gap-y-1">
                <Label>Years of experience  (eg: 10 years 11 months)</Label>
                <Input id="yearsOfExperience" type="text" name="yearsOfExperience" onChange={formik.handleChange} value={formik.values.yearsOfExperience} />
            </div>
          </div>
          <div className="p-6 flex flex-col gap-y-5 md:border border-gray-200 rounded-md md:shadow-md">
            <h1 className="text-[#444444] font-semibold text-[1.4rem]">
              Work Experience
            </h1>
            {formik.values.workExperience?.map((experience, index) => {
                return (
                    <div className="flex flex-col gap-y-5 my-3" key={index}>
                    <h1 className="text-[#444444] font-semibold text-[1.2rem]">
                        Experience  {index +1 }
                    </h1>
                    <div className="flex flex-col gap-y-1">
                        <Label>Company Name</Label>
                        <Input id={`companyName-${index}`} type="text" name={`workExperience[${index}].companyName`} onChange={formik.handleChange} value={experience.companyName} />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <Label>Location (City, State)</Label>
                        <Input id={`location-${index}`} type="text" name={`workExperience[${index}].location`} onChange={formik.handleChange} value={experience.location} />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <Label>Dates of Employment - Start Date</Label>
                        <Input id={`startedDate-${index}`} type="text" name={`workExperience[${index}].startedDate`} onChange={formik.handleChange} value={experience.startedDate} />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <Label>Dates of Employment - End Date</Label>
                        <Input id={`endDate-${index}`} type="text" name={`workExperience[${index}].endDate`} onChange={formik.handleChange} value={experience.endDate} />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <Label>Job Title</Label>
                        <Input id={`jobTitle-${index}`} type="text" name={`workExperience[${index}].jobTitle`} onChange={formik.handleChange} value={experience.jobTitle} />
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <Label>Key Achievements </Label>
                        <Input id={`keyAchievements-${index}`} type="text" name={`workExperience[${index}].keyAchievements`} onChange={formik.handleChange} value={experience.keyAchievements} />
                    </div>
                </div>
                )
                } )}
            <Button variant="default" size="lg" className="w-full" type="button" onClick={addWorkExperience}>+ Add Experience</Button>
          </div>
          <div className="p-6 flex flex-col gap-y-5 md:border border-gray-200 rounded-md md:shadow-md">
            <h1 className="text-[#444444] font-semibold text-[1.4rem]">
              Education
            </h1>
            {formik.values.education?.map((education, index) => (
                <div className="flex flex-col gap-y-5" key={index}>
                <h1 className="text-[#444444] font-semibold text-[1rem]">
                Education {index + 1}
                </h1>
                <div className="flex flex-col gap-y-1">
                    <Label>University/Institution Name</Label>
                    <Input id={`institutionName-${index}`} type="text" name={`education[${index}].institutionName`} onChange={formik.handleChange} value={education.institutionName} />
                </div>
                <div className="flex flex-col gap-y-1">
                    <Label>Degree</Label>
                    <Input id={`degree-${index}`} type="text" name={`education[${index}].degree`} onChange={formik.handleChange} value={education.degree} />
                </div>
                <div className="flex flex-col gap-y-1">
                    <Label>Major</Label>
                    <Input id={`major-${index}`} type="text" name={`education[${index}].major`} onChange={formik.handleChange} value={education.major} />
                </div>
                <div className="flex flex-col gap-y-1">
                    <Label>Year of Graduation</Label>
                    <Input id={`yearOfGraduation-${index}`} type="text" name={`education[${index}].yearOfGraduation`} onChange={formik.handleChange} value={education.yearOfGraduation} />
                </div>
            </div>
            ))}
            <Button variant="default" size="lg" className="w-full" type="button" onClick={addEducation}>+ Add Education</Button>
          </div>
          <div className="p-6 flex flex-col gap-y-5 md:border border-gray-200 rounded-md md:shadow-md">
            <h1 className="text-[#444444] font-semibold text-[1.4rem]">
              Projects
            </h1>
            {formik.values.projects?.map((project, index) => (
                <div className="flex flex-col gap-y-5" key={index}>
                <h1 className="text-[#444444] font-semibold text-[1rem]">
                Projects {index + 1}
                </h1>
                <div className="flex flex-col gap-y-1">
                    <Label>Project Name </Label>
                    <Input id={`projectName-${index}`} type="text" name={`projects[${index}].projectName`} onChange={formik.handleChange} value={project.institutionName} />
                </div>
                <div className="flex flex-col gap-y-1">
                    <Label>Description</Label>
                    <Input id={`description-${index}`} type="text" name={`projects[${index}].description`} onChange={formik.handleChange} value={project.degree} />
                </div>
                <div className="flex flex-col gap-y-1">
                    <Label>Duration </Label>
                    <Input id={`duration-${index}`} type="text" name={`projects[${index}].duration`} onChange={formik.handleChange} value={project.major} />
                </div>
                <div className="flex flex-col gap-y-1">
                    <Label>Technology</Label>
                    <Input id={`technologies-${index}`} type="text" name={`projects[${index}].technologies`} onChange={formik.handleChange} value={project.yearOfGraduation} />
                </div>
                <div className="flex flex-col gap-y-1">
                    <Label>Roles and Responsibilities</Label>
                    <Input id={`rolesAndResponsibilities-${index}`} type="text" name={`projects[${index}].rolesAndResponsibilities`} onChange={formik.handleChange} value={project.yearOfGraduation} />
                </div>
                <div className="flex flex-col gap-y-1">
                    <Label>Github Code Link</Label>
                    <Input id={`githubRepoLink-${index}`} type="text" name={`projects[${index}].githubRepoLink`} onChange={formik.handleChange} value={project.githubRepoLink} />
                </div>
            </div>
            ))}
            <Button variant="default" size="lg" className="w-full" type="button" onClick={addProject}>+ Add Project</Button>
          </div>
          <div className="p-6 flex flex-col gap-y-5 md:border border-gray-200 rounded-md md:shadow-md">
            <h1 className="text-[#444444] font-semibold text-[1.4rem]">Skills</h1>
            <div className="p-2 flex flex-col gap-y-5 border-b border-gray-200 pb-4">
              <h2 className="text-[#444444] font-semibold text-[1.2rem]">Backend Languages</h2>
              {formik.values.skills?.backendLanguages.map((skill, index) => (
                <div key={index} className="flex flex-col md:flex-row w-full items-start md:items-center md:justify-between">
                  <div className="space-y-2 md:p-2 py-2">
                  <Input
                    type="text"
                    name={`skills.backendLanguages[${index}].name`}
                    placeholder="Skill Name"
                    onChange={formik.handleChange}
                    value={skill.name}
                  />
                  </div>
                  <div className="flex flex-row md:gap-x-6 gap-x-3 items-center justify-around">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex items-center gap-x-1">
                        <input
                          type="radio"
                          name={`skills.backendLanguages[${index}].proficiency`}
                          value={value}
                          onChange={formik.handleChange}
                          checked={skill.proficiency === String(value)}
                          className="h-5 w-5 hover:cursor-pointer"
                          required
                        />
                      <label >{value}</label>
                      </div>
                        
                    ))}
                  </div>
                </div>
              ))}
              <Button variant="default" size="sm" type='button' className="w-[100px] ml-2" onClick={addBackendSkill}>
                + Add 
              </Button>
            </div>
            <div className="p-2 flex flex-col gap-y-5  border-b border-gray-200 pb-4">
              <h2 className="text-[#444444] font-semibold text-[1.2rem]">Frontend Languages</h2>
              {formik.values.skills?.frontendLanguages?.map((skill, index) => (
                <div key={index} className="flex flex-col md:flex-row w-full items-start md:items-center md:justify-between">
                  <div className="space-y-2 md:p-2 py-2">
                  <Input
                    type="text"
                    name={`skills.frontendLanguages[${index}].name`}
                    placeholder="Skill Name"
                    onChange={formik.handleChange}
                    value={skill.name}
                  />
                  </div>
                  <div className="flex flex-row md:gap-x-6 gap-x-3 items-center justify-around">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex items-center gap-x-1">
                        <input
                          type="radio"
                          name={`skills.frontendLanguages[${index}].proficiency`}
                          value={value}
                          onChange={formik.handleChange}
                          checked={skill.proficiency === String(value)}
                          className="h-5 w-5 hover:cursor-pointer"
                          required
                        />
                      <label >{value}</label>
                      </div>
                        
                    ))}
                  </div>
                </div>
              ))}
              <Button variant="default" size="sm" type='button' className="w-[100px] ml-2" onClick={addFrontendSkills}>
                + Add 
              </Button>
            </div>
            <div className="p-2 flex flex-col gap-y-5 border-b border-gray-200 pb-4">
              <h2 className="text-[#444444] font-semibold text-[1.2rem]">Databases</h2>
              {formik.values.skills?.databases?.map((skill, index) => (
                <div key={index} className="flex flex-col md:flex-row w-full items-start md:items-center md:justify-between">
                  <div className="space-y-2 md:p-2 py-2">
                  <Input
                    type="text"
                    name={`skills.databases[${index}].name`}
                    placeholder="Skill Name"
                    onChange={formik.handleChange}
                    value={skill.name}
                  />
                  </div>
                  <div className="flex flex-row md:gap-x-6 gap-x-3 items-center justify-around">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex items-center gap-x-1">
                        <input
                          type="radio"
                          name={`skills.databases[${index}].proficiency`}
                          value={value}
                          onChange={formik.handleChange}
                          checked={skill.proficiency === String(value)}
                          className="h-5 w-5 hover:cursor-pointer"
                          required
                        />
                      <label >{value}</label>
                      </div>
                        
                    ))}
                  </div>
                </div>
              ))}
              <Button variant="default" size="sm" type='button' className="w-[100px] ml-2" onClick={addDatabase}>
                + Add 
              </Button>
            </div>
            <div className="p-2 flex flex-col gap-y-5 border-b border-gray-200 pb-4">
              <h2 className="text-[#444444] font-semibold text-[1.2rem]">Cloud Technologies</h2>
              {formik.values.skills?.cloudTechnologies?.map((skill, index) => (
                <div key={index} className="flex flex-col md:flex-row w-full items-start md:items-center md:justify-between">
                  <div className="space-y-2 md:p-2 py-2">
                  <Input
                    type="text"
                    name={`skills.cloudTechnologies[${index}].name`}
                    placeholder="Skill Name"
                    onChange={formik.handleChange}
                    value={skill.name}
                  />
                  </div>
                  <div className="flex flex-row md:gap-x-6 gap-x-3 items-center justify-around">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex items-center gap-x-1">
                        <input
                          type="radio"
                          name={`skills.cloudTechnologies[${index}].proficiency`}
                          value={value}
                          onChange={formik.handleChange}
                          checked={skill.proficiency === String(value)}
                          className="h-5 w-5 hover:cursor-pointer"
                          required
                        />
                      <label >{value}</label>
                      </div>
                        
                    ))}
                  </div>
                </div>
              ))}
              <Button variant="default" size="sm" type='button' className="w-[100px] ml-2" onClick={addCloudTechnologies}>
                + Add 
              </Button>
            </div>
            <div className="p-2 flex flex-col gap-y-5 border-b border-gray-200 pb-4">
              <h2 className="text-[#444444] font-semibold text-[1.2rem]">Soft Skills</h2>
              {formik.values.skills?.softSkills?.map((skill, index) => (
                <div key={index} className="flex flex-col md:flex-row w-full items-start md:items-center md:justify-between">
                  <div className="space-y-2 md:p-2 py-2">
                  <Input
                    type="text"
                    name={`skills.softSkills[${index}].name`}
                    placeholder="Skill Name"
                    onChange={formik.handleChange}
                    value={skill.name}
                  />
                  </div>
                  <div className="flex flex-row md:gap-x-6 gap-x-3 items-center justify-around">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex items-center gap-x-1">
                        <input
                          type="radio"
                          name={`skills.softSkills[${index}].proficiency`}
                          value={value}
                          onChange={formik.handleChange}
                          checked={skill.proficiency === String(value)}
                          className="h-5 w-5 hover:cursor-pointer"
                          required
                        />
                      <label >{value}</label>
                      </div>
                        
                    ))}
                  </div>
                </div>
              ))}
              <Button variant="default" size="sm" type='button' className="w-[100px] ml-2" onClick={addSoftSkills}>
                + Add 
              </Button>
            </div>
          </div>
          <div className="p-6 flex flex-col gap-y-5 md:border border-gray-200 rounded-md md:shadow-md">
            <h1 className="text-[#444444] font-semibold text-[1.4rem]">
                 Additional Sections
            </h1>
            <div className="flex flex-col gap-y-1">
                <Label>Awards & Recognition</Label>
                <Input id="awardsAndRecognition" type="text" name="awardsAndRecognition" onChange={formik.handleChange} value={formik.values.awardsAndRecognition} />
            </div>
            <div className="flex flex-col gap-y-1">
                <Label>Certifications</Label>
                <Input id="certifications" type="text" name="certifications" onChange={formik.handleChange} value={formik.values.certifications} />
            </div>
            <div className="flex flex-col gap-y-1">
                <Label>Volunteer Work</Label>
                <Input id="volunteerWork" type="text" name="volunteerWork" onChange={formik.handleChange} value={formik.values.volunteerWork} />
            </div>
            <div className="flex flex-col gap-y-1">
                <Label>Foreign Languages Spoken</Label>
                <Input id="foreignLanguagesSpoken" type="text" name="foreignLanguagesSpoken" onChange={formik.handleChange} value={formik.values.foreignLanguagesSpoken} />
            </div>
            <div className="flex flex-col gap-y-1">
                <Label>Publications (articles, research papers)</Label>
                <Input id="publications" type="text" name="publications" onChange={formik.handleChange} value={formik.values.publications} />
            </div>
            <div className="flex flex-col gap-y-1">
                <Label>Years of experience  (eg: 10 years 11 months)</Label>
                <Input id="yearsOfExperience" type="text" name="yearsOfExperience" onChange={formik.handleChange} value={formik.values.yearsOfExperience} />
            </div>
          </div>
          <div className="flex flex-col gap-x-1 md:flex-row gap-y-2 w-full">
              <Button type="submit" className='w-full'>Submit</Button>
          </div>
        </form>
      </div>
      <Toaster className='z-40' />
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 bg-opacity-75">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-[900px] max-h-[95vh] overflow-y-scroll">
          <Resume data={formik.values} />
          <div className="flex flex-col md:items-center md:justify-end gap-x-3 md:flex-row mt-4">
            <Button type="button" className='w-full md:w-auto mb-2 md:mb-0 md:mr-2' onClick={handleGeneratePdf}>Download PDF</Button>
            <Button type="button" className='w-full md:w-auto' onClick={() => setShowModal(false)}>Close</Button>
          </div>
        </div>
      </div>
      
      )}
    </div>
  );
};


export default SurveyForm;
