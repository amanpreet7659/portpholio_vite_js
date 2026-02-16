import { useMemo, useState, type ChangeEvent } from 'react';
import { toggleTheme } from './features/theme/themeSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';

type Panel = 'overview' | 'journey' | 'gallery';

type UploadedImage = {
  id: string;
  name: string;
  preview: string;
};

const highlights = [
  {
    title: 'Design + Code Harmony',
    text: 'I build polished interfaces that feel premium and still stay fast on every device.',
  },
  {
    title: 'Business-focused Delivery',
    text: 'Every feature maps to user value, engagement, and measurable product growth.',
  },
  {
    title: 'Accessible by Default',
    text: 'I craft inclusive experiences with semantic HTML, keyboard flow, and contrast-safe UI.',
  },
];

const journeyMilestones = [
  {
    year: '2021',
    title: 'Frontend Foundations',
    detail:
      'Started freelancing and shipped responsive web experiences for local businesses with strong visual identity.',
  },
  {
    year: '2022',
    title: 'Product Mindset Shift',
    detail:
      'Moved from static websites to product development, building dashboard and booking flows in React.',
  },
  {
    year: '2023',
    title: 'Scale & Performance',
    detail:
      'Optimized component architecture and improved load times across larger codebases using TypeScript and Redux.',
  },
  {
    year: '2024+',
    title: 'Creative Digital Experiences',
    detail:
      'Combining animation, UX writing, and modern frontend stacks to create unique portfolio-grade products.',
  },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/', icon: '⌘' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'in' },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: '◉' },
  { label: 'X / Twitter', href: 'https://x.com/', icon: '𝕏' },
];

function App() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const [activePanel, setActivePanel] = useState<Panel>('overview');
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  const sectionHeading = useMemo(() => {
    if (activePanel === 'journey') {
      return 'My Journey';
    }

    if (activePanel === 'gallery') {
      return 'My Gallery';
    }

    return 'What Makes My Work Special';
  }, [activePanel]);

  const onUploadImages = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) {
      return;
    }

    const nextImages = Array.from(files).map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      name: file.name,
      preview: URL.createObjectURL(file),
    }));

    setUploadedImages((existing) => [...nextImages, ...existing]);
    event.target.value = '';
  };

  return (
    <div className={isDark ? 'app theme-dark' : 'app theme-light'}>
      <div className="bg-blur orb-one" aria-hidden="true" />
      <div className="bg-blur orb-two" aria-hidden="true" />

      <header className="hero shell-card">
        <nav className="topbar">
          <span className="brand">ALEX CARTER</span>
          <div className="topbar-actions">
            <button type="button" onClick={() => dispatch(toggleTheme())}>
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
            <a className="resume-link" href="/Alex-Carter-Resume.txt" download>
              Download Resume
            </a>
          </div>
        </nav>

        <p className="eyebrow">Creative Frontend Engineer · Portfolio 2026</p>
        <h1>
          Modern, unique, and user-focused digital experiences that turn ideas into memorable
          products.
        </h1>
        <p className="subtitle">
          I craft high-impact interfaces with smooth interactions, expressive visuals, and
          conversion-friendly UX. Explore my journey, gallery, and social spaces to connect.
        </p>

        <div className="social-row">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              <span>{social.icon}</span>
              {social.label}
            </a>
          ))}
        </div>
      </header>

      <main className="content-grid">
        <section className="panel-switcher shell-card" aria-label="Portfolio pages">
          <button
            className={activePanel === 'overview' ? 'active' : ''}
            type="button"
            onClick={() => setActivePanel('overview')}
          >
            Overview
          </button>
          <button
            className={activePanel === 'journey' ? 'active' : ''}
            type="button"
            onClick={() => setActivePanel('journey')}
          >
            My Journey
          </button>
          <button
            className={activePanel === 'gallery' ? 'active' : ''}
            type="button"
            onClick={() => setActivePanel('gallery')}
          >
            My Gallery
          </button>
        </section>

        <section className="section shell-card">
          <h2>{sectionHeading}</h2>

          {activePanel === 'overview' && (
            <div className="highlight-grid">
              {highlights.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          )}

          {activePanel === 'journey' && (
            <ol className="journey-list">
              {journeyMilestones.map((milestone) => (
                <li key={milestone.year + milestone.title}>
                  <span>{milestone.year}</span>
                  <div>
                    <h3>{milestone.title}</h3>
                    <p>{milestone.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}

          {activePanel === 'gallery' && (
            <div className="gallery-wrap">
              <label className="upload-cta" htmlFor="gallery-upload">
                Upload Images
              </label>
              <input
                id="gallery-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={onUploadImages}
              />
              {!uploadedImages.length && (
                <p className="gallery-empty">Upload your best work snapshots to build your visual story.</p>
              )}
              {!!uploadedImages.length && (
                <div className="gallery-grid">
                  {uploadedImages.map((image) => (
                    <figure key={image.id}>
                      <img src={image.preview} alt={image.name} />
                      <figcaption>{image.name}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
