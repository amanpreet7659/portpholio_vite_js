import { useMemo, useState, type ChangeEvent } from 'react';
import { toggleTheme } from './features/theme/themeSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';

type UploadedImage = {
  id: string;
  name: string;
  preview: string;
};

const journeyMilestones = [
  {
    year: '2021',
    title: 'Started as a Freelance Frontend Developer',
    detail: 'Built first responsive business websites and discovered a love for visual storytelling.',
  },
  {
    year: '2022',
    title: 'Moved to Product Development',
    detail: 'Created dashboards, booking experiences, and reusable UI components in React.',
  },
  {
    year: '2023',
    title: 'Performance + Scalability Focus',
    detail: 'Improved rendering speed, architecture quality, and accessibility standards.',
  },
  {
    year: '2024+',
    title: 'Modern Premium Experiences',
    detail: 'Designing unique interfaces where color, typography, and interactions feel effortless.',
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

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/', icon: 'GH' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'in' },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'IG' },
  { label: 'X', href: 'https://x.com/', icon: '𝕏' },
];

function App() {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((state) => state.theme.isDark);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

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

  const galleryCountText = useMemo(() => {
    if (!uploadedImages.length) {
      return 'No images yet';
    }

    if (uploadedImages.length === 1) {
      return '1 image uploaded';
    }

    return `${uploadedImages.length} images uploaded`;
  }, [uploadedImages.length]);

  return (
    <div className={isDark ? 'app theme-dark' : 'app theme-light'}>
      <div className="aura aura-left" aria-hidden="true" />
      <div className="aura aura-right" aria-hidden="true" />

      <header className="hero card">
        <nav className="topbar">
          <p className="brand">ALEX CARTER / FRONTEND PORTFOLIO</p>
          <div className="hero-actions">
            <button type="button" className="ghost-button" onClick={() => dispatch(toggleTheme())}>
              {isDark ? 'Switch Light' : 'Switch Dark'}
            </button>
            <a className="primary-button" href="/Alex-Carter-Resume.txt" download>
              Download Resume
            </a>
          </div>
        </nav>

        <h1>Modern, smooth & unique digital portfolio experience.</h1>
        <p className="hero-copy">
          You asked for something premium and user-friendly — so this design focuses on clean forms,
          expressive buttons, lightweight layout, and clear navigation across journey, gallery, and
          social channels.
        </p>

        <div className="social-row" aria-label="social links">
          {socialLinks.map((social) => (
            <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
              <span>{social.icon}</span>
              {social.label}
            </a>
          ))}
        </div>
      </header>

      <main className="layout">
        <section className="contact card">
          <h2>Let&apos;s work together</h2>
          <p className="section-copy">
            Two quick ways to connect — direct message form or fast scheduling block.
          </p>

          <div className="contact-grid">
            <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
              <h3>I need to speak one-to-one</h3>
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" placeholder="Your full name" />

              <label htmlFor="email">Work Email</label>
              <input id="email" type="email" placeholder="you@company.com" />

              <label htmlFor="project">Project Goal</label>
              <select id="project" defaultValue="">
                <option value="" disabled>
                  Choose your need
                </option>
                <option value="portfolio">Portfolio redesign</option>
                <option value="dashboard">Product dashboard UI</option>
                <option value="landing">Landing page + conversion UX</option>
              </select>

              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Tell me about your idea..." rows={4} />

              <button className="primary-button skew-button" type="submit">
                Send Request
              </button>
            </form>

            <aside className="schedule-box">
              <h3>I want to book a quick session</h3>
              <div className="slot-list">
                <button type="button">Tue, 09:30 PM</button>
                <button type="button">Thu, 11:00 AM</button>
                <button type="button">Sat, 06:15 PM</button>
              </div>
              <button type="button" className="ghost-button wide">
                Continue to Booking
              </button>
            </aside>
          </div>
        </section>

        <section className="journey card">
          <h2>My Journey</h2>
          <ol>
            {journeyMilestones.map((step) => (
              <li key={step.year + step.title}>
                <span>{step.year}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="gallery card">
          <div className="gallery-head">
            <h2>My Gallery</h2>
            <p>{galleryCountText}</p>
          </div>

          <label className="primary-button upload-button" htmlFor="gallery-upload">
            Upload Images
          </label>
          <input id="gallery-upload" type="file" accept="image/*" multiple onChange={onUploadImages} />

          {!uploadedImages.length && (
            <p className="section-copy">Add your UI shots, certificates, events, or work moments here.</p>
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
        </section>
      </main>
    </div>
  );
}

export default App;
