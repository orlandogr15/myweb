import { useEffect } from 'react';

export default function Portfolio() {
  useEffect(() => {
    // Load the portfolio stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/css/style.css';
    document.head.appendChild(link);

    // Load the portfolio script
    const script = document.createElement('script');
    script.src = '/assets/js/script.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount if needed
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div id="portfolio-container">
      <main>
        {/* Sidebar */}
        <aside className="sidebar" data-sidebar>
          <div className="sidebar-info">
            <figure className="avatar-box">
              <img src="/assets/images/my-avatar.png" alt="Orlando Gutiérrez Rojo" width="80" />
            </figure>

            <div className="info-content">
              <h1 className="name" title="Orlando Gutiérrez Rojo">Orlando<br />Gutiérrez Rojo</h1>
              <p className="title">Data Analyst</p>
            </div>

            <button className="info_more-btn" data-sidebar-btn>
              <span>Show Contacts</span>
              <ion-icon name="chevron-down"></ion-icon>
            </button>
          </div>

          <div className="sidebar-info_more">
            <div className="separator"></div>

            <ul className="contacts-list">
              <li className="contact-item">
                <div className="icon-box">
                  <ion-icon name="mail-outline"></ion-icon>
                </div>
                <div className="contact-info">
                  <p className="contact-title">Email</p>
                  <a href="mailto:richard@example.com" className="contact-link">richard@example.com</a>
                </div>
              </li>

              <li className="contact-item">
                <div className="icon-box">
                  <ion-icon name="phone-portrait-outline"></ion-icon>
                </div>
                <div className="contact-info">
                  <p className="contact-title">Phone</p>
                  <a href="tel:+12133522795" className="contact-link">+1 (213) 352-2795</a>
                </div>
              </li>

              <li className="contact-item">
                <div className="icon-box">
                  <ion-icon name="calendar-outline"></ion-icon>
                </div>
                <div className="contact-info">
                  <p className="contact-title">Birthday</p>
                  <time dateTime="1982-06-23">June 23, 1982</time>
                </div>
              </li>

              <li className="contact-item">
                <div className="icon-box">
                  <ion-icon name="location-outline"></ion-icon>
                </div>
                <div className="contact-info">
                  <p className="contact-title">Location</p>
                  <address>Sacramento, California, USA</address>
                </div>
              </li>
            </ul>

            <div className="separator"></div>

            <ul className="social-list">
              <li className="social-item">
                <a href="#" className="social-link">
                  <ion-icon name="logo-facebook"></ion-icon>
                </a>
              </li>
              <li className="social-item">
                <a href="#" className="social-link">
                  <ion-icon name="logo-twitter"></ion-icon>
                </a>
              </li>
              <li className="social-item">
                <a href="#" className="social-link">
                  <ion-icon name="logo-instagram"></ion-icon>
                </a>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="main-content">
          <nav className="navbar">
            <ul className="navbar-list">
              <li className="navbar-item">
                <button className="navbar-link active" data-nav-link>About</button>
              </li>
              <li className="navbar-item">
                <button className="navbar-link" data-nav-link>Resume</button>
              </li>
              <li className="navbar-item">
                <button className="navbar-link" data-nav-link>Portfolio</button>
              </li>
              <li className="navbar-item">
                <button className="navbar-link" data-nav-link>Blog</button>
              </li>
              <li className="navbar-item">
                <button className="navbar-link" data-nav-link>Contact</button>
              </li>
            </ul>
          </nav>

          {/* About Page */}
          <article className="about active" data-page="about">
            <header>
              <h2 className="h2 article-title">About me</h2>
            </header>

            <section className="about-text">
              <p>
                I'm Creative Director and UI/UX Designer from Sydney, Australia, working in web development and print media.
                I enjoy turning complex problems into simple, beautiful and intuitive designs.
              </p>
              <p>
                My job is to build your website so that it is functional and user-friendly but at the same time attractive.
                Moreover, I add personal touch to your product and make sure that is eye-catching and easy to use. My aim is to bring
                across your message and identity in the most creative way. I created web design for many famous brand companies.
              </p>
            </section>

            {/* Services Section */}
            <section className="service">
              <h3 className="h3 service-title">What i'm doing</h3>
              <ul className="service-list">
                <li className="service-item">
                  <div className="service-icon-box">
                    <img src="/assets/images/icon-design.svg" alt="design icon" width="40" />
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">Web design</h4>
                    <p className="service-item-text">
                      The most modern and high-quality design made at a professional level.
                    </p>
                  </div>
                </li>

                <li className="service-item">
                  <div className="service-icon-box">
                    <img src="/assets/images/icon-dev.svg" alt="Web development icon" width="40" />
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">Web development</h4>
                    <p className="service-item-text">
                      High-quality development of sites at the professional level.
                    </p>
                  </div>
                </li>

                <li className="service-item">
                  <div className="service-icon-box">
                    <img src="/assets/images/icon-app.svg" alt="mobile app icon" width="40" />
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">Mobile apps</h4>
                    <p className="service-item-text">
                      Professional development of applications for iOS and Android.
                    </p>
                  </div>
                </li>

                <li className="service-item">
                  <div className="service-icon-box">
                    <img src="/assets/images/icon-photo.svg" alt="camera icon" width="40" />
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">Photography</h4>
                    <p className="service-item-text">
                      I make high-quality photos of any category at a professional level.
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
              <h3 className="h3 testimonials-title">Testimonials</h3>
              <ul className="testimonials-list has-scrollbar">
                <li className="testimonials-item">
                  <div className="content-card" data-testimonials-item>
                    <figure className="testimonials-avatar-box">
                      <img src="/assets/images/avatar-1.png" alt="Daniel lewis" width="60" data-testimonials-avatar />
                    </figure>
                    <h4 className="h4 testimonials-item-title" data-testimonials-title>Daniel lewis</h4>
                    <div className="testimonials-text" data-testimonials-text>
                      <p>
                        Richard was hired to create a corporate identity. We were very pleased with the work done. She has a
                        lot of experience and is very concerned about the needs of client. Lorem ipsum dolor sit amet, ullamcous cididt
                        consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </section>

            {/* Modal Container */}
            <div className="modal-container" data-modal-container>
              <div className="overlay" data-overlay></div>
              <section className="testimonials-modal">
                <button className="modal-close-btn" data-modal-close-btn>
                  <ion-icon name="close-outline"></ion-icon>
                </button>
                <div className="modal-img-wrapper">
                  <figure className="modal-avatar-box">
                    <img src="/assets/images/avatar-1.png" alt="Daniel lewis" width="80" data-modal-img />
                  </figure>
                  <img src="/assets/images/icon-quote.svg" alt="quote icon" />
                </div>
                <div className="modal-content">
                  <h4 className="h3 modal-title" data-modal-title>Daniel lewis</h4>
                  <time dateTime="2021-06-14">14 June, 2021</time>
                  <div data-modal-text>
                    <p>
                      Richard was hired to create a corporate identity. We were very pleased with the work done.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Clients */}
            <section className="clients">
              <h3 className="h3 clients-title">Clients</h3>
              <ul className="clients-list has-scrollbar">
                <li className="clients-item">
                  <a href="#">
                    <img src="/assets/images/logo-1-color.png" alt="client logo" />
                  </a>
                </li>
              </ul>
            </section>
          </article>

          {/* Resume Page */}
          <article className="resume" data-page="resume">
            <header>
              <h2 className="h2 article-title">Resume</h2>
            </header>
            <p>Resume content here...</p>
          </article>

          {/* Portfolio Page */}
          <article className="portfolio" data-page="portfolio">
            <header>
              <h2 className="h2 article-title">Portfolio</h2>
            </header>
            <p>Portfolio content here...</p>
          </article>

          {/* Blog Page */}
          <article className="blog" data-page="blog">
            <header>
              <h2 className="h2 article-title">Blog</h2>
            </header>
            <p>Blog content here...</p>
          </article>

          {/* Contact Page */}
          <article className="contact" data-page="contact">
            <header>
              <h2 className="h2 article-title">Contact</h2>
            </header>
            <p>Contact content here...</p>
          </article>
        </div>
      </main>

      {/* ionicon script */}
      <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
      <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    </div>
  );
}
