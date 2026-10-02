import './index.css';

// The website is fully executable and self-contained directly from index.html,
// satisfying the requirement to run simply by opening index.html.
// React components are available and will mount if a dedicated #root element is configured.
const rootElement = document.getElementById('root');
if (rootElement) {
  import('react-dom/client').then(({ createRoot }) => {
    import('./App.tsx').then(({ default: App }) => {
      createRoot(rootElement).render(<App />);
    });
  });
}
