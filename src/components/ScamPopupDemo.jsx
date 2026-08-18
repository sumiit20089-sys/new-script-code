import { useCallback } from 'react';

const SCAM_ALERT_MESSAGE =
  'Your Apple ID was recently used at APPLE STORE for $129.95 Via Apple Pay Pre-Authorization! We have placed those request on hold to ensure your Safety and Security. Not You? Immediately call apple support +1-855-526-9908 to Freeze it!';

/**
 * Educational demo only — shows the same browser confirm() text used in
 * tech-support scams. Does not auto-dial or repeat on an interval.
 */
function ScamPopupDemo() {
  const showPopup = useCallback(() => {
    window.confirm(SCAM_ALERT_MESSAGE);
  }, []);

  return (
    <button type="button" className="scam-popup-demo-btn" onClick={showPopup}>
      Show scam alert (demo)
    </button>
  );
}

export default ScamPopupDemo;
export { SCAM_ALERT_MESSAGE };
