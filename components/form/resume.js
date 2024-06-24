// Resume.js
import React from 'react';
import './resume.css';  // Import the CSS file

const Resume = ({ data }) => {
    return (
        <div id="resume">
            <h1>{data.fullName}</h1>
            <p className="info"><span className="label">Email:</span> {data.email}</p>
            <p className="info"><span className="label">Phone:</span> {data.phoneNumber}</p>
            <p className="info"><span className="label">LinkedIn:</span> {data.linkedInProfileUrl}</p>
            <p className="info"><span className="label">Summary:</span> {data.summary}</p>
            
            <div className="section">
                <h2 className="section-title">Work Experience</h2>
                {data.workExperience.map((exp, index) => (
                    <div key={index} className="sub-section">
                        <h3>{exp.jobTitle} at {exp.companyName}</h3>
                        <p><span className="label">Location:</span> {exp.location}</p>
                        <p><span className="label">Duration:</span> {exp.startedDate} - {exp.endDate}</p>
                        <p><span className="label">Key Achievements:</span> {exp.keyAchievements}</p>
                        <hr />
                    </div>
                ))}
            </div>

            <div className="section">
                <h2 className="section-title">Education</h2>
                {data.education.map((edu, index) => (
                    <div key={index} className="sub-section">
                        <h3>{edu.degree} in {edu.major}</h3>
                        <p><span className="label">Institution:</span> {edu.institutionName}</p>
                        <p><span className="label">Year of Graduation:</span> {edu.yearOfGraduation}</p>
                        <hr />
                    </div>
                ))}
            </div>

            <div className="section">
                <h2 className="section-title">Projects</h2>
                {data.projects.map((project, index) => (
                    <div key={index} className="sub-section">
                        <h3>{project.projectName}</h3>
                        <p><span className="label">description:</span> {project.description}</p>
                        <p><span className="label">Duration:</span> {project.duration}</p>
                        <p><span className="label">technologies:</span> {project.technologies}</p>
                        <p><span className="label">rolesAndResponsibilities:</span> {project.rolesAndResponsibilities}</p>
                        <p><span className="label">githubRepoLink:</span> {project.githubRepoLink}</p>
                        <hr />
                    </div>
                ))}
            </div>

            <div className="section">
                <h2 className="section-title">Skills</h2>
                <div className="sub-section">
                    <h3>Backend Languages</h3>
                    {data.skills.backendLanguages.map((skill, index) => (
                        <p key={index}><span className="label">{skill.name}:</span> {skill.proficiency} </p>
                    ))}
                </div>
                <hr />
                <div className="sub-section">
                    <h3>Frontend Languages</h3>
                    {data.skills.frontendLanguages.map((skill, index) => (
                        <p key={index}><span className="label">{skill.name}:</span> {skill.proficiency}</p>
                    ))}
                </div>
                <hr />
                <div className="sub-section">
                    <h3>Databases</h3>
                    {data.skills.databases.map((skill, index) => (
                        <p key={index}><span className="label">{skill.name}:</span> {skill.proficiency}</p>
                    ))}
                </div>
                <hr />
                <div className="sub-section">
                    <h3>Cloud Technologies</h3>
                    {data.skills.cloudTechnologies.map((skill, index) => (
                        <p key={index}><span className="label">{skill.name}:</span> {skill.proficiency}</p>
                    ))}
                </div>
                <hr />
                <div className="sub-section">
                    <h3>Soft Skills</h3>
                    {data.skills.softSkills.map((skill, index) => (
                        <p key={index}><span className="label">{skill.name}:</span> {skill.proficiency}</p>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2 className="section-title">Additional Information</h2>
                <p><span className="label">Awards:</span> {data.awardsAndRecognition}</p>
                <p><span className="label">Certifications:</span> {data.certifications}</p>
                <p><span className="label">Volunteer Work:</span> {data.volunteerWork}</p>
                <p><span className="label">Languages Spoken:</span> {data.foreignLanguagesSpoken}</p>
                <p><span className="label">Publications:</span> {data.publications}</p>
            </div>
        </div>
    );
};

export default Resume;
