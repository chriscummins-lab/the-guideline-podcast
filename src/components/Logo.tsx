export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" stroke="#06bc5c" strokeWidth="3" />
      <circle cx="24" cy="24" r="10" fill="#06bc5c" />
    </svg>
  );
}
