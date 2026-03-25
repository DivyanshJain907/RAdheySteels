'use client';

export default function WhatsAppButton() {
  const phoneNumber = '917905245645'; // WhatsApp number: 7905245645 | Alternative: 9389708460
  const message = 'Hello! I am interested in your steel products.';

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg
        className="w-8 h-8 text-white"
        fill="white"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.52 3.48C18.25 1.25 15.19 0 11.99 0 5.43 0 0.16 5.26 0.16 11.82c0 2.08.54 4.11 1.57 5.9L0 24l6.29-1.64c1.73.94 3.68 1.43 5.66 1.43 6.56 0 11.83-5.26 11.83-11.82 0-3.16-1.23-6.13-3.47-8.36zM11.99 21.6c-1.77 0-3.51-.46-5.04-1.33l-.36-.21-3.73.98.99-3.64-.23-.37C1.6 15.54 1.1 13.77 1.1 11.82c0-5.75 4.68-10.43 10.43-10.43 2.78 0 5.39 1.08 7.36 3.04 1.97 1.96 3.06 4.56 3.06 7.36 0 5.75-4.69 10.43-10.43 10.43zm5.7-7.8c-.31-.16-1.84-.91-2.13-1.01-.29-.1-.5-.15-.71.15-.21.3-.81 1.02-1 1.23-.19.21-.37.24-.68.08-.31-.16-1.31-.49-2.5-1.54-.93-.83-1.56-1.85-1.74-2.15-.18-.3-.02-.46.14-.61.13-.13.31-.35.47-.53.16-.18.21-.31.31-.52.11-.21.05-.39-.03-.55-.08-.16-.71-1.71-1-2.33-.26-.6-.51-.52-.71-.53-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63 0 1.55 1.13 3.05 1.29 3.26.16.21 2.22 3.39 5.38 4.76.75.32 1.34.52 1.8.67.76.24 1.45.2 1.99.12.6-.09 1.86-.76 2.12-1.5.26-.74.26-1.39.19-1.5-.08-.12-.28-.2-.61-.35z" />
      </svg>
    </button>
  );
}
