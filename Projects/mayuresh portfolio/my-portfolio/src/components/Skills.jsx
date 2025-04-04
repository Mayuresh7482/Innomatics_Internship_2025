import { FaReact, FaNodeJs, FaDatabase, FaGithub, FaAws } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiExpress, SiRedux, SiHtml5, SiCss3, SiTailwindcss, SiPython, SiDocker, SiJenkins } from 'react-icons/si';

const Skills = () => {
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: 'React', icon: <FaReact />, level: 90 },
        { name: 'JavaScript', icon: <SiJavascript />, level: 95 },
        { name: 'TypeScript', icon: <SiTypescript />, level: 85 },
        { name: 'Redux', icon: <SiRedux />, level: 80 },
        { name: 'HTML5', icon: <SiHtml5 />, level: 95 },
        { name: 'CSS3', icon: <SiCss3 />, level: 90 },
        { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 85 },
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: 'Node.js', icon: <FaNodeJs />, level: 85 },
        { name: 'Express', icon: <SiExpress />, level: 80 },
        { name: 'Python', icon: <SiPython />, level: 75 },
      ]
    },
    {
      category: "Database",
      skills: [
        { name: 'MongoDB', icon: <FaDatabase />, level: 80 },
        { name: 'SQL', icon: <FaDatabase />, level: 75 },
      ]
    },
    {
      category: "DevOps & Tools",
      skills: [
        { name: 'Git/GitHub', icon: <FaGithub />, level: 90 },
        { name: 'AWS', icon: <FaAws />, level: 70 },
        { name: 'Docker', icon: <SiDocker />, level: 65 },
        { name: 'CI/CD', icon: <SiJenkins />, level: 60 },
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Technical Skills</h2>
        
        {skillCategories.map((category, catIndex) => (
          <div key={catIndex} className="mb-10">
            <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.skills.map((skill, index) => (
                <div key={index} className="skill-card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-3">
                    <div className="skill-icon text-2xl mr-3 text-blue-600">{skill.icon}</div>
                    <h4 className="font-medium">{skill.name}</h4>
                  </div>
                  <div className="progress-bar bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-gray-600 mt-1">
                    {skill.level}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;