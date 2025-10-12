import { useRef, useEffect } from 'react';
import './FaqItem.css';

function FaqItem({ faq, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div className="faq-item">
      <button className={`faq-question ${isOpen ? 'active' : ''}`} onClick={onToggle} aria-expanded={isOpen}>
        <span>{faq.question}</span>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </button>
      <div 
        ref={contentRef}
        className="faq-answer" 
        style={isOpen ? { maxHeight: contentRef.current.scrollHeight + 'px' } : { maxHeight: '0px' }}
      >
        <p>{faq.answer}</p>
      </div>
    </div>
  );
}

export default FaqItem;