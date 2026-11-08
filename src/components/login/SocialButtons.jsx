export default function SocialButtons({ onLogin }) {
  return (
    <div className="social-row">
      <button
        type="button"
        className="btn-social"
        onClick={() => onLogin('google')}
        aria-label="Entrar com Google"
      >
        <GoogleIcon />
        Google
      </button>
      <button
        type="button"
        className="btn-social"
        onClick={() => onLogin('discord')}
        aria-label="Entrar com Discord"
      >
        <DiscordIcon />
        Discord
      </button>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="#5865F2">
      <path d="M20.32 4.37A19.8 19.8 0 0 0 15.44 3a13.8 13.8 0 0 0-.61 1.24 18.3 18.3 0 0 0-5.66 0A13.8 13.8 0 0 0 8.56 3a19.8 19.8 0 0 0-4.88 1.37C.55 8.8-.28 13.13.14 17.4a19.9 19.9 0 0 0 6 3 14.6 14.6 0 0 0 1.28-2.09 12.9 12.9 0 0 1-2.02-.97c.17-.12.34-.25.5-.38a14.2 14.2 0 0 0 12.2 0c.16.13.33.26.5.38-.64.38-1.32.71-2.02.97.37.73.8 1.43 1.28 2.09a19.9 19.9 0 0 0 6-3c.5-5-.83-9.29-3.54-13.03zM8.02 14.8c-1.18 0-2.15-1.08-2.15-2.41 0-1.33.95-2.42 2.15-2.42 1.2 0 2.17 1.09 2.15 2.42 0 1.33-.95 2.41-2.15 2.41zm7.96 0c-1.18 0-2.15-1.08-2.15-2.41 0-1.33.95-2.42 2.15-2.42 1.2 0 2.17 1.09 2.15 2.42 0 1.33-.95 2.41-2.15 2.41z"/>
    </svg>
  )
}