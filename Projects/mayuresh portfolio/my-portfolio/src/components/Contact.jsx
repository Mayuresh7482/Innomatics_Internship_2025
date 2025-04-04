import axios from "axios";
import { FaLinkedin, FaGithub, FaFileDownload } from "react-icons/fa";

const Contact = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      await axios.post("http://localhost:5000/api/contact", data);
      alert("Message sent successfully!");
      e.target.reset(); // Clear form after submission
    } catch (error) {
      alert("Failed to send message.");
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>

      <div className="social-links">
        <a
          href="https://linkedin.com/in/mayuresh-borate-8a732b1b3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin /> LinkedIn
        </a>
        <a
          href="https://github.com/Mayuresh7482"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub /> GitHub
        </a>
        <a href="/Mayuresh_Borate_Resume.pdf" download>
          <FaFileDownload /> Download Resume
        </a>
      </div>
    </section>
  );
};

export default Contact;
