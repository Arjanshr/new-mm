import Link from "next/link";

import {
  CSSProperties,
  HTMLAttributeAnchorTarget,
  MouseEventHandler,
  ReactNode,
} from "react";

type TButtonTypes =
  | "primary"
  | "error"
  | "warning"
  | "success"
  | "secondary"
  | "contact";
interface UIButtonProps {
  children?: ReactNode;
  id?: string;
  label?: string | ReactNode;
  name?: string;
  style?: CSSProperties;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: TButtonTypes;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  disabled?: boolean;
}
export default function UIButton({
  href,
  id,
  label,
  onClick,
  style,
  type,
  name,
  className,
  target,
  disabled,
}: UIButtonProps) {
  return href ? (
    <Link
      id={id}
      href={href}
      className={`btn btn-${type ? type : "link"}`}
      style={style}
      target={target}
    >
      {label}
    </Link>
  ) : (
    <button
      id={id}
      className={`text-xs btn btn-${type ? type : "plain"} ${
        className ? className : ""
      }`}
      style={style}
      onClick={onClick}
      disabled={disabled}
      name={name}
    >
      {label}
    </button>
  );
}
