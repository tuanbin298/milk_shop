import "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className="layout_background">
      <div className="layout_content">{children}</div>
    </div>
  );
}
