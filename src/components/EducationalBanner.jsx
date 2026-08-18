import { useEffect } from 'react';

function EducationalBanner() {
  useEffect(() => {
    document.body.classList.add('has-educational-banner');
    return () => {
      document.body.classList.remove('has-educational-banner');
    };
  }, []);

  return (
    <div className="educational-banner" role="banner">
      <strong>Educational demo only — not Apple.</strong> This is a security awareness simulation.
      Pop-ups, auto-dialing, and tracking have been disabled for safe demonstration.
    </div>
  );
}

export default EducationalBanner;
