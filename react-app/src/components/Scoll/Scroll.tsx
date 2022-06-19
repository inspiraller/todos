import { FC, useState, useEffect } from "react";
import stylesTodo from "src/styles/Todo.module.css";

interface Props {
  children: React.ReactNode;
}

const Scroll: FC<Props> = ({ children }) => {
  const [offset, setOffset] = useState(0);
  const [scrollGt, setScrollGt] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (offset > 100) {
      setScrollGt(100);
    } else if (offset > 50) {
      setScrollGt(50);
    } else {
      setScrollGt(0);
    }
  }, [offset]);

  const scrollClass = stylesTodo[`scroll-gt-${scrollGt}`];

  return (
    <div className={`${stylesTodo.scroll} ${scrollClass}`}>{children}</div>
  );
};

export default Scroll;
