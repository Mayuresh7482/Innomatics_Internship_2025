const Projects = () => {
  const projects = [
    {
      title: 'BrewHub - Smart Coffee Billing System',
      description: 'A dynamic coffee billing system with advanced invoice printing, multiple coffee options, and customizable add-ons for an enhanced user experience.',
      technologies: ['ASP.NET', 'SQL', 'JavaScript', 'HTML', 'CSS'],
      link: 'https://github.com/Mayuresh7482/BrewHub',
    },
    {
      title: 'Hunger Help Platform',
      description: 'A donation management system connecting food donors with NGOs.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      link: 'https://github.com/Mayuresh7482/Hunger-Help',
    },
    {
      title: 'Food Ordering System',
      description: 'An interactive food ordering system with cart functionality.',
      technologies: ['React', 'JavaScript', 'CSS'],
      link: 'https://github.com/Mayuresh7482/Food-Ordering',
    },
    {
      title: 'CRUD Operations in ASP.NET Web Forms',
      description: 'Implemented CRUD operations using SQL database in an ASP.NET Web Forms application.',
      technologies: ['ASP.NET', 'SQL', 'C#'],
      link: 'https://github.com/Mayuresh7482/CRUD-ASP.NET',
    },
    {
      title: 'Portfolio Website',
      description: 'A personal portfolio website showcasing my skills, projects, and achievements.',
      technologies: ['React', 'JavaScript', 'CSS'],
      link: 'https://github.com/Mayuresh7482/Portfolio',
    },
  ];

  return (
    <section id="projects" className="projects-section">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="technologies">
              {project.technologies.map((tech, i) => (
                <span key={i}>{tech}</span>
              ))}
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
