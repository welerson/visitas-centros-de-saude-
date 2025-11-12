
export const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <line x1="10" y1="9" x2="8" y2="9"></line>
  </svg>
);

export const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-green-400 mr-3 shrink-0">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
    <path d="m9 12 2 2 4-4"></path>
  </svg>
);

export const AlertTriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-yellow-400 mr-3 shrink-0">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

export const PoliceCarIcon = ({ color = '#facc15' }: { color?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" className="drop-shadow-lg">
        <g fill={color}>
          <path d="M19.23,10.031,17.43,2.578A1,1,0,0,0,16.469,2H7.531a1,1,0,0,0-.961.578L4.77,10.031A1,1,0,0,0,5.731,11H6.1l.48-2.391A1,1,0,0,1,7.531,8h8.938a1,1,0,0,1,.951.609L17.9,11h.369a1,1,0,0,0,.961-1.031Zm-7.7-4.414.937,1.875a1,1,0,0,0,1.344.445l1.875-.937-1.4-5H10.063l-1.4,5,1.875.937A1,1,0,0,0,11.531,7.491Z"/>
          <path d="M22,12H2a1,1,0,0,0-1,1v5a1,1,0,0,0,1,1H3.14a2.986,2.986,0,0,0,5.72,0h6.28a2.986,2.986,0,0,0,5.72,0H22a1,1,0,0,0,1-1V13A1,1,0,0,0,22,12Zm-16,6a1,1,0,1,1,1-1A1,1,0,0,1,6,18Zm12,0a1,1,0,1,1,1-1A1,1,0,0,1,18,18Z"/>
        </g>
    </svg>
);


export const PinIcon = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="32" height="32" className="drop-shadow-md">
    <path fill={color} d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
  </svg>
);

export const TargetIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-2">
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="6"></circle>
      <circle cx="12" cy="12" r="2"></circle>
    </svg>
);