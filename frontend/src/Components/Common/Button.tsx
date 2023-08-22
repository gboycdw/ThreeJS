import { useNavigate } from "react-router-dom";

export default function MainButton(props: {
  style: string;
  route: string;
  children: string;
}) {
  const { style, route, children } = props;

  const navigate = useNavigate();

  return (
    <button
      className={style}
      onClick={() => {
        navigate(`${route}`);
      }}
    >
      {children}
    </button>
  );
}
