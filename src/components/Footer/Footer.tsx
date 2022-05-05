import './Footer.scss';

function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="narrow-container">
        <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
          <img src="./assets/svg/rs_school_js.svg" alt="rs school" className="course-logo" />
        </a>
        <br />© 2022
      </div>
    </footer>
  );
}

export default Footer;
