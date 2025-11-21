import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, ChevronRight, Wrench, 
  HardHat, Droplets, Wind, Flame, Settings, ShieldCheck, 
  Users, Award, Clock, CheckCircle, Activity, ThermometerSun
} from 'lucide-react';

// Ensure these image paths match your project structure
import logo from './assets/logo.jpeg';
import ceo from './assets/ceo.jpeg';
import team from './assets/team.jpeg';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Form States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // --- NEW SUBMISSION LOGIC (FormSubmit.co) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // 1. Gather data from the form
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // 2. Send to FormSubmit.co using fetch (AJAX)
    // We use the primary email in the URL
    try {
        const response = await fetch("https://formsubmit.co/ajax/info@ajc-jazira.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...data,
                _subject: `New Inquiry from: ${data.name}`, // Custom Email Subject
                _cc: "intekhab@ajc-jazira.com,kalim@ajc-jazira.com", // CC your colleagues here
                _template: "table", // Makes the email look nice
            })
        });

        if (response.ok) {
            setSubmitStatus('success');
            e.target.reset();
        } else {
            setSubmitStatus('error');
        }
    } catch (error) {
        console.log(error);
        setSubmitStatus('error');
    } finally {
        setIsSubmitting(false);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Milestones', href: '#milestones' },
    { name: 'Clients', href: '#clients' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    {
      icon: <Settings className="w-12 h-12 text-blue-600" />,
      title: "Electro-Mechanical",
      description: "Comprehensive industrial support. We handle complex troubleshooting, shutdown projects, and system maintenance with precision.",
      details: ["Shutdown Projects", "Troubleshooting", "System Maintenance"]
    },
    {
      icon: <Wrench className="w-12 h-12 text-orange-500" />,
      title: "Fabrication & Piping",
      description: "Complete piping and fabrication crew equipped with modern tools. Specialized in pipeline fabrication, erection, and certified welding.",
      details: ["Certified Welding Crew", "Pipeline Fabrication", "Structural Erection"]
    },
    {
      icon: <Droplets className="w-12 h-12 text-blue-400" />,
      title: "GRP-RTR Systems",
      description: "Specialized installation of GRP/RTR piping. We handle lamination, double bell coupling, and tank installation according to manufacturer norms.",
      details: ["Underground Installation", "Butt & Strap Joints", "Field Lamination"]
    },
    {
      icon: <ThermometerSun className="w-12 h-12 text-cyan-500" />,
      title: "HVAC Solutions",
      description: "Installation and maintenance of heating, ventilation, and air conditioning systems. From fast-track projects to simple repairs.",
      details: ["Installation & Maintenance", "Cooling Systems", "Duct Work"]
    },
    {
      icon: <Flame className="w-12 h-12 text-red-600" />,
      title: "Fire Fighting Systems",
      description: "Turnkey NFPA-compliant projects including water sprinklers, foam systems, CO2 suppression, and kitchen hood safety systems.",
      details: ["Water & Foam Systems", "CO2 Suppression", "Gas Detection"]
    },
    {
      icon: <Users className="w-12 h-12 text-green-600" />,
      title: "Manpower Supply",
      description: "Deployment of highly competent workforce. We ensure productivity, safety compliance, and strict discipline on client sites.",
      details: ["Skilled Technicians", "Project Support Staff", "HSE Personnel"]
    }
  ];

  const clients = [
    "Saudi Aramco", "SABIC", "SEC (Saudi Electricity)", "Samsung C&T", 
    "Hyundai", "Saipem", "Petrokemya", "Daelim", "Kemya", "SKEC"
  ];

  const milestones = [
    { year: "2025", title: "Establishment", desc: "Founded Al Jazira with a vision to redefine industrial support standards." },
    { year: "2025", title: "Oil & Gas Entry", desc: "Successfully ventured into Oil & Gas sectors (Sulphur Extension Plant - Khursaniya)." },
    { year: "2025", title: "Expansion", desc: "Major growth into Hydro-Carbon Plant projects (Manila) and complex piping works." },
  ];

  return (
    <div className="font-sans text-gray-800 bg-gray-50 scroll-smooth">
      
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-gray-900/80 backdrop-blur-sm py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <img 
                src={logo}
                alt="Al Jazira Logo" 
                className="h-12 w-auto object-contain bg-white rounded-md px-1"
              />
              <div className="flex flex-col">
                <span className={`font-bold text-xl leading-none tracking-tight ${scrolled ? 'text-blue-900' : 'text-white'}`}>
                  Al Jazira
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className={`font-medium text-sm uppercase tracking-wider hover:text-blue-500 transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className={`focus:outline-none ${scrolled ? 'text-gray-800' : 'text-white'}`}>
                {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-xl absolute w-full top-full left-0 border-t border-gray-100">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="Screenshot 2025-11-21 at 10.25.52 PM.png" 
            alt="Industrial Plant" 
            className="w-full h-full object-cover opacity-40"
            onError={(e) => {e.target.style.display='none'}} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-gray-900/90"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-16">
          <div className="inline-block px-4 py-1 mb-6 border border-blue-500/50 rounded-full bg-blue-900/40 backdrop-blur-md text-blue-300 text-sm font-bold tracking-widest uppercase animate-fade-in-up">
            Established 2025
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Step In With A Problem. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Step Out With A Solution.
            </span>
          </h1>
          
          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
            "Whatever you need, we accomplish indeed." <br/>
            Leading the way in Industrial Support, Piping, and Electro-Mechanical Systems across Saudi Arabia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 group">
              Our Services <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-8 py-4 bg-white/10 border border-white/30 backdrop-blur-sm text-white font-bold rounded-lg hover:bg-white hover:text-gray-900 transition-all flex items-center justify-center">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-2">About Al Jazira</h2>
                <h3 className="text-4xl font-bold text-gray-900 leading-tight">Paving the Track to <br/>Reputation & Success</h3>
              </div>
              
              <div className="prose prose-lg text-gray-600">
                <p>
                  We introduce ourselves as <strong>Al Jazira General Contracting Est.</strong> Since 2025, we have built a solid reputation across the region, specializing in Industrial Support Services, Piping, and Electro-Mechanical Systems.
                </p>
                <p>
                  We are fully equipped and professionally managed by a highly skilled team. Under the direction of <strong>AL HANIDI, HADEI ABDULWAHEDA</strong>, we adopt modern strategies to meet complex market demands, providing authentic and cost-effective services to the Oil & Gas and construction industries.
                </p>
                <p className="italic text-gray-500 border-l-4 border-blue-500 pl-4 py-2 bg-gray-50">
                  "Diversity strengthens our credibility, capability, and competitive edge."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                    <h4 className="font-bold text-gray-900">Vision</h4>
                  </div>
                  <p className="text-sm text-gray-600">100% profitability through international quality standards and service excellence.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="w-6 h-6 text-blue-500" />
                    <h4 className="font-bold text-gray-900">Mission</h4>
                  </div>
                  <p className="text-sm text-gray-600">Maximizing efficiency and minimizing cost through integrated solutions.</p>
                </div>
              </div>
            </div>

            <div className="relative mt-10 md:mt-0">
              <div className="absolute -inset-4 bg-blue-100 rounded-2xl transform rotate-3 -z-10"></div>
              
              {/* CEO / Owner Card */}
              <div className="relative group bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-white">
                <div className="aspect-[3/4] w-full relative bg-gray-200">
                   <img 
                        src={ceo}
                        alt="AL HANIDI, HADEI ABDULWAHEDA" 
                        className="absolute inset-0 w-full h-full object-cover object-top"
                   />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent p-8 pt-20">
                    <h4 className="text-white font-bold text-2xl">AL HANIDI, HADEI ABDULWAHEDA</h4>
                    <p className="text-blue-400 font-medium text-sm uppercase tracking-wider mt-1">Chief executive officer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Workforce Section */}
      <section className="py-20 bg-gray-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="md:w-1/2 order-2 md:order-1">
                     <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gray-200 h-96">
                        <img 
                            src={team}
                            alt="Our Skilled Team" 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                         <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                             <HardHat className="w-4 h-4" /> Skilled Manpower
                         </div>
                     </div>
                </div>
                <div className="md:w-1/2 order-1 md:order-2">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">"United We Win"</h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                        Our secret to success lies in our people. We are managed by a highly skilled, energetic, and diligent team of professionals dedicated to the highest industry standards.
                    </p>
                    <p className="text-gray-600 mb-8">
                        "We harbor a myth that nothing can go wrong with us." This confidence drives our hands-on approach. Whether it's fabrication, piping, or electro-mechanical works, our diverse workforce is seamlessly coordinated, operating with integrity and strict discipline.
                    </p>
                    
                    <div className="flex gap-4">
                         <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm w-32 text-center border border-gray-100">
                             <span className="text-3xl font-bold text-blue-600">100%</span>
                             <span className="text-xs text-gray-500 uppercase mt-1 font-bold">Dedication</span>
                         </div>
                         <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm w-32 text-center border border-gray-100">
                             <span className="text-3xl font-bold text-green-600">0</span>
                             <span className="text-xs text-gray-500 uppercase mt-1 font-bold">LTI Accidents</span>
                         </div>
                    </div>
                </div>
            </div>
         </div>
      </section>

      {/* Milestones Section */}
      <section id="milestones" className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Rapid growth and strategic expansion since our inception.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
             {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2 z-0"></div>

            {milestones.map((milestone, index) => (
              <div key={index} className="relative z-10 bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all group">
                <div className="w-16 h-16 bg-gray-900 border-4 border-blue-600 rounded-full flex items-center justify-center text-xl font-bold text-white mb-6 mx-auto shadow-lg shadow-blue-900/50 group-hover:scale-110 transition-transform">
                  {milestone.year}
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-blue-300">{milestone.title}</h3>
                <p className="text-center text-gray-400 text-sm leading-relaxed">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-wide uppercase text-sm">What We Do</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Comprehensive Industrial Solutions</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">From shutdown projects to turnkey fire fighting systems, we deliver excellence.</p>
          </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group flex flex-col h-full hover:-translate-y-1">
                <div className="mb-6 bg-white shadow-sm w-20 h-20 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 ring-1 ring-gray-100">
                  {React.cloneElement(service.icon, { className: "w-10 h-10" })}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                
                 {/* Contextual Visual Elements */}
                 {service.title === "Fire Fighting Systems" && (
                  <div className="mb-4 rounded-lg overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                   

[Image of NFPA fire fighting system diagram]

                   </div>
                )}

                 {service.title === "GRP-RTR Systems" && (
                   <div className="mb-4 rounded-lg overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                      

[Image of GRP pipe installation cross section]

                   </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Values Parallax */}
      <section className="py-20 bg-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <img 
                src="Screenshot 2025-11-21 at 10.26.16 PM.png" 
                alt="Background Industrial" 
                className="w-full h-full object-cover" 
                onError={(e) => {e.target.style.display='none'}}
            />
        </div>
        <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <ShieldCheck className="w-12 h-12 mx-auto mb-4 text-blue-300" />
              <h3 className="text-xl font-bold mb-2">Zero Harm</h3>
              <p className="text-blue-100 text-sm">We operate all workplaces in a safe, healthy, and hygienic environment. Safety is our prime concern.</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Clock className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
              <h3 className="text-xl font-bold mb-2">Timely Delivery</h3>
              <p className="text-blue-100 text-sm">We finish as committed within the contractual time frame, enhancing our repute and your productivity.</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <Award className="w-12 h-12 mx-auto mb-4 text-orange-300" />
              <h3 className="text-xl font-bold mb-2">Quality Policy</h3>
              <p className="text-blue-100 text-sm">Operating with transparency and frequent system reviews. We don't just meet standards; we set them.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects / Clients Section */}
      <section id="clients" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Esteemed Clients</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">We are proud to serve major industry leaders.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {clients.map((client, index) => (
              <div key={index} className="flex items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group cursor-default">
                <span className="text-lg font-bold text-gray-400 group-hover:text-blue-800 transition-colors text-center select-none">{client}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-20 bg-gray-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-6">Ready to start your next project?</h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Entrust your valued projects to Al Jazira and experience the difference in quality, safety, and efficiency.</p>
              <a href="#contact" className="inline-block px-10 py-4 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-lg transform hover:-translate-y-1">
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We are just a call away. Reach out to us for any clarification or to discuss your industrial needs.
              </p>
              
              <div className="space-y-8 mt-12">
                <div className="flex items-start space-x-6 group">
                  <div className="bg-white p-4 rounded-2xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors border border-gray-100">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Our Location</h4>
                    <p className="text-gray-600 mt-1">Kingdom of Saudi Arabia</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group">
                  <div className="bg-white p-4 rounded-2xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors border border-gray-100">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Phone Number</h4>
                    <p className="text-gray-600 mt-1 cursor-pointer hover:text-blue-600 transition-colors">+966 567914428</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6 group">
                  <div className="bg-white p-4 rounded-2xl shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors border border-gray-100">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">Email Address</h4>
                    <p className="text-gray-600 mt-1 cursor-pointer hover:text-blue-600 transition-colors">info@ajc-jazira.com</p>
                    <p className="text-gray-600 mt-1 cursor-pointer hover:text-blue-600 transition-colors">intekhab@ajc-jazira.com</p>
                    <p className="text-gray-600 mt-1 cursor-pointer hover:text-blue-600 transition-colors">kalim@ajc-jazira.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
              
              {/* CONTACT FORM - FORM SUBMIT.CO LOGIC */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" 
                      placeholder="Your Name" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      required 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" 
                      placeholder="Your Email" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    required 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" 
                    placeholder="Project Inquiry" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Message</label>
                  <textarea 
                    name="message"
                    required 
                    rows="4" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white" 
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-4 font-bold rounded-xl text-white transition-all shadow-lg ${
                    isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 shadow-blue-600/30'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {/* Feedback Messages */}
                {submitStatus === 'success' && (
                    <div className="text-green-600 text-center bg-green-50 p-3 rounded-lg">
                        <p className="font-bold">Message sent successfully!</p>
                        <p className="text-sm">We will get back to you shortly.</p>
                    </div>
                )}
                {submitStatus === 'error' && (
                    <div className="text-red-600 text-center bg-red-50 p-3 rounded-lg">
                        <p className="font-bold">Failed to send message.</p>
                        <p className="text-sm">Please try again or email us directly.</p>
                    </div>
                )}
              </form>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="text-white font-bold text-2xl mb-6 flex items-center gap-3">
                 <img 
                   src={logo} 
                   alt="Al Jazira Logo" 
                   className="h-10 w-auto bg-white rounded px-1"
                 />
                 <span>Al Jazira</span>
              </div>
              <p className="mb-6 max-w-sm leading-relaxed text-gray-400">
                Industrial Support Services, Professional Support, Electro-Mechanical & General Contracting.
              </p>
              <p className="italic text-blue-400">"Whatever you need, we accomplish indeed"</p>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#home" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Home</a></li>
                <li><a href="#about" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4"/> About Us</a></li>
                <li><a href="#services" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Services</a></li>
                <li><a href="#contact" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ChevronRight className="w-4 h-4"/> Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold text-lg mb-6">Expertise</h4>
              <ul className="space-y-3">
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Electro-Mechanical</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">General Contracting</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Fire Fighting</li>
                <li className="hover:text-blue-400 transition-colors cursor-pointer">Piping & Fabrication</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Al Jazira General Contracting. All rights reserved.</p>
            <p className="mt-2 md:mt-0 text-sm opacity-50">Building Excellence since 2025</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;