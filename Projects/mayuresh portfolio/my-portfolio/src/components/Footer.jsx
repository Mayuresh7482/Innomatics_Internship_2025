const Footer = () => {
   return (
     <footer className="footer">
       <div className="footer-content">
         <p>&copy; {new Date().getFullYear()} Mayuresh Borate. All Rights Reserved.</p>
         <div className="footer-links">
           <a href="mailto:mayuresh.borate@example.com">Email</a>
           <a href="https://linkedin.com/in/mayuresh-borate-8a732b1b3" target="_blank" rel="noopener noreferrer">LinkedIn</a>
           <a href="https://github.com/Mayuresh7482" target="_blank" rel="noopener noreferrer">GitHub</a>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;