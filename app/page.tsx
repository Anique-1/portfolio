'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowUpRight, Award, Brain, Check, Clock, Code2, Copy, Cpu, Eye, Mail, MapPin, Menu, Server, Sparkles, X, Zap } from 'lucide-react'

const navItems = [['About', 'about'], ['Experience', 'experience'], ['Work', 'work'], ['Skills', 'skills'], ['Contact', 'contact']]
const tech = ['Python', 'PyTorch', 'TensorFlow', 'YOLO', 'Computer Vision', 'LLMs', 'FastAPI', 'Docker', 'AWS', 'MLOps', 'LangGraph', 'Medical AI']

const heroMessages = [
  { main: "Hi, I'm Anique", sub: "Building real-world AI systems ✦" },
  { main: "AI Engineer &", sub: "Computer Vision Specialist" },
  { main: "Agentic Systems &", sub: "Deep Learning Architect" },
]

const principles = [
  {
    num: '01',
    title: 'First-Principles Modeling',
    tag: 'Problem Formulation',
    text: 'Deconstructing real-world constraints into mathematical models before selecting architectures or tuning hyperparameters.',
  },
  {
    num: '02',
    title: 'Hardware & Edge Optimization',
    tag: 'Latency & Quantization',
    text: 'Pushing heavy vision and LLM weights into sub-15ms edge inference with ONNX, TensorRT, and low-power microcontrollers.',
  },
  {
    num: '03',
    title: 'Reliable Production MLOps',
    tag: 'Zero-Downtime Infra',
    text: 'Automating ETL ingestion for 1M+ samples, continuous benchmark validation, and resilient containerized microservices.',
  },
]

const capabilities = [
  {
    number: '01',
    category: 'Computer Vision & Edge',
    title: 'Real-Time Perception & Edge AI',
    description: 'Ultra-fast object detection, multi-class clinical imaging segmentation, and model compression for constrained hardware.',
    skills: ['YOLOv8 / v11 / v26', 'OpenCV', 'ONNX Runtime', 'TensorRT', 'TFLite', 'CNNs', 'Edge Inference'],
    highlight: 'Sub-15ms Latency · 95%+ Precision',
    icon: Eye,
  },
  {
    number: '02',
    category: 'Autonomous Systems',
    title: 'Agentic LLMs & Reasoning Graphs',
    description: 'Multi-agent state machines, domain fine-tuning (PEFT/LoRA), bilingual Arabic/English pipelines, and autonomous tool calling.',
    skills: ['LangGraph', 'LangChain', 'PEFT / LoRA', 'Vector Databases', 'RAG Architectures', 'ROCm', 'vLLM'],
    highlight: 'Bilingual 7B Models · Multi-Agent State',
    icon: Brain,
  },
  {
    number: '03',
    category: 'Core Deep Learning',
    title: 'Deep Learning & Data Engineering',
    description: 'Custom neural architectures, automated ETL data pipelines, distributed training, and dataset curation at scale.',
    skills: ['PyTorch', 'TensorFlow', 'Keras', 'Scikit-learn', 'NumPy', 'Pandas', 'CUDA Acceleration'],
    highlight: '1M+ Medical Samples · Automated ETL',
    icon: Cpu,
  },
  {
    number: '04',
    category: 'Production & Infra',
    title: 'MLOps, Cloud & Systems Architecture',
    description: 'Scalable containerization, asynchronous high-throughput APIs, CI/CD pipelines, and hardware-to-cloud synchronization.',
    skills: ['Docker', 'Kubernetes', 'AWS Cloud', 'FastAPI', 'Next.js', 'MongoDB', 'IoT Edge Sync'],
    highlight: 'Production APIs · 100% Hardware Sync',
    icon: Server,
  },
]
const projects = [
  {
    title: 'Khaleeji-FinLLM',
    date: 'Apr — May 2026',
    type: 'Agentic LLM',
    description: 'Bilingual Arabic / English 7B model for GCC financial and legal regulations.',
    tags: ['PEFT / LoRA', 'LangGraph', 'ROCm'],
    tone: 'violet',
    link: 'https://khaleeji-ai.vercel.app',
    image: '/khaleeji-ai-feature-image.png',
  },
  {
    title: 'MediVision AI',
    date: 'Oct — Nov 2025',
    type: 'Medical Computer Vision',
    description: 'Six custom YOLOv11 models processing 1M+ medical images with production-grade MLOps.',
    tags: ['YOLOv11', 'AWS', 'FastAPI'],
    tone: 'blue',
    image: '/medivision-ai-feature-image.png',
  },
  {
    title: 'Dental Detection',
    date: 'Jan — Feb 2026',
    type: 'Clinical Diagnostics',
    description: 'Real-time detection of 10 dental conditions via ONNX and TFLite edge deployment.',
    tags: ['YOLOv26', 'ONNX', 'TFLite'],
    tone: 'orange',
    image: '/dental-detection-feature-image.png',
  },
  {
    title: 'MenuBot AI',
    date: 'Nov — Dec 2025',
    type: 'Industrial Automation',
    description: 'AI-powered textile workflow from design to production with automated quality control.',
    tags: ['Computer Vision', 'AI QC', 'Python'],
    tone: 'green',
    image: '/menubot-ai-feature-image.png',
  },
  {
    title: 'PCB Component Detection',
    date: 'Jun 2025',
    type: 'Edge Vision',
    description: 'YOLOv8 model detecting 23 electronic components across varied lighting conditions.',
    tags: ['YOLOv8', '95%+ accuracy'],
    tone: 'cyan',
    image: '/pcb-component-detection-feature-image.png',
  },
  {
    title: 'Veterinary Assistant',
    date: 'Jun 2025',
    type: 'Applied AI',
    description: 'End-to-end vet management platform with symptom analysis and owner-vet matching.',
    tags: ['NLP', 'Dashboards', 'FastAPI'],
    tone: 'pink',
    image: '/veterinary-assistant-feature-image.png',
  },
]
const skills = {
  'AI & Machine Learning': ['Deep Learning', 'Computer Vision', 'NLP', 'CNN', 'YOLO', 'Object Detection', 'Generative AI'],
  'Frameworks & Tools': ['TensorFlow', 'PyTorch', 'Keras', 'OpenCV', 'Scikit-learn', 'LangChain', 'LangGraph'],
  'Cloud & DevOps': ['Docker', 'Kubernetes', 'AWS', 'Azure', 'CI/CD', 'MLOps'],
  'Product Engineering': ['FastAPI', 'REST APIs', 'Microservices', 'Next.js', 'React.js', 'MongoDB', 'Firebase'],
}

function Reveal({
  children,
  className = '',
  threshold = 0.12,
}: {
  children: React.ReactNode
  className?: string
  threshold?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin: '-20px 0px -20px 0px',
      }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return (
    <div ref={ref} className={`reveal ${inView ? 'is-visible' : 'is-hidden'} ${className}`}>
      {children}
    </div>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [copied, setCopied] = useState(false)
  const [active, setActive] = useState('hero')
  const [heroScrollY, setHeroScrollY] = useState(0)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const [msgIndex, setMsgIndex] = useState(0)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true)
      setTimeout(() => {
        setMsgIndex((prev) => (prev + 1) % heroMessages.length)
        setIsFading(false)
      }, 400)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const scroll = window.scrollY
      setHeroScrollY(scroll)
      setScrolled(scroll > 40)
      const ids = ['hero', 'about', 'experience', 'work', 'skills', 'contact']
      const current = ids.findLast((id) => {
        const el = document.getElementById(id)
        return el && el.getBoundingClientRect().top <= window.innerHeight * 0.45
      }) || 'hero'
      setActive(current)
      document.documentElement.setAttribute('data-active-section', current)
    }

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2
      setMouseOffset({ x, y })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])
  const year = useMemo(() => new Date().getFullYear(), [])
  const copyEmail = async () => { await navigator.clipboard?.writeText('muhammadanique81@gmail.com'); setCopied(true); window.setTimeout(() => setCopied(false), 1800) }
  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  // Hero scroll fade & split animation
  const heroProgress = Math.min(1, Math.max(0, heroScrollY / 600))
  const heroOpacity = Math.max(0, 1 - heroProgress * 1.25)
  const heroTranslate = heroProgress * -30

  return <main data-active-section={active}>
    <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="wordmark" href="#hero" onClick={() => go('hero')}>MA<span>.</span></a>
      <nav>{navItems.map(([label, id]) => <a key={id} className={active === id ? 'active' : ''} href={`#${id}`}>{label}</a>)}</nav>
      <a className="nav-cta" href="mailto:muhammadanique81@gmail.com">Let&apos;s talk <ArrowUpRight size={14} /></a>
      <button className="menu-btn" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu size={21} /></button>
    </header>
    {menuOpen && <div className="mobile-menu"><button className="close-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}><X /></button>{navItems.map(([label, id], i) => <a key={id} href={`#${id}`} onClick={() => go(id)}><span>0{i + 1}</span>{label}</a>)}<a className="menu-email" href="mailto:muhammadanique81@gmail.com">muhammadanique81@gmail.com</a></div>}

    {/* EDITORIAL HERO SECTION WITH SPLIT TYPOGRAPHY & PARALLAX */}
    <section id="hero" className="hero-editorial">
      {/* Background Geometric Line Arcs */}
      <div className="hero-bg-arcs" aria-hidden="true">
        <div className="hero-arc-top-left" />
        <div className="hero-arc-bottom-right" />
      </div>

      {/* Giant Split Typography: ANI on Left, QUE on Right (Dropping from Top) */}
      <div className="hero-split-typography" aria-hidden="true" style={{ opacity: heroOpacity }}>
        <div
          className="hero-word-left"
          style={{
            transform: `translateX(${-heroProgress * 90 + mouseOffset.x * -16}px)`,
          }}
        >
          <div className="hero-giant-word hero-word-drop">
            <span className="char-drop" style={{ animationDelay: '0.06s' }}>A</span>
            <span className="char-drop" style={{ animationDelay: '0.18s' }}>N</span>
            <span className="char-drop" style={{ animationDelay: '0.30s' }}>I</span>
          </div>
        </div>

        <div
          className="hero-word-right"
          style={{
            transform: `translateX(${heroProgress * 90 + mouseOffset.x * 16}px)`,
          }}
        >
          <div className="hero-giant-word hero-word-drop">
            <span className="char-drop" style={{ animationDelay: '0.42s' }}>Q</span>
            <span className="char-drop" style={{ animationDelay: '0.54s' }}>U</span>
            <span className="char-drop" style={{ animationDelay: '0.66s' }}>E</span>
          </div>
        </div>
      </div>

      {/* Center Foreground Portrait Cutout */}
      <div
        className="hero-portrait-stage"
        style={{
          opacity: heroOpacity,
          transform: `translateX(calc(-50% + ${mouseOffset.x * 10}px)) translateY(${heroTranslate + mouseOffset.y * 6}px)`,
          transition: 'opacity 0.1s linear, transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Image
          src="/Anique-image.png"
          alt="Muhammad Anique"
          width={900}
          height={900}
          priority
          className="hero-portrait-image"
        />
      </div>

      {/* Top Meta Bar */}
      <div className="hero-meta-top" style={{ opacity: heroOpacity }}>
        <div className="hero-role-block">
          <div className={`hero-msg-rotator ${isFading ? 'is-fading-out' : 'is-fading-in'}`}>
            <span className="hero-role-main">{heroMessages[msgIndex].main}</span>
            <span className="hero-role-sub">{heroMessages[msgIndex].sub}</span>
          </div>
        </div>


      </div>

      {/* Bottom Meta Bar */}
      <div className="hero-meta-bottom" style={{ opacity: heroOpacity }}>
        <div className="hero-actions-left">
          <button className="button-hero-primary" onClick={() => go('work')}>
            View my work <ArrowUpRight size={15} />
          </button>
          <button className="hero-text-cta" onClick={() => go('contact')}>
            Get in touch <span>→</span>
          </button>
        </div>

        <div className="hero-scroll-right" onClick={() => go('about')} role="button" tabIndex={0}>
          <span>Scroll down</span>
          <ArrowDown size={18} className="hero-arrow-bounce" />
        </div>
      </div>
    </section>

    <div className="marquee"><div>{[...tech, ...tech].map((item, i) => <span key={`${item}-${i}`}>{item}<b>✦</b></span>)}</div></div>

    <section id="about" className="section section-light"><Reveal><div className="section-kicker">01 / About</div><div className="about-grid"><h2>Turning vision<br /><span>into intelligence.</span></h2><div className="about-copy"><p className="big-copy">I build end-to-end AI systems that move from research to reality.</p><p>Based in Faisalabad, Pakistan, I&apos;m an AI/ML engineer specializing in computer vision and NLP — from data pipelines to production deployment. My work spans healthcare diagnostics, industrial inspection, IoT platforms, and language AI.</p><a href="#contact" className="under-link">More about me <ArrowUpRight size={15} /></a></div></div></Reveal><div className="about-bottom"><div className="education-card"><span className="card-label">Education</span><h3>University of Agriculture,<br />Faisalabad</h3><p>BS Computer Science · 2022—2026</p><div className="edu-meta"><span>CGPA <strong>3.53 / 4.0</strong></span><span className="award-mini"><Award size={14} /> Agentic AI Hackathon 2025</span></div></div><div className="about-stat"><strong>01</strong><span>engineer<br />with curiosity</span></div><div className="socials"><a href="https://github.com/Anique-1" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg></a><a href="https://www.linkedin.com/in/muhammad-anique-300828266/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg></a><a href="mailto:muhammadanique81@gmail.com" aria-label="Email" title="Email"><Mail size={17} /></a></div></div></section>

    <section id="experience" className="section section-blue experience-section">
      <div className="experience-ambient-glow" aria-hidden="true" />
      <Reveal>
        <div className="section-kicker">02 / Experience</div>
        <div className="experience-head">
          <h2>Built in the<br /><span>real world.</span></h2>
          <p>Where ideas meet constraints, users, and the last mile of deployment.</p>
        </div>
      </Reveal>
      <div className="timeline">
        <div className="timeline-line">
          <div className="timeline-laser-pulse" />
        </div>
        {[
          {
            date: '2026 — Present',
            company: 'SNGPL Pakistan',
            role: 'Complaint Department · Full-stack systems',
            text: 'Built a role-based internal complaint management system for Employee, Executive, and Lawyer workflows.',
            tags: ['Python', 'Next.js', 'FastAPI', 'MongoDB'],
            current: true,
          },
          {
            date: 'Jan — Apr 2026',
            company: 'Esquire Business Solutions',
            role: 'Software Developer Intern',
            text: 'Delivered three production applications for international clients across aviation and professional services.',
            tags: ['React', 'Node.js', 'UI / UX', 'Deployment'],
            current: false,
          },
          {
            date: 'Jul — Sep 2025',
            company: 'DEN Organization',
            role: 'AI / ML Intern',
            text: 'Built an automated ETL pipeline processing 100K+ records and deployed ML models with CI/CD.',
            tags: ['Python', 'Docker', 'CI / CD', 'MLOps'],
            current: false,
          },
        ].map((item, i) => (
          <Reveal key={item.company} className={`timeline-item timeline-item-${i + 1}`}>
            <div className={`timeline-dot ${item.current ? 'is-current' : ''}`}>
              {item.current && <span className="timeline-dot-ping" />}
              <span className="timeline-dot-num">0{i + 1}</span>
            </div>
            <div className="timeline-date-col">
              <span className="timeline-date-text">{item.date}</span>
              {item.current && (
                <div className="timeline-live-badge">
                  <span className="live-pulse-dot" />
                  <span>Present Role</span>
                </div>
              )}
            </div>
            <div className="timeline-card">
              <div className="timeline-card-header">
                <h3>{item.company}</h3>
                <p className="role-title">{item.role}</p>
              </div>
              <p className="timeline-card-desc">{item.text}</p>
              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span key={tag} className="timeline-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <section id="work" className="section section-dark work-section">
      <Reveal>
        <div className="section-kicker">03 / Selected work</div>
        <div className="work-intro">
          <h2>Systems that<br /><span>make an impact.</span></h2>
          <p>A selection of experiments, products, and production systems I&apos;ve brought to life.</p>
        </div>
      </Reveal>

      <Reveal className="medisync">
        <div className="medisync-visual">
          <div className="medisync-img-wrapper">
            <Image
              src="/medisync AI image.png"
              alt="MediSync AI Ecosystem"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="medisync-img"
            />
            <div className="medisync-img-overlay" />
          </div>
          <div className="floating-data d1">89K+ <small>lines of code</small></div>
          <div className="floating-data d2">100% <small>hardware sync</small></div>
        </div>
        <div className="medisync-copy">
          <span className="card-label">Flagship project · 2025—26</span>
          <h3>MediSync AI<br /><em>Ecosystem</em></h3>
          <p>Agentic AI + IoT medication management ecosystem — from an ESP32-S3 smart dispenser to Android, Windows, and web clients.</p>
          <div className="project-stats">
            <span><strong>374</strong>source files</span>
            <span><strong>3</strong>autonomous agents</span>
          </div>
          <a className="button button-outline" href="https://app.medisync-ai.site/" target="_blank" rel="noreferrer">
            Explore MediSync <ArrowUpRight size={16} />
          </a>
        </div>
      </Reveal>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <Reveal key={project.title} className={`project-card ${project.tone}`}>
            <div className="project-art">
              {project.image ? (
                <div className="project-thumb-wrapper">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="project-thumb-img"
                  />
                  <div className="project-thumb-overlay" />
                </div>
              ) : (
                <div className="art-lines" />
              )}
              <span className="project-index">0{i + 1}</span>
            </div>
            <div className="project-info">
              <div>
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
              </div>
              {project.link ? (
                <a href={project.link} target="_blank" rel="noreferrer" aria-label={`View ${project.title}`}>
                  <ArrowUpRight className="project-arrow" size={20} />
                </a>
              ) : (
                <ArrowUpRight className="project-arrow" size={20} />
              )}
              <p>{project.description}</p>
              <div className="tag-row">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <small>{project.date}</small>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <section id="skills" className="section section-light capabilities-section">
      <Reveal>
        <div className="section-kicker">04 / Philosophy &amp; Capabilities</div>
        <div className="capabilities-head">
          <div>

            <h2>Curious by default.<br /><span>Engineered for scale.</span></h2>
          </div>
          <p>
            I architect end-to-end intelligence—combining real-time computer vision, fine-tuned agentic models, robust data pipelines, and production-grade edge deployment.
          </p>
        </div>
      </Reveal>

      {/* Capabilities Bento Grid */}
      <div className="capabilities-grid">
        {capabilities.map((cap) => {
          const IconComponent = cap.icon
          return (
            <Reveal key={cap.title} className="capability-card">
              <div className="cap-card-header">
                <div className="cap-meta-left">
                  <span className="cap-number">{cap.number}</span>
                  <span className="cap-category">{cap.category}</span>
                </div>
                <div className="cap-icon-box">
                  <IconComponent size={18} />
                </div>
              </div>

              <h3 className="cap-title">{cap.title}</h3>
              <p className="cap-desc">{cap.description}</p>

              <div className="cap-skills-list">
                {cap.skills.map((skill) => (
                  <span key={skill} className="cap-skill-pill">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="cap-card-footer">
                <span className="cap-highlight-dot" />
                <span className="cap-highlight-text">{cap.highlight}</span>
              </div>
            </Reveal>
          )
        })}
      </div>

      {/* Engineering Philosophy / Principles Bento */}
      <Reveal className="principles-section-wrapper">
        <div className="principles-intro">
          <span className="principles-kicker">Core Methodology //</span>
          <h3 className="principles-heading">How I tackle difficult problems.</h3>
        </div>
        <div className="principles-grid">
          {principles.map((item) => (
            <div key={item.num} className="principle-card">
              <div className="principle-header">
                <span className="principle-num">{item.num}</span>
                <span className="principle-tag">{item.tag}</span>
              </div>
              <h4 className="principle-title">{item.title}</h4>
              <p className="principle-text">{item.text}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Recognition & Honors */}
      <div className="awards">
        <div className="awards-intro-col">
          <div className="section-kicker">05 / Recognition</div>
          <h3 className="awards-title">Honors &amp;<br /><span>Credentials.</span></h3>
          <p className="awards-desc">
            Competitive innovation hackathons, university summits, and verified AI specializations.
          </p>
        </div>
        <div className="award-list">
          <div className="award-item">
            <div className="award-icon-wrapper badge-gold">
              <Award size={20} />
            </div>
            <div className="award-details">
              <strong>Tech &amp; Entrepreneurship Summit 4.0</strong>
              <small className="award-meta">1st Place · MediVision AI · 2025</small>
            </div>
          </div>
          <div className="award-item">
            <div className="award-icon-wrapper badge-silver">
              <Award size={20} />
            </div>
            <div className="award-details">
              <strong>FLARE Innovation Competition</strong>
              <small className="award-meta">3rd Place · MenuBot AI · 2025</small>
            </div>
          </div>
          <div className="award-item">
            <div className="award-icon-wrapper badge-emerald">
              <Zap size={20} />
            </div>
            <div className="award-details">
              <strong>Agentic AI Hackathon 2025</strong>
              <small className="award-meta">Standout Project · MediSync AI Ecosystem</small>
            </div>
          </div>
          <div className="award-item">
            <div className="award-icon-wrapper badge-blue">
              <Check size={20} />
            </div>
            <div className="award-details">
              <strong>Generative AI with Large Language Models</strong>
              <small className="award-meta">DeepLearning.AI · AWS · Coursera · 2025</small>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" className="contact section-dark">
      <div className="contact-ambient-glow" />
      <div className="contact-grid-pattern" />
      <Reveal>
        <div className="contact-shell">
          <div className="contact-main">
            <div className="contact-header-tag">
              <span className="contact-kicker">06 // CONTACT</span>
              <div className="contact-status-pill">
                <span className="status-pulse-dot">
                  <span className="status-ping" />
                  <span className="status-dot" />
                </span>
                <span>Open to new problems &amp; roles</span>
              </div>
            </div>

            <h2 className="contact-heading">
              Let&apos;s build <br />
              <span className="contact-gradient-text">something.</span>
            </h2>

            <p className="contact-desc">
              Have a bold idea, a messy dataset, or a product that needs intelligence? I&apos;ll help turn the unknown into a working system.
            </p>

            <div className="contact-actions-bar">
              <a
                href="mailto:muhammadanique81@gmail.com"
                className="contact-primary-btn"
              >
                <Mail size={17} />
                <span>Send an email</span>
                <ArrowUpRight size={16} className="btn-arrow" />
              </a>

              <button
                type="button"
                className={`contact-copy-btn ${copied ? 'is-copied' : ''}`}
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-emerald" />
                    <span>Copied to clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={15} />
                    <span className="email-text">muhammadanique81@gmail.com</span>
                    <span className="copy-badge">Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="contact-social-row">
              <span className="social-row-label">Direct channels:</span>
              <a
                href="https://www.linkedin.com/in/muhammad-anique-300828266/"
                target="_blank"
                rel="noreferrer"
                className="social-badge"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>LinkedIn</span>
                <ArrowUpRight size={12} />
              </a>
              <a
                href="https://github.com/Anique-1"
                target="_blank"
                rel="noreferrer"
                className="social-badge"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                </svg>
                <span>GitHub</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-meta-footer">
          <div className="meta-footer-item">
            <MapPin size={15} />
            <span>Faisalabad, Pakistan · Available Worldwide</span>
          </div>
          <div className="meta-footer-item">
            <span className="live-status-dot" />
            <span>Available for opportunities</span>
          </div>
          <div className="meta-footer-item meta-response">
            <Clock size={15} />
            <span>Response time · 24—48h</span>
          </div>
        </div>
      </Reveal>
    </section>

    <footer><span>© {year} Muhammad Anique</span><span>AI / ML Engineer</span><div><a href="https://github.com/Anique-1" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/muhammad-anique-300828266/" target="_blank" rel="noreferrer">LinkedIn</a><a href="mailto:muhammadanique81@gmail.com">Email</a></div></footer>
  </main>
}
