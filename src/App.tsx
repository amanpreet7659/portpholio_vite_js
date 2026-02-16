import { toggleTheme } from './features/theme/themeSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';

const skills = [
  'React & TypeScript',
  'Redux Toolkit',
  'Node.js APIs',
  'UI/UX Systems',
  'Testing & CI/CD',
];

const projects = [
  {
    title: 'Nova Commerce',
    description:
      'Headless commerce dashboard with real-time analytics, role management, and modular widgets.',
    stack: 'React · RTK Query · Tailwind · Node',
  },
  {
    title: 'Pulse Health',
    description:
      'Patient engagement portal with secure messaging, appointment orchestration, and insights engine.',
    stack: 'TypeScript · Redux Toolkit · Charts',
  },
  {
    title: 'Orbit Studio',
    description:
      'Creator platform for teams to collaborate on content production pipelines and approvals.',
    stack: 'Vite · React · Storybook · Vitest',
  },
];

function App() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);

  return (
    <div className={isDark ? 'app theme-dark' : 'app theme-light'}>
      <header className="hero glass">
        <p className="eyebrow">Open to senior frontend opportunities</p>
        <h1>
          Building modern digital products with
          <span> React + Redux Toolkit</span>
        </h1>
        <p className="subtitle">
          Hi, I&apos;m Alex Carter, a product-minded frontend engineer focused on performance,
          accessibility, and delightful user experiences.
        </p>
        <div className="hero-actions">
          <button type="button" onClick={() => dispatch(toggleTheme())}>
            Switch to {isDark ? 'light' : 'dark'} mode
          </button>
          <a href="#projects">View Projects</a>
        </div>
      </header>

      <main>
        <section className="section glass" id="about">
          <h2>About</h2>
          <p>
            I design and build scalable web apps from prototype to production. I care about clean
            architecture, measurable impact, and shipping quickly with confidence.
          </p>
        </section>

        <section className="section glass" id="skills">
          <h2>Core Skills</h2>
          <ul className="chip-list">
            {skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="section glass" id="projects">
          <h2>Featured Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span>{project.stack}</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
