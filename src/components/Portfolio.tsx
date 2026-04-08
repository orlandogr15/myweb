import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Portfolio() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [formStatus, setFormStatus] = useState('');

  useEffect(() => {
    // Initialize EmailJS
    emailjs.init('iFOXmcm2_xhIZAw4K');

    // Load ionicons library
    if (!window.customElements.get('ion-icon')) {
      const ioniconsScript = document.createElement('script');
      ioniconsScript.type = 'module';
      ioniconsScript.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
      document.head.appendChild(ioniconsScript);

      const ioniconsNoModule = document.createElement('script');
      ioniconsNoModule.noModule = true;
      ioniconsNoModule.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
      document.head.appendChild(ioniconsNoModule);
    }

    // Load the portfolio stylesheet
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './assets/css/style.css';
    document.head.appendChild(link);

    // Load the portfolio script with a slight delay to ensure DOM is ready
    const scriptTimer = setTimeout(() => {
      const script = document.createElement('script');
      script.src = './assets/js/script.js';
      script.async = true;
      document.body.appendChild(script);
      
      // Fix the buggy navigation in script.js by implementing a corrected version
      const fixNavigation = () => {
        const navigationLinks = document.querySelectorAll("[data-nav-link]");
        const pages = document.querySelectorAll("[data-page]");

        // Add event to all nav links
        for (let i = 0; i < navigationLinks.length; i++) {
          navigationLinks[i].addEventListener("click", function (this: HTMLElement) {
            const clickedText = this.innerHTML.toLowerCase().trim();
            
            // Loop through all pages and nav links
            for (let j = 0; j < pages.length; j++) {
              const page = pages[j] as HTMLElement;
              if (clickedText === page.dataset.page) {
                page.classList.add("active");
                (navigationLinks[j] as HTMLElement).classList.add("active");
                window.scrollTo(0, 0);
              } else {
                page.classList.remove("active");
                (navigationLinks[j] as HTMLElement).classList.remove("active");
              }
            }
          });
        }
      };

      // Run the fix after a small delay to ensure script.js content is loaded
      setTimeout(fixNavigation, 200);

      // Setup portfolio filtering
      setupPortfolioFiltering();
    }, 100);

    return () => {
      clearTimeout(scriptTimer);
      // Cleanup on unmount if needed
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };
  }, []);

  const setupPortfolioFiltering = () => {
    const filterButtons = document.querySelectorAll("[data-filter-btn]");
    const selectItems = document.querySelectorAll("[data-select-item]");
    const selectButton = document.querySelector("[data-select]");
    const selectValue = document.querySelector("[data-selecct-value]");
    
    const updateFilter = (filterValue: string) => {
      setSelectedFilter(filterValue);
      
      // Update active button styling for filter buttons
      filterButtons.forEach(btn => {
        if (btn.innerHTML.toLowerCase().trim() === filterValue) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
      
      // Update active styling for select items
      selectItems.forEach(item => {
        if (item.innerHTML.toLowerCase().trim() === filterValue) {
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      });
    };

    filterButtons.forEach(button => {
      button.addEventListener("click", function (this: HTMLElement) {
        const filterValue = this.innerHTML.toLowerCase().trim();
        updateFilter(filterValue);
      });
    });

    // Toggle dropdown visibility on select button click
    if (selectButton) {
      selectButton.addEventListener("click", function (this: HTMLElement) {
        this.classList.toggle("active");
      });
    }

    selectItems.forEach(item => {
      item.addEventListener("click", function (this: HTMLElement) {
        const filterValue = this.innerHTML.toLowerCase().trim();
        const itemText = this.innerHTML;
        
        // Update the displayed value in the select button
        if (selectValue) {
          selectValue.innerHTML = itemText;
        }
        
        // Close the dropdown
        if (selectButton) {
          selectButton.classList.remove("active");
        }
        
        // Update the filter
        updateFilter(filterValue);
      });
    });
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('Sending...');

    const form = e.currentTarget;
    const fullname = (form.elements.namedItem('fullname') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    try {
      await emailjs.send('service_gtzg6x4', 'template_djaflop', {
        from_name: fullname,
        user_email: email,
        message: message,
        to_email: 'ogutierrezrojo@gmail.com',
      });

      setFormStatus('✓ Message sent successfully!');
      form.reset();
      setTimeout(() => setFormStatus(''), 3000);
    } catch (error) {
      console.error('Email error:', error);
      setFormStatus('✗ Failed to send message. Please try again.');
      setTimeout(() => setFormStatus(''), 3000);
    }
  };

  return (
    <div id="portfolio-container">
      <main>
        {/* Sidebar */}
        <aside className="sidebar" data-sidebar>
          <div className="sidebar-info">
            <figure className="avatar-box">
              <img src="./assets/images/profile2.png" alt="Orlando Gutiérrez Rojo" width="80" />
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
                  <a href="mailto:ogutierrezrojo@gmail.com" className="contact-link">ogutierrezrojo@gmail.com</a>
                </div>
              </li>
              {/*
              <li className="contact-item">
                <div className="icon-box">
                  <ion-icon name="phone-portrait-outline"></ion-icon>
                </div>
                <div className="contact-info">
                  <p className="contact-title">Phone</p>
                  <a href="tel:+526672720363" className="contact-link">+52 (667) 272-0363</a>
                </div>
              </li>
              
              <li className="contact-item">
                <div className="icon-box">
                  <ion-icon name="calendar-outline"></ion-icon>
                </div>
                <div className="contact-info">
                  <p className="contact-title">Birthday</p>
                  <time dateTime="1982-06-23">March 3, 1995</time>
                </div>
              </li>
              */}

              <li className="contact-item">
                <div className="icon-box">
                  <ion-icon name="location-outline"></ion-icon>
                </div>
                <div className="contact-info">
                  <p className="contact-title">Location</p>
                  <address>Culiacán, México</address>
                </div>
              </li>
            </ul>

            <div className="separator"></div>

            <ul className="social-list">
              <li className="social-item">
                <a href="https://www.linkedin.com/in/orlando-gutierrez-rojo/" className="social-link">
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </li>
              <li className="social-item">
                <a href="https://github.com/orlandogr15" className="social-link">
                  <ion-icon name="logo-github"></ion-icon>
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
                I have versatile experience due to the need to translate data required in structured data workflows
                 in both academic and professional settings, as well as in communicating information to colleagues and 
                 clients through digital channels, or to the scientific community through research articles.
              </p>
              <p>
                As a Data Analyst at INAOE, I was able to leverage the data management skills I acquired during my 
                undergraduate thesis project, where I developed pipelines in Python to evaluate predictive models 
                against real scientific data.
              </p>
              <p>
                As a Customer Success Manager, I was involved in the collection, validation, and analysis of data in HR systems such as payroll,
                 time tracking, and employee records. Furthermore, I developed a strong analytical mindset by diagnosing 
                 data inconsistencies, validating system results, and testing the functionality of Software-as-a-Service (SaaS) platforms.
              </p>
              <p>
                I am currently strengthening my SQL skills, deepening my knowledge of Machine Learning, and expanding my
                 object-oriented programming skills to deliver scalable, data-driven solutions and pursue a career as a data scientist.
              </p>
            </section>

            {/* Services Section */}
            <section className="service">
              <h3 className="h3 service-title">What I do</h3>
              <ul className="service-list">
                <li className="service-item">
                  <div className="service-icon-box">
                    <img src="./assets/images/asset-graph.svg" alt="design icon" width="40" />
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">Data Analysis</h4>
                    <p className="service-item-text">
                      Transforming complex data into actionable insights through statistical analysis, visualization, and scalable data workflows.
                    </p>
                  </div>
                </li>

                <li className="service-item">
                  <div className="service-icon-box">
                    <img src="./assets/images/asset-people.svg" alt="Web development icon" width="30" />
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">Customer Success</h4>
                    <p className="service-item-text">
                      Driving client satisfaction and retention by aligning customer goals with data-driven strategies and proactive relationship management.
                    </p>
                  </div>
                </li>

                <li className="service-item">
                  <div className="service-icon-box">
                    <img src="./assets/images/asset-pad.svg" alt="mobile app icon" width="25" />
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">Research & Problem Solving</h4>
                    <p className="service-item-text">
                      Methodological rigor and critical thinking to address complex challenges and drive innovative solutions.
                    </p>
                  </div>
                </li>

                <li className="service-item">
                  <div className="service-icon-box">
                    <img src="./assets/images/asset-presentation.svg" alt="camera icon" width="40" />
                  </div>
                  <div className="service-content-box">
                    <h4 className="h4 service-item-title">Communication</h4>
                    <p className="service-item-text">
                      I love translating technical insights into actionable outcomes, documentation, and client-facing support.
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            {/* Testimonials Section 
            <section className="testimonials">
              <h3 className="h3 testimonials-title">Testimonials</h3>
              <ul className="testimonials-list has-scrollbar">
                <li className="testimonials-item">
                  <div className="content-card" data-testimonials-item>
                    <figure className="testimonials-avatar-box">
                      <img src="./assets/images/avatar-1.png" alt="Daniel lewis" width="60" data-testimonials-avatar />
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

                <li className="testimonials-item">
                  <div className="content-card" data-testimonials-item>
                    <figure className="testimonials-avatar-box">
                      <img src="./assets/images/avatar-2.png" alt="Jessica miller" width="60" data-testimonials-avatar />
                    </figure>
                    <h4 className="h4 testimonials-item-title" data-testimonials-title>Jessica miller</h4>
                    <div className="testimonials-text" data-testimonials-text>
                      <p>
                        Richard was hired to create a corporate identity. We were very pleased with the work done. She has a
                        lot of experience and is very concerned about the needs of client. Lorem ipsum dolor sit amet, ullamcous cididt
                        consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.
                      </p>
                    </div>
                  </div>
                </li>

                <li className="testimonials-item">
                  <div className="content-card" data-testimonials-item>
                    <figure className="testimonials-avatar-box">
                      <img src="./assets/images/avatar-3.png" alt="Emily evans" width="60" data-testimonials-avatar />
                    </figure>
                    <h4 className="h4 testimonials-item-title" data-testimonials-title>Emily evans</h4>
                    <div className="testimonials-text" data-testimonials-text>
                      <p>
                        Richard was hired to create a corporate identity. We were very pleased with the work done. She has a
                        lot of experience and is very concerned about the needs of client. Lorem ipsum dolor sit amet, ullamcous cididt
                        consectetur adipiscing elit, seds do et eiusmod tempor incididunt ut laborels dolore magnarels alia.
                      </p>
                    </div>
                  </div>
                </li>

                <li className="testimonials-item">
                  <div className="content-card" data-testimonials-item>
                    <figure className="testimonials-avatar-box">
                      <img src="./assets/images/avatar-4.png" alt="Henry william" width="60" data-testimonials-avatar />
                    </figure>
                    <h4 className="h4 testimonials-item-title" data-testimonials-title>Henry william</h4>
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
            */}            
            
            {/* Modal Container 
            <div className="modal-container" data-modal-container>
              <div className="overlay" data-overlay></div>
              <section className="testimonials-modal">
                <button className="modal-close-btn" data-modal-close-btn>
                  <ion-icon name="close-outline"></ion-icon>
                </button>
                <div className="modal-img-wrapper">
                  <figure className="modal-avatar-box">
                    <img src="./assets/images/avatar-1.png" alt="Daniel lewis" width="80" data-modal-img />
                  </figure>
                  <img src="./assets/images/icon-quote.svg" alt="quote icon" />
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
            */}
            
            {/* Clients 
            <section className="clients">
              <h3 className="h3 clients-title">Clients</h3>
              <ul className="clients-list has-scrollbar">
                <li className="clients-item">
                  <a href="#">
                    <img src="./assets/images/logo-1-color.png" alt="client logo" />
                  </a>
                </li>
                <li className="clients-item">
                  <a href="#">
                    <img src="./assets/images/logo-2-color.png" alt="client logo" />
                  </a>
                </li>
                <li className="clients-item">
                  <a href="#">
                    <img src="./assets/images/logo-3-color.png" alt="client logo" />
                  </a>
                </li>
                <li className="clients-item">
                  <a href="#">
                    <img src="./assets/images/logo-4-color.png" alt="client logo" />
                  </a>
                </li>
                <li className="clients-item">
                  <a href="#">
                    <img src="./assets/images/logo-5-color.png" alt="client logo" />
                  </a>
                </li>
                <li className="clients-item">
                  <a href="#">
                    <img src="./assets/images/logo-6-color.png" alt="client logo" />
                  </a>
                </li>
              </ul>
            </section>
            */}
          </article>

          {/* Resume Page */}
          <article className="resume" data-page="resume">
            <header>
              <h2 className="h2 article-title">Resume</h2>
            </header>

            <section className="timeline">
              <div className="title-wrapper">
                <div className="icon-box">
                  <ion-icon name="book-outline"></ion-icon>
                </div>
                <h3 className="h3">Education</h3>
              </div>

              <ol className="timeline-list">
                <li className="timeline-item">
                  <h4 className="h4 timeline-item-title">Universidad Autónoma de Sinaloa</h4>
                  <span>2013 — 2019</span>
                  <p className="timeline-text">
                    Bachelor's degree in Astronomy.
                  </p>
                </li>
              </ol>
            </section>

            <section className="timeline">
              <div className="title-wrapper">
                <div className="icon-box">
                  <ion-icon name="briefcase-outline"></ion-icon>
                </div>
                <h3 className="h3">Experience</h3>
              </div>

              <ol className="timeline-list">
                <li className="timeline-item">
                  <h4 className="h4 timeline-item-title">Data Analyst</h4>
                  <h5 className="h5 timeline-item-title">Instituto Nacional de Astrofísica, Óptica y Electrónica</h5>
                  <span>2023 — 2025</span>
                  <p className="timeline-text">
                    Data Analyst, Curator, Technician, and Collaborator on various scientific research projects.                  
                  </p>
                </li>

                <li className="timeline-item">
                  <h4 className="h4 timeline-item-title">Customer Success Manager</h4>
                  <h5 className="h5 timeline-item-title">Izytech</h5>
                  <span>2022 — 2023</span>
                  <p className="timeline-text">
                    Customer Success Manager (CSM) for Software-as-a-Service (SaaS) platforms focused on Human Resources operations such as time and shift management processing, payroll and electronic signatures.
                  </p>
                </li>

                <li className="timeline-item">
                  <h4 className="h4 timeline-item-title">Call Center Sales Executive</h4>
                  <h5 className="h5 timeline-item-title">Coppel</h5>                  
                  <span>2018 — 2019</span>
                  <p className="timeline-text">
                    Assistance to online shoppers and customer service via telephone.
                  </p>
                </li>
              </ol>
            </section>

            <section className="skill">
              <h3 className="h3 skills-title">My skills</h3>

              <ul className="skills-list content-card">
                <li className="skills-item">
                  <div className="title-wrapper">
                    <h5 className="h5">Data Analysis</h5>
                    <data value="50">50%</data>
                  </div>
                  <div className="skill-progress-bg">
                    <div className="skill-progress-fill" style={{width: "50%"}}></div>
                  </div>
                </li>

                <li className="skills-item">
                  <div className="title-wrapper">
                    <h5 className="h5">Data Visualization</h5>
                    <data value="70">70%</data>
                  </div>
                  <div className="skill-progress-bg">
                    <div className="skill-progress-fill" style={{width: "70%"}}></div>
                  </div>
                </li>

                <li className="skills-item">
                  <div className="title-wrapper">
                    <h5 className="h5">Python</h5>
                    <data value="60">60%</data>
                  </div>
                  <div className="skill-progress-bg">
                    <div className="skill-progress-fill" style={{width: "60%"}}></div>
                  </div>
                </li>

                <li className="skills-item">
                  <div className="title-wrapper">
                    <h5 className="h5">Data Processing</h5>
                    <data value="80">80%</data>
                  </div>
                  <div className="skill-progress-bg">
                    <div className="skill-progress-fill" style={{width: "80%"}}></div>
                  </div>
                </li>
              </ul>
            </section>
          </article>

          {/* Portfolio Page */}
          <article className="portfolio" data-page="portfolio">
            <header>
              <h2 className="h2 article-title">Portfolio</h2>
            </header>

            <section className="projects">
              <ul className="filter-list">
                <li className="filter-item">
                  <button className="active" data-filter-btn>All</button>
                </li>
                <li className="filter-item">
                  <button data-filter-btn>Data Analysis</button>
                </li>
                <li className="filter-item">
                  <button data-filter-btn>Programming</button>
                </li>
              </ul>

              <div className="filter-select-box">
                <button className="filter-select" data-select>
                  <div className="select-value" data-selecct-value>Select category</div>
                  <div className="select-icon">
                    <ion-icon name="chevron-down"></ion-icon>
                  </div>
                </button>

                <ul className="select-list">
                  <li className="select-item">
                    <button data-select-item>All</button>
                  </li>
                  <li className="select-item">
                    <button data-select-item>Data Analysis</button>
                  </li>
                  <li className="select-item">
                    <button data-select-item>Programming</button>
                  </li>
                </ul>
              </div>

              <ul className="project-list">
                <li className="project-item active" data-filter-item data-category="data analysis" style={{display: selectedFilter === 'all' || selectedFilter === 'data analysis' ? 'block' : 'none'}}>
                  <a href="https://doi.org/10.5281/zenodo.15054459" target="_blank" rel="noopener noreferrer">
                    <figure className="project-img">
                      <div className="project-item-icon-box">
                        <ion-icon name="eye-outline"></ion-icon>
                      </div>
                      <img src="./assets/images/LOCOS.png" alt="locos" loading="lazy" />
                    </figure>
                    <h3 className="project-title">Low-Redshift Cluster Optical Survey (I and II): Initial Release and Complementary Data</h3>
                    <p className="project-category">Data Analysis</p>
                  </a>
                </li>

                <li className="project-item active" data-filter-item data-category="programming" style={{display: selectedFilter === 'all' || selectedFilter === 'programming' ? 'block' : 'none'}}>
                  <a href="https://github.com/orlandogr15/Classify-Galaxies-Python-DS9" target="_blank" rel="noopener noreferrer">
                    <figure className="project-img">
                      <div className="project-item-icon-box">
                        <ion-icon name="eye-outline"></ion-icon>
                      </div>
                      <img src="./assets/images/CGPD.png" alt="gcpd" loading="lazy" />
                    </figure>
                    <h3 className="project-title">Classify Galaxies with Python and DS9</h3>
                    <p className="project-category">Programming</p>
                  </a>
                </li>


              </ul>
            </section>
          </article>

          {/* Contact Page */}
          <article className="contact" data-page="contact">
            <header>
              <h2 className="h2 article-title">Contact</h2>
            </header>

            {/*
            <section className="mapbox" data-mapbox>
              <figure>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199666.5651251294!2d-121.58334177520186!3d38.56165006739519!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x809ac672b28397f9%3A0x921f6aaa74197fdb!2sSacramento%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1647608789441!5m2!1sen!2sbd"
                  width={400} height={300} loading="lazy"
                  style={{border: 0, borderRadius: '8px'}}
                  allowFullScreen={true}
                  aria-hidden="false"
                  tabIndex={0}
                ></iframe>
              </figure>
            </section>
            */}

            <section className="contact-form">
              <h3 className="h3 form-title">Contact Form</h3>

              <form onSubmit={handleContactSubmit} className="form" data-form>
                <div className="input-wrapper">
                  <input type="text" name="fullname" className="form-input" placeholder="Full name" required data-form-input />
                  <input type="email" name="email" className="form-input" placeholder="Email address" required data-form-input />
                </div>

                <textarea name="message" className="form-input" placeholder="Your Message" required data-form-input></textarea>

                <button className="form-btn" type="submit" data-form-btn>
                  <ion-icon name="paper-plane"></ion-icon>
                  <span>Send Message</span>
                </button>

                {formStatus && <p style={{marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem'}}>{formStatus}</p>}
              </form>
            </section>
          </article>
        </div>
      </main>
    </div>
  );
}
