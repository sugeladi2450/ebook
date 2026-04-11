export default function ProfileCard({ children, className = "", ...props }) {
  const cardClassName = className ? `profile-card ${className}` : "profile-card";

  return (
    <section className={cardClassName} {...props}>
      {children}
    </section>
  );
}
