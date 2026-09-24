interface StudioMarkProps {
  compact?: boolean;
}

export default function StudioMark({ compact = false }: StudioMarkProps) {
  return compact ? (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path
        fill="currentColor"
        d="M32 7c-3.1 0-5.6 1.3-7.4 3.4L21.8 7.2a1 1 0 0 0-1.7.9l.9 6.4A17.6 17.6 0 0 0 14 28.4C14 40.6 21.9 51.2 32 56c10.1-4.8 18-15.4 18-27.6a17.6 17.6 0 0 0-7-14l.9-6.3a1 1 0 0 0-1.7-.9l-2.8 3.2A9.6 9.6 0 0 0 32 7Z"
      />
      <circle cx="24.6" cy="26.4" r="5.4" fill="#050506" />
      <circle cx="39.4" cy="26.4" r="5.4" fill="#050506" />
    </svg>
  ) : (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path
        fill="currentColor"
        d="M32 7c-3.1 0-5.6 1.3-7.4 3.4L21.8 7.2a1 1 0 0 0-1.7.9l.9 6.4A17.6 17.6 0 0 0 14 28.4C14 40.6 21.9 51.2 32 56c10.1-4.8 18-15.4 18-27.6a17.6 17.6 0 0 0-7-14l.9-6.3a1 1 0 0 0-1.7-.9l-2.8 3.2A9.6 9.6 0 0 0 32 7Z"
      />
      <circle cx="24.6" cy="26.4" r="6.2" fill="#050506" />
      <circle cx="39.4" cy="26.4" r="6.2" fill="#050506" />
      <path fill="#050506" d="M32 30.6l3.1 5.2a3.6 3.6 0 0 1-6.2 0L32 30.6Z" />
      <circle cx="24.6" cy="26.4" r="1.9" fill="currentColor" />
      <circle cx="39.4" cy="26.4" r="1.9" fill="currentColor" />
    </svg>
  );
}
