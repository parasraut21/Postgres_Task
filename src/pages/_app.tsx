// pages/_app.js or pages/_app.tsx
import './styles.css'; // Import Tailwind CSS styles

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
