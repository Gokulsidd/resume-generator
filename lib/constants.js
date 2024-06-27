export const backend_base_url = 'https://resume-generator-backend-hwmi.onrender.com';

export const initialValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    linkedInProfileUrl:"",
    summary: "",
    yearsOfExperience: "",
    workExperience:[
      {
        companyName: "",
        location: "",
        startedDate: "",
        endDate: "",
        jobTitle: "",
        keyAchievements: "",
      },
    ],
    education: [
      {
        institutionName: "",
        degree: "",
        major: "",
        yearOfGraduation: "",
      },
    ],
    projects:[
      {
        projectName: "",
        description: "",
        duration: "",
        technologies: "",
        rolesAndResponsibilities: "",
        githubRepoLink: "",
      },
    ],
    skills: {
      backendLanguages: [{ name: "", proficiency: "" }],
      frontendLanguages: [{ name: "", proficiency: "" }],
      databases: [{ name: "", proficiency: "" }],
      cloudTechnologies: [{ name: "", proficiency: "" }],
      softSkills: [{ name: "", proficiency: "" }],
    },
    awardsAndRecognition:"",
    certifications: "",
    volunteerWork: "",
    foreignLanguagesSpoken: "",
    publications: "",
  };