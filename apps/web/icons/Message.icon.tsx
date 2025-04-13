export const MessageIcon = ({
  color = '#939494',
  width = 14,
  height = 14,
}: {
  color?: string;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2612 6.83301C13.2612 10.1467 10.5749 12.833 7.26123 12.833C6.46313 12.833 5.70143 12.6772 5.00489 12.3943C4.87158 12.3402 4.80493 12.3131 4.75104 12.301C4.69834 12.2892 4.65933 12.2849 4.60532 12.2849C4.5501 12.2849 4.48995 12.2949 4.36966 12.3149L1.99774 12.7103C1.74935 12.7517 1.62516 12.7724 1.53535 12.7338C1.45675 12.7001 1.39412 12.6375 1.3604 12.5589C1.32189 12.4691 1.34258 12.3449 1.38398 12.0965L1.7793 9.72458C1.79935 9.60428 1.80938 9.54414 1.80937 9.48892C1.80936 9.43491 1.80504 9.3959 1.79323 9.3432C1.78115 9.28931 1.75408 9.22266 1.69994 9.08935C1.41705 8.39281 1.26123 7.6311 1.26123 6.83301C1.26123 3.5193 3.94752 0.833008 7.26123 0.833008C10.5749 0.833008 13.2612 3.5193 13.2612 6.83301Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
