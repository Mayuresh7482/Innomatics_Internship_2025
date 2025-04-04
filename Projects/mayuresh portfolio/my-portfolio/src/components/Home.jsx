import { motion } from 'framer-motion';
import profileImage from '../assets/images/profile.jpg'; // Import the image

const Home = () => {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="home-section"
    >
      <div className="intro">
        <h1>Hi, I'm Mayuresh Borate</h1>
        <p>Full-Stack Developer | Problem Solver | Tech Enthusiast</p>
        <button onClick={() => window.location.href = '#projects'}>View My Work</button>
      </div>
      <img src={profileImage} alt="Mayuresh Borate" className="profile-photo" />
    </motion.section>
  );
};

export default Home;