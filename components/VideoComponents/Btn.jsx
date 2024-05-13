
const Btn= ({ label, onClick, children }) => {
  return (
    <button
      className={`vp-btn${label ? ' label' : ''}`}
      // data-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Btn;
