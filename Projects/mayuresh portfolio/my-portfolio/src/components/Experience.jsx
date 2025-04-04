const Experience = () => {
   const experiences = [
     {
       role: 'MERN Stack Developer Intern',
       company: 'Innomatics Research Labs',
       duration: 'Jan 2025 – Present',
       achievements: [
         'Developed 3+ full-stack web applications using MERN Stack.',
         'Built and optimized 10+ RESTful APIs, reducing response time by 20%.',
         'Implemented JWT-based authentication for secure user logins.',
       ],
     },
     {
       role: 'Quality Engineer',
       company: 'Mechanical, Pune',
       duration: 'Oct 2021 – Oct 2022',
       achievements: [
         'Conducted quality inspections and improved product consistency.',
         'Collaborated with cross-functional teams to resolve quality issues.',
       ],
     },
   ];
 
   return (
     <section id="experience" className="experience-section">
       <h2>Experience</h2>
       <div className="experience-list">
         {experiences.map((exp, index) => (
           <div key={index} className="experience-card">
             <h3>{exp.role} - {exp.company}</h3>
             <p>{exp.duration}</p>
             <ul>
               {exp.achievements.map((achievement, i) => (
                 <li key={i}>{achievement}</li>
               ))}
             </ul>
           </div>
         ))}
       </div>
     </section>
   );
 };
 
 export default Experience;